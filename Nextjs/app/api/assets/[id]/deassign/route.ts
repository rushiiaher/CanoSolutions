import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, toObjectId } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const db = await getDatabase()

    const asset = await db.collection('assets').findOne({ _id: toObjectId(params.id) })
    if (!asset) {
      return NextResponse.json(
        { success: false, message: 'Asset not found' },
        { status: 404 }
      )
    }

    await db.collection('assets').deleteOne({ _id: toObjectId(params.id) })

    await db.collection('products').updateOne(
      { _id: toObjectId(asset.product_id) },
      {
        $set: {
          status: 'available',
          updated_at: new Date()
        }
      }
    )

    return NextResponse.json({
      success: true,
      message: 'Product deassigned successfully'
    })

  } catch (error) {
    console.error('Deassign asset error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to deassign product' },
      { status: 500 }
    )
  }
}