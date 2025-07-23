const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  // Ensure URI has the correct protocol prefix
  let uri = process.env.MONGODB_URI;
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    uri = 'mongodb+srv://' + uri;
  }
  
  console.log('Connecting to MongoDB...');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

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
    
    if (event.httpMethod === 'POST') {
      console.log('Processing POST request');
      let requestBody;
      
      try {
        requestBody = JSON.parse(event.body);
        console.log('Request body parsed successfully');
      } catch (parseError) {
        console.error('Error parsing request body:', parseError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid request body format' })
        };
      }
      
      // Log the received data for debugging
      console.log('Received form data:', JSON.stringify(requestBody));
      
      const { firstName, lastName, email, phone, company, message } = requestBody;

      if (!firstName || !lastName || !email || !phone) {
        console.log('Validation failed: Missing required fields');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'All required fields must be filled' })
        };
      }
      
      // If message is undefined, set it to an empty string
      const formMessage = message || '';
      
      console.log('Connecting to database...');
      let client;
      try {
        client = await connectToDatabase();
        console.log('Database connection successful');
      } catch (dbError) {
        console.error('Database connection failed:', dbError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Database connection failed', 
            details: dbError.message 
          })
        };
      }
      
      const db = client.db('canosolutions');

      const inquiry = {
        firstName,
        lastName,
        email,
        phone,
        company: company || '',
        message: formMessage,
        createdAt: new Date(),
        status: 'new'
      };

      console.log('Saving inquiry to database...');
      let result;
      try {
        result = await db.collection('inquiries').insertOne(inquiry);
        console.log('Inquiry saved successfully with ID:', result.insertedId);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Inquiry submitted successfully',
            id: result.insertedId
          })
        };
      } catch (insertError) {
        console.error('Error saving inquiry:', insertError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to save inquiry', 
            details: insertError.message 
          })
        };
      }
    }

    if (event.httpMethod === 'GET') {
      const inquiries = await db.collection('inquiries')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(inquiries)
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
        details: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      })
    };
  }
};