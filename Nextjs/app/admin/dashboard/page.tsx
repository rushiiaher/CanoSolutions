"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, School, Ticket, TrendingUp, AlertCircle, Package, Clock, CheckCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface DashboardData {
  stats: {
    total_schools: number
    active_tickets: number
    pending_assignments: number
    sla_compliance_rate: number
    assets_under_warranty: number
    monthly_ticket_trend: Array<{ month: string; count: number }>
    top_failing_equipment: Array<{ category: string; count: number }>
  }
  recent_tickets: Array<{
    ticket_number: string
    title: string
    priority: string
    status: string
    created_at: string
    school: { name: string }
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      if (result.success) {
        setDashboardData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Schools",
      value: dashboardData?.stats.total_schools?.toString() || "0",
      icon: School,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Tickets",
      value: dashboardData?.stats.active_tickets?.toString() || "0",
      icon: Ticket,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Pending Assignments",
      value: dashboardData?.stats.pending_assignments?.toString() || "0",
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "SLA Compliance",
      value: `${dashboardData?.stats.sla_compliance_rate || 0}%`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Assets Under Warranty",
      value: dashboardData?.stats.assets_under_warranty?.toString() || "0",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">LMS Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your Learning Management System</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
          <Button className="btn-primary">
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Trend (Last 6 Months)</CardTitle>
            <CardDescription>Monthly ticket creation trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData?.stats.monthly_ticket_trend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Failing Equipment</CardTitle>
            <CardDescription>Equipment categories with most issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData?.stats.top_failing_equipment || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(dashboardData?.stats.top_failing_equipment || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>Latest support requests from schools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recent_tickets?.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium">{ticket.ticket_number} - {ticket.title}</p>
                    <p className="text-sm text-gray-600">{ticket.school?.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        ticket.priority === 'P1' ? 'destructive' : 
                        ticket.priority === 'P2' ? 'default' : 
                        ticket.priority === 'P3' ? 'secondary' : 'outline'
                      }
                    >
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline">{ticket.status}</Badge>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No recent tickets</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.stats.assets_under_warranty && dashboardData.stats.assets_under_warranty > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Warranty Expiring</p>
                    <p className="text-sm text-yellow-700">
                      {dashboardData.stats.assets_under_warranty} assets have warranties expiring soon
                    </p>
                  </div>
                </div>
              )}
              
              {dashboardData?.stats.pending_assignments && dashboardData.stats.pending_assignments > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Pending Assignments</p>
                    <p className="text-sm text-red-700">
                      {dashboardData.stats.pending_assignments} tickets are waiting for assignment
                    </p>
                  </div>
                </div>
              )}
              
              {dashboardData?.stats.sla_compliance_rate && dashboardData.stats.sla_compliance_rate < 90 && (
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800">SLA Compliance Low</p>
                    <p className="text-sm text-orange-700">
                      Current SLA compliance is {dashboardData.stats.sla_compliance_rate}%
                    </p>
                  </div>
                </div>
              )}
              
              {(!dashboardData?.stats.pending_assignments || dashboardData.stats.pending_assignments === 0) &&
               (!dashboardData?.stats.assets_under_warranty || dashboardData.stats.assets_under_warranty === 0) &&
               (!dashboardData?.stats.sla_compliance_rate || dashboardData.stats.sla_compliance_rate >= 90) && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">All Systems Normal</p>
                    <p className="text-sm text-green-700">No critical alerts at this time</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <School className="h-6 w-6 mb-2" />
              Add School
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              Register Asset
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Ticket className="h-6 w-6 mb-2" />
              Create Ticket
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}