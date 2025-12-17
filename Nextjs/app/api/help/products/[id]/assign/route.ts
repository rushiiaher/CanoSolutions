import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { school_id } = body

    if (!school_id) {
      return NextResponse.json(
        { success: false, message: 'School ID is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const { ObjectId } = require('mongodb')

    // Check if product exists
    const product = await db.collection('products').findOne({
      _id: new ObjectId(params.id)
    })

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if school exists
    const school = await db.collection('schools').findOne({
      _id: new ObjectId(school_id)
    })

    if (!school) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    // Update product with school assignment
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: {
          school_id: new ObjectId(school_id),
          assigned_date: new Date(),
          status: 'assigned',
          updated_at: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to assign product' },
        { status: 500 }
      )
    }

    console.log('Product assigned:', { product_id: params.id, school_id: school_id, result: result.modifiedCount })

    return NextResponse.json({
      success: true,
      message: `Product assigned to ${school.name} successfully`
    })

  } catch (error) {
    console.error('Assign product error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to assign product' },
      { status: 500 }
    )
  }
}