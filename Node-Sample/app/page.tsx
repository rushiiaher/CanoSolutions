import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Brain, Cpu, Cloud, Building2, Code, Smartphone, Megaphone } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import TechStackSection from "@/components/TechStackSection"
import WhyCanoSection from "@/components/WhyCanoSection"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import TestimonialsSection from "@/components/TestimonialsSection"

import FinalCTASection from "@/components/FinalCTASection"
import TrustedBySection from "@/components/TrustedBySection"
import FAQSectionSimple from "@/components/FAQSectionSimple"

export default function HomePage() {
  const techStack = [
    { name: "Artificial Intelligence", icon: "Cpu", description: "Machine Learning & AI Solutions" },
    { name: "IoT Solutions", icon: "Zap", description: "Connected Device Ecosystems" },
    { name: "Cloud Computing", icon: "Cloud", description: "Scalable Cloud Infrastructure" },
    { name: "Enterprise Systems", icon: "Building2", description: "Digital Transformation" },
  ]

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      features: ["Responsive Design", "Progressive Web Apps", "E-commerce Solutions", "CMS Development"],
      href: "/web-development",
    },
    {
      title: "Android Development",
      description: "Native Android applications with seamless user experience and performance",
      features: ["Native Android Apps", "Material Design", "API Integration", "App Store Optimization"],
      href: "/android-development",
    },
    {
      title: "AI & Machine Learning",
      description: "Transform your business with intelligent automation and predictive analytics",
      features: ["Predictive Analytics", "Process Automation", "Natural Language Processing", "Computer Vision"],
      href: "/ai-solutions",
    },
    {
      title: "LMS/IoT Solutions",
      description: "Connect and optimize your operations with smart device ecosystems",
      features: ["Smart Sensors", "Real-time Monitoring", "Data Analytics", "Remote Control"],
      href: "/iot-systems",
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable, secure, and cost-effective cloud solutions for modern businesses",
      features: ["Cloud Migration", "Infrastructure Management", "Security & Compliance", "Cost Optimization"],
      href: "/cloud-services",
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing solutions to grow your online presence",
      features: ["SEO Optimization", "PPC Campaigns", "Social Media Marketing", "Content Strategy"],
      href: "/digital-marketing",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "IT Director",
      content:
        "CanoSolutions delivered exceptional AI solutions that transformed our business operations. Their government grant recognition speaks to their credibility.",
      company: "Maharashtra Enterprise",
    },
    {
      name: "Priya Patel",
      role: "Operations Manager",
      content:
        "Their IoT implementation for our smart systems exceeded expectations. The team's expertise in emerging technologies is remarkable.",
      company: "Smart Solutions Ltd",
    },
    {
      name: "Dr. Amit Kulkarni",
      role: "Government Official",
      content:
        "As Holkar Grant winners, CanoSolutions proved their innovation capabilities. Professional service and cutting-edge solutions.",
      company: "Government of Maharashtra",
    },
  ]

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" },
    { number: "100+", label: "Happy Clients" },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-10 sm:py-14 md:py-18 bg-neutralCard relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neutralCard via-neutralCard/90 to-neutralCard opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#DF2E35] mb-3">{stat.number}</div>
                  <div className="text-sm sm:text-base text-textSecondary font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Expert Solutions Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Expert Solutions</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions powered by cutting-edge expertise to drive growth and innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const iconMap = {
                "AI & Machine Learning": Brain,
                "LMS/IoT Solutions": Cpu,
                "Cloud Infrastructure": Cloud,
                "Digital Marketing": Megaphone,
                "Web Development": Code,
                "Android Development": Smartphone
              }
              const IconComponent = iconMap[service.title as keyof typeof iconMap] || Brain
              return (
                <Card
                  key={index}
                  className="border-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 bg-white group rounded-xl overflow-hidden"
                >
                  <div className="h-1 bg-gradient-to-r from-[#DF2E35] to-[#DF2E35]/70"></div>
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#DF2E35]/10 flex items-center justify-center shadow-[0_5px_15px_rgba(223,46,53,0.15)]">
                      <IconComponent className="w-7 h-7 text-[#DF2E35]" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900 group-hover:text-[#DF2E35] transition-colors text-center">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base text-center mt-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 pt-0">
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 text-sm sm:text-base">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#DF2E35] mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="block transform hover:translate-y-[-2px] transition-transform duration-300">
                      <Button
                        variant="outline"
                        className="w-full border-[#DF2E35] text-[#DF2E35] hover:bg-[#DF2E35] hover:text-white bg-transparent touch-target font-medium rounded-lg"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why CanoSolutions Section */}
      <WhyCanoSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* FAQ Section */}
      <FAQSectionSimple />

      {/* CTA Section */}
      <FinalCTASection />
      
    </div>
  )
}
