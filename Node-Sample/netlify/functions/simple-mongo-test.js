// Extremely simple MongoDB connection test
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // Check MongoDB URI
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'MONGODB_URI not set' })
      };
    }

    // Log URI (safely)
    const uri = process.env.MONGODB_URI;
    console.log('URI prefix:', uri.substring(0, 10) + '...');

    // Create client with no options
    const client = new MongoClient(uri);
    
    // Connect
    await client.connect();
    
    // Test connection
    await client.db('admin').command({ ping: 1 });
    
    // Close connection
    await client.close();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('MongoDB error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Connection failed',
        message: error.message
      })
    };
  }
};