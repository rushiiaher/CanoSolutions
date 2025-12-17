import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, paginate, generateSchoolCode } from '@/lib/db-utils'
import { School } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const region = searchParams.get('region') || ''
    const status = searchParams.get('status') || ''

    const db = await getDatabase()
    
    // Build filter
    const filter: any = {}
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ]
    }
    if (region) filter.region = region
    if (status) filter.status = status

    const result = await paginate<School>(
      db.collection('schools'),
      filter,
      page,
      limit
    )

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Schools fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const schoolData = await request.json()
    console.log('Received school data:', schoolData)
    
    // Validate required fields
    if (!schoolData.name || !schoolData.address || !schoolData.contact) {
      console.log('Validation failed:', { 
        name: !!schoolData.name, 
        address: !!schoolData.address, 
        contact: !!schoolData.contact 
      })
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, address, and contact are required' },
        { status: 400 }
      )
    }

    // Validate nested required fields
    if (!schoolData.address.street || !schoolData.address.city || !schoolData.address.state || !schoolData.address.pincode) {
      return NextResponse.json(
        { success: false, message: 'Missing required address fields' },
        { status: 400 }
      )
    }

    if (!schoolData.contact.name || !schoolData.contact.phone || !schoolData.contact.email) {
      return NextResponse.json(
        { success: false, message: 'Missing required contact fields' },
        { status: 400 }
      )
    }

    if (!schoolData.region) {
      return NextResponse.json(
        { success: false, message: 'Region is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Generate school code if not provided
    if (!schoolData.code) {
      schoolData.code = generateSchoolCode(schoolData.name)
    }

    // Check if code already exists
    const existingSchool = await db.collection('schools').findOne({ code: schoolData.code })
    if (existingSchool) {
      return NextResponse.json(
        { success: false, message: 'School code already exists' },
        { status: 400 }
      )
    }

    const school: School = {
      ...schoolData,
      assets_count: 0,
      active_tickets: 0,
      status: schoolData.status || 'active',
      created_at: new Date(),
      updated_at: new Date()
    }

    console.log('Creating school:', school)
    const result = await db.collection('schools').insertOne(school)
    console.log('School created with ID:', result.insertedId)

    return NextResponse.json({
      success: true,
      message: 'School created successfully',
      data: { id: result.insertedId, ...school }
    })

  } catch (error) {
    console.error('School creation error:', error)
    return NextResponse.json(
      { success: false, message: `Failed to create school: ${error.message}` },
      { status: 500 }
    )
  }
}