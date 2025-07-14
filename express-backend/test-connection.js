const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  console.log('📋 Connection string:', process.env.MONGODB_URI?.replace(/:[^:@]*@/, ':****@'));
  
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('⏳ Connecting to MongoDB...');
    await client.connect();
    
    console.log('✅ Connected successfully!');
    
    // Test database access
    const db = client.db('canosolutions');
    await db.admin().ping();
    console.log('✅ Database ping successful!');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('🔧 Error details:', {
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels
    });
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();