"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Building, Calendar, Filter, Search, Users, MessageSquare } from "lucide-react"
import { InquiryForm, EmailSubscription } from "@/lib/models"

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<InquiryForm[]>([])
  const [subscriptions, setSubscriptions] = useState<EmailSubscription[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<InquiryForm[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterInquiries()
  }, [inquiries, searchTerm, statusFilter])

  const fetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const [inquiriesRes, subscriptionsRes] = await Promise.all([
        fetch(`${apiUrl}/api/inquiry`),
        fetch(`${apiUrl}/api/subscribe`)
      ])
      
      if (!inquiriesRes.ok || !subscriptionsRes.ok) {
        throw new Error('Failed to fetch data from Express backend')
      }
      
      const inquiriesData = await inquiriesRes.json()
      const subscriptionsData = await subscriptionsRes.json()
      
      setInquiries(inquiriesData)
      setSubscriptions(subscriptionsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterInquiries = () => {
    let filtered = inquiries

    if (searchTerm) {
      filtered = filtered.filter(inquiry =>
        inquiry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter)
    }

    setFilteredInquiries(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DF2E35] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CanoSolutions Admin</h1>
              <p className="text-gray-600">Manage inquiries and subscriptions</p>
            </div>
            <Button onClick={fetchData} variant="outline">
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-[#DF2E35]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {inquiries.filter(i => i.status === 'new').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Email Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {inquiries.filter(i => 
                      new Date(i.createdAt).getMonth() === new Date().getMonth()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="subscriptions">Email Subscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Inquiries List */}
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <Card key={inquiry._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {inquiry.firstName} {inquiry.lastName}
                          </h3>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{inquiry.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{inquiry.phone}</span>
                          </div>
                          {inquiry.company && (
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              <span>{inquiry.company}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        
                        {inquiry.message && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{inquiry.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredInquiries.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <div key={subscription._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{subscription.email}</p>
                          <p className="text-sm text-gray-600">
                            Subscribed on {formatDate(subscription.subscribedAt)}
                          </p>
                        </div>
                      </div>
                      <Badge className={subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {subscription.status}
                      </Badge>
                    </div>
                  ))}
                  
                  {subscriptions.length === 0 && (
                    <div className="text-center py-12">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions yet</h3>
                      <p className="text-gray-600">Email subscriptions will appear here.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}