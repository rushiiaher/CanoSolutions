import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import { PaginatedResponse } from './models'

export async function getDatabase() {
  const client = await clientPromise
  return client.db('canosolutions')
}

export function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TKT${timestamp}${random}`
}

export function generateAssetCode(category: string): string {
  const categoryCode = category.substring(0, 3).toUpperCase()
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  return `${categoryCode}${timestamp}${random}`
}

export function generateSchoolCode(name: string): string {
  const nameCode = name.replace(/[^A-Za-z]/g, '').substring(0, 3).toUpperCase()
  const timestamp = Date.now().toString().slice(-4)
  return `SCH${nameCode}${timestamp}`
}

export async function paginate<T>(
  collection: any,
  filter: any = {},
  page: number = 1,
  limit: number = 10,
  sort: any = { created_at: -1 }
): Promise<PaginatedResponse<T>> {
  const skip = (page - 1) * limit
  
  const [data, total] = await Promise.all([
    collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
    collection.countDocuments(filter)
  ])

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }
}

export function calculateSLA(priority: string, createdAt: Date) {
  const slaHours = {
    'P1': { response: 4, resolution: 24 },
    'P2': { response: 8, resolution: 48 },
    'P3': { response: 24, resolution: 120 },
    'P4': { response: 48, resolution: 240 }
  }

  const sla = slaHours[priority as keyof typeof slaHours] || slaHours.P4
  
  return {
    response_deadline: new Date(createdAt.getTime() + sla.response * 60 * 60 * 1000),
    resolution_deadline: new Date(createdAt.getTime() + sla.resolution * 60 * 60 * 1000)
  }
}

export function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id)
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id)
}

export async function createIndexes() {
  const db = await getDatabase()
  
  // Users indexes
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  await db.collection('users').createIndex({ role: 1, status: 1 })

  // Schools indexes
  await db.collection('schools').createIndex({ code: 1 }, { unique: true })
  await db.collection('schools').createIndex({ region: 1, status: 1 })

  // Assets indexes
  await db.collection('assets').createIndex({ school_id: 1, status: 1 })
  await db.collection('assets').createIndex({ asset_code: 1 }, { unique: true })
  await db.collection('assets').createIndex({ 'warranty.end_date': 1 })

  // Tickets indexes
  await db.collection('tickets').createIndex({ ticket_number: 1 }, { unique: true })
  await db.collection('tickets').createIndex({ school_id: 1, status: 1, created_at: -1 })
  await db.collection('tickets').createIndex({ assigned_to: 1, status: 1 })
  await db.collection('tickets').createIndex({ status: 1, priority: 1, created_at: -1 })

  // Inquiries indexes
  await db.collection('inquiries').createIndex({ email: 1, createdAt: -1 })
  await db.collection('inquiries').createIndex({ status: 1, createdAt: -1 })

  // Subscriptions indexes
  await db.collection('subscriptions').createIndex({ email: 1 }, { unique: true })
  await db.collection('subscriptions').createIndex({ status: 1, subscribedAt: -1 })

  console.log('Database indexes created successfully')
}