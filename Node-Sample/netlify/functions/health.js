const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  // Ensure URI has the correct protocol prefix
  let uri = process.env.MONGODB_URI;
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    uri = 'mongodb+srv://' + uri;
  }
  
  console.log('Connecting to MongoDB...');
  
  // Remove deprecated options that might cause issues
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Health check requested');
    
    // Check environment variables
    const envStatus = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      NODE_VERSION: process.version,
      NETLIFY_ENV: process.env.NETLIFY || 'Not in Netlify environment'
    };
    
    console.log('Environment status:', envStatus);
    
    // Check database connection
    let dbStatus = 'Not checked';
    let dbError = null;
    
    try {
      console.log('Testing database connection...');
      const client = await connectToDatabase();
      const db = client.db('canosolutions');
      
      // Simple ping to verify connection
      await db.command({ ping: 1 });
      dbStatus = 'Connected';
      console.log('Database connection successful');
    } catch (error) {
      dbStatus = 'Failed';
      dbError = error.message;
      console.error('Database connection failed:', error);
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: envStatus,
        database: {
          status: dbStatus,
          error: dbError
        }
      })
    };
  } catch (error) {
    console.error('Health check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        status: 'error',
        error: 'Health check failed',
        details: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      })
    };
  }
};