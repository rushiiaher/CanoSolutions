"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TestFormsPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      
      // Test health endpoint
      const healthResponse = await fetch(`${apiUrl}/api/health`)
      const healthData = await healthResponse.json()
      
      // Test database operations
      const dbResponse = await fetch(`${apiUrl}/api/test-forms`)
      const dbData = await dbResponse.json()
      
      // Test form submission
      const submitResponse = await fetch(`${apiUrl}/api/test-forms`, { method: 'POST' })
      const submitData = await submitResponse.json()
      
      setTestResults({
        health: healthData,
        database: dbData,
        submission: submitData,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setTestResults({
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const testInquiryForm = async () => {
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+91 73874 01021',
      company: 'Test Company',
      message: 'This is a test inquiry from form testing'
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })
      const result = await response.json()
      alert(response.ok ? 'Inquiry form test successful!' : `Error: ${result.error}`)
    } catch (error) {
      alert('Inquiry form test failed!')
    }
  }

  const testSubscriptionForm = async () => {
    const testData = {
      email: 'test-subscription@example.com'
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })
      const result = await response.json()
      alert(response.ok ? 'Subscription form test successful!' : `Error: ${result.error}`)
    } catch (error) {
      alert('Subscription form test failed!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Form Testing Dashboard</h1>
          <p className="text-gray-600">Test all forms and database connections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runTests} disabled={loading} className="w-full">
                {loading ? 'Testing...' : 'Run Full System Test'}
              </Button>
              <Button 
                onClick={() => window.open('/api/health', '_blank')} 
                variant="outline" 
                className="w-full"
              >
                View Health Status
              </Button>
              {testResults && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-64">
                    {JSON.stringify(testResults, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={testInquiryForm} className="w-full">
                Test Inquiry Form
              </Button>
              <Button onClick={testSubscriptionForm} className="w-full">
                Test Subscription Form
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✅ Hero Section Form</Badge>
                <p className="text-sm text-gray-600">
                  "Get Your Free Consultation" - Homepage with phone field
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✅ Contact Page Form</Badge>
                <p className="text-sm text-gray-600">
                  "Send Us a Message" - Contact page with phone field
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✅ Newsletter Form</Badge>
                <p className="text-sm text-gray-600">
                  Footer newsletter subscription
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">📊 Admin Dashboard</Badge>
                <p className="text-sm text-gray-600">
                  <a href="/admin/dashboard" className="text-blue-600 hover:underline">
                    View admin dashboard
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}