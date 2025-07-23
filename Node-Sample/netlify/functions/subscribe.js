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

      if (!email || !email.includes('@')) {
        console.log('Validation failed: Invalid email format');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid email is required' })
        };
      }
      
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
      const subscriptions = await db.collection('subscriptions')
        .find({})
        .sort({ subscribedAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(subscriptions)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error in subscribe function:', error);
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