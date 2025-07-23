const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Received inquiry request:', event.httpMethod);
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (event.httpMethod === 'POST') {
      console.log('Processing POST request');
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
      
      const { firstName, lastName, email, phone, company, message } = requestBody;
      
      // Basic validation
      if (!firstName || !lastName || !email || !phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' })
        };
      }
      
      // Direct MongoDB connection
      const { MongoClient } = require('mongodb');
      
      if (!process.env.MONGODB_URI) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'MongoDB URI not configured' })
        };
      }
      
      console.log('Connecting to MongoDB directly...');
      const client = new MongoClient(process.env.MONGODB_URI);
      
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db('canosolutions');
        
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
        
        const result = await db.collection('inquiries').insertOne(inquiry);
        console.log('Inquiry saved with ID:', result.insertedId);
        
        await client.close();
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Inquiry submitted successfully'
          })
        };
      } catch (dbError) {
        console.error('MongoDB error:', dbError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Database operation failed', 
            details: dbError.message 
          })
        };
      } finally {
        try {
          await client.close();
        } catch (e) {}
      }
    }

    if (event.httpMethod === 'GET') {
      // Simple GET handler
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Use POST to submit inquiries' })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error in inquiry function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};