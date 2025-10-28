"use client"

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiService } from "@/lib/api-utils";

export default function TestPage() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getHealth();
      setHealthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>API Health Check</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={checkHealth} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? 'Checking...' : 'Check API Health'}
          </Button>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {healthStatus && (
            <div className="p-4 bg-gray-50 rounded-md overflow-auto">
              <h3 className="font-semibold mb-2">Status: {healthStatus.status}</h3>
              
              <h4 className="font-semibold mt-4 mb-2">Database:</h4>
              <p>Status: <span className={healthStatus.database?.connected ? 'text-green-600' : 'text-red-600'}>
                {healthStatus.database?.connected ? 'Connected' : 'Disconnected'}
              </span></p>
              {healthStatus.database?.error && (
                <p className="text-red-600 mt-1">{healthStatus.database.error}</p>
              )}
              
              <pre className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(healthStatus, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
