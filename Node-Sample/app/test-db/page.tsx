"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestDBPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions'
      const response = await fetch(`${apiUrl}/test-db`)
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(`Error: ${data.error || 'Unknown error'}`)
        setResult(data)
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>MongoDB Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </Button>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {result && (
            <div className="p-4 bg-gray-50 rounded-md overflow-auto">
              <h3 className="font-semibold mb-2">
                Status: {result.success ? 
                  <span className="text-green-600">Connected</span> : 
                  <span className="text-red-600">Failed</span>
                }
              </h3>
              
              {result.message && (
                <p className="mb-2">{result.message}</p>
              )}
              
              {result.collections && (
                <div className="mt-4">
                  <h4 className="font-semibold">Available Collections:</h4>
                  <ul className="list-disc pl-5 mt-2">
                    {result.collections.map((collection: string) => (
                      <li key={collection}>{collection}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <pre className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}