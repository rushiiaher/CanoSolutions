import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Populate school details for school_admin
    let schools = user.schools || []
    if (user.role === 'school_admin' && schools.length > 0) {
      const clientPromise = (await import('@/lib/mongodb')).default
      const client = await clientPromise
      const db = client.db('canosolutions')
      const { ObjectId } = require('mongodb')
      
      const schoolDetails = await db.collection('schools')
        .find({ _id: { $in: schools.map((id: any) => new ObjectId(id)) } })
        .toArray()
      
      schools = schoolDetails.map(s => ({
        _id: s._id.toString(),
        name: s.name,
        code: s.code
      }))
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schools: schools,
        assigned_schools: user.assigned_schools
      }
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication check failed' },
      { status: 500 }
    )
  }
}