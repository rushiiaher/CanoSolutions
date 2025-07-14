const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
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
      const { email } = JSON.parse(event.body);

      if (!email || !email.includes('@')) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid email is required' })
        };
      }

      const existing = await db.collection('subscriptions').findOne({ email });
      if (existing) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email already subscribed' })
        };
      }

      const subscription = {
        email,
        subscribedAt: new Date(),
        status: 'active'
      };

      const result = await db.collection('subscriptions').insertOne(subscription);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Successfully subscribed to newsletter',
          id: result.insertedId
        })
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
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};