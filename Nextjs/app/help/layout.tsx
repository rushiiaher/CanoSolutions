"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, BarChart3, Ticket, Settings, LogOut, School, AlertTriangle, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const sidebarItems = [
  { name: "Dashboard", href: "/help/dashboard", icon: BarChart3 },
  { name: "Report Issue", href: "/help/report", icon: AlertTriangle },
  { name: "My Tickets", href: "/help/tickets", icon: Ticket },
  { name: "Products", href: "/help/products", icon: School },
]

const systemItems = [
  { name: "Help & FAQ", href: "/help/faq", icon: HelpCircle },
  { name: "Settings", href: "/help/settings", icon: Settings },
]

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (pathname !== '/help/login') {
      checkAuth()
    }
  }, [pathname])

  // Skip layout for login page
  if (pathname === '/help/login') {
    return children
  }

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include' })
      const result = await response.json()
      
      if (result.success && ['school_admin', 'admin'].includes(result.user.role)) {
        setUser(result.user)
      } else {
        router.push('/help/login')
      }
    } catch (error) {
      router.push('/help/login')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      router.push('/help/login')
    }
  }

  const renderNavItems = (items: typeof sidebarItems, title?: string) => (
    <div className="mb-6">
      {title && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors
              ${isActive 
                ? 'bg-primary text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </div>
  )

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b bg-primary">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-white">LMS Help Portal</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          {renderNavItems(sidebarItems, "Support Portal")}
          {renderNavItems(systemItems, "System")}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="px-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-blue-800">Logged in as:</p>
                <p className="text-sm font-semibold text-blue-900">{user.name}</p>
                <p className="text-xs text-blue-600">{user.role === 'admin' ? 'Regional Admin' : 'School Admin'}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {pathname === '/help/dashboard' && 'Help Dashboard'}
                  {pathname === '/help/report' && 'Report Issue'}
                  {pathname === '/help/tickets' && 'My Tickets'}
                  {pathname === '/help/products' && 'Products'}
                  {pathname === '/help/faq' && 'Help & FAQ'}
                  {pathname === '/help/settings' && 'Settings'}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.role === 'admin' ? 'Regional Admin' : 'School Admin'}
              </span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}