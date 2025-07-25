const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // Check if MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'MONGODB_URI not set' })
      };
    }

    // Create a new client
    const client = new MongoClient(process.env.MONGODB_URI);
    
    // Connect to MongoDB
    await client.connect();
    
    // Test with a simple ping
    await client.db('admin').command({ ping: 1 });
    
    // Close the connection
    await client.close();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'MongoDB connection successful' })
    };
  } catch (error) {
    console.error('MongoDB test error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'MongoDB connection failed', 
        message: error.message,
        stack: error.stack
      })
    };
  }
};