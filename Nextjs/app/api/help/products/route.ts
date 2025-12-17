import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { getDatabase } from '@/lib/db-utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user || !['super_admin', 'admin', 'school_admin'].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    const { ObjectId } = require('mongodb')
    
    // Build query based on user role
    let query: any = {}
    
    if (user.role === 'school_admin') {
      // School admin can only see assets from their assigned school
      const schoolIds = user.schools || []
      if (schoolIds.length > 0) {
        query.school_id = { $in: schoolIds }
      } else {
        query.school_id = 'no_school_assigned'
      }
    } else if (user.role === 'admin') {
      // Regional admin can see assets from their assigned schools
      const schoolIds = user.assigned_schools || []
      if (schoolIds.length > 0) {
        query.school_id = { $in: schoolIds }
      }
    }
    // Super admin sees all products (no query filter)

    console.log('=== DEBUG INFO ===')
    console.log('User role:', user.role)
    console.log('User schools:', user.schools)
    console.log('User assigned_schools:', user.assigned_schools)
    console.log('Query:', JSON.stringify(query, null, 2))
    
    // Check if any assets exist
    const totalAssets = await db.collection('assets').countDocuments()
    console.log('Total assets in DB:', totalAssets)

    const products = await db.collection('assets')
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'products',
            let: { productId: '$product_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ['$_id', { $toObjectId: '$$productId' }] },
                      { $eq: [{ $toString: '$_id' }, '$$productId'] }
                    ]
                  }
                }
              }
            ],
            as: 'product'
          }
        },
        {
          $lookup: {
            from: 'schools',
            let: { schoolId: '$school_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ['$_id', { $toObjectId: '$$schoolId' }] },
                      { $eq: [{ $toString: '$_id' }, '$$schoolId'] }
                    ]
                  }
                }
              }
            ],
            as: 'school'
          }
        },
        {
          $addFields: {
            name: { $arrayElemAt: ['$product.name', 0] },
            category: { $arrayElemAt: ['$product.category', 0] },
            manufacturer: { $arrayElemAt: ['$product.brand', 0] },
            model: { $arrayElemAt: ['$product.model', 0] },
            serial_number: { $arrayElemAt: ['$product.product_code', 0] },
            purchase_date: { $arrayElemAt: ['$product.purchase_date', 0] },
            warranty_expiry: { $arrayElemAt: ['$product.warranty_expiry_date', 0] },
            school_name: { $arrayElemAt: ['$school.name', 0] },
            assigned_date: '$assigned_date',
            created_at: '$created_at'
          }
        },
        {
          $project: {
            product: 0,
            school: 0
          }
        },
        { $sort: { assigned_date: -1 } }
      ])
      .toArray()

    console.log('Found products after query:', products.length)
    if (products.length > 0) {
      console.log('Sample product:', JSON.stringify(products[0], null, 2))
    }
    console.log('==================')

    return NextResponse.json({
      success: true,
      data: products
    })

  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      category,
      manufacturer,
      model,
      serial_number,
      purchase_date,
      warranty_expiry,
      status = 'available',
      condition,
      location
    } = body

    if (!name || !category || !manufacturer || !model || !serial_number || !location) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    // Check if serial number already exists
    const existingProduct = await db.collection('products').findOne({
      serial_number: serial_number
    })

    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product with this serial number already exists' },
        { status: 400 }
      )
    }

    const product = {
      name,
      category,
      manufacturer,
      model,
      serial_number,
      purchase_date: new Date(purchase_date),
      warranty_expiry: warranty_expiry ? new Date(warranty_expiry) : null,
      status,
      condition,
      location,
      school_id: null,
      assigned_date: null,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: user._id
    }

    const result = await db.collection('products').insertOne(product)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...product }
    })

  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    )
  }
}