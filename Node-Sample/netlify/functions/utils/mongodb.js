const { MongoClient } = require('mongodb');

// Shared MongoDB connection cache
let cachedClient = null;

/**
 * Connect to MongoDB with simplified error handling
 * @returns {Promise<MongoClient|null>} MongoDB client or null if connection fails
 */
async function connectToDatabase() {
  try {
    // Don't use cached client in serverless environment
    cachedClient = null;
    
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      return null;
    }
    
    // Get the URI directly
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB...');
    
    // Create client with minimal options
    const client = new MongoClient(uri);
    
    // Connect
    await client.connect();
    console.log('Successfully connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return null;
  }
}

module.exports = {
  connectToDatabase
};