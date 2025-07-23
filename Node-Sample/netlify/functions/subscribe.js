const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI.substring(0, 20) + '...');
  
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
  
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
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
    console.log('Received subscribe request:', event.httpMethod);
    
    if (event.httpMethod === 'POST') {
      console.log('Processing POST request');
      let requestBody;
      
      try {
        requestBody = JSON.parse(event.body);
        console.log('Request body parsed successfully');
      } catch (parseError) {
        console.error('Error parsing request body:', parseError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid request body format' })
        };
      }
      
      const { email } = requestBody;

      if (!email || !email.includes('@')) {
        console.log('Validation failed: Invalid email format');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid email is required' })
        };
      }
      
      console.log('Connecting to database...');
      const client = await connectToDatabase();
      const db = client.db('canosolutions');

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

    if (event.httpMethod === 'GET') {
      const subscriptions = await db.collection('subscriptions')
        .find({})
        .sort({ subscribedAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(subscriptions)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error in subscribe function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      })
    };
  }
};