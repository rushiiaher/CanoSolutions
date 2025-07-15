const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('canosolutions');
    
    const inquiries = await db.collection('inquiries').find({}).toArray();
    const subscriptions = await db.collection('subscriptions').find({}).toArray();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        inquiriesCount: inquiries.length,
        subscriptionsCount: subscriptions.length,
        inquiries: inquiries.slice(0, 2), // First 2 for debugging
        subscriptions: subscriptions.slice(0, 2) // First 2 for debugging
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      })
    };
  }
};