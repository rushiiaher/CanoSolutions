"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

interface ConsultationFormProps {
  title?: string
  description?: string
  variant?: 'hero' | 'section' | 'contact'
  className?: string
}

export default function ConsultationForm({ 
  title = "Get Your Free Consultation",
  description = "Let's discuss how we can transform your business",
  variant = 'section',
  className = ""
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      service: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      console.log('Submitting form to /.netlify/functions/inquiry')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions'
      
      // First check if the database connection is working
      try {
        const testResponse = await fetch(`${apiUrl}/db-test`)
        if (!testResponse.ok) {
          const testData = await testResponse.json()
          console.error('Database connection test failed:', testData)
          setSubmitMessage('Database connection issue. Please try again later or contact support.')
          setIsSubmitting(false)
          return
        }
      } catch (testError) {
        console.log('DB test error (continuing with form submission):', testError)
        // Continue with form submission even if test fails
      }
      
      const response = await fetch(`${apiUrl}/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: formData.service ? `Service Interest: ${formData.service}\n\n${formData.message}` : formData.message
        }),
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Error parsing response:', parseError)
        setSubmitMessage('Error processing server response. Please try again.')
        setIsSubmitting(false)
        return
      }
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        console.log('Form submitted successfully')
        setSubmitMessage('Thank you! Your inquiry has been submitted successfully.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
      } else {
        console.error('Form submission error:', data)
        const errorMessage = data.details || data.error || 'Failed to submit inquiry'
        setSubmitMessage(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Form submission network error:', error)
      setSubmitMessage('Network error. Please try again or contact support.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          name="firstName"
          placeholder="First Name" 
          className={variant === 'hero' ? "bg-white" : ""} 
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <Input 
          name="lastName"
          placeholder="Last Name" 
          className={variant === 'hero' ? "bg-white" : ""} 
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <Input 
        name="email"
        placeholder="Email Address" 
        type="email" 
        className={variant === 'hero' ? "bg-white" : ""} 
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <Input 
        name="phone"
        placeholder="Phone Number" 
        type="tel" 
        className={variant === 'hero' ? "bg-white" : ""} 
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <Input 
        name="company"
        placeholder="Company Name" 
        className={variant === 'hero' ? "bg-white" : ""} 
        value={formData.company}
        onChange={handleInputChange}
      />
      <Select value={formData.service} onValueChange={handleSelectChange}>
        <SelectTrigger className={variant === 'hero' ? "bg-white" : ""}>
          <SelectValue placeholder="Service Interest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ai">AI & Machine Learning</SelectItem>
          <SelectItem value="iot">LMS/IoT Solutions</SelectItem>
          <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
          <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
          <SelectItem value="web">Web Development</SelectItem>
          <SelectItem value="android">Android Development</SelectItem>
          <SelectItem value="consultation">General Consultation</SelectItem>
        </SelectContent>
      </Select>
      <Textarea 
        name="message"
        placeholder="Tell us about your project requirements..." 
        className={`${variant === 'hero' ? "bg-white" : ""} min-h-[100px]`} 
        value={formData.message}
        onChange={handleInputChange}
        required
      />
      <Button 
        type="submit"
        className={`w-full ${variant === 'hero' ? 'bg-[#DF2E35] hover:bg-[#DF2E35]/90 text-white' : 'btn-primary'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      {submitMessage && (
        <p className={`text-sm text-center ${
          submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
        }`}>
          {submitMessage}
        </p>
      )}
    </form>
  )

  if (variant === 'hero') {
    return (
      <Card className={`bg-white/95 backdrop-blur-sm shadow-2xl border-0 ${className}`}>
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          {formContent}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-white shadow-2xl ${className}`}>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl  font-bold text-textPrimary mb-2">{title}</h3>
            <p className="text-textSecondary">{description}</p>
          </div>
          {formContent}
        </div>
      </CardContent>
    </Card>
  )
}