import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();

    await db.admin().ping();
    const stats = await Promise.all([
      db.collection('inquiries').countDocuments(),
      db.collection('subscriptions').countDocuments()
    ]);

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: { connected: true },
      stats: {
        totalInquiries: stats[0],
        totalSubscriptions: stats[1]
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}