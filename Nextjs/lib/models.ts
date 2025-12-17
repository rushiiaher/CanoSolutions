// Existing interfaces
export interface InquiryForm {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  createdAt: Date
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  assigned_to?: string
  notes?: Array<{
    text: string
    added_by: string
    added_at: Date
  }>
  follow_up_date?: Date
  tags?: string[]
  source?: string
  ip_address?: string
  user_agent?: string
}

export interface EmailSubscription {
  _id?: string
  email: string
  name?: string
  subscribedAt: Date
  unsubscribedAt?: Date
  status: 'active' | 'unsubscribed' | 'bounced'
  source?: string
  tags?: string[]
  preferences?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    topics: string[]
  }
  engagement?: {
    emails_sent: number
    emails_opened: number
    links_clicked: number
    last_opened?: Date
  }
  ip_address?: string
  user_agent?: string
}

// LMS System interfaces
export interface User {
  _id?: string
  name: string
  email: string
  phone?: string
  password_hash: string
  role: 'super_admin' | 'admin' | 'school_admin' | 'school_user' | 'technician' | 'vendor'
  schools?: string[] // Array of school IDs this user can access
  assigned_schools?: string[] // For regional admins managing multiple schools
  permissions?: string[]
  profile_image?: string
  status: 'active' | 'inactive' | 'suspended'
  last_login?: Date
  login_count?: number
  created_at: Date
  updated_at: Date
}

export interface School {
  _id?: string
  name: string
  code: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  region: string
  contact: {
    name: string
    phone: string
    email: string
    designation: string
  }
  tender_id?: string
  assets_count: number
  active_tickets: number
  tags?: string[]
  status: 'active' | 'inactive' | 'under_maintenance'
  created_at: Date
  updated_at: Date
}

export interface Product {
  _id?: string
  product_code: string
  name: string
  category: string
  model?: string
  brand?: string
  specifications?: string
  purchase_date: Date
  warranty_expiry_date: Date
  purchase_price?: number
  status: 'available' | 'assigned' | 'retired'
  created_at: Date
  updated_at: Date
}

export interface Asset {
  _id?: string
  product_id: string
  school_id: string
  asset_code: string
  assigned_date: Date
  status: 'in_service' | 'under_repair' | 'retired' | 'lost'
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  location?: string
  maintenance_history?: Array<{
    date: Date
    type: string
    description: string
    cost?: number
    performed_by: string
  }>
  created_at: Date
  updated_at: Date
  product?: Product
  school?: { name: string; code: string }
}

export interface Ticket {
  _id?: string
  ticket_number: string
  school_id: string
  asset_id?: string
  title: string
  description: string
  category: 'hardware' | 'software' | 'network' | 'facility' | 'other'
  priority: 'P1' | 'P2' | 'P3' | 'P4'
  status: 'new' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'reopened'
  raised_by: string
  assigned_to?: string
  assignment_history?: Array<{
    assigned_to: string
    assigned_by: string
    assigned_at: Date
    notes?: string
  }>
  warranty_status?: 'in_warranty' | 'out_of_warranty' | 'extended'
  sla?: {
    response_deadline: Date
    resolution_deadline: Date
    response_met?: boolean
    resolution_met?: boolean
    breach_reason?: string
  }
  timeline?: Array<{
    timestamp: Date
    action: string
    performed_by: string
    details?: string
  }>
  attachments?: Array<{
    url: string
    filename: string
    uploaded_by: string
    uploaded_at: Date
  }>
  resolution?: {
    notes: string
    resolved_by: string
    resolved_at: Date
    parts_used?: string[]
    labor_hours?: number
    cost?: number
  }
  feedback?: {
    rating: number
    comments?: string
    provided_by: string
    provided_at: Date
  }
  tags?: string[]
  created_at: Date
  updated_at: Date
  closed_at?: Date
}

export interface Vendor {
  _id?: string
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  services: string[]
  status: 'active' | 'inactive'
  rating?: number
  created_at: Date
  updated_at: Date
}

export interface Notification {
  _id?: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  created_at: Date
}

export interface DashboardStats {
  total_schools: number
  active_tickets: number
  pending_assignments: number
  sla_compliance_rate: number
  assets_under_warranty: number
  monthly_ticket_trend: Array<{
    month: string
    count: number
  }>
  top_failing_equipment: Array<{
    category: string
    count: number
  }>
  vendor_performance: Array<{
    vendor: string
    score: number
  }>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}