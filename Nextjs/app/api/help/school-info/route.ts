import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, toObjectId } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, ['school_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const school_id = searchParams.get('school_id')

    if (!school_id) {
      return NextResponse.json(
        { success: false, message: 'School ID is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    const school = await db.collection('schools').findOne({ _id: toObjectId(school_id) })
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
    console.error('School info fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch school information' },
      { status: 500 }
    )
  }
}