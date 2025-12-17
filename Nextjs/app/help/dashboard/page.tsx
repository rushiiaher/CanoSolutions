"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, AlertTriangle, Ticket, CheckCircle, Clock, School, Package } from "lucide-react"
import Link from "next/link"

interface DashboardData {
  user: {
    name: string
    email: string
    role: string
    schools?: any[]
    assigned_schools?: any[]
  }
  stats: {
    my_tickets: number
    open_tickets: number
    resolved_tickets: number
    pending_response: number
    schools_managed: number
  }
  recent_tickets: any[]
}

export default function HelpDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/help/dashboard', { credentials: 'include' })
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
      title: "My Tickets",
      value: dashboardData?.stats.my_tickets?.toString() || "0",
      icon: Ticket,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Open Issues",
      value: dashboardData?.stats.open_tickets?.toString() || "0",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Resolved",
      value: dashboardData?.stats.resolved_tickets?.toString() || "0",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Pending Response",
      value: dashboardData?.stats.pending_response?.toString() || "0",
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Schools Managed",
      value: dashboardData?.stats.schools_managed?.toString() || "0",
      icon: School,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {dashboardData?.user.name} ({dashboardData?.user.role === 'admin' ? 'Regional Admin' : 'School Admin'})
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href="/help/report">
            <Button className="btn-primary">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </Link>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>Your latest support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recent_tickets?.length ? (
                dashboardData.recent_tickets.map((ticket, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">{ticket.ticket_number}</p>
                      <p className="text-sm text-gray-600 max-w-xs truncate">{ticket.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">

                      <Badge variant="outline">{ticket.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent tickets</p>
              )}
            </div>
            <div className="mt-4">
              <Link href="/help/tickets">
                <Button variant="outline" className="w-full">
                  View All Tickets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common support tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/help/report">
                <Button variant="outline" className="h-20 flex-col w-full">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  Report Issue
                </Button>
              </Link>
              <Link href="/help/products">
                <Button variant="outline" className="h-20 flex-col w-full">
                  <Package className="h-6 w-6 mb-2" />
                  Product Issue
                </Button>
              </Link>
              <Link href="/help/tickets">
                <Button variant="outline" className="h-20 flex-col w-full">
                  <Ticket className="h-6 w-6 mb-2" />
                  My Tickets
                </Button>
              </Link>
              <Link href="/help/products">
                <Button variant="outline" className="h-20 flex-col w-full">
                  <School className="h-6 w-6 mb-2" />
                  View Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Access Level</CardTitle>
            <CardDescription>What you can do in this portal</CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardData?.user.role === 'admin' ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Manage multiple schools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">View regional reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Create tickets for any assigned school</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Access advanced analytics</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Manage your school's issues</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Report technical problems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Track ticket progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">View school reports</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Information</CardTitle>
            <CardDescription>How to get help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Emergency Contact</h4>
                <p className="text-sm text-gray-600">For critical system outages: +91 73874 01021</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Email Support</h4>
                <p className="text-sm text-gray-600">support@canosolutions.in</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Response Times</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Critical (P1): 4 hours</p>
                  <p>• High (P2): 8 hours</p>
                  <p>• Medium (P3): 24 hours</p>
                  <p>• Low (P4): 48 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}