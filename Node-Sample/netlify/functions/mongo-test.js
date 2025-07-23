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
    console.log('MongoDB connection diagnostic test');
    
    // Check environment variable
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
    
    // Log the URI format (safely)
    const uri = process.env.MONGODB_URI;
    const uriParts = uri.split('@');
    const safeUri = uriParts.length > 1 
      ? `[credentials]@${uriParts[1]}` 
      : '[malformed uri]';
    
    console.log('URI format:', safeUri);
    
    // Basic connection test
    try {
      console.log('Attempting basic MongoDB connection...');
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000
      });
      
      await client.connect();
      console.log('Basic connection successful');
      await client.close();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'MongoDB connection successful',
          uri_format: safeUri
        })
      };
    } catch (connError) {
      console.error('Connection error:', connError);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'MongoDB connection failed',
          details: connError.message,
          code: connError.code,
          name: connError.name,
          uri_format: safeUri
        })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Function execution failed',
        details: error.message
      })
    };
  }
};