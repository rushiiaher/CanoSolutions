import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, paginate, generateTicketNumber, calculateSLA } from '@/lib/db-utils'
import { Ticket } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request)
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''
    const priority = searchParams.get('priority') || ''
    const school_id = searchParams.get('school_id') || ''
    const assigned_to = searchParams.get('assigned_to') || ''

    const db = await getDatabase()
    
    // Build filter based on user role
    const filter: any = {}
    if (authResult.user.role === 'school_admin' || authResult.user.role === 'school_user') {
      filter.school_id = { $in: authResult.user.schools || [] }
    }
    if (authResult.user.role === 'technician') {
      filter.assigned_to = authResult.user._id
    }
    
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (school_id) filter.school_id = school_id
    if (assigned_to) filter.assigned_to = assigned_to

    // Use aggregation to populate school details
    const skip = (page - 1) * limit
    const pipeline: any[] = [
      { $match: filter },
      {
        $addFields: {
          school_id_obj: { $toObjectId: '$school_id' },
          raised_by_obj: { $toObjectId: '$raised_by' }
        }
      },
      {
        $lookup: {
          from: 'schools',
          localField: 'school_id_obj',
          foreignField: '_id',
          as: 'school'
        }
      },
      { $unwind: { path: '$school', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'raised_by_obj',
          foreignField: '_id',
          as: 'raised_by_user'
        }
      },
      { $unwind: { path: '$raised_by_user', preserveNullAndEmptyArrays: true } },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: 'count' }]
        }
      }
    ]

    const result = await db.collection('tickets').aggregate(pipeline).toArray()
    const data = result[0]?.data || []
    const total = result[0]?.total[0]?.count || 0

    return NextResponse.json({
      success: true,
      data: {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Tickets fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request)
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const ticketData = await request.json()
    
    // Validate required fields
    if (!ticketData.title || !ticketData.description || !ticketData.school_id || !ticketData.category || !ticketData.priority) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Verify school exists
    const school = await db.collection('schools').findOne({ _id: ticketData.school_id })
    if (!school) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      )
    }

    const now = new Date()
    const sla = calculateSLA(ticketData.priority, now)
    
    const ticket: Ticket = {
      ticket_number: generateTicketNumber(),
      school_id: ticketData.school_id,
      asset_id: ticketData.asset_id,
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: 'new',
      raised_by: authResult.user._id!,
      sla,
      timeline: [{
        timestamp: now,
        action: 'Ticket Created',
        performed_by: authResult.user._id!,
        details: 'Ticket created by ' + authResult.user.name
      }],
      tags: ticketData.tags || [],
      created_at: now,
      updated_at: now
    }

    const result = await db.collection('tickets').insertOne(ticket)
    
    // Update school active tickets count
    await db.collection('schools').updateOne(
      { _id: ticketData.school_id },
      { $inc: { active_tickets: 1 } }
    )

    return NextResponse.json({
      success: true,
      message: 'Ticket created successfully',
      data: { id: result.insertedId, ...ticket }
    })

  } catch (error) {
    console.error('Ticket creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create ticket' },
      { status: 500 }
    )
  }
}