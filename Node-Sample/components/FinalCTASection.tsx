"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import ConsultationForm from "@/components/ConsultationForm"

export default function FinalCTASection() {
  return (
    <section id="digital-revolution" className="section-padding bg-primary text-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - CTA Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-h2 font-inter font-bold">Ready to Join the Digital Revolution?</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Transform your business with cutting-edge AI, IoT, and Cloud solutions. Let's discuss how we can help
                you achieve your digital transformation goals.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Free consultation and project assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Custom solution roadmap within 48 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>No obligation, transparent pricing</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-8 border-t border-white/20">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>hello@canosolutions.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Nashik & Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <ConsultationForm 
            description="Fill out the form below and we'll get back to you within 24 hours."
            variant="section"
          />
        </div>
      </div>
    </section>
  )
}
