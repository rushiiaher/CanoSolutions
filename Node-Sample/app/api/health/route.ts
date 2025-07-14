import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Test database connection
    const client = await clientPromise
    const db = client.db('canosolutions')
    await db.admin().ping()
    
    // Get database stats
    const inquiriesCount = await db.collection('inquiries').countDocuments()
    const subscriptionsCount = await db.collection('subscriptions').countDocuments()
    
    const stats = {
      totalInquiries: inquiriesCount,
      totalSubscriptions: subscriptionsCount
    }
    
    const responseTime = Date.now() - startTime
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        responseTime: `${responseTime}ms`
      },
      stats,
      endpoints: {
        inquiry: '/api/inquiry',
        subscribe: '/api/subscribe',
        admin: '/admin/dashboard'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}