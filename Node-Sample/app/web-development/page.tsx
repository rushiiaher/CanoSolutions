import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Globe, Smartphone, ArrowRight, CheckCircle, Layers, Database } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "Web Development Services | Cano Solutions",
  description:
    "Professional web development services in Pune & Maharashtra. Custom websites, web applications, e-commerce solutions with modern technologies.",
}

const webServices = [
  {
    title: "Custom Web Applications",
    description: "Scalable, responsive web applications tailored to your business needs",
    icon: Code,
    features: ["React/Next.js", "Progressive Web Apps", "API Integration", "Real-time features"],
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online stores with payment gateways and inventory management",
    icon: Globe,
    features: ["Shopify/WooCommerce", "Payment Integration", "Inventory Management", "SEO Optimized"],
  },
  {
    title: "Enterprise Portals",
    description: "Corporate websites and internal portals for large organizations",
    icon: Layers,
    features: ["CMS Integration", "User Management", "Analytics Dashboard", "Security Features"],
  },
  {
    title: "Database Solutions",
    description: "Robust backend systems with efficient data management",
    icon: Database,
    features: ["MySQL/PostgreSQL", "MongoDB", "Redis Caching", "Data Migration"],
  },
]

const technologies = [
  "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express.js",
  "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS", "Vercel"
]

const portfolioProjects = [
  {
    title: "Government Portal",
    description: "Digital transformation portal for Maharashtra government services",
    features: ["Citizen Services", "Document Management", "Multi-language Support"],
    results: "50% faster service delivery",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "E-commerce Platform",
    description: "Multi-vendor marketplace with advanced analytics",
    features: ["Vendor Management", "Payment Gateway", "Analytics Dashboard"],
    results: "300% increase in online sales",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Educational Platform",
    description: "Smart school management system with IoT integration",
    features: ["Student Portal", "Attendance System", "Grade Management"],
    results: "40% improvement in efficiency",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="text-primary font-mono text-[20rem] font-bold select-none">&lt;/&gt;</div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                Web Development
              </Badge>
              <h1 className="text-h1  font-bold text-textPrimary">
                Build Modern <span className="text-gradient">Web Applications</span> That Drive Results
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                From responsive websites to complex web applications, we create digital experiences that 
                engage users and accelerate business growth using cutting-edge technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your Web Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-textSecondary">Web Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-textSecondary">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-textSecondary">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Our Web Development Services</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive web solutions designed to meet your business objectives and user expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {webServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={service.title} className="card-hover border-borders">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl  font-semibold text-textPrimary">{service.title}</h3>
                      <p className="text-textSecondary">{service.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-textSecondary">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Featured Projects</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Real-world web applications delivering measurable business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Card key={project.title} className="bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-card"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg  font-semibold text-textPrimary">{project.title}</h3>
                    <p className="text-textSecondary text-sm">{project.description}</p>
                    
                    <div className="space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center text-xs text-textSecondary">
                          <CheckCircle className="w-3 h-3 text-primary mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {project.results}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Our Technology Stack</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Modern technologies and frameworks for robust, scalable web solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <TechLogo key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Our Development Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Structured approach ensuring quality delivery and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding requirements and planning architecture" },
              { step: "02", title: "Design", description: "UI/UX design and prototype development" },
              { step: "03", title: "Development", description: "Coding, testing, and quality assurance" },
              { step: "04", title: "Launch", description: "Deployment, monitoring, and ongoing support" },
            ].map((phase, index) => (
              <Card key={index} className="bg-white text-center border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="text-lg  font-semibold text-textPrimary">{phase.title}</h3>
                  <p className="text-textSecondary text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-max text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-h2  font-bold">Ready to Build Your Web Presence?</h2>
            <p className="text-xl opacity-90">
              Get a free consultation and discover how our web development expertise can transform 
              your digital presence and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule Web Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}