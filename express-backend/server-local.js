const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// In-memory storage (for testing without MongoDB)
let inquiries = [];
let subscriptions = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: { connected: false, type: 'in-memory' },
    stats: {
      totalInquiries: inquiries.length,
      totalSubscriptions: subscriptions.length
    }
  });
});

// Inquiry endpoints
app.post('/api/inquiry', (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        error: 'All required fields must be filled'
      });
    }

    const inquiry = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      company: company || '',
      message,
      createdAt: new Date(),
      status: 'new'
    };

    inquiries.push(inquiry);

    res.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: inquiry._id
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({
      error: 'Failed to submit inquiry'
    });
  }
});

app.get('/api/inquiry', (req, res) => {
  res.json(inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// Subscription endpoints
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Valid email is required'
      });
    }

    // Check if email already exists
    const existing = subscriptions.find(sub => sub.email === email);
    if (existing) {
      return res.status(400).json({
        error: 'Email already subscribed'
      });
    }

    const subscription = {
      _id: Date.now().toString(),
      email,
      subscribedAt: new Date(),
      status: 'active'
    };

    subscriptions.push(subscription);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: subscription._id
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({
      error: 'Failed to subscribe'
    });
  }
});

app.get('/api/subscribe', (req, res) => {
  res.json(subscriptions.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('⚠️  Using in-memory storage (data will be lost on restart)');
});