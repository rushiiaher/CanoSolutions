import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, paginate, toObjectId } from '@/lib/db-utils'
import { Asset } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin', 'school_admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const school_id = searchParams.get('school_id') || ''

    const db = await getDatabase()
    
    // Build filter
    const filter: any = {}
    if (school_id) filter.school_id = school_id

    // For school admins, filter by their assigned schools
    if (authResult.user.role === 'school_admin' && authResult.user.schools) {
      filter.school_id = { $in: authResult.user.schools }
    }

    const result = await paginate<Asset>(
      db.collection('assets'),
      filter,
      page,
      limit,
      { assigned_date: -1 }
    )

    // Populate product and school information
    for (const asset of result.data) {
      const [product, school] = await Promise.all([
        db.collection('products').findOne(
          { _id: toObjectId(asset.product_id) },
          { projection: { name: 1, category: 1, product_code: 1, brand: 1, model: 1 } }
        ),
        db.collection('schools').findOne(
          { _id: toObjectId(asset.school_id) },
          { projection: { name: 1, code: 1 } }
        )
      ])
      
      if (product) asset.product = product
      if (school) asset.school = { name: school.name, code: school.code }
    }

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Assets fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch assets' },
      { status: 500 }
    )
  }
}