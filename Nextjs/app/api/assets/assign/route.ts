import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, generateAssetCode, toObjectId } from '@/lib/db-utils'
import { Asset } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const assignData = await request.json()
    
    if (!assignData.product_id || !assignData.school_id) {
      return NextResponse.json(
        { success: false, message: 'Product ID and School ID are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if product exists and is available
    const product = await db.collection('products').findOne({ _id: toObjectId(assignData.product_id) })
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.status !== 'available') {
      return NextResponse.json(
        { success: false, message: 'Product is not available for assignment' },
        { status: 400 }
      )
    }

    // Check if school exists
    const school = await db.collection('schools').findOne({ _id: toObjectId(assignData.school_id) })
    if (!school) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    // Create asset assignment
    const asset: Asset = {
      product_id: assignData.product_id,
      school_id: assignData.school_id,
      asset_code: generateAssetCode(product.category),
      assigned_date: new Date(),
      status: 'in_service',
      condition: assignData.condition || 'good',
      location: assignData.location || undefined,
      created_at: new Date(),
      updated_at: new Date()
    }

    // Start transaction
    const session = db.client.startSession()
    
    try {
      await session.withTransaction(async () => {
        // Insert asset
        await db.collection('assets').insertOne(asset, { session })
        
        // Update product status to assigned
        await db.collection('products').updateOne(
          { _id: toObjectId(assignData.product_id) },
          { 
            $set: { 
              status: 'assigned',
              updated_at: new Date()
            }
          },
          { session }
        )

        // Update school assets count
        await db.collection('schools').updateOne(
          { _id: toObjectId(assignData.school_id) },
          { 
            $inc: { assets_count: 1 },
            $set: { updated_at: new Date() }
          },
          { session }
        )
      })

      return NextResponse.json({
        success: true,
        message: 'Product assigned to school successfully',
        data: asset
      })

    } finally {
      await session.endSession()
    }

  } catch (error) {
    console.error('Asset assignment error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to assign product' },
      { status: 500 }
    )
  }
}