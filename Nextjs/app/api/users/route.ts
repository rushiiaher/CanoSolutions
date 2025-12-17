import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, hashPassword } from '@/lib/auth'
import { getDatabase, paginate } from '@/lib/db-utils'
import { User } from '@/lib/models'

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
    const role = searchParams.get('role') || ''

    const db = await getDatabase()
    
    const filter: any = {}
    if (role) filter.role = role

    const result = await paginate<User>(
      db.collection('users'),
      filter,
      page,
      limit,
      { created_at: -1 }
    )

    // Remove password hashes from response
    result.data = result.data.map(user => {
      const { password_hash, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
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
    const userData = await request.json()
    
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if email already exists
    const existingUser = await db.collection('users').findOne({ email: userData.email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const password_hash = await hashPassword(userData.password)

    const user: User = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password_hash,
      role: userData.role,
      schools: userData.schools || [],
      assigned_schools: userData.assigned_schools || [],
      status: userData.status || 'active',
      login_count: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    const result = await db.collection('users').insertOne(user)

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: { id: result.insertedId }
    })

  } catch (error) {
    console.error('User creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    )
  }
}