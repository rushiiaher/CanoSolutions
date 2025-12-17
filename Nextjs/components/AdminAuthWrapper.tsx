"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { School } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      const result = await response.json()
      
      if (result.success && ['super_admin', 'admin'].includes(result.user.role)) {
        setIsAuthenticated(true)
        setUser(result.user)
      } else {
        setShowLoginModal(true)
      }
    } catch (error) {
      setShowLoginModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      const result = await response.json()

      if (result.success) {
        if (['super_admin', 'admin'].includes(result.user.role)) {
          setIsAuthenticated(true)
          setUser(result.user)
          setShowLoginModal(false)
          toast.success('Login successful')
        } else {
          toast.error('Access denied. Admin privileges required.')
        }
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setUser(null)
      setShowLoginModal(true)
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <School className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">LMS Admin Panel</h1>
            <p className="text-gray-600 mb-4">Please authenticate to continue</p>
            <Button onClick={() => setShowLoginModal(true)} className="btn-primary">
              Login to Admin Panel
            </Button>
          </div>
        </div>

        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <School className="w-6 h-6 text-primary" />
                <span>Admin Login</span>
              </DialogTitle>
              <DialogDescription>
                Enter your admin credentials to access the LMS admin panel
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@canosolutions.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={loginLoading}
              >
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Default Admin Credentials:</p>
              <p className="text-sm text-blue-600">Email: admin@canosolutions.com</p>
              <p className="text-sm text-blue-600">Password: admin123</p>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className="admin-authenticated">
      {children}
    </div>
  )
}