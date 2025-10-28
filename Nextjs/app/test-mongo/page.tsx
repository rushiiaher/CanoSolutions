"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestMongoPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions'
      const response = await fetch(`${apiUrl}/direct-mongo-test`)
      const data = await response.json()
      
      setResult(data)
      if (!response.ok) {
        setError(data.message || 'Connection failed')
      }
    } catch (err: any) {
      console.error('Test error:', err)
      setError(err.message || 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">MongoDB Connection Test</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test MongoDB Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testConnection} 
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 border-red-500">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-700">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className={`mb-6 ${result.success ? 'border-green-500' : 'border-red-500'}`}>
          <CardHeader className={result.success ? 'bg-green-50' : 'bg-red-50'}>
            <CardTitle className={result.success ? 'text-green-700' : 'text-red-700'}>
              {result.success ? 'Connection Successful' : 'Connection Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}