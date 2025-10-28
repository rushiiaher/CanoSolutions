"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function SimpleTestPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions'
      const response = await fetch(`${apiUrl}/simple-mongo-test`)
      const data = await response.json()
      
      setResult(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setResult(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Simple MongoDB Test</h1>
      
      <Button 
        onClick={testConnection} 
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testing...' : 'Test MongoDB Connection'}
      </Button>
      
      {result && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  )
}