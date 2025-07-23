const { MongoClient } = require('mongodb');

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
    console.log('Testing MongoDB connection');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuration error',
          details: 'MONGODB_URI environment variable is not set'
        })
      };
    }
    
    // Ensure URI has the correct protocol prefix
    let uri = process.env.MONGODB_URI;
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      uri = 'mongodb+srv://' + uri;
    }
    
    console.log('MongoDB URI format check passed');
    
    // Try to connect with a timeout
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    // Test database access
    const db = client.db('canosolutions');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Available collections:', collectionNames);
    
    // Close the connection
    await client.close();
    console.log('Connection closed');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'MongoDB connection successful',
        collections: collectionNames,
        uri_prefix: uri.substring(0, 15) + '...'
      })
    };
    
  } catch (error) {
    console.error('MongoDB test error:', error);
    
    // Provide detailed error information
    let errorDetails = {
      message: error.message,
      code: error.code,
      name: error.name
    };
    
    if (error.name === 'MongoServerSelectionError') {
      errorDetails.suggestion = 'Check if MongoDB Atlas IP access list includes Netlify IPs';
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'MongoDB connection failed',
        details: errorDetails
      })
    };
  }
};