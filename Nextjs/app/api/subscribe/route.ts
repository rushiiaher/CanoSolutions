import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

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
  }
}

export async function GET() {
  try {
    const db = await getDatabase();

    const subscriptions = await db.collection('subscriptions')
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}