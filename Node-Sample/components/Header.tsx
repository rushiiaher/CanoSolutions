"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Brain, Cpu, Cloud, Building2, Code, Smartphone, Phone, Mail, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    { name: "Web Development", href: "/web-development", icon: Code, desc: "Modern web applications" },
    { name: "Android Development", href: "/android-development", icon: Smartphone, desc: "Native mobile apps" },
    { name: "AI Solutions", href: "/ai-solutions", icon: Brain, desc: "Intelligent automation & ML" },
    { name: "LMS/IoT Systems", href: "/iot-systems", icon: Cpu, desc: "Learning & IoT solutions" },
    { name: "Cloud Services", href: "/cloud-services", icon: Cloud, desc: "Scalable infrastructure" },
    { name: "Digital Marketing", href: "/digital-marketing", icon: Megaphone, desc: "Online growth strategies" },
  ]

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsMobileServicesOpen(false)
        setIsServicesOpen(false)
      }
    }
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <Image
                src="/canosolutions_logo.jpeg"
                alt="CanoSolutions Logo"
                width={40}
                height={40}
                className="sm:w-[45px] sm:h-[45px] rounded-xl transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden xs:block">
              <div className="font-inter font-bold text-textPrimary text-lg sm:text-xl tracking-tight">CanoSolutions</div>
              <div className="text-xs text-primary font-medium -mt-1">Think. Innovate. Create.</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.slice(0, 1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-textSecondary hover:text-primary transition-all duration-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center px-4 py-2 text-textSecondary hover:text-primary transition-all duration-300 rounded-lg hover:bg-gray-50 font-medium group"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-2">
                    {services.map((service) => {
                      const IconComponent = service.icon
                      return (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-textPrimary group-hover:text-primary transition-colors">{service.name}</div>
                            <div className="text-sm text-textSecondary">{service.desc}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {navigation.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-textSecondary hover:text-primary transition-all duration-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden xl:flex items-center space-x-4 text-xs">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-1 text-textSecondary">
                <Phone className="w-3 h-3" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-1 text-textSecondary">
                <Mail className="w-3 h-3" />
                <span>info@canosolutions.com</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="btn-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('digital-revolution')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/#digital-revolution';
                }
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Contact Info - Mobile */}
          <div className="flex lg:hidden items-center space-x-3 text-xs">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-1 text-textSecondary">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+91 9876543210</span>
                <span className="sm:hidden">Call</span>
              </div>
              <div className="flex items-center space-x-1 text-textSecondary">
                <Mail className="w-3 h-3" />
                <span className="hidden sm:inline">info@canosolutions.com</span>
                <span className="sm:hidden">Email</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 sm:p-3 rounded-xl hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={20} className="sm:w-6 sm:h-6 text-textPrimary" />
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="w-5 h-0.5 bg-textPrimary rounded-full transition-all duration-300"></div>
                <div className="w-5 h-0.5 bg-textPrimary rounded-full transition-all duration-300"></div>
                <div className="w-5 h-0.5 bg-textPrimary rounded-full transition-all duration-300"></div>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="py-6 px-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-all font-medium"
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileServicesOpen && (
                  <div className="ml-4 space-y-1">
                    {services.map((service) => {
                      const IconComponent = service.icon
                      return (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-all"
                          onClick={() => {
                            setIsMenuOpen(false)
                            setIsMobileServicesOpen(false)
                          }}
                        >
                          <IconComponent className="w-5 h-5 mr-3 text-primary" />
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-xs text-textSecondary">{service.desc}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
              
              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              

              
              <div className="pt-4">
                <Button 
                  className="btn-primary w-full py-3 rounded-xl font-semibold"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (window.location.pathname === '/') {
                      setTimeout(() => {
                        document.getElementById('digital-revolution')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    } else {
                      window.location.href = '/#digital-revolution';
                    }
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
