import clientPromise from './mongodb'
import { InquiryForm, EmailSubscription } from './models'

export class DatabaseService {
  private static async getDatabase() {
    const client = await clientPromise
    return client.db('canosolutions')
  }

  static async createInquiry(data: Omit<InquiryForm, '_id' | 'createdAt' | 'status'>) {
    const db = await this.getDatabase()
    const collection = db.collection<InquiryForm>('inquiries')
    
    const inquiry: InquiryForm = {
      ...data,
      createdAt: new Date(),
      status: 'new'
    }
    
    return await collection.insertOne(inquiry)
  }

  static async getInquiries(limit?: number) {
    const db = await this.getDatabase()
    const collection = db.collection<InquiryForm>('inquiries')
    
    const query = collection.find({}).sort({ createdAt: -1 })
    return limit ? await query.limit(limit).toArray() : await query.toArray()
  }

  static async createSubscription(email: string) {
    const db = await this.getDatabase()
    const collection = db.collection<EmailSubscription>('subscriptions')
    
    // Check if email already exists
    const existing = await collection.findOne({ email })
    if (existing) {
      throw new Error('Email already subscribed')
    }
    
    const subscription: EmailSubscription = {
      email,
      subscribedAt: new Date(),
      status: 'active'
    }
    
    return await collection.insertOne(subscription)
  }

  static async getSubscriptions(limit?: number) {
    const db = await this.getDatabase()
    const collection = db.collection<EmailSubscription>('subscriptions')
    
    const query = collection.find({}).sort({ subscribedAt: -1 })
    return limit ? await query.limit(limit).toArray() : await query.toArray()
  }

  static async getStats() {
    const db = await this.getDatabase()
    
    const [inquiriesCount, subscriptionsCount, recentInquiries] = await Promise.all([
      db.collection('inquiries').countDocuments(),
      db.collection('subscriptions').countDocuments(),
      db.collection('inquiries').find({}).sort({ createdAt: -1 }).limit(5).toArray()
    ])
    
    return {
      totalInquiries: inquiriesCount,
      totalSubscriptions: subscriptionsCount,
      newInquiries: recentInquiries.filter(i => i.status === 'new').length,
      recentInquiries
    }
  }
}