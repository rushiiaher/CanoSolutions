"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, Phone, Mail } from "lucide-react"
import ConsultationForm from "@/components/ConsultationForm"
import LogoScroll from "@/components/LogoScroll"

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 md:py-16"
      style={{
        backgroundImage: 'url(/BGFCANO/bg1.jpg)',
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-inter font-bold text-Black leading-tight">
                  Transform Your Business with <span className="text-gradient">AI-Powered Solutions</span>
                </h1>
                <p className="text-base sm:text-lg text-Black/90 leading-relaxed">
                  Partner with India’s most innovative IT startup. We deliver cutting-edge AI, IoT, Cloud, and Data-Driven Solutions, trusted by government organizations and enterprises across India. Our expertise includes User-Friendly Websites & Mobile Apps, Custom LMS (Learning Management Systems), CRM Solutions, ERP Platforms, and end-to-end Digital Transformation Services tailored to your needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-black/90">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Government Sector Expertise</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-black/90">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Future-Ready Technologies</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-black/90">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>End-to-End Digital Transformation</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-black/90">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Young & Dynamic Team</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button className="btn-primary group touch-target px-6 py-3">
                  <span className="hidden sm:inline">Make an inquiry</span>
                  <span className="sm:hidden">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-secondary bg-black/10 text-white border-white/30 hover:bg-white/20 touch-target px-6 py-3">
                  View Our Work
                </Button>
              </div>
              
              {/* Corporate Logo Scroll - Added between buttons and stats */}
              <div className="py-4">
                <p className="text-sm text-black/80 mb-2 text-center lg:text-left">Trusted By:</p>
                <LogoScroll className="bg-white/10 rounded-lg" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-sm mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs sm:text-sm text-black/80">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-primary">₹10Cr+</div>
                  <div className="text-xs sm:text-sm text-black/80">Savings</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-primary">99%</div>
                  <div className="text-xs sm:text-sm text-black/80">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Consultation Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <ConsultationForm variant="hero" />
            <div className="flex items-center justify-center space-x-4 pt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>info@canosolutions.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}