"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, BarChart3, Users, School, Ticket, Settings, LogOut, Package, MessageSquare, Mail, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import AdminAuthWrapper from "@/components/AdminAuthWrapper"

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Schools", href: "/admin/schools", icon: School },
  { name: "Assets", href: "/admin/assets", icon: Package },
  { name: "Tickets", href: "/admin/tickets", icon: Ticket },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
]

const websiteItems = [
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: Mail },
]

const systemItems = [
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/'
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

  return (
    <AdminAuthWrapper>
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
              <h1 className="text-lg font-bold text-white">LMS Admin</h1>
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
            {renderNavItems(sidebarItems, "LMS Management")}
            {renderNavItems(websiteItems, "Website Management")}
            {renderNavItems(systemItems, "System")}
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/help"
                className="flex items-center px-3 py-2 mb-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </Link>
              
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
                    {pathname === '/admin/dashboard' && 'Dashboard'}
                    {pathname === '/admin/schools' && 'School Management'}
                    {pathname === '/admin/assets' && 'Asset Management'}
                    {pathname === '/admin/tickets' && 'Ticket Management'}
                    {pathname === '/admin/reports' && 'Reports & Analytics'}
                    {pathname === '/admin/inquiries' && 'Website Inquiries'}
                    {pathname === '/admin/subscriptions' && 'Newsletter Subscriptions'}
                    {pathname === '/admin/users' && 'User Management'}
                    {pathname === '/admin/settings' && 'System Settings'}
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, Admin</span>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
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
    </AdminAuthWrapper>
  )
}