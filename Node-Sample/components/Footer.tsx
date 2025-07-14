import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react"
import NewsletterSubscription from "@/components/NewsletterSubscription"

export default function Footer() {
  return (
    <footer className="bg-textPrimary text-white">
      <div className="container-max">
        {/* Main Footer */}
        <div className="section-padding border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/canosolutions_logo.jpeg"
                    alt="CanoSolutions Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-inter font-bold text-lg">CanoSolutions</div>
                    <div className="text-xs text-white/70">Think. Innovate. Create.</div>
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
                  className="rounded-full border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="font-inter font-semibold text-lg">Services</h3>
              <div className="space-y-3">
                <Link href="/ai-solutions" className="block text-white/80 hover:text-white transition-colors text-sm">
                  AI & Machine Learning
                </Link>
                <Link href="/iot-systems" className="block text-white/80 hover:text-white transition-colors text-sm">
                  IoT & Smart Systems
                </Link>
                <Link href="/cloud-services" className="block text-white/80 hover:text-white transition-colors text-sm">
                  Cloud & DevOps
                </Link>
                <Link
                  href="/digital-marketing"
                  className="block text-white/80 hover:text-white transition-colors text-sm"
                >
                  Digital Marketing
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h3 className="font-inter font-semibold text-lg">Company</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-white/80 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
                <Link href="/case-studies" className="block text-white/80 hover:text-white transition-colors text-sm">
                  Case Studies
                </Link>
                <Link href="/careers" className="block text-white/80 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
                <Link href="/blog" className="block text-white/80 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="font-inter font-semibold text-lg">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-white/80">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-white/80">hello@canosolutions.com</span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-white/80">Nashik & Pune, Maharashtra, India</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white/5 p-4 rounded-lg">
                <NewsletterSubscription />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} CanoSolutions Private Limited. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
