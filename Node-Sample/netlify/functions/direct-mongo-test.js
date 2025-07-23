// Direct MongoDB connection test without any shared utilities
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // Log environment info
    console.log('Node version:', process.version);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    
    // Check if MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuration error', 
          message: 'MONGODB_URI environment variable is not set'
        })
      };
    }

    // Get MongoDB URI
    const uri = process.env.MONGODB_URI;
    console.log('MongoDB URI prefix:', uri.substring(0, 15) + '...');
    
    // Create client with minimal options
    console.log('Creating MongoDB client...');
    const client = new MongoClient(uri);
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully');
    
    // Test with a simple ping
    console.log('Testing connection with ping...');
    await client.db('admin').command({ ping: 1 });
    console.log('Ping successful');
    
    // Test access to the actual database
    console.log('Testing access to canosolutions database...');
    const db = client.db('canosolutions');
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections`);
    
    // Close the connection
    await client.close();
    console.log('Connection closed properly');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'MongoDB connection successful',
        collections: collections.map(c => c.name)
      })
    };
  } catch (error) {
    console.error('MongoDB test error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'MongoDB connection failed',
        message: error.message,
        type: error.name
      })
    };
  }
};