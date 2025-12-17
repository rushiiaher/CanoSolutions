"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Mail, Bell, Shield, Database, Clock } from "lucide-react"
import { toast } from "sonner"

interface SystemSettings {
  general: {
    system_name: string
    company_name: string
    support_email: string
    support_phone: string
  }
  sla: {
    p1_response_hours: number
    p1_resolution_hours: number
    p2_response_hours: number
    p2_resolution_hours: number
    p3_response_hours: number
    p3_resolution_hours: number
    p4_response_hours: number
    p4_resolution_hours: number
  }
  notifications: {
    email_enabled: boolean
    sms_enabled: boolean
    ticket_created: boolean
    ticket_assigned: boolean
    sla_breach: boolean
    ticket_resolved: boolean
  }
  email: {
    smtp_host: string
    smtp_port: number
    smtp_user: string
    smtp_password: string
    from_email: string
    from_name: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      system_name: "LMS Reporting System",
      company_name: "Cano Solutions",
      support_email: "support@canosolutions.in",
      support_phone: "+91 73874 01021"
    },
    sla: {
      p1_response_hours: 4,
      p1_resolution_hours: 24,
      p2_response_hours: 8,
      p2_resolution_hours: 48,
      p3_response_hours: 24,
      p3_resolution_hours: 120,
      p4_response_hours: 48,
      p4_resolution_hours: 240
    },
    notifications: {
      email_enabled: true,
      sms_enabled: false,
      ticket_created: true,
      ticket_assigned: true,
      sla_breach: true,
      ticket_resolved: true
    },
    email: {
      smtp_host: "",
      smtp_port: 587,
      smtp_user: "",
      smtp_password: "",
      from_email: "",
      from_name: "LMS Support"
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const result = await response.json()
      if (result.success) {
        setSettings(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const saveSettings = async (section: keyof SystemSettings) => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: settings[section] })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Settings saved successfully')
      } else {
        toast.error(result.message || 'Failed to save settings')
      }
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const testEmailConnection = async () => {
    try {
      const response = await fetch('/api/settings/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings.email)
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Email connection test successful')
      } else {
        toast.error('Email connection test failed')
      }
    } catch (error) {
      toast.error('Email connection test failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and integrations</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="sla" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            SLA Rules
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system_name">System Name</Label>
                  <Input
                    id="system_name"
                    value={settings.general.system_name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, system_name: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={settings.general.company_name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, company_name: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="support_email">Support Email</Label>
                  <Input
                    id="support_email"
                    type="email"
                    value={settings.general.support_email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, support_email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support_phone">Support Phone</Label>
                  <Input
                    id="support_phone"
                    value={settings.general.support_phone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, support_phone: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <Button onClick={() => saveSettings('general')} disabled={loading}>
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLA Settings */}
        <TabsContent value="sla">
          <Card>
            <CardHeader>
              <CardTitle>SLA Configuration</CardTitle>
              <CardDescription>Set response and resolution time limits for different priority levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(['P1', 'P2', 'P3', 'P4'] as const).map((priority) => (
                <div key={priority} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">
                    {priority} - {priority === 'P1' ? 'Critical' : priority === 'P2' ? 'High' : priority === 'P3' ? 'Medium' : 'Low'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Response Time (hours)</Label>
                      <Input
                        type="number"
                        value={settings.sla[`${priority.toLowerCase()}_response_hours` as keyof typeof settings.sla]}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sla: { 
                            ...prev.sla, 
                            [`${priority.toLowerCase()}_response_hours`]: parseInt(e.target.value) 
                          }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Resolution Time (hours)</Label>
                      <Input
                        type="number"
                        value={settings.sla[`${priority.toLowerCase()}_resolution_hours` as keyof typeof settings.sla]}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sla: { 
                            ...prev.sla, 
                            [`${priority.toLowerCase()}_resolution_hours`]: parseInt(e.target.value) 
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button onClick={() => saveSettings('sla')} disabled={loading}>
                Save SLA Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when and how notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email_enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email_enabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms_enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms_enabled: checked }
                    }))}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Event Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'ticket_created', label: 'Ticket Created', desc: 'Notify when new tickets are created' },
                    { key: 'ticket_assigned', label: 'Ticket Assigned', desc: 'Notify when tickets are assigned' },
                    { key: 'sla_breach', label: 'SLA Breach', desc: 'Notify when SLA deadlines are missed' },
                    { key: 'ticket_resolved', label: 'Ticket Resolved', desc: 'Notify when tickets are resolved' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label>{item.label}</Label>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <Switch
                        checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [item.key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <Button onClick={() => saveSettings('notifications')} disabled={loading}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={settings.email.smtp_host}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, smtp_host: e.target.value }
                    }))}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={settings.email.smtp_port}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, smtp_port: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_user">SMTP Username</Label>
                  <Input
                    id="smtp_user"
                    value={settings.email.smtp_user}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, smtp_user: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={settings.email.smtp_password}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, smtp_password: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from_email">From Email</Label>
                  <Input
                    id="from_email"
                    type="email"
                    value={settings.email.from_email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, from_email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from_name">From Name</Label>
                  <Input
                    id="from_name"
                    value={settings.email.from_name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, from_name: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={() => saveSettings('email')} disabled={loading}>
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={testEmailConnection}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}