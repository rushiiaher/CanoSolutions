import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getDatabase, paginate, generateAssetCode } from '@/lib/db-utils'
import { Product } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, ['super_admin', 'admin'])
  if ('error' in authResult) {
    return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const db = await getDatabase()
    
    const result = await paginate<Product>(
      db.collection('products'),
      {},
      page,
      limit,
      { created_at: -1 }
    )

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
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
    const productData = await request.json()
    
    if (!productData.name || !productData.category || !productData.purchase_date || !productData.warranty_expiry_date) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    const product: Product = {
      product_code: generateAssetCode(productData.category),
      name: productData.name,
      category: productData.category,
      model: productData.model || undefined,
      brand: productData.brand || undefined,
      purchase_date: new Date(productData.purchase_date),
      warranty_expiry_date: new Date(productData.warranty_expiry_date),
      purchase_price: productData.purchase_price ? parseFloat(productData.purchase_price) : undefined,
      status: 'available',
      created_at: new Date(),
      updated_at: new Date()
    }

    const result = await db.collection('products').insertOne(product)

    return NextResponse.json({
      success: true,
      message: 'Product added successfully',
      data: { id: result.insertedId, ...product }
    })

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to add product' },
      { status: 500 }
    )
  }
}