const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
  
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('canosolutions');

    if (event.httpMethod === 'POST') {
      const { firstName, lastName, email, phone, company, message } = JSON.parse(event.body);

      if (!firstName || !lastName || !email || !phone || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'All required fields must be filled' })
        };
      }

      const inquiry = {
        firstName,
        lastName,
        email,
        phone,
        company: company || '',
        message,
        createdAt: new Date(),
        status: 'new'
      };

      const result = await db.collection('inquiries').insertOne(inquiry);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Inquiry submitted successfully',
          id: result.insertedId
        })
      };
    }

    if (event.httpMethod === 'GET') {
      const inquiries = await db.collection('inquiries')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(inquiries)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
};