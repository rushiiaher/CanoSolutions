const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    console.log('Testing MongoDB connection...');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuration error', 
          details: 'MONGODB_URI environment variable is not set' 
        })
      };
    }
    
    // Log URI format (safely)
    const uri = process.env.MONGODB_URI;
    console.log('MongoDB URI format check:', uri.substring(0, 20) + '...');
    
    // Create client with options
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    
    // Try to connect
    await client.connect();
    
    // Test connection with a ping
    await client.db('admin').command({ ping: 1 });
    
    // Close connection
    await client.close();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'MongoDB connection successful' 
      })
    };
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Connection failed', 
        details: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      })
    };
  }
};