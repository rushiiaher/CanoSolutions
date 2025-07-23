// Test function without MongoDB
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    console.log('Function test without MongoDB');
    
    // Check if MongoDB module is available
    let mongodbStatus = 'unknown';
    try {
      const mongodb = require('mongodb');
      mongodbStatus = 'available';
      console.log('MongoDB module version:', mongodb.version || 'unknown');
    } catch (moduleError) {
      mongodbStatus = 'unavailable';
      console.error('MongoDB module error:', moduleError);
    }
    
    // Check environment variables
    const envVars = {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      MONGODB_URI: process.env.MONGODB_URI ? 'set' : 'not set'
    };
    
    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Function executed successfully',
        mongodbStatus,
        envVars,
        nodeVersion: process.version
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Function execution failed',
        message: error.message
      })
    };
  }
};