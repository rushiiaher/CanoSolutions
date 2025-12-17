"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Download, TrendingUp, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react"
import { toast } from "sonner"

interface ReportData {
  ticketsByStatus: Array<{ status: string; count: number }>
  ticketsByPriority: Array<{ priority: string; count: number }>
  monthlyTrend: Array<{ month: string; tickets: number; resolved: number }>
  schoolPerformance: Array<{ school: string; tickets: number; sla_rate: number }>
  assetsByCategory: Array<{ category: string; count: number }>
  slaCompliance: {
    total: number
    met: number
    breached: number
    rate: number
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30")
  const [reportType, setReportType] = useState("overview")

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    try {
      const response = await fetch(`/api/reports?range=${dateRange}&type=${reportType}`)
      const result = await response.json()
      if (result.success) {
        setReportData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch report data:', error)
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async (format: string) => {
    try {
      const response = await fetch(`/api/reports/export?format=${format}&range=${dateRange}`)
      const result = await response.json()
      
      if (result.success) {
        // Create download link
        const blob = new Blob([result.data], { 
          type: format === 'pdf' ? 'application/pdf' : 'text/csv' 
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `lms-report-${new Date().toISOString().split('T')[0]}.${format}`
        a.click()
        window.URL.revokeObjectURL(url)
        
        toast.success(`Report exported as ${format.toUpperCase()}`)
      }
    } catch (error) {
      toast.error('Failed to export report')
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reportData?.slaCompliance.rate || 0}%
                </p>
                <p className="text-sm text-gray-500">
                  {reportData?.slaCompliance.met || 0} of {reportData?.slaCompliance.total || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-gray-900">2.4</p>
                <p className="text-sm text-gray-500">days</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reportData?.ticketsByPriority.find(p => p.priority === 'P1')?.count || 0}
                </p>
                <p className="text-sm text-gray-500">P1 tickets</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-3xl font-bold text-gray-900">+12%</p>
                <p className="text-sm text-gray-500">ticket volume</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
            <CardDescription>Current ticket distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData?.ticketsByStatus || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(reportData?.ticketsByStatus || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets by Priority</CardTitle>
            <CardDescription>Priority distribution analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData?.ticketsByPriority || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Ticket Trend</CardTitle>
            <CardDescription>Tickets created vs resolved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData?.monthlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tickets" stroke="#8884d8" name="Created" />
                <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assets by Category</CardTitle>
            <CardDescription>Equipment distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData?.assetsByCategory || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* School Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>School Performance Analysis</CardTitle>
          <CardDescription>Ticket volume and SLA compliance by school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData?.schoolPerformance?.map((school, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{school.school}</p>
                  <p className="text-sm text-gray-600">{school.tickets} total tickets</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">SLA Compliance</p>
                    <Badge className={school.sla_rate >= 90 ? 'bg-green-100 text-green-800' : 
                                   school.sla_rate >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                   'bg-red-100 text-red-800'}>
                      {school.sla_rate}%
                    </Badge>
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8">
                <p className="text-gray-500">No performance data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Performance Highlights</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• SLA compliance rate is {reportData?.slaCompliance.rate || 0}%</li>
                <li>• {reportData?.ticketsByStatus.find(s => s.status === 'resolved')?.count || 0} tickets resolved this period</li>
                <li>• Average resolution time improved by 15%</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900">Areas for Improvement</h4>
              <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                <li>• {reportData?.slaCompliance.breached || 0} tickets breached SLA deadlines</li>
                <li>• Focus on reducing P1 critical issues</li>
                <li>• Consider additional training for underperforming schools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}