import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import clientPromise from './mongodb'
import { User } from './models'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function getAuthUser(request: NextRequest): Promise<User | null> {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.cookies.get('auth-token')?.value

    if (!token) return null

    const decoded = verifyToken(token)
    if (!decoded) return null

    const client = await clientPromise
    const db = client.db('canosolutions')
    
    const { ObjectId } = require('mongodb')
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { password_hash: 0 } }
    )

    return user as User | null
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  const roleHierarchy = {
    'super_admin': 5,
    'admin': 4,
    'school_admin': 3,
    'technician': 2,
    'school_user': 1,
    'vendor': 1
  }

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
  return requiredRoles.some(role => 
    userLevel >= (roleHierarchy[role as keyof typeof roleHierarchy] || 0)
  )
}

export async function requireAuth(request: NextRequest, requiredRoles: string[] = []) {
  const user = await getAuthUser(request)
  
  if (!user) {
    return { error: 'Unauthorized', status: 401 }
  }

  if (requiredRoles.length > 0 && !hasPermission(user.role, requiredRoles)) {
    return { error: 'Forbidden', status: 403 }
  }

  return { user }
}