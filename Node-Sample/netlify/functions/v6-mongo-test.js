// MongoDB v6 test function
const { MongoClient, ServerApiVersion } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    console.log('MongoDB version test');
    
    // Hardcoded MongoDB URI
    const uri = "mongodb+srv://Cano:ChhxF5kcjmvXblVK@cluster0.ze01tlz.mongodb.net/canosolutions?retryWrites=true&w=majority";
    
    // Create a MongoClient with the correct options for MongoDB v6
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    
    // Close the connection
    await client.close();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'MongoDB v6 connection successful'
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
        stack: error.stack
      })
    };
  }
};