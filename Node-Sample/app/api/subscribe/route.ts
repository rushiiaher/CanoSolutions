import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { EmailSubscription } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('canosolutions')
    const collection = db.collection<EmailSubscription>('subscriptions')

    // Check if email already exists
    const existing = await collection.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    const subscription: EmailSubscription = {
      email,
      subscribedAt: new Date(),
      status: 'active'
    }

    const result = await collection.insertOne(subscription)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: result.insertedId
    })
  } catch (error) {
    console.error('Error saving subscription:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('canosolutions')
    const collection = db.collection<EmailSubscription>('subscriptions')

    const subscriptions = await collection
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray()

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}