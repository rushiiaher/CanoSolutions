"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, Phone, Mail } from "lucide-react"
import ConsultationForm from "@/components/ConsultationForm"
import LogoScroll from "@/components/LogoScroll"

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16"
      style={{
        backgroundImage: 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/0"></div>
      
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-6 lg:space-y-8 fade-in-up">
              

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-textPrimary leading-tight">
                  Transform Your Business with <span className="text-primary font-bold">AI-Powered Solutions</span>
                </h1>
                <p className="text-base sm:text-lg text-textSecondary leading-relaxed">
                  India's leading IT innovator delivering AI-powered solutions, custom software, and digital transformation services. Trusted by government and enterprises nationwide for Web/Mobile Apps, LMS, CRM, ERP, and Cloud solutions that drive real results.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                  <span className="text-black">Government Sector Expertise</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                  <span className="text-black">Future-Ready Technologies</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                  <span className="text-black">End-to-End Digital Transformation</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                  <span className="text-black">Young & Dynamic Team</span>
                </div>
              </div>


              {/* Corporate Logo Scroll - Added between buttons and stats */}
              <div className="py-4">
                <p className="text-xl text-textSecondary mb-2 text-center font-bold">Trusted By:</p>
                <LogoScroll className="bg-white/10 rounded-lg" />
              </div>

              
            </div>
          </div>

          {/* Right Consultation Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <ConsultationForm variant="hero" />
            <div className="flex items-center justify-center space-x-4 pt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+91 73874 01021</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Business@canosolutions.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}