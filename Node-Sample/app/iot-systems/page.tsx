import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Wifi, Shield, BarChart3, ArrowRight, CheckCircle, Zap, Settings } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "LMS & IoT Systems | CanoSolutions",
  description:
    "Learning Management Systems and IoT solutions in Pune & Maharashtra. Educational technology, smart learning environments, and connected systems.",
}

const lmsIotServices = [
  {
    title: "Learning Management Systems",
    description: "Comprehensive LMS platforms for educational institutions and corporate training",
    icon: Settings,
    features: ["Course Management", "Student Tracking", "Assessment Tools", "Progress Analytics"],
  },
  {
    title: "Smart Learning Environments",
    description: "IoT-enabled classrooms and training facilities with connected learning tools",
    icon: Zap,
    features: ["Interactive Whiteboards", "Attendance Systems", "Environmental Control", "Device Management"],
  },
  {
    title: "Connected Infrastructure",
    description: "Seamlessly integrate devices and systems for unified operations",
    icon: Wifi,
    features: ["Network Architecture", "Device Integration", "Protocol Management", "Scalable Connectivity"],
  },
  {
    title: "Data Analytics Platform",
    description: "Transform learning and IoT data into actionable insights",
    icon: BarChart3,
    features: ["Learning Analytics", "Performance Insights", "Custom Dashboards", "Automated Reports"],
  },
]

const industries = [
  {
    name: "Smart Schools",
    title: "Educational IoT Solutions",
    description: "Transform educational institutions with connected learning environments",
    applications: ["Attendance Systems", "Energy Management", "Security Monitoring", "Learning Analytics"],
    results: "40% improvement in operational efficiency",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Smart Cities",
    title: "Urban Infrastructure",
    description: "Enhance city services with connected infrastructure and data-driven insights",
    applications: ["Traffic Management", "Street Lighting", "Waste Management", "Environmental Monitoring"],
    results: "35% reduction in energy consumption",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Manufacturing",
    title: "Industry 4.0 Solutions",
    description: "Optimize production with connected machinery and real-time monitoring",
    applications: ["Production Monitoring", "Quality Control", "Predictive Maintenance", "Supply Chain Tracking"],
    results: "45% increase in production efficiency",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const technologies = [
  "Arduino", "Raspberry Pi", "ESP32", "LoRaWAN", "Zigbee", "WiFi",
  "Bluetooth", "MQTT", "CoAP", "Node-RED", "InfluxDB", "Grafana",
  "AWS IoT", "Azure IoT", "Google Cloud IoT", "ThingSpeak"
]

export default function IoTSystemsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Cpu className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                LMS & IoT Systems
              </Badge>
              <h1 className="text-h1 font-inter font-bold text-textPrimary">
                Transform Learning with <span className="text-gradient">LMS & IoT</span> Solutions
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                Comprehensive Learning Management Systems and smart IoT solutions that enhance education, 
                optimize operations, and provide real-time insights for educational institutions and businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your LMS/IoT Strategy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">45%</div>
                <div className="text-sm text-textSecondary">Cost Reduction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">60%</div>
                <div className="text-sm text-textSecondary">Efficiency Gain</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-textSecondary">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IoT Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">LMS & IoT Solutions</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive learning management and IoT solutions that enhance education and optimize operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lmsIotServices.map((service, index) => {
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

      {/* Industry Applications */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Industry Applications</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Tailored IoT solutions delivering measurable results across various sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.name} className="bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-card"
                  />
                  <div className="p-6 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {industry.name}
                    </Badge>
                    <h3 className="text-lg font-inter font-semibold text-textPrimary">{industry.title}</h3>
                    <p className="text-textSecondary text-sm">{industry.description}</p>
                    
                    <div className="space-y-2">
                      {industry.applications.map((app) => (
                        <div key={app} className="flex items-center text-xs text-textSecondary">
                          <Settings className="w-3 h-3 text-primary mr-2" />
                          {app}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {industry.results}
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
            <h2 className="text-h2 font-inter font-bold text-textPrimary">LMS & IoT Technology Stack</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Advanced learning management and IoT technologies for comprehensive educational solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <TechLogo key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Implementation Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Structured approach to successful LMS and IoT deployment and integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", description: "Analyze learning needs and identify LMS/IoT opportunities" },
              { step: "02", title: "Design", description: "Create custom LMS and IoT architecture blueprint" },
              { step: "03", title: "Deploy", description: "Implement LMS platform and install IoT infrastructure" },
              { step: "04", title: "Optimize", description: "Monitor learning outcomes and system performance" },
            ].map((phase, index) => (
              <Card key={index} className="bg-white text-center border-0 shadow-lg">
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
            <h2 className="text-h2 font-inter font-bold">Ready to Transform Learning & Operations?</h2>
            <p className="text-xl opacity-90">
              Get a free LMS and IoT assessment to discover how our solutions can enhance education 
              and optimize your organizational operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule LMS/IoT Consultation
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