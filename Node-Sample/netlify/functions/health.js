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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('canosolutions');
    
    await db.admin().ping();
    const stats = await Promise.all([
      db.collection('inquiries').countDocuments(),
      db.collection('subscriptions').countDocuments()
    ]);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: { connected: true },
        stats: {
          totalInquiries: stats[0],
          totalSubscriptions: stats[1]
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'unhealthy',
        error: error.message
      })
    };
  }
};