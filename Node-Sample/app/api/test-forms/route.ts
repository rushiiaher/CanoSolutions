import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db('canosolutions')
    
    // Test inquiry insertion
    const testInquiry = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      company: 'Test Company',
      message: 'This is a test inquiry',
      createdAt: new Date(),
      status: 'new'
    }
    
    const inquiryResult = await db.collection('inquiries').insertOne(testInquiry)
    
    // Test subscription insertion
    const testSubscription = {
      email: 'test-subscriber@example.com',
      subscribedAt: new Date(),
      status: 'active'
    }
    
    const subscriptionResult = await db.collection('subscriptions').insertOne(testSubscription)
    
    return NextResponse.json({
      message: 'Test data inserted successfully',
      inquiryId: inquiryResult.insertedId,
      subscriptionId: subscriptionResult.insertedId
    })
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      { error: 'Test failed', details: error },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('canosolutions')
    
    const inquiriesCount = await db.collection('inquiries').countDocuments()
    const subscriptionsCount = await db.collection('subscriptions').countDocuments()
    
    const latestInquiry = await db.collection('inquiries').findOne({}, { sort: { createdAt: -1 } })
    const latestSubscription = await db.collection('subscriptions').findOne({}, { sort: { subscribedAt: -1 } })
    
    return NextResponse.json({
      status: 'Database connected successfully',
      stats: {
        totalInquiries: inquiriesCount,
        totalSubscriptions: subscriptionsCount
      },
      latest: {
        inquiry: latestInquiry,
        subscription: latestSubscription
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Database connection failed', details: error },
      { status: 500 }
    )
  }
}