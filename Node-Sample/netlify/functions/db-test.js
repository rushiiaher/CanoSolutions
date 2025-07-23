const { MongoClient } = require('mongodb');
const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // For OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Testing MongoDB connection...');
    console.log('Node.js version:', process.version);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuration error', 
          details: 'MONGODB_URI environment variable is not set',
          env_vars: Object.keys(process.env).filter(key => !key.includes('KEY') && !key.includes('SECRET')).join(', ')
        })
      };
    }
    
    // Log URI format (safely)
    const uri = process.env.MONGODB_URI.trim();
    const uriPrefix = uri.substring(0, Math.min(20, uri.length));
    console.log('MongoDB URI format check:', uriPrefix + '...');
    
    // Check URI format
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      console.error('Invalid MongoDB URI format');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuration error', 
          details: 'Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://',
          prefix: uriPrefix
        })
      };
    }
    
    // Try to connect using the shared utility
    console.log('Attempting to connect...');
    const client = await connectToDatabase();
    
    if (!client) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Connection failed', 
          details: 'Failed to establish MongoDB connection',
          uri_prefix: uriPrefix
        })
      };
    }
    
    console.log('Connection established');
    
    // Test connection with a ping
    console.log('Testing connection with ping...');
    await client.db('admin').command({ ping: 1 });
    console.log('Ping successful');
    
    // Try to access the actual database
    console.log('Testing access to canosolutions database...');
    const db = client.db('canosolutions');
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections in canosolutions database`);
    
    // Close connection
    await client.close();
    console.log('Connection closed properly');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'MongoDB connection successful',
        collections: collections.map(c => c.name),
        database: 'canosolutions'
      })
    };
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Determine the specific error type for better troubleshooting
    let errorType = 'unknown';
    let recommendation = '';
    
    if (error.name === 'MongoServerSelectionError') {
      errorType = 'connection';
      recommendation = 'Check network access, MongoDB Atlas IP whitelist, and server status.';
    } else if (error.name === 'MongoParseError') {
      errorType = 'uri_format';
      recommendation = 'The connection string format is invalid. Check for special characters or formatting issues.';
    } else if (error.name === 'MongoNetworkError') {
      errorType = 'network';
      recommendation = 'Network connectivity issue. Check firewall settings and MongoDB Atlas network access list.';
    } else if (error.name === 'MongoNotConnectedError') {
      errorType = 'not_connected';
      recommendation = 'Client is not connected. Try increasing the connection timeout.';
    } else if (error.name === 'MongoAPIError') {
      errorType = 'auth';
      recommendation = 'Authentication failed. Check username and password in the connection string.';
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Connection failed', 
        errorType: errorType,
        details: error.message,
        name: error.name,
        recommendation: recommendation,
        stack: error.stack
      })
    };
  }
};