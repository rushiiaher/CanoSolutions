import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Target, BarChart3, Users, ArrowRight, CheckCircle, TrendingUp, Eye } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "Digital Marketing Services & Online Growth | CanoSolutions",
  description:
    "Digital marketing services in Pune & Maharashtra. SEO, PPC, social media marketing, content marketing, and online advertising solutions for business growth.",
}

const marketingServices = [
  {
    title: "Search Engine Optimization",
    description: "Boost your online visibility and organic traffic with proven SEO strategies",
    icon: TrendingUp,
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"],
  },
  {
    title: "Pay-Per-Click Advertising",
    description: "Drive targeted traffic and maximize ROI with strategic PPC campaigns",
    icon: Target,
    features: ["Google Ads", "Facebook Ads", "Campaign Optimization", "Conversion Tracking"],
  },
  {
    title: "Social Media Marketing",
    description: "Build brand awareness and engage customers across social platforms",
    icon: Users,
    features: ["Content Strategy", "Community Management", "Influencer Marketing", "Social Analytics"],
  },
  {
    title: "Content Marketing",
    description: "Create compelling content that drives engagement and conversions",
    icon: Eye,
    features: ["Blog Writing", "Video Marketing", "Email Campaigns", "Content Strategy"],
  },
]

const industries = [
  {
    name: "E-commerce",
    title: "E-commerce Marketing",
    description: "Complete digital marketing solutions for online stores and marketplaces",
    solutions: ["Product Advertising", "Shopping Campaigns", "Conversion Optimization", "Retargeting"],
    results: "300% increase in online sales",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Healthcare",
    title: "Healthcare Marketing",
    description: "Compliant digital marketing strategies for healthcare providers",
    solutions: ["Local SEO", "Patient Acquisition", "Reputation Management", "Content Marketing"],
    results: "150% growth in patient inquiries",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Real Estate",
    title: "Real Estate Marketing",
    description: "Lead generation and brand building for real estate professionals",
    solutions: ["Lead Generation", "Property Promotion", "Virtual Tours", "Local Marketing"],
    results: "200% increase in qualified leads",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const platforms = [
  "Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", "YouTube Ads", "Twitter Ads",
  "Google Analytics", "Facebook Business", "Mailchimp", "HubSpot", "Hootsuite", "Buffer",
  "SEMrush", "Ahrefs", "Moz", "Canva", "Adobe Creative", "WordPress"
]

const marketingFeatures = [
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive tracking and performance insights"
  },
  {
    icon: Target,
    title: "Targeted Campaigns",
    description: "Precision targeting for maximum ROI"
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "Continuous optimization for better results"
  },
  {
    icon: Megaphone,
    title: "Brand Amplification",
    description: "Increase brand visibility and awareness"
  }
]

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Megaphone className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                Digital Marketing
              </Badge>
              <h1 className="text-h1  font-bold text-textPrimary">
                Grow Your Business with <span className="text-gradient">Digital Marketing</span>
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                Comprehensive digital marketing solutions that drive traffic, generate leads, 
                and boost your online presence across all digital channels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your Marketing Strategy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">300%</div>
                <div className="text-sm text-textSecondary">Traffic Growth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">₹10L+</div>
                <div className="text-sm text-textSecondary">Ad Spend Managed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-textSecondary">Brands Promoted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Digital Marketing Services</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive digital marketing solutions designed to maximize your online growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketingServices.map((service, index) => {
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

      {/* Marketing Features */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Key Marketing Features</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Essential capabilities that drive marketing success and business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.title} className="bg-white text-center border-0 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg  font-semibold text-textPrimary">{feature.title}</h3>
                    <p className="text-textSecondary text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Industry-Specific Marketing</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Tailored digital marketing strategies delivering measurable results across various industries
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
                    <h3 className="text-lg  font-semibold text-textPrimary">{industry.title}</h3>
                    <p className="text-textSecondary text-sm">{industry.description}</p>
                    
                    <div className="space-y-2">
                      {industry.solutions.map((solution) => (
                        <div key={solution} className="flex items-center text-xs text-textSecondary">
                          <CheckCircle className="w-3 h-3 text-primary mr-2" />
                          {solution}
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

      {/* Platform Expertise */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Platform Expertise</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Certified expertise across leading digital marketing platforms and advertising networks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {platforms.map((platform) => (
              <TechLogo key={platform} name={platform} className="bg-white" />
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Marketing Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Structured approach ensuring successful digital marketing campaigns with measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Research", description: "Market research and competitor analysis" },
              { step: "02", title: "Strategy", description: "Custom marketing strategy development" },
              { step: "03", title: "Implementation", description: "Campaign launch and execution" },
              { step: "04", title: "Optimization", description: "Performance monitoring and optimization" },
              { step: "05", title: "Reporting", description: "Detailed analytics and ROI reporting" },
            ].map((phase, index) => (
              <Card key={index} className="bg-neutralCard text-center border-0">
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
            <h2 className="text-h2  font-bold">Ready to Boost Your Online Presence?</h2>
            <p className="text-xl opacity-90">
              Get a free digital marketing audit and discover how our strategies can increase your 
              traffic, generate more leads, and grow your business online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Get Free Marketing Audit
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