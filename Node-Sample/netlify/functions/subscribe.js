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
    console.log('Received subscribe request:', event.httpMethod);
    
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
      console.log('Received subscription data:', JSON.stringify(requestBody));
      
      const { email } = requestBody;

      // Enhanced email validation
      if (!email || email.trim().length === 0) {
        console.log('Validation failed: Email is required');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email is required' })
        };
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        console.log('Validation failed: Invalid email format');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Please enter a valid email address' })
        };
      }
      
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

      let existing;
      try {
        existing = await db.collection('subscriptions').findOne({ email });
        if (existing) {
          console.log('Email already subscribed:', email);
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email already subscribed' })
          };
        }
      } catch (findError) {
        console.error('Error checking existing subscription:', findError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to check subscription status', 
            details: findError.message 
          })
        };
      }

      const subscription = {
        email,
        subscribedAt: new Date(),
        status: 'active'
      };

      console.log('Saving subscription to database...');
      let result;
      try {
        result = await db.collection('subscriptions').insertOne(subscription);
        console.log('Subscription saved successfully with ID:', result.insertedId);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Successfully subscribed to newsletter',
            id: result.insertedId
          })
        };
      } catch (insertError) {
        console.error('Error saving subscription:', insertError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to save subscription', 
            details: insertError.message 
          })
        };
      }
    }

    if (event.httpMethod === 'GET') {
      console.log('Processing GET request for subscriptions');
      
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
        const subscriptions = await db.collection('subscriptions')
          .find({})
          .sort({ subscribedAt: -1 })
          .toArray();

        console.log(`Retrieved ${subscriptions.length} subscriptions`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(subscriptions)
        };
      } catch (queryError) {
        console.error('Error querying subscriptions:', queryError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to retrieve subscriptions', 
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
    console.error('Error in subscribe function:', error);
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