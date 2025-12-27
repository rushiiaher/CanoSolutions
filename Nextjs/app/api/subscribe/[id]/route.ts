import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();

    const result = await db.collection('subscriptions').deleteOne({
      _id: new ObjectId(params.id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete subscription' },
      { status: 500 }
    );
  }
}
