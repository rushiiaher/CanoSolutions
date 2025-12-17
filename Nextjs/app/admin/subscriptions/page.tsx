"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail, Download, Users, UserCheck, UserX, Calendar, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Subscription {
  _id: string
  email: string
  name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source?: string
  subscribedAt: string
  unsubscribedAt?: string
  engagement?: {
    emails_sent: number
    emails_opened: number
    links_clicked: number
    last_opened?: string
  }
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscribe')
      const result = await response.json()
      if (result.success) {
        setSubscriptions(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
      toast.error('Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const deleteSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return
    
    try {
      const response = await fetch(`/api/subscribe/${subscriptionId}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Subscription deleted successfully')
        fetchSubscriptions()
      } else {
        toast.error(result.message || 'Failed to delete subscription')
      }
    } catch (error) {
      toast.error('Failed to delete subscription')
    }
  }

  const updateSubscriptionStatus = async (subscriptionId: string, status: string) => {
    try {
      const response = await fetch(`/api/subscribe/${subscriptionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Status updated successfully')
        fetchSubscriptions()
      } else {
        toast.error(result.message || 'Failed to update status')
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const exportSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscribe/export')
      const result = await response.json()
      
      if (result.success) {
        // Create CSV content
        const csvContent = [
          ['Email', 'Name', 'Status', 'Source', 'Subscribed Date', 'Emails Sent', 'Emails Opened'].join(','),
          ...filteredSubscriptions.map(sub => [
            sub.email,
            sub.name || '',
            sub.status,
            sub.source || '',
            new Date(sub.subscribedAt).toLocaleDateString(),
            sub.engagement?.emails_sent || 0,
            sub.engagement?.emails_opened || 0
          ].join(','))
        ].join('\n')

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
        
        toast.success('Subscriptions exported successfully')
      }
    } catch (error) {
      toast.error('Failed to export subscriptions')
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      unsubscribed: 'bg-gray-100 text-gray-800',
      bounced: 'bg-red-100 text-red-800'
    }
    return <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
      {status}
    </Badge>
  }

  const getEngagementRate = (subscription: Subscription) => {
    if (!subscription.engagement || subscription.engagement.emails_sent === 0) return 0
    return Math.round((subscription.engagement.emails_opened / subscription.engagement.emails_sent) * 100)
  }

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = 
      subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscription.name && subscription.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = !statusFilter || statusFilter === 'all' || subscription.status === statusFilter
    const matchesSource = !sourceFilter || sourceFilter === 'all' || subscription.source === sourceFilter
    return matchesSearch && matchesStatus && matchesSource
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscriptions</h1>
          <p className="text-gray-600 mt-1">Manage email subscribers and engagement</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSubscriptions}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="btn-primary">
            <Mail className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(s => s.status === 'unsubscribed').length}
                </p>
              </div>
              <UserX className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(s => {
                    const thisMonth = new Date()
                    const subDate = new Date(s.subscribedAt)
                    return subDate.getMonth() === thisMonth.getMonth() && 
                           subDate.getFullYear() === thisMonth.getFullYear()
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
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
                  placeholder="Search subscribers by email or name..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="homepage">Homepage</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="popup">Popup</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers ({filteredSubscriptions.length})</CardTitle>
          <CardDescription>
            Manage newsletter subscribers and track engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscriber</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subscription.email}</p>
                      {subscription.name && (
                        <p className="text-sm text-gray-500">{subscription.name}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={subscription.status} 
                      onValueChange={(value) => updateSubscriptionStatus(subscription._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        {getStatusBadge(subscription.status)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        <SelectItem value="bounced">Bounced</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {subscription.source || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {subscription.engagement ? (
                        <>
                          <p>{getEngagementRate(subscription)}% open rate</p>
                          <p className="text-gray-500">
                            {subscription.engagement.emails_sent} sent, {subscription.engagement.emails_opened} opened
                          </p>
                        </>
                      ) : (
                        <span className="text-gray-500">No data</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(subscription.subscribedAt).toLocaleDateString()}</p>
                      <p className="text-gray-500">{new Date(subscription.subscribedAt).toLocaleTimeString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`mailto:${subscription.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteSubscription(subscription._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No subscribers found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}