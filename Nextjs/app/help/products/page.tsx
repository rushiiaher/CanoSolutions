"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Search, Plus, Edit, Trash2, Package, School, Eye, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  _id: string
  name: string
  category: string
  manufacturer: string
  model: string
  serial_number: string
  purchase_date: string
  warranty_expiry: string
  status: string
  condition: string
  location: string
  school_id?: string
  school_name?: string
  assigned_date?: string
  created_at: string
}

interface School {
  _id: string
  name: string
  code: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [schools, setSchools] = useState<School[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [schoolFilter, setSchoolFilter] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    purchase_date: '',
    warranty_expiry: '',
    status: 'available',
    condition: 'good',
    location: ''
  })

  useEffect(() => {
    fetchUserAndData()
  }, [])

  const fetchUserAndData = async () => {
    try {
      const userResponse = await fetch('/api/auth/me', { credentials: 'include' })
      const userResult = await userResponse.json()

      if (userResult.success) {
        setUser(userResult.user)
        
        if (userResult.user.role === 'super_admin' || userResult.user.role === 'admin') {
          const schoolsResponse = await fetch('/api/schools', { credentials: 'include' })
          const schoolsResult = await schoolsResponse.json()
          if (schoolsResult.success && Array.isArray(schoolsResult.data)) {
            setSchools(schoolsResult.data)
          } else {
            setSchools([])
          }
        } else {
          setSchools([])
        }
      } else {
        setSchools([])
      }

      await fetchProducts()
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('Failed to load data')
      setSchools([])
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/help/products', { credentials: 'include' })
      const result = await response.json()
      if (result.success) {
        setProducts(result.data || [])
      } else {
        toast.error('Failed to load products')
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      toast.error('Failed to load products')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = isEditDialogOpen ? `/api/help/products/${selectedProduct?._id}` : '/api/help/products'
      const method = isEditDialogOpen ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      if (result.success) {
        toast.success(isEditDialogOpen ? 'Product updated successfully' : 'Product added successfully')
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        resetForm()
        fetchProducts()
      } else {
        toast.error(result.message || 'Operation failed')
      }
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const [issueForm, setIssueForm] = useState({
    title: '',
    description: '',
    category: 'hardware',
    priority: 'P3'
  })

  const handleAssign = async (schoolId: string) => {
    try {
      const response = await fetch(`/api/help/products/${selectedProduct?._id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ school_id: schoolId })
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Product assigned successfully')
        setIsAssignDialogOpen(false)
        fetchProducts()
      } else {
        toast.error(result.message || 'Assignment failed')
      }
    } catch (error) {
      toast.error('Assignment failed')
    }
  }

  const handleReportIssue = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedProduct) return

    try {
      const response = await fetch('/api/help/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...issueForm,
          asset_id: selectedProduct._id,
          school_id: selectedProduct.school_id
        })
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Issue reported successfully')
        setIsReportIssueDialogOpen(false)
        setIssueForm({ title: '', description: '', category: 'hardware', priority: 'P3' })
      } else {
        toast.error(result.message || 'Failed to report issue')
      }
    } catch (error) {
      toast.error('Failed to report issue')
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/help/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Product deleted successfully')
        fetchProducts()
      } else {
        toast.error(result.message || 'Delete failed')
      }
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      manufacturer: '',
      model: '',
      serial_number: '',
      purchase_date: '',
      warranty_expiry: '',
      status: 'available',
      condition: 'good',
      location: ''
    })
    setSelectedProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      manufacturer: product.manufacturer,
      model: product.model,
      serial_number: product.serial_number,
      purchase_date: product.purchase_date?.split('T')[0] || '',
      warranty_expiry: product.warranty_expiry?.split('T')[0] || '',
      status: product.status,
      condition: product.condition,
      location: product.location
    })
    setIsEditDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'assigned': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'damaged': return 'bg-red-100 text-red-800'
      case 'retired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = !statusFilter || statusFilter === 'all' || product.status === statusFilter
    const matchesSchool = !schoolFilter || schoolFilter === 'all' || 
      (schoolFilter === 'unassigned' && !product.school_id) || 
      product.school_id === schoolFilter
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSchool
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage school products and equipment</p>
        </div>
        {user?.role === 'super_admin' && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Enter product details</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer">Computer</SelectItem>
                        <SelectItem value="projector">Projector</SelectItem>
                        <SelectItem value="network">Network Equipment</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer}
                      onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="serial_number">Serial Number</Label>
                    <Input
                      id="serial_number"
                      value={formData.serial_number}
                      onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="purchase_date">Purchase Date</Label>
                    <Input
                      id="purchase_date"
                      type="date"
                      value={formData.purchase_date}
                      onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="warranty_expiry">Warranty Expiry</Label>
                    <Input
                      id="warranty_expiry"
                      type="date"
                      value={formData.warranty_expiry}
                      onChange={(e) => setFormData({...formData, warranty_expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredProducts.filter(p => p.status === 'available').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredProducts.filter(p => p.status === 'assigned').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredProducts.filter(p => p.status === 'maintenance').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {(user?.role === 'super_admin' || user?.role === 'admin') && (
              <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {Array.isArray(schools) && schools.map((school) => (
                    <SelectItem key={school._id} value={school._id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="computer">Computer</SelectItem>
                <SelectItem value="projector">Projector</SelectItem>
                <SelectItem value="network">Network Equipment</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.manufacturer} {product.model}</p>
                      <p className="text-xs text-gray-500">SN: {product.serial_number}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{product.category}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.school_name ? (
                      <div className="flex items-center space-x-2">
                        <School className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{product.school_name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {user?.role === 'super_admin' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product)
                              setIsAssignDialogOpen(true)
                            }}
                          >
                            <School className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {(user?.role === 'admin' || user?.role === 'school_admin') && product.school_id && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            window.location.href = `/help/report?category=hardware&asset_id=${product._id}&school_id=${product.school_id}`
                          }}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer">Computer</SelectItem>
                    <SelectItem value="projector">Projector</SelectItem>
                    <SelectItem value="network">Network Equipment</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Product</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog - Super Admin Only */}
      {user?.role === 'super_admin' && (
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Product to School</DialogTitle>
              <DialogDescription>
                Select a school to assign {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {Array.isArray(schools) && schools.map((school) => (
                <Button
                  key={school._id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAssign(school._id)}
                >
                  <School className="h-4 w-4 mr-2" />
                  {school.name} ({school.code})
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Report Issue Dialog */}
      <Dialog open={isReportIssueDialogOpen} onOpenChange={setIsReportIssueDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Issue</DialogTitle>
            <DialogDescription>
              Report an issue with {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReportIssue} className="space-y-4">
            <div>
              <Label htmlFor="issue_title">Issue Title</Label>
              <Input
                id="issue_title"
                value={issueForm.title}
                onChange={(e) => setIssueForm({...issueForm, title: e.target.value})}
                placeholder="Brief description of the issue"
                required
              />
            </div>
            <div>
              <Label htmlFor="issue_description">Description</Label>
              <textarea
                id="issue_description"
                value={issueForm.description}
                onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                placeholder="Detailed description of the issue"
                className="w-full p-2 border rounded-md min-h-[100px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue_category">Category</Label>
                <Select value={issueForm.category} onValueChange={(value) => setIssueForm({...issueForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="issue_priority">Priority</Label>
                <Select value={issueForm.priority} onValueChange={(value) => setIssueForm({...issueForm, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P1">P1 - Critical</SelectItem>
                    <SelectItem value="P2">P2 - High</SelectItem>
                    <SelectItem value="P3">P3 - Medium</SelectItem>
                    <SelectItem value="P4">P4 - Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsReportIssueDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Report Issue
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Complete product information</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Product Name</p>
                  <p className="text-sm">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="text-sm capitalize">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Manufacturer</p>
                  <p className="text-sm">{selectedProduct.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Model</p>
                  <p className="text-sm">{selectedProduct.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Serial Number</p>
                  <p className="text-sm">{selectedProduct.serial_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge className={getStatusColor(selectedProduct.status)}>
                    {selectedProduct.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Condition</p>
                  <p className="text-sm capitalize">{selectedProduct.condition}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-sm">{selectedProduct.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Purchase Date</p>
                  <p className="text-sm">{new Date(selectedProduct.purchase_date).toLocaleDateString()}</p>
                </div>
                {selectedProduct.warranty_expiry && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Warranty Expiry</p>
                    <p className="text-sm">{new Date(selectedProduct.warranty_expiry).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedProduct.school_name && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assigned School</p>
                    <p className="text-sm">{selectedProduct.school_name}</p>
                  </div>
                )}
                {selectedProduct.assigned_date && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assigned Date</p>
                    <p className="text-sm">{new Date(selectedProduct.assigned_date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}