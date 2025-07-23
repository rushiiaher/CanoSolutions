import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Zap, BarChart3, Users, ArrowRight, CheckCircle, Settings, Database } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "Enterprise Solutions & Digital Transformation | CanoSolutions",
  description:
    "Enterprise software solutions in Pune & Maharashtra. ERP, CRM, business automation, and digital transformation services for large organizations.",
}

const enterpriseServices = [
  {
    title: "ERP Systems",
    description: "Comprehensive enterprise resource planning solutions for streamlined operations",
    icon: Building2,
    features: ["SAP Implementation", "Odoo Customization", "Process Integration", "Data Migration"],
  },
  {
    title: "CRM Solutions",
    description: "Customer relationship management systems to enhance sales and customer service",
    icon: Users,
    features: ["Salesforce Setup", "HubSpot Integration", "Custom CRM", "Sales Automation"],
  },
  {
    title: "Business Intelligence",
    description: "Data-driven insights and analytics for informed decision making",
    icon: BarChart3,
    features: ["Power BI Dashboards", "Data Warehousing", "Reporting Systems", "Predictive Analytics"],
  },
  {
    title: "Workflow Automation",
    description: "Automate repetitive tasks and optimize business processes",
    icon: Zap,
    features: ["Process Automation", "Document Management", "Approval Workflows", "Integration APIs"],
  },
]

const industries = [
  {
    name: "Manufacturing",
    title: "Manufacturing ERP",
    description: "Complete manufacturing management with inventory, production, and quality control",
    solutions: ["Production Planning", "Inventory Management", "Quality Control", "Supply Chain"],
    results: "40% reduction in operational costs",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Healthcare",
    title: "Healthcare Management",
    description: "Integrated healthcare solutions for hospitals and medical institutions",
    solutions: ["Patient Management", "Electronic Records", "Billing Systems", "Compliance"],
    results: "50% improvement in patient care",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Education",
    title: "Educational ERP",
    description: "Comprehensive school and university management systems",
    solutions: ["Student Information", "Academic Management", "Fee Management", "Parent Portal"],
    results: "60% administrative efficiency gain",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const platforms = [
  "SAP", "Odoo", "Microsoft Dynamics", "Salesforce", "HubSpot", "Zoho",
  "Power BI", "Tableau", "QlikView", "SharePoint", "Office 365", "Teams",
  "ServiceNow", "Jira", "Confluence", "Monday.com", "Asana", "Slack"
]

const enterpriseFeatures = [
  {
    icon: Settings,
    title: "Process Automation",
    description: "Streamline workflows and reduce manual tasks"
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Unified data across all business systems"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Real-time insights and business intelligence"
  },
  {
    icon: Users,
    title: "User Management",
    description: "Role-based access and security controls"
  }
]

export default function EnterpriseSolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Building2 className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                Digital Marketing
              </Badge>
              <h1 className="text-h1  font-bold text-textPrimary">
                Transform Your Enterprise with <span className="text-gradient">Digital Solutions</span>
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                Comprehensive enterprise software solutions that streamline operations, enhance productivity, 
                and drive digital transformation across your entire organization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your Enterprise Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">50%</div>
                <div className="text-sm text-textSecondary">Efficiency Boost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">₹5Cr+</div>
                <div className="text-sm text-textSecondary">Cost Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-textSecondary">Enterprises Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Enterprise Software Solutions</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive enterprise solutions designed to optimize operations and accelerate growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enterpriseServices.map((service, index) => {
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

      {/* Enterprise Features */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Key Enterprise Features</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Essential capabilities that drive enterprise success and operational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => {
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
            <h2 className="text-h2  font-bold text-textPrimary">Industry-Specific Solutions</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Tailored enterprise solutions delivering measurable results across various industries
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
              Certified expertise across leading enterprise platforms and business applications
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
            <h2 className="text-h2  font-bold text-textPrimary">Implementation Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Structured approach ensuring successful enterprise transformation with minimal disruption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Analysis", description: "Business process analysis and requirements gathering" },
              { step: "02", title: "Design", description: "Solution architecture and system design" },
              { step: "03", title: "Implementation", description: "System deployment and configuration" },
              { step: "04", title: "Training", description: "User training and change management" },
              { step: "05", title: "Support", description: "Ongoing maintenance and optimization" },
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
            <h2 className="text-h2  font-bold">Ready to Transform Your Enterprise?</h2>
            <p className="text-xl opacity-90">
              Get a free enterprise assessment and discover how our solutions can streamline your 
              operations, reduce costs, and accelerate business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule Enterprise Consultation
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