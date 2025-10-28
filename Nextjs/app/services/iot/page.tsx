import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Zap, Wifi, Shield, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import TechLogo from "@/components/TechLogo"

export default function IoTServicesPage() {
  const iotSolutions = [
    {
      title: "Smart Sensors & Monitoring",
      description: "Real-time data collection and monitoring across your entire operation",
      icon: Zap,
      features: ["Environmental Monitoring", "Equipment Sensors", "Energy Management", "Safety Systems"],
    },
    {
      title: "Connected Infrastructure",
      description: "Seamlessly integrate devices and systems for unified operations",
      icon: Wifi,
      features: ["Network Architecture", "Device Integration", "Protocol Management", "Scalable Connectivity"],
    },
    {
      title: "Data Analytics Platform",
      description: "Transform IoT data into actionable insights and automated responses",
      icon: BarChart3,
      features: ["Real-time Analytics", "Predictive Insights", "Custom Dashboards", "Automated Alerts"],
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security for your IoT ecosystem and data protection",
      icon: Shield,
      features: ["End-to-End Encryption", "Access Control", "Compliance Management", "Threat Detection"],
    },
  ]

  const benefits = [
    { title: "45% Cost Reduction", description: "Average operational cost savings" },
    { title: "60% Efficiency Gain", description: "Improved operational efficiency" },
    { title: "24/7 Monitoring", description: "Continuous system oversight" },
    { title: "99.9% Uptime", description: "Reliable system performance" },
  ]

  const industries = [
    {
      name: "Manufacturing",
      title: "Smart Factory Solutions",
      description: "Optimize production with connected machinery and real-time monitoring",
      applications: ["Production Monitoring", "Quality Control", "Predictive Maintenance", "Supply Chain Tracking"],
      results: "40% increase in production efficiency",
    },
    {
      name: "Agriculture",
      title: "Precision Farming",
      description: "Maximize crop yields with smart irrigation and environmental monitoring",
      applications: ["Soil Monitoring", "Weather Stations", "Automated Irrigation", "Crop Analytics"],
      results: "30% water savings, 25% yield increase",
    },
    {
      name: "Smart Cities",
      title: "Urban Infrastructure",
      description: "Enhance city services with connected infrastructure and data-driven insights",
      applications: ["Traffic Management", "Street Lighting", "Waste Management", "Environmental Monitoring"],
      results: "35% reduction in energy consumption",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#DF2E35]/10 text-[#DF2E35] border-[#DF2E35]/20">
              Internet of Things Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Everything with
              <span className="text-[#DF2E35]"> Smart IoT</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build intelligent, connected ecosystems that optimize operations, reduce costs, and provide real-time
              insights across your entire organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#DF2E35] hover:bg-[#DF2E35]/90 text-white px-8 py-3">
                Start IoT Implementation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
              >
                View IoT Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#DF2E35] mb-2">{benefit.title}</div>
                <div className="text-gray-600 text-sm">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IoT Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive IoT Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end IoT solutions that connect, monitor, and optimize your business operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {iotSolutions.map((solution, index) => {
              const IconComponent = solution.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#DF2E35]/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-[#DF2E35]" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-base">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-[#DF2E35] mr-3 flex-shrink-0" />
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

      {/* Industry Applications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Applications</h2>
            <p className="text-xl text-gray-600">Tailored IoT solutions for specific industry needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-[#DF2E35]/10 text-[#DF2E35] border-[#DF2E35]/20">
                    {industry.name}
                  </Badge>
                  <CardTitle className="text-xl text-gray-900">{industry.title}</CardTitle>
                  <CardDescription className="text-gray-600">{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {industry.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <Settings className="h-4 w-4 text-[#DF2E35] mr-2 flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#DF2E35]/5 p-3 rounded-lg">
                    <div className="text-sm font-medium text-[#DF2E35]">Results:</div>
                    <div className="text-sm text-gray-700">{industry.results}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Implementation Process</h2>
            <p className="text-xl text-gray-600">Structured approach to successful IoT deployment</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment",
                description: "Analyze current infrastructure and identify IoT opportunities",
              },
              { step: "02", title: "Design", description: "Create custom IoT architecture and solution blueprint" },
              {
                step: "03",
                title: "Deploy",
                description: "Install sensors, configure networks, and integrate systems",
              },
              { step: "04", title: "Optimize", description: "Monitor performance and continuously improve operations" },
            ].map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#DF2E35] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{phase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#DF2E35]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Connect Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free IoT assessment and discover how connected solutions can transform your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#DF2E35] hover:bg-gray-100 px-8 py-3">
              Schedule IoT Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#DF2E35] px-8 py-3 bg-transparent"
            >
              Download IoT Guide
            </Button>
          </div>
        </div>
      </section>


    </div>
  )
}
