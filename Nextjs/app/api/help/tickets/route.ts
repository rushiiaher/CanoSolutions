import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user || !['school_admin', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { school_id, asset_id, category, title, description, contact_person, contact_phone } = body

    if (!school_id || !category || !title || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify user has access to this school
    let hasAccess = false
    if (user.role === 'school_admin') {
      const schoolIds = user.schools?.map((school: any) => 
        typeof school === 'string' ? school : school._id
      ) || []
      hasAccess = schoolIds.includes(school_id)
    } else if (user.role === 'admin') {
      hasAccess = true // Admin has access to all schools
    }

    console.log('Access check:', { role: user.role, school_id, hasAccess, userSchools: user.schools })

    if (!hasAccess) {
      return NextResponse.json(
        { success: false, message: 'Access denied to this school' },
        { status: 403 }
      )
    }

    const db = await getDatabase()
    
    // Generate ticket number
    const ticketCount = await db.collection('tickets').countDocuments()
    const ticketNumber = `TKT-${String(ticketCount + 1).padStart(6, '0')}`

    // Calculate SLA deadlines (standard 24 hours)
    const now = new Date()
    const responseDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    const resolutionDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000)

    const ticketData = {
      ticket_number: ticketNumber,
      school_id,
      asset_id: asset_id || null,
      title,
      description,
      category,
      status: 'new',
      raised_by: user._id,
      contact_person,
      contact_phone,
      sla: {
        response_deadline: responseDeadline,
        resolution_deadline: resolutionDeadline,
        response_met: false,
        resolution_met: false
      },
      created_at: now,
      updated_at: now
    }

    const result = await db.collection('tickets').insertOne(ticketData)

    return NextResponse.json({
      success: true,
      message: 'Ticket created successfully',
      ticket_number: ticketNumber,
      ticket_id: result.insertedId
    })

  } catch (error) {
    console.error('Create ticket error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create ticket' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user || !['school_admin', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    
    // Build query based on user role
    let query: any = {}
    
    if (user.role === 'school_admin') {
      const schoolIds = user.schools?.map((school: any) => 
        typeof school === 'string' ? school : school._id
      ) || []
      query.school_id = { $in: schoolIds }
    } else if (user.role === 'admin') {
      const schoolIds = user.assigned_schools || []
      if (schoolIds.length > 0) {
        query.school_id = { $in: schoolIds }
      }
    }

    const tickets = await db.collection('tickets')
      .find(query)
      .sort({ created_at: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: tickets
    })

  } catch (error) {
    console.error('Get tickets error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}