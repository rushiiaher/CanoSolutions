"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, QrCode, Package, Calendar, AlertTriangle, Send, ShoppingCart, Edit, Trash2, X } from "lucide-react"
import { toast } from "sonner"

interface Product {
  _id: string
  product_code: string
  name: string
  category: string
  model?: string
  brand?: string
  purchase_date: string
  warranty_expiry_date: string
  purchase_price?: number
  status: 'available' | 'assigned' | 'retired'
  created_at: string
}

interface Asset {
  _id: string
  product_id: string
  school_id: string
  asset_code: string
  assigned_date: string
  status: 'in_service' | 'under_repair' | 'retired' | 'lost'
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  location?: string
  created_at: string
  product?: Product
  school?: { name: string; code: string }
}

interface School {
  _id: string
  name: string
  code: string
}

export default function AssetsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isEditAssetDialogOpen, setIsEditAssetDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    model: "",
    brand: "",
    purchase_date: "",
    warranty_expiry_date: "",
    purchase_price: ""
  })

  const [assignForm, setAssignForm] = useState({
    school_id: "",
    location: "",
    condition: "good"
  })

  const [editAssetForm, setEditAssetForm] = useState({
    status: "",
    condition: "",
    location: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, assetsRes, schoolsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/assets'),
        fetch('/api/schools')
      ])
      
      const [productsData, assetsData, schoolsData] = await Promise.all([
        productsRes.json(),
        assetsRes.json(),
        schoolsRes.json()
      ])

      if (productsData.success) setProducts(productsData.data.data || [])
      if (assetsData.success) setAssets(assetsData.data.data || [])
      if (schoolsData.success) setSchools(schoolsData.data.data || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product added successfully')
        setIsProductDialogOpen(false)
        resetProductForm()
        fetchData()
      } else {
        toast.error(result.message || 'Failed to add product')
      }
    } catch (error) {
      toast.error('Failed to add product')
    }
  }

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedProduct) return

    try {
      const response = await fetch('/api/assets/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: selectedProduct._id,
          ...assignForm
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product assigned to school successfully')
        setIsAssignDialogOpen(false)
        setSelectedProduct(null)
        resetAssignForm()
        fetchData()
      } else {
        toast.error(result.message || 'Failed to assign product')
      }
    } catch (error) {
      toast.error('Failed to assign product')
    }
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      category: "",
      model: "",
      brand: "",
      purchase_date: "",
      warranty_expiry_date: "",
      purchase_price: ""
    })
  }

  const resetAssignForm = () => {
    setAssignForm({
      school_id: "",
      location: "",
      condition: "good"
    })
  }

  const openAssignDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsAssignDialogOpen(true)
  }

  const openEditAssetDialog = (asset: Asset) => {
    setSelectedAsset(asset)
    setEditAssetForm({
      status: asset.status,
      condition: asset.condition,
      location: asset.location || ""
    })
    setIsEditAssetDialogOpen(true)
  }

  const handleEditAssetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAsset) return

    try {
      const response = await fetch(`/api/assets/${selectedAsset._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editAssetForm)
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Asset updated successfully')
        setIsEditAssetDialogOpen(false)
        setSelectedAsset(null)
        fetchData()
      } else {
        toast.error(result.message || 'Failed to update asset')
      }
    } catch (error) {
      toast.error('Failed to update asset')
    }
  }

  const handleDeleteAsset = async (assetId: string) => {
    if (!confirm('Are you sure you want to delete this asset? This will make the product available again.')) return
    
    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Asset deleted successfully')
        fetchData()
      } else {
        toast.error(result.message || 'Failed to delete asset')
      }
    } catch (error) {
      toast.error('Failed to delete asset')
    }
  }

  const handleDeassignAsset = async (assetId: string) => {
    if (!confirm('Are you sure you want to deassign this product? It will become available for reassignment.')) return
    
    try {
      const response = await fetch(`/api/assets/${assetId}/deassign`, {
        method: 'POST'
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product deassigned successfully')
        fetchData()
      } else {
        toast.error(result.message || 'Failed to deassign product')
      }
    } catch (error) {
      toast.error('Failed to deassign product')
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      assigned: 'bg-blue-100 text-blue-800',
      retired: 'bg-gray-100 text-gray-800',
      in_service: 'bg-green-100 text-green-800',
      under_repair: 'bg-orange-100 text-orange-800',
      lost: 'bg-red-100 text-red-800'
    }
    return <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
      {status.replace('_', ' ')}
    </Badge>
  }

  const isWarrantyExpiring = (product: Product) => {
    const endDate = new Date(product.warranty_expiry_date)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return endDate <= thirtyDaysFromNow
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = !statusFilter || statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.school?.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
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
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600 mt-1">Manage products and school assignments</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={resetProductForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a product to inventory with purchase and warranty details
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Smart Board 65 inch"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Digital Boards">Digital Boards</SelectItem>
                        <SelectItem value="Smart TVs">Smart TVs</SelectItem>
                        <SelectItem value="Computers">Computers/Laptops</SelectItem>
                        <SelectItem value="Projectors">Projectors</SelectItem>
                        <SelectItem value="UPS Systems">UPS Systems</SelectItem>
                        <SelectItem value="CCTV Cameras">CCTV Cameras</SelectItem>
                        <SelectItem value="Network Equipment">Network Equipment</SelectItem>
                        <SelectItem value="Computer Equipment">Computer Equipment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={productForm.brand}
                      onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="e.g., Samsung, LG"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={productForm.model}
                      onChange={(e) => setProductForm(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="Model number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase_date">Purchase Date *</Label>
                    <Input
                      id="purchase_date"
                      type="date"
                      value={productForm.purchase_date}
                      onChange={(e) => setProductForm(prev => ({ ...prev, purchase_date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warranty_expiry_date">Warranty Expiry Date *</Label>
                    <Input
                      id="warranty_expiry_date"
                      type="date"
                      value={productForm.warranty_expiry_date}
                      onChange={(e) => setProductForm(prev => ({ ...prev, warranty_expiry_date: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase_price">Purchase Price</Label>
                  <Input
                    id="purchase_price"
                    type="number"
                    value={productForm.purchase_price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, purchase_price: e.target.value }))}
                    placeholder="Amount in INR"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-primary">
                    Add Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.status === 'available').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assets.length}
                </p>
              </div>
              <Send className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warranty Expiring</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => isWarrantyExpiring(p)).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Product Inventory</TabsTrigger>
          <TabsTrigger value="assignments">School Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Digital Boards">Digital Boards</SelectItem>
                    <SelectItem value="Smart TVs">Smart TVs</SelectItem>
                    <SelectItem value="Computers">Computers</SelectItem>
                    <SelectItem value="Projectors">Projectors</SelectItem>
                    <SelectItem value="UPS Systems">UPS Systems</SelectItem>
                    <SelectItem value="CCTV Cameras">CCTV Cameras</SelectItem>
                    <SelectItem value="Network Equipment">Network Equipment</SelectItem>
                    <SelectItem value="Computer Equipment">Computer Equipment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
              <CardDescription>
                Product inventory with purchase and warranty details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Details</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.product_code}</p>
                          {product.brand && <p className="text-xs text-gray-400">{product.brand} {product.model}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(product.purchase_date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">
                            {new Date(product.warranty_expiry_date).toLocaleDateString()}
                          </span>
                          {isWarrantyExpiring(product) && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product.status)}
                      </TableCell>
                      <TableCell>
                        {product.status === 'available' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openAssignDialog(product)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Assignments ({filteredAssets.length})</CardTitle>
              <CardDescription>
                Products assigned to schools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Asset Code</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{asset.product?.name}</p>
                          <p className="text-sm text-gray-500">{asset.product?.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{asset.school?.name}</p>
                          <p className="text-sm text-gray-500">{asset.school?.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <QrCode className="w-3 h-3 mr-1" />
                          {asset.asset_code}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(asset.assigned_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(asset.status)}
                      </TableCell>
                      <TableCell>
                        {asset.location || 'Not specified'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeassignAsset(asset._id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditAssetDialog(asset)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteAsset(asset._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign Product Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Product to School</DialogTitle>
            <DialogDescription>
              Assign {selectedProduct?.name} to a school
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAssignSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school_id">School *</Label>
              <Select value={assignForm.school_id} onValueChange={(value) => setAssignForm(prev => ({ ...prev, school_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school._id} value={school._id}>
                      {school.name} ({school.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={assignForm.location}
                onChange={(e) => setAssignForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Room 101, Lab A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={assignForm.condition} onValueChange={(value) => setAssignForm(prev => ({ ...prev, condition: value }))}>
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary">
                Assign Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Asset Dialog */}
      <Dialog open={isEditAssetDialogOpen} onOpenChange={setIsEditAssetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>
              Update asset status, condition, and location
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditAssetSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit_status">Status</Label>
              <Select value={editAssetForm.status} onValueChange={(value) => setEditAssetForm(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_service">In Service</SelectItem>
                  <SelectItem value="under_repair">Under Repair</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_condition">Condition</Label>
              <Select value={editAssetForm.condition} onValueChange={(value) => setEditAssetForm(prev => ({ ...prev, condition: value }))}>
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

            <div className="space-y-2">
              <Label htmlFor="edit_location">Location</Label>
              <Input
                id="edit_location"
                value={editAssetForm.location}
                onChange={(e) => setEditAssetForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Room 101, Lab A"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditAssetDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary">
                Update Asset
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}