import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db('canosolutions');

    const existing = await db.collection('subscriptions').findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const subscription = {
      email,
      subscribedAt: new Date(),
      status: 'active'
    };

    const result = await db.collection('subscriptions').insertOne(subscription);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db('canosolutions');
    
    const subscriptions = await db.collection('subscriptions')
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray();

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}