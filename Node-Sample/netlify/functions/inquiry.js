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
    console.log('Function environment:', process.env.NODE_ENV || 'development');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    
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

      // Enhanced validation
      const validationErrors = [];
      
      if (!firstName || firstName.trim().length === 0) {
        validationErrors.push('First name is required');
      }
      if (!lastName || lastName.trim().length === 0) {
        validationErrors.push('Last name is required');
      }
      if (!email || email.trim().length === 0) {
        validationErrors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        validationErrors.push('Please enter a valid email address');
      }
      if (!phone || phone.trim().length === 0) {
        validationErrors.push('Phone number is required');
      }
      
      if (validationErrors.length > 0) {
        console.log('Validation failed:', validationErrors);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Validation failed', 
            details: validationErrors 
          })
        };
      }
      
      // If message is undefined, set it to an empty string
      const formMessage = message || '';
      
      console.log('Connecting to database...');
      const client = await connectToDatabase();
      
      if (!client) {
        console.error('Database connection failed');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Database connection failed', 
            details: 'Could not establish connection to MongoDB' 
          })
        };
      }
      
      console.log('Database connection successful');
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
      console.log('Processing GET request for inquiries');
      
      const client = await connectToDatabase();
      
      if (!client) {
        console.error('Database connection failed for GET request');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Database connection failed', 
            details: 'Could not establish connection to MongoDB' 
          })
        };
      }
      
      console.log('Database connection successful for GET request');
      const db = client.db('canosolutions');
      
      try {
        const inquiries = await db.collection('inquiries')
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        console.log(`Retrieved ${inquiries.length} inquiries`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(inquiries)
        };
      } catch (queryError) {
        console.error('Error querying inquiries:', queryError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to retrieve inquiries', 
            details: queryError.message 
          })
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error in inquiry function:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        type: error.name,
        // Always include stack trace for debugging
        stack: error.stack
      })
    };
  }
};