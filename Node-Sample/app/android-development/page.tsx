import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Zap, Shield, Users, ArrowRight, CheckCircle, Play, Download, Bell } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "Android App Development Services | CanoSolutions",
  description:
    "Professional Android app development in Pune & Maharashtra. Native Android apps, cross-platform solutions, and mobile app consulting services.",
}

const androidServices = [
  {
    title: "Native Android Apps",
    description: "High-performance native Android applications with optimal user experience",
    icon: Smartphone,
    features: ["Kotlin/Java Development", "Material Design", "Google Play Store", "Performance Optimized"],
  },
  {
    title: "Cross-Platform Solutions",
    description: "Cost-effective apps that work seamlessly across Android and iOS platforms",
    icon: Zap,
    features: ["Flutter/React Native", "Single Codebase", "Faster Development", "Consistent UI/UX"],
  },
  {
    title: "Enterprise Mobile Apps",
    description: "Secure, scalable mobile solutions for large organizations and businesses",
    icon: Shield,
    features: ["Enterprise Security", "API Integration", "Offline Capabilities", "Admin Dashboards"],
  },
  {
    title: "App Modernization",
    description: "Update and enhance existing Android applications with modern features",
    icon: Users,
    features: ["Legacy Migration", "UI/UX Redesign", "Performance Boost", "New Features"],
  },
]

const technologies = [
  "Kotlin", "Java", "Android Studio", "Flutter", "React Native", "Firebase",
  "SQLite", "Room Database", "Retrofit", "Dagger/Hilt", "Jetpack Compose", "Material Design",
  "Google Play Services", "Push Notifications", "In-App Purchases", "Google Maps API"
]

const appProjects = [
  {
    title: "Smart School App",
    description: "Comprehensive school management app with IoT integration",
    features: ["Student Portal", "Attendance Tracking", "Parent Communication"],
    results: "95% user satisfaction",
    downloads: "10K+ downloads",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "E-commerce Mobile App",
    description: "Feature-rich shopping app with seamless payment integration",
    features: ["Product Catalog", "Secure Payments", "Order Tracking"],
    results: "200% increase in mobile sales",
    downloads: "25K+ downloads",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Government Services App",
    description: "Citizen services app for Maharashtra government initiatives",
    features: ["Document Services", "Bill Payments", "Service Requests"],
    results: "60% faster service delivery",
    downloads: "50K+ downloads",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const appFeatures = [
  {
    icon: Bell,
    title: "Push Notifications",
    description: "Real-time engagement with targeted messaging"
  },
  {
    icon: Shield,
    title: "Security Features",
    description: "Advanced encryption and secure data handling"
  },
  {
    icon: Download,
    title: "Offline Support",
    description: "Seamless functionality without internet connection"
  },
  {
    icon: Play,
    title: "Play Store Ready",
    description: "Optimized for Google Play Store guidelines"
  }
]

export default function AndroidDevelopmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg className="w-96 h-96 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zM20.5 8c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
          </svg>
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                Android Development
              </Badge>
              <h1 className="text-h1 font-inter font-bold text-textPrimary">
                Create Powerful <span className="text-gradient">Android Apps</span> That Users Love
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                From concept to Play Store, we develop high-quality Android applications that deliver 
                exceptional user experiences and drive business growth through mobile innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your Android Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">30+</div>
                <div className="text-sm text-textSecondary">Apps Launched</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100K+</div>
                <div className="text-sm text-textSecondary">Total Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-textSecondary">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Android Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Our Android Development Services</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive mobile app development solutions tailored to your business needs and user expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {androidServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={service.title} className="card-hover border-borders">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-inter font-semibold text-textPrimary">{service.title}</h3>
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

      {/* App Features */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Essential App Features</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Modern Android app capabilities that enhance user engagement and business value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.title} className="bg-white text-center border-0 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-inter font-semibold text-textPrimary">{feature.title}</h3>
                    <p className="text-textSecondary text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* App Portfolio */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Featured Android Apps</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Successful mobile applications delivering real business impact and user satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {appProjects.map((project) => (
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
                    <h3 className="text-lg font-inter font-semibold text-textPrimary">{project.title}</h3>
                    <p className="text-textSecondary text-sm">{project.description}</p>
                    
                    <div className="space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center text-xs text-textSecondary">
                          <CheckCircle className="w-3 h-3 text-primary mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                        {project.results}
                      </div>
                      <div className="text-xs text-textSecondary font-medium">
                        {project.downloads}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Android Development Stack</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Latest Android technologies and tools for building robust, scalable mobile applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <TechLogo key={tech} name={tech} className="bg-white" />
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">App Development Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Proven methodology ensuring successful app launches and user satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Strategy", description: "Market research and app concept validation" },
              { step: "02", title: "Design", description: "UI/UX design and user experience optimization" },
              { step: "03", title: "Development", description: "Native Android coding and feature implementation" },
              { step: "04", title: "Testing", description: "Quality assurance and device compatibility testing" },
              { step: "05", title: "Launch", description: "Play Store deployment and post-launch support" },
            ].map((phase, index) => (
              <Card key={index} className="bg-neutralCard text-center border-0">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-inter font-semibold text-textPrimary">{phase.title}</h3>
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
            <h2 className="text-h2 font-inter font-bold">Ready to Launch Your Android App?</h2>
            <p className="text-xl opacity-90">
              Transform your mobile app idea into reality with our expert Android development team. 
              Get a free consultation and project estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule Android Consultation
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