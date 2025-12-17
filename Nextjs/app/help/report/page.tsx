"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, School, Package, Wifi, Monitor, Wrench, HelpCircle } from "lucide-react"
import { toast } from "sonner"

interface School {
  _id: string
  name: string
  code: string
}

interface Asset {
  _id: string
  name: string
  category: string
  asset_tag: string
}

export default function ReportIssuePage() {
  const [user, setUser] = useState<any>(null)
  const [schools, setSchools] = useState<School[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [assetSearchOpen, setAssetSearchOpen] = useState(false)
  const [formData, setFormData] = useState({
    school_id: '',
    asset_id: '',
    category: '',
    title: '',
    description: '',
    contact_person: '',
    contact_phone: ''
  })

  useEffect(() => {
    fetchUserAndSchools()
    
    // Read URL parameters
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    const assetId = params.get('asset_id')
    const schoolId = params.get('school_id')
    
    if (category || assetId || schoolId) {
      setFormData(prev => ({
        ...prev,
        ...(category && { category }),
        ...(assetId && { asset_id: assetId }),
        ...(schoolId && { school_id: schoolId })
      }))
    }
  }, [])

  useEffect(() => {
    let schoolId = formData.school_id
    
    // For school admin, use their school ID
    if (user?.role === 'school_admin' && user?.schools?.[0]?._id) {
      schoolId = user.schools[0]._id
    }
    
    console.log('Hardware check:', { schoolId, category: formData.category, shouldShow: schoolId && formData.category === 'hardware' })
    
    if (schoolId && formData.category === 'hardware') {
      fetchAssets(schoolId)
    } else {
      setAssets([])
    }
  }, [formData.school_id, formData.category, user])

  const fetchUserAndSchools = async () => {
    try {
      const userResponse = await fetch('/api/auth/me', { credentials: 'include' })
      const userResult = await userResponse.json()

      if (userResult.success) {
        setUser(userResult.user)
        
        if (userResult.user.role === 'school_admin' && userResult.user.schools?.length > 0) {
          const schoolId = userResult.user.schools[0]._id
          setFormData(prev => ({ ...prev, school_id: schoolId, contact_person: userResult.user.name || '' }))
          setSchools(userResult.user.schools)
        } else if (userResult.user.role === 'admin') {
          const schoolsResponse = await fetch('/api/schools?limit=100', { credentials: 'include' })
          const schoolsResult = await schoolsResponse.json()
          console.log('Schools API response:', schoolsResult)
          if (schoolsResult.success) {
            const schoolsData = schoolsResult.data?.data || schoolsResult.data || []
            console.log('Schools loaded:', schoolsData)
            setSchools(schoolsData)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const fetchAssets = async (schoolId: string) => {
    try {
      console.log('Fetching assets for school:', schoolId)
      const response = await fetch(`/api/help/assets?school_id=${schoolId}`, { credentials: 'include' })
      const result = await response.json()
      console.log('Assets response:', result)
      if (result.success) {
        setAssets(result.data || [])
        console.log('Assets loaded:', result.data?.length || 0)
      } else {
        console.error('Failed to fetch assets:', result.error)
        toast.error('Failed to load hardware assets')
      }
    } catch (error) {
      console.error('Failed to fetch assets:', error)
      toast.error('Error loading hardware assets')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const schoolId = formData.school_id || (user?.role === 'school_admin' && user?.schools?.[0]?._id)
      const response = await fetch('/api/help/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          school_id: schoolId,
          asset_id: formData.asset_id === 'none' ? '' : formData.asset_id
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success(`Issue reported successfully! Ticket #${result.ticket_number}`)
        resetForm()
      } else {
        toast.error(result.message || 'Failed to report issue')
      }
    } catch (error) {
      toast.error('Failed to submit report')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      school_id: user?.role === 'school_admin' && user?.schools?.length > 0 ? user.schools[0]._id : '',
      asset_id: '',
      category: '',
      title: '',
      description: '',
      contact_person: user?.name || '',
      contact_phone: ''
    })
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
          <h1 className="text-3xl font-bold text-gray-900">Report Issue</h1>
          <p className="text-gray-600 mt-1">Submit a support request for technical issues or problems</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Issue Details
              </CardTitle>
              <CardDescription>
                Provide detailed information about the issue you're experiencing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {user?.role === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="school_id">School *</Label>
                    <Select value={formData.school_id} onValueChange={(value) => setFormData(prev => ({ ...prev, school_id: value, asset_id: '' }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the school with the issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(schools) && schools.map((school) => (
                          <SelectItem key={school._id} value={school._id}>
                            <div className="flex items-center space-x-2">
                              <School className="h-4 w-4" />
                              <span>{school.name} ({school.code})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {user?.role === 'school_admin' && user?.schools?.[0] && (
                  <div className="space-y-2">
                    <Label>School</Label>
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                      <School className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">{user.schools[0].name}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, asset_id: '' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-4 w-4" />
                          <span>Hardware Issues</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="software">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4" />
                          <span>Software Problems</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="network">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4" />
                          <span>Network/Connectivity</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="facility">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4" />
                          <span>Facility Issues</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="h-4 w-4" />
                          <span>Other</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.category === 'hardware' && (formData.school_id || user?.role === 'school_admin') && (
                  <div className="space-y-2">
                    <Label htmlFor="asset_id">Hardware Asset *</Label>
                    {assets.length === 0 ? (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                        No hardware assets found for this school. Please assign products to this school first.
                      </div>
                    ) : (
                      <Popover open={assetSearchOpen} onOpenChange={setAssetSearchOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={assetSearchOpen}
                            className="w-full justify-between"
                          >
                            {formData.asset_id
                              ? assets.find((asset) => asset._id === formData.asset_id)
                                ? `${assets.find((asset) => asset._id === formData.asset_id)?.name} - ${assets.find((asset) => asset._id === formData.asset_id)?.asset_tag}`
                                : "Select hardware asset..."
                              : "Select hardware asset..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search hardware assets..." />
                            <CommandEmpty>No hardware asset found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                              {assets.map((asset) => (
                                <CommandItem
                                  key={asset._id}
                                  value={`${asset.name} ${asset.asset_tag} ${asset.category}`}
                                  onSelect={() => {
                                    setFormData(prev => ({ ...prev, asset_id: asset._id }))
                                    setAssetSearchOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.asset_id === asset._id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {asset.name} - Serial: {asset.asset_tag}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please provide detailed information about the issue, including:
• What happened?
• When did it start?
• Steps to reproduce the problem
• Error messages (if any)
• Impact on operations"
                    rows={6}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_person">Contact Person *</Label>
                    <Input
                      id="contact_person"
                      value={formData.contact_person}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_person: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={submitting || (!formData.school_id && user?.role !== 'school_admin') || !formData.category || !formData.title || !formData.description || (formData.category === 'hardware' && !formData.asset_id)}
                >
                  {submitting ? 'Submitting...' : 'Submit Issue Report'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border-2 border-primary/20 bg-primary/5">
                  <p className="text-sm font-medium">Standard Response</p>
                  <p className="text-xs text-gray-600 mt-1">Expected response: 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                For critical system outages affecting multiple users:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">📞 +91 73874 01021</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">✉️ support@canosolutions.in</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}