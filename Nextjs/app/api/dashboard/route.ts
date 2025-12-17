import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'
import { DashboardStats } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const db = await getDatabase()
    
    // Get basic counts
    const [
      totalSchools,
      activeTickets,
      pendingAssignments,
      assetsUnderWarranty
    ] = await Promise.all([
      db.collection('schools').countDocuments({ status: 'active' }),
      db.collection('tickets').countDocuments({ status: { $in: ['new', 'assigned', 'in_progress'] } }),
      db.collection('tickets').countDocuments({ status: 'new' }),
      db.collection('assets').countDocuments({
        'warranty.end_date': { $gte: new Date() },
        status: 'in_service'
      })
    ])

    // Calculate SLA compliance rate
    const totalResolvedTickets = await db.collection('tickets').countDocuments({ 
      status: { $in: ['resolved', 'closed'] } 
    })
    const slaCompliantTickets = await db.collection('tickets').countDocuments({
      status: { $in: ['resolved', 'closed'] },
      'sla.resolution_met': true
    })
    const slaComplianceRate = totalResolvedTickets > 0 ? 
      Math.round((slaCompliantTickets / totalResolvedTickets) * 100) : 100

    // Get monthly ticket trend (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    const monthlyTrend = await db.collection('tickets').aggregate([
      {
        $match: {
          created_at: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$created_at' },
            month: { $month: '$created_at' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]).toArray()

    const monthlyTicketTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }))

    // Get top failing equipment
    const topFailingEquipment = await db.collection('tickets').aggregate([
      {
        $lookup: {
          from: 'assets',
          localField: 'asset_id',
          foreignField: '_id',
          as: 'asset'
        }
      },
      {
        $unwind: { path: '$asset', preserveNullAndEmptyArrays: true }
      },
      {
        $group: {
          _id: '$asset.category',
          count: { $sum: 1 }
        }
      },
      {
        $match: { _id: { $ne: null } }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]).toArray()

    const topFailingEquipmentFormatted = topFailingEquipment.map(item => ({
      category: item._id || 'Unknown',
      count: item.count
    }))

    // Get vendor performance (placeholder - would need vendor data)
    const vendorPerformance = [
      { vendor: 'TechCorp', score: 95 },
      { vendor: 'ServicePro', score: 88 },
      { vendor: 'QuickFix', score: 92 }
    ]

    // Get recent tickets for dashboard
    const recentTickets = await db.collection('tickets').aggregate([
      {
        $lookup: {
          from: 'schools',
          localField: 'school_id',
          foreignField: '_id',
          as: 'school'
        }
      },
      {
        $unwind: '$school'
      },
      {
        $sort: { created_at: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          ticket_number: 1,
          title: 1,
          priority: 1,
          status: 1,
          created_at: 1,
          'school.name': 1
        }
      }
    ]).toArray()

    const stats: DashboardStats = {
      total_schools: totalSchools,
      active_tickets: activeTickets,
      pending_assignments: pendingAssignments,
      sla_compliance_rate: slaComplianceRate,
      assets_under_warranty: assetsUnderWarranty,
      monthly_ticket_trend: monthlyTicketTrend,
      top_failing_equipment: topFailingEquipmentFormatted,
      vendor_performance: vendorPerformance
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recent_tickets: recentTickets
      }
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}