// Hardcoded MongoDB connection test
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // Hardcoded MongoDB URI - same as in .env.local
    const uri = "mongodb+srv://Cano:ChhxF5kcjmvXblVK@cluster0.ze01tlz.mongodb.net/canosolutions?retryWrites=true&w=majority";
    
    console.log('Using hardcoded MongoDB URI');
    
    // Create client
    const client = new MongoClient(uri);
    
    // Connect
    console.log('Attempting to connect...');
    await client.connect();
    console.log('Connected successfully');
    
    // Test connection
    await client.db('admin').command({ ping: 1 });
    console.log('Ping successful');
    
    // Close connection
    await client.close();
    console.log('Connection closed');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'MongoDB connection successful with hardcoded URI'
      })
    };
  } catch (error) {
    console.error('MongoDB error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Connection failed',
        message: error.message,
        type: error.name
      })
    };
  }
};