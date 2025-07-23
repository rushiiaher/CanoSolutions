"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Cpu, Cloud, Building2, ArrowRight, Zap } from "lucide-react"

interface TechStackItem {
  name: string
  icon: string
  description: string
}

interface TechStackSectionProps {
  techStack: TechStackItem[]
}

const iconMap = {
  Brain,
  Cpu,
  Cloud,
  Building2,
  Zap,
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-h2  font-bold text-textPrimary">Our Technology Expertise</h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            From AI-powered automation to smart IoT systems, we deliver comprehensive technology solutions that drive
            real business transformation.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => {
            const IconComponent = iconMap[tech.icon as keyof typeof iconMap] || Cpu
            return (
              <Card
                key={tech.name}
                className={`card-hover border-2 transition-all duration-300 fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(tech.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-8 text-center space-y-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 ${hoveredCard === tech.name ? "scale-110" : ""}`}
                  >
                    <IconComponent className={`w-8 h-8 text-primary`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl  font-semibold text-textPrimary">{tech.name}</h3>
                    <p className="text-textSecondary text-sm leading-relaxed">{tech.description}</p>
                  </div>

                  {/* CTA Link */}
                  <Link href="/contact" className="inline-flex items-center text-primary font-medium group">
                    Explore Solutions
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-textSecondary mb-6 max-w-2xl mx-auto">Need a custom solution combining multiple technologies?</p>
          <Button 
            className="btn-primary inline-flex items-center"
            onClick={() => {
              document.getElementById('digital-revolution')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
