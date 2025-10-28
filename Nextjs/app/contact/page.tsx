"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react"
import ConsultationForm from "@/components/ConsultationForm"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Speak with our experts",
      contact: "+91 73874 01021",
      availability: "Mon-Fri 9AM-7PM IST",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a message",
      contact: "Business@canosolutions.in",
      availability: "24/7 Response",
    },
    {
      icon: MapPin,
      title: "Office",
      description: "Visit our offices",
      contact: "Nashik & Pune, Maharashtra, India",
      availability: "By Appointment",
    },
  ]

  const consultationTypes = [
    {
      title: "AI Strategy Consultation",
      
      description: "Comprehensive AI readiness assessment and implementation roadmap",
      service: "ai",
      includes: [
        "Current state analysis",
        "AI opportunity identification",
        "ROI projections",
        "Implementation timeline",
      ],
    },
    {
      title: "IoT Assessment",
      
      description: "Evaluate your infrastructure for IoT integration opportunities",
      service: "iot",
      includes: [
        "Infrastructure review",
        "Use case identification",
        "Technology recommendations",
        "Cost-benefit analysis",
      ],
    },
    {
      title: "Enterprise Planning",
      
      description: "Complete digital transformation strategy and planning session",
      service: "enterprise",
      includes: [
        "Business process review",
        "Technology gap analysis",
        "Transformation roadmap",
        "Change management plan",
      ],
    },
    {
      title: "Cloud Infrastructure Consultation",
      
      description: "Cloud migration strategy and infrastructure optimization planning",
      service: "cloud",
      includes: [
        "Current infrastructure audit",
        "Cloud migration roadmap",
        "Cost optimization strategies",
        "Security & compliance review",
      ],
    },
    {
      title: "Web Development Strategy",
      
      description: "Modern web application development planning and architecture review",
      service: "web",
      includes: [
        "Technology stack recommendations",
        "User experience planning",
        "Performance optimization",
        "Development timeline",
      ],
    },
    {
      title: "Android App Development",
      
      description: "Native Android application development consultation and planning",
      service: "android",
      includes: [
        "App concept validation",
        "Technical architecture",
        "UI/UX recommendations",
        "Development roadmap",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Get In Touch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-textPrimary mb-6 leading-tight">
              Let's Transform Your
              <span className="text-primary"> Business Together</span>
            </h1>
            <p className="text-xl text-textSecondary mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to start your digital transformation journey? Our experts are here to help you discover the right
              technology solutions for your unique business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card key={index} className="border-0 shadow-lg text-center bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-textPrimary">{method.title}</CardTitle>
                    <CardDescription className="text-textSecondary">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-textPrimary mb-2">{method.contact}</div>
                    <div className="text-sm text-textSecondary">{method.availability}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-textPrimary mb-4">Book a Free Consultation</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">Choose the consultation that best fits your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {consultationTypes.map((consultation, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-textPrimary">{consultation.title}</CardTitle>
                    
                  </div>
                  <CardDescription className="text-textSecondary">{consultation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {consultation.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-textSecondary">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => {
                      const messageSection = document.getElementById('message-section');
                      const serviceSelect = document.querySelector('[data-service-select]') as HTMLElement;
                      if (messageSection) {
                        messageSection.scrollIntoView({ behavior: 'smooth' });
                      }
                      setTimeout(() => {
                        if (serviceSelect) {
                          serviceSelect.click();
                          setTimeout(() => {
                            const option = document.querySelector(`[data-value="${consultation.service}"]`) as HTMLElement;
                            if (option) option.click();
                          }, 100);
                        }
                      }, 500);
                    }}
                  >
                    Book This Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Contact Form */}
          <div id="message-section" className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-textPrimary mb-6 text-center">Send Us a Message</h2>
            <ConsultationForm 
              title="Contact Us"
              description="Fill out the form below and we'll get back to you within 24 hours."
              variant="contact"
              className="border-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-textPrimary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-textSecondary">Common questions about our services and process</p>
          </div>
          <div className="max-w-4xl mx-auto">{/* FAQ Content */}</div>
        </div>
      </section>
    </div>
  )
}
