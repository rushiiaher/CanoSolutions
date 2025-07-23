import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const caseStudies = [
  {
    title: "Smart School Management System",
    client: "Government School District",
    industry: "Education",
    description:
      "Implemented comprehensive IoT-based smart school solution with automated attendance, energy management, and security systems.",
    metrics: [
      { label: "Efficiency Increase", value: "40%", icon: TrendingUp },
      { label: "Time Saved", value: "15hrs/week", icon: Clock },
      { label: "Cost Reduction", value: "₹2L/month", icon: DollarSign },
    ],
    technologies: ["IoT", "AI", "Cloud"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Enterprise Resource Planning",
    client: "Manufacturing Company",
    industry: "Manufacturing",
    description:
      "Digital transformation of legacy systems with modern ERP solution, automated workflows, and real-time analytics.",
    metrics: [
      { label: "Process Automation", value: "85%", icon: TrendingUp },
      { label: "Faster Reporting", value: "10x", icon: Clock },
      { label: "Annual Savings", value: "₹50L", icon: DollarSign },
    ],
    technologies: ["ERP", "AI", "Analytics"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function CaseStudiesSection() {
  return (
    <section id="success-stories" className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-h2  font-bold text-textPrimary">Success Stories</h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            Real results from real clients. See how we've helped organizations transform their operations and achieve
            measurable outcomes.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className={`grid lg:grid-cols-2 gap-12 items-center fade-in-up ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary text-primary">
                      {study.industry}
                    </Badge>
                    <Badge variant="secondary">Case Study</Badge>
                  </div>

                  <h3 className="text-h3  font-bold text-textPrimary">{study.title}</h3>

                  <p className="text-textSecondary leading-relaxed">{study.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {study.metrics.map((metric) => {
                    const IconComponent = metric.icon
                    return (
                      <Card key={metric.label} className="border-borders">
                        <CardContent className="p-4 text-center">
                          <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                          <div className="text-sm text-textSecondary">{metric.label}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-textSecondary">Technologies Used:</div>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="tech-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <Card className="overflow-hidden shadow-lg">
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        
      </div>
    </section>
  )
}
