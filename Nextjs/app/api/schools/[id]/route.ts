import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, isValidObjectId, toObjectId } from '@/lib/db-utils'
import { School } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth(request, ['super_admin', 'admin', 'school_admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { id } = params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid school ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const school = await db.collection('schools').findOne({ _id: toObjectId(id) })

    if (!school) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: school
    })

  } catch (error) {
    console.error('School fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch school' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { id } = params
    const updateData = await request.json()

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid school ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if school exists
    const existingSchool = await db.collection('schools').findOne({ _id: toObjectId(id) })
    if (!existingSchool) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    // If code is being updated, check for duplicates
    if (updateData.code && updateData.code !== existingSchool.code) {
      const duplicateSchool = await db.collection('schools').findOne({ 
        code: updateData.code,
        _id: { $ne: toObjectId(id) }
      })
      if (duplicateSchool) {
        return NextResponse.json(
          { success: false, message: 'School code already exists' },
          { status: 400 }
        )
      }
    }

    const result = await db.collection('schools').updateOne(
      { _id: toObjectId(id) },
      { 
        $set: {
          ...updateData,
          updated_at: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'School updated successfully'
    })

  } catch (error) {
    console.error('School update error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update school' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth(request, ['super_admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { id } = params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid school ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if school has assets or tickets
    const [assetsCount, ticketsCount] = await Promise.all([
      db.collection('assets').countDocuments({ school_id: id }),
      db.collection('tickets').countDocuments({ school_id: id })
    ])

    if (assetsCount > 0 || ticketsCount > 0) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete school with existing assets or tickets' },
        { status: 400 }
      )
    }

    const result = await db.collection('schools').deleteOne({ _id: toObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'School deleted successfully'
    })

  } catch (error) {
    console.error('School deletion error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete school' },
      { status: 500 }
    )
  }
}