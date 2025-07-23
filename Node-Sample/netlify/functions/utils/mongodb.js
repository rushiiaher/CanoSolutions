const { MongoClient } = require('mongodb');

// Shared MongoDB connection cache
let cachedClient = null;

/**
 * Connect to MongoDB with improved error handling
 * @returns {Promise<MongoClient|null>} MongoDB client or null if connection fails
 */
async function connectToDatabase() {
  try {
    // Check if we have a cached client and if it's still connected
    if (cachedClient) {
      try {
        // Test the connection with a simple ping
        await cachedClient.db('admin').command({ ping: 1 });
        console.log('Using cached MongoDB connection');
        return cachedClient;
      } catch (error) {
        console.log('Cached connection is stale, creating new connection');
        cachedClient = null;
      }
    }

    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      return null;
    }
    
    // Ensure URI has the correct protocol prefix and is trimmed
    let uri = process.env.MONGODB_URI.trim();
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      uri = 'mongodb+srv://' + uri;
    }
    
    console.log('Creating new MongoDB connection...');
    console.log('MongoDB URI format check:', uri.substring(0, 20) + '...');
    
    // Optimized options for serverless environments
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      maxPoolSize: 1, // Limit connection pool for serverless
      minPoolSize: 0,
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    });
    
    await client.connect();
    console.log('Successfully connected to MongoDB');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Error type:', error.name);
    console.error('Stack trace:', error.stack);
    
    // Don't throw the error, return null instead
    return null;
  }
}

module.exports = {
  connectToDatabase
};