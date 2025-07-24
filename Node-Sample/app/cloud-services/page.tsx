import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Shield, Zap, Database, ArrowRight, CheckCircle, Server, Lock } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "Cloud Services & Infrastructure | Cano Solutions",
  description:
    "Professional cloud services in Pune & Maharashtra. Cloud migration, DevOps, containerization, and scalable cloud infrastructure solutions.",
}

const cloudServices = [
  {
    title: "Cloud Migration",
    description: "Seamless migration of your applications and data to the cloud",
    icon: Cloud,
    features: ["Assessment & Planning", "Zero-downtime Migration", "Data Security", "Performance Optimization"],
  },
  {
    title: "DevOps & CI/CD",
    description: "Automated deployment pipelines and continuous integration solutions",
    icon: Zap,
    features: ["Pipeline Setup", "Automated Testing", "Container Orchestration", "Monitoring & Alerts"],
  },
  {
    title: "Cloud Security",
    description: "Enterprise-grade security for your cloud infrastructure and applications",
    icon: Shield,
    features: ["Identity Management", "Data Encryption", "Compliance", "Threat Detection"],
  },
  {
    title: "Database Management",
    description: "Scalable database solutions with high availability and performance",
    icon: Database,
    features: ["Database Migration", "Performance Tuning", "Backup & Recovery", "Scaling Solutions"],
  },
]

const cloudPlatforms = [
  {
    name: "Amazon Web Services",
    title: "AWS Cloud Solutions",
    description: "Comprehensive AWS services for scalable, reliable cloud infrastructure",
    services: ["EC2 & Lambda", "RDS & DynamoDB", "S3 Storage", "CloudFormation"],
    benefits: "99.9% uptime guarantee",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Microsoft Azure",
    title: "Azure Cloud Platform",
    description: "Enterprise-grade Azure solutions with seamless Microsoft integration",
    services: ["Virtual Machines", "Azure SQL", "Blob Storage", "Azure DevOps"],
    benefits: "Hybrid cloud capabilities",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Google Cloud Platform",
    title: "GCP Solutions",
    description: "Advanced GCP services with AI/ML integration and global infrastructure",
    services: ["Compute Engine", "Cloud SQL", "Cloud Storage", "Kubernetes Engine"],
    benefits: "AI-powered insights",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const technologies = [
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform",
  "Jenkins", "GitLab CI", "Ansible", "Prometheus", "Grafana", "ELK Stack",
  "Redis", "MongoDB", "PostgreSQL", "Nginx", "Apache", "CloudFormation"
]

const cloudBenefits = [
  {
    icon: Server,
    title: "Scalability",
    description: "Auto-scale resources based on demand"
  },
  {
    icon: Lock,
    title: "Security",
    description: "Enterprise-grade security and compliance"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "High-performance infrastructure worldwide"
  },
  {
    icon: Database,
    title: "Reliability",
    description: "99.9% uptime with disaster recovery"
  }
]

export default function CloudServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Cloud className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                Cloud Services
              </Badge>
              <h1 className="text-h1  font-bold text-textPrimary">
                Scale Infinitely with <span className="text-gradient">Secure Cloud</span> Solutions
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                Transform your infrastructure with enterprise-grade cloud solutions. From migration to 
                optimization, we help businesses leverage the full power of cloud computing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your Cloud Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">60%</div>
                <div className="text-sm text-textSecondary">Cost Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-textSecondary">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3x</div>
                <div className="text-sm text-textSecondary">Faster Deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Our Cloud Services</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive cloud solutions designed to accelerate your digital transformation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cloudServices.map((service, index) => {
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

      {/* Cloud Benefits */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Why Choose Cloud?</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Key advantages of modern cloud infrastructure for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={benefit.title} className="bg-white text-center border-0 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg  font-semibold text-textPrimary">{benefit.title}</h3>
                    <p className="text-textSecondary text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cloud Platforms */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Multi-Cloud Expertise</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Certified expertise across leading cloud platforms for optimal solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudPlatforms.map((platform) => (
              <Card key={platform.name} className="bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <Image
                    src={platform.image || "/placeholder.svg"}
                    alt={platform.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-card"
                  />
                  <div className="p-6 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {platform.name}
                    </Badge>
                    <h3 className="text-lg  font-semibold text-textPrimary">{platform.title}</h3>
                    <p className="text-textSecondary text-sm">{platform.description}</p>
                    
                    <div className="space-y-2">
                      {platform.services.map((service) => (
                        <div key={service} className="flex items-center text-xs text-textSecondary">
                          <CheckCircle className="w-3 h-3 text-primary mr-2" />
                          {service}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {platform.benefits}
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
            <h2 className="text-h2  font-bold text-textPrimary">Cloud Technology Stack</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Modern cloud technologies and DevOps tools for robust, scalable infrastructure
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <TechLogo key={tech} name={tech} className="bg-white" />
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Cloud Migration Process</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              Proven methodology for seamless cloud transformation with minimal disruption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Assessment", description: "Evaluate current infrastructure and requirements" },
              { step: "02", title: "Strategy", description: "Design optimal cloud architecture and migration plan" },
              { step: "03", title: "Migration", description: "Execute phased migration with minimal downtime" },
              { step: "04", title: "Optimization", description: "Fine-tune performance and cost optimization" },
              { step: "05", title: "Support", description: "Ongoing monitoring and maintenance support" },
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
            <h2 className="text-h2  font-bold">Ready to Move to the Cloud?</h2>
            <p className="text-xl opacity-90">
              Get a free cloud readiness assessment and discover how cloud transformation can 
              accelerate your business growth and reduce operational costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule Cloud Consultation
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