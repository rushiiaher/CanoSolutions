// Direct inquiry function with minimal MongoDB connection code
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Only handle POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    console.log('Processing inquiry submission');
    
    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body format' })
      };
    }
    
    // Extract form data
    const { firstName, lastName, email, phone, company, message } = requestBody;
    
    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Check for MongoDB URI
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database connection string not configured' })
      };
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      
      // Get database and collection
      const db = client.db('canosolutions');
      const collection = db.collection('inquiries');
      
      // Create inquiry document
      const inquiry = {
        firstName,
        lastName,
        email,
        phone,
        company: company || '',
        message: message || '',
        createdAt: new Date(),
        status: 'new'
      };
      
      // Insert document
      const result = await collection.insertOne(inquiry);
      console.log('Inquiry saved with ID:', result.insertedId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Inquiry submitted successfully',
          id: result.insertedId
        })
      };
    } catch (dbError) {
      console.error('MongoDB error:', dbError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Database operation failed', 
          message: dbError.message 
        })
      };
    } finally {
      // Always close the connection
      await client.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};