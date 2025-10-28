export interface InquiryForm {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  createdAt: Date
  status: 'new' | 'contacted' | 'closed'
}

export interface EmailSubscription {
  _id?: string
  email: string
  subscribedAt: Date
  status: 'active' | 'unsubscribed'
}

export interface AdminUser {
  _id?: string
  email: string
  password: string
  role: 'admin' | 'super_admin'
  createdAt: Date
}