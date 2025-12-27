import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const result = await db.collection('tickets').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          updated_at: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Ticket status updated successfully'
    })

  } catch (error) {
    console.error('Update ticket error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update ticket' },
      { status: 500 }
    )
  }
}
