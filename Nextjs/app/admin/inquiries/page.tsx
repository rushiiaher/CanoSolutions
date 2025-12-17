"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Mail, Phone, Building, Calendar, User, MessageSquare, Star, Filter, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Inquiry {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  createdAt: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  assigned_to?: string
  notes?: Array<{
    text: string
    added_by: string
    added_at: string
  }>
  follow_up_date?: string
  tags?: string[]
  source?: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [responseText, setResponseText] = useState("")

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiry')
      const result = await response.json()
      if (result.success) {
        setInquiries(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const response = await fetch(`/api/inquiry/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Status updated successfully')
        fetchInquiries()
      } else {
        toast.error(result.message || 'Failed to update status')
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return
    
    try {
      const response = await fetch(`/api/inquiry/${inquiryId}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Inquiry deleted successfully')
        fetchInquiries()
      } else {
        toast.error(result.message || 'Failed to delete inquiry')
      }
    } catch (error) {
      toast.error('Failed to delete inquiry')
    }
  }

  const addNote = async (inquiryId: string, noteText: string) => {
    try {
      const response = await fetch(`/api/inquiry/${inquiryId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Note added successfully')
        fetchInquiries()
        setResponseText("")
      } else {
        toast.error(result.message || 'Failed to add note')
      }
    } catch (error) {
      toast.error('Failed to add note')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-purple-100 text-purple-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || inquiry.status === statusFilter
    const matchesPriority = !priorityFilter || priorityFilter === 'all' || inquiry.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage inquiries from your website contact forms</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'new').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'contacted').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Phone className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'qualified').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Converted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'converted').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inquiries by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inquiries ({filteredInquiries.length})</CardTitle>
          <CardDescription>
            Manage and respond to website inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Details</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{inquiry.firstName} {inquiry.lastName}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{inquiry.email}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{inquiry.company || 'Not specified'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm max-w-xs truncate">{inquiry.message}</p>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={inquiry.status} 
                      onValueChange={(value) => updateInquiryStatus(inquiry._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {inquiry.priority && (
                      <Badge className={getPriorityColor(inquiry.priority)}>
                        {inquiry.priority}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <div>
                        <p>{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-xs">{new Date(inquiry.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedInquiry(inquiry)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteInquiry(inquiry._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInquiries.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No inquiries found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Inquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Complete information about this inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-sm">{selectedInquiry.firstName} {selectedInquiry.lastName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Company</Label>
                  <p className="text-sm">{selectedInquiry.company || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="text-sm">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p className="text-sm">{selectedInquiry.phone || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <Badge className={getStatusColor(selectedInquiry.status)}>
                    {selectedInquiry.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Priority</Label>
                  {selectedInquiry.priority ? (
                    <Badge className={getPriorityColor(selectedInquiry.priority)}>
                      {selectedInquiry.priority}
                    </Badge>
                  ) : (
                    <p className="text-sm text-gray-500">Not set</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Message</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{selectedInquiry.message}</p>
              </div>
              
              {selectedInquiry.source && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Source</Label>
                  <p className="text-sm">{selectedInquiry.source}</p>
                </div>
              )}
              
              {selectedInquiry.tags && selectedInquiry.tags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedInquiry.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedInquiry.notes && selectedInquiry.notes.length > 0 && (
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium text-gray-600">Notes</Label>
                  <div className="space-y-3 mt-2">
                    {selectedInquiry.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Added on {new Date(note.added_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-600">Add Note</Label>
                <div className="space-y-3 mt-2">
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Add a note about this inquiry..."
                    rows={3}
                  />
                  <Button 
                    onClick={() => addNote(selectedInquiry._id, responseText)}
                    disabled={!responseText.trim()}
                    className="btn-primary"
                  >
                    Add Note
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Received At</Label>
                    <p className="text-sm">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedInquiry.follow_up_date && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Follow-up Date</Label>
                      <p className="text-sm">{new Date(selectedInquiry.follow_up_date).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}