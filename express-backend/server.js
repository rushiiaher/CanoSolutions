const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
const allowedOrigins = (process.env.VITE_ORIGIN || 'http://localhost:3000,http://localhost:3001,https://canosolutions.netlify.app').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db('canosolutions');
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await db.admin().ping();
    const stats = await Promise.all([
      db.collection('inquiries').countDocuments(),
      db.collection('subscriptions').countDocuments()
    ]);
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: { connected: true },
      stats: {
        totalInquiries: stats[0],
        totalSubscriptions: stats[1]
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Inquiry endpoints
app.post('/api/inquiry', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        error: 'All required fields must be filled'
      });
    }

    const inquiry = {
      firstName,
      lastName,
      email,
      phone,
      company: company || '',
      message,
      createdAt: new Date(),
      status: 'new'
    };

    const result = await db.collection('inquiries').insertOne(inquiry);

    res.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({
      error: 'Failed to submit inquiry'
    });
  }
});

app.get('/api/inquiry', async (req, res) => {
  try {
    const inquiries = await db.collection('inquiries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      error: 'Failed to fetch inquiries'
    });
  }
});

// Subscription endpoints
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Valid email is required'
      });
    }

    // Check if email already exists
    const existing = await db.collection('subscriptions').findOne({ email });
    if (existing) {
      return res.status(400).json({
        error: 'Email already subscribed'
      });
    }

    const subscription = {
      email,
      subscribedAt: new Date(),
      status: 'active'
    };

    const result = await db.collection('subscriptions').insertOne(subscription);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({
      error: 'Failed to subscribe'
    });
  }
});

app.get('/api/subscribe', async (req, res) => {
  try {
    const subscriptions = await db.collection('subscriptions')
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray();

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      error: 'Failed to fetch subscriptions'
    });
  }
});

// Test endpoint
app.post('/api/test-forms', async (req, res) => {
  try {
    const testInquiry = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      company: 'Test Company',
      message: 'This is a test inquiry',
      createdAt: new Date(),
      status: 'new'
    };
    
    const testSubscription = {
      email: 'test-subscriber@example.com',
      subscribedAt: new Date(),
      status: 'active'
    };
    
    const [inquiryResult, subscriptionResult] = await Promise.all([
      db.collection('inquiries').insertOne(testInquiry),
      db.collection('subscriptions').insertOne(testSubscription)
    ]);
    
    res.json({
      message: 'Test data inserted successfully',
      inquiryId: inquiryResult.insertedId,
      subscriptionId: subscriptionResult.insertedId
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({
      error: 'Test failed',
      details: error.message
    });
  }
});

app.get('/api/test-forms', async (req, res) => {
  try {
    const [inquiriesCount, subscriptionsCount, latestInquiry, latestSubscription] = await Promise.all([
      db.collection('inquiries').countDocuments(),
      db.collection('subscriptions').countDocuments(),
      db.collection('inquiries').findOne({}, { sort: { createdAt: -1 } }),
      db.collection('subscriptions').findOne({}, { sort: { subscribedAt: -1 } })
    ]);
    
    res.json({
      status: 'Database connected successfully',
      stats: {
        totalInquiries: inquiriesCount,
        totalSubscriptions: subscriptionsCount
      },
      latest: {
        inquiry: latestInquiry,
        subscription: latestSubscription
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database connection failed',
      details: error.message
    });
  }
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);
