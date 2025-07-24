import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
import NewsletterSubscription from "./NewsletterSubscription";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-textPrimary to-textPrimary/95 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      
      <div className="container-max relative z-10">
        {/* Main Footer */}
        <div className="section-padding border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-4 mb-5">
                  <div className="p-1 bg-white/10 rounded-xl shadow-inner">
                    <Image
                      src="/canosolutions_logo.jpg"
                      alt="CanoSolutions Logo"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs tracking-tight">CanoSolutions</div>
                    <div className="text-10px text-white/70 font-medium">Think. Innovate. Create.</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Transforming businesses with cutting-edge AI, IoT, and Cloud solutions. Your trusted partner for
                  digital transformation.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 hover:border-primary/50 bg-transparent hover:shadow-[0_0_15px_rgba(223,46,53,0.2)] transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 hover:border-primary/50 bg-transparent hover:shadow-[0_0_15px_rgba(223,46,53,0.2)] transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 hover:border-primary/50 bg-transparent hover:shadow-[0_0_15px_rgba(223,46,53,0.2)] transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
              </h3>
              <div className="space-y-3">
                <Link href="/ai-solutions" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  AI & Machine Learning
                </Link>
                <Link href="/iot-systems" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  IoT & Smart Systems
                </Link>
                <Link href="/cloud-services" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  Cloud & DevOps
                </Link>
                <Link
                  href="/digital-marketing"
                  className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  Digital Marketing
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg relative inline-block">
                Company
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
              </h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  About Us
                </Link>
                <Link href="/case-studies" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  Case Studies
                </Link>
                <Link href="/careers" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  Careers
                </Link>
                <Link href="/blog" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                  Blog
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm group hover:translate-x-1 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm group hover:translate-x-1 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">hello@canosolutions.com</span>
                </div>
                <div className="flex items-start space-x-3 text-sm group hover:translate-x-1 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-inner mt-0.5">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">Nashik & Pune, Maharashtra, India</span>
                </div>
              </div>


            </div>
          </div>
          
          {/* Newsletter Section - Horizontal */}
          <div className="border-t border-white/10 pt-12 mt-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 p-6 rounded-xl shadow-inner border border-white/5 backdrop-blur-sm">
                <NewsletterSubscription />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} <span className="text-white/80 font-medium">CanoSolutions Private Limited</span>. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors hover:underline decoration-primary underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors hover:underline decoration-primary underline-offset-4">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-white transition-colors hover:underline decoration-primary underline-offset-4">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
