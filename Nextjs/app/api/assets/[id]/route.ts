import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, toObjectId } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const body = await request.json()
    const { status, condition, location } = body

    const db = await getDatabase()
    
    const result = await db.collection('assets').updateOne(
      { _id: toObjectId(params.id) },
      { 
        $set: {
          status,
          condition,
          location,
          updated_at: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Asset not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Asset updated successfully'
    })

  } catch (error) {
    console.error('Update asset error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update asset' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requireAuth(request, ['super_admin'])
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
      message: 'Asset deleted successfully'
    })

  } catch (error) {
    console.error('Delete asset error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete asset' },
      { status: 500 }
    )
  }
}