const { MongoClient } = require('mongodb');

// This script should be run to set up indexes for performance
// Usage: MONGODB_URI="your_connection_string" node scripts/create-indexes.js

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Cano:ChhxF5kcjmvXblVK@cluster0.ze01tlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'canosolutions';

async function createIndexes() {
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is not defined. Please set it as an environment variable.');
        process.exit(1);
    }

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log(`Connected to MongoDB`);

        const db = client.db(DB_NAME);

        // Users
        console.log('Creating Uses indexes...');
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        await db.collection('users').createIndex({ role: 1, status: 1 });

        // Schools
        console.log('Creating Schools indexes...');
        await db.collection('schools').createIndex({ code: 1 }, { unique: true });
        await db.collection('schools').createIndex({ region: 1, status: 1 });

        // Assets
        console.log('Creating Assets indexes...');
        await db.collection('assets').createIndex({ school_id: 1, status: 1 });
        await db.collection('assets').createIndex({ asset_code: 1 }, { unique: true });
        await db.collection('assets').createIndex({ 'warranty.end_date': 1 });

        // Tickets
        console.log('Creating Tickets indexes...');
        await db.collection('tickets').createIndex({ ticket_number: 1 }, { unique: true });
        await db.collection('tickets').createIndex({ school_id: 1, status: 1, created_at: -1 });
        await db.collection('tickets').createIndex({ assigned_to: 1, status: 1 });
        await db.collection('tickets').createIndex({ status: 1, priority: 1, created_at: -1 });

        // Inquiries
        console.log('Creating Inquiries indexes...');
        await db.collection('inquiries').createIndex({ email: 1 }, { unique: true }); // Removed createdAt: -1 to simplify, assuming simple unique check is primary
        // Re-adding compound if needed. specific code in db-utils was: 
        // await db.collection('inquiries').createIndex({ email: 1, createdAt: -1 })
        // The previous line I wrote above was { email: 1 } only. Let me correct it to match db-utils exactly.
        await db.collection('inquiries').dropIndex({ email: 1 }).catch(() => { }); // Drop if exists simple
        await db.collection('inquiries').createIndex({ email: 1, createdAt: -1 });
        await db.collection('inquiries').createIndex({ status: 1, createdAt: -1 });

        // Subscriptions
        console.log('Creating Subscriptions indexes...');
        await db.collection('subscriptions').createIndex({ email: 1 }, { unique: true });
        await db.collection('subscriptions').createIndex({ status: 1, subscribedAt: -1 });

        console.log('✅ All database indexes created successfully');

    } catch (error) {
        console.error('❌ Index creation error:', error);
    } finally {
        await client.close();
    }
}

createIndexes();
