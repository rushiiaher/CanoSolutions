import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

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
    let ticketQuery: any = {}
    let schoolsManaged = 0
    
    if (user.role === 'school_admin') {
      // School admin can only see tickets from their schools
      const schoolIds = user.schools?.map((school: any) => school._id) || []
      ticketQuery.school_id = { $in: schoolIds }
      schoolsManaged = schoolIds.length
    } else if (user.role === 'admin') {
      // Regional admin can see tickets from assigned schools
      const schoolIds = user.assigned_schools || []
      if (schoolIds.length > 0) {
        ticketQuery.school_id = { $in: schoolIds }
      }
      schoolsManaged = schoolIds.length
    }

    // Get ticket statistics
    const [
      myTickets,
      openTickets,
      resolvedTickets,
      pendingResponse,
      recentTickets
    ] = await Promise.all([
      db.collection('tickets').countDocuments(ticketQuery),
      db.collection('tickets').countDocuments({
        ...ticketQuery,
        status: { $in: ['new', 'assigned', 'in_progress'] }
      }),
      db.collection('tickets').countDocuments({
        ...ticketQuery,
        status: 'resolved'
      }),
      db.collection('tickets').countDocuments({
        ...ticketQuery,
        status: 'new'
      }),
      db.collection('tickets')
        .find(ticketQuery)
        .sort({ created_at: -1 })
        .limit(5)
        .toArray()
    ])

    const dashboardData = {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        schools: user.schools,
        assigned_schools: user.assigned_schools
      },
      stats: {
        my_tickets: myTickets,
        open_tickets: openTickets,
        resolved_tickets: resolvedTickets,
        pending_response: pendingResponse,
        schools_managed: schoolsManaged
      },
      recent_tickets: recentTickets.map(ticket => ({
        ticket_number: ticket.ticket_number,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        created_at: ticket.created_at
      }))
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}