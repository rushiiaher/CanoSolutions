import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Target, Lightbulb } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About CanoSolutions | Leading IT Solutions Company in Maharashtra",
  description:
    "Learn about CanoSolutions - Government grant winner delivering innovative AI, IoT & Cloud solutions since 2022. Meet our team and discover our mission.",
}

const milestones = [
  {
    year: "2022",
    event: "Company Founded",
    description: "CanoSolutions established with vision to transform businesses through technology",
  },
  {
    year: "2022",
    event: "First Major Project",
    description: "Delivered smart school management system for government district",
  },
  {
    year: "2023",
    event: "Holkar Grant Winner",
    description: "Received prestigious government grant for innovation in smart city solutions",
  },
  {
    year: "2023",
    event: "Team Expansion",
    description: "Grew to 15+ skilled professionals across AI, IoT, and Cloud domains",
  },
  {
    year: "2024",
    event: "50+ Projects",
    description: "Successfully delivered 50+ projects across government and enterprise sectors",
  },
]

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly explore cutting-edge technologies to deliver future-ready solutions.",
  },
  {
    icon: Users,
    title: "Client Success",
    description: "Your success is our primary measure. We're committed to delivering measurable outcomes.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code quality to client service.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Transparent communication, honest pricing, and ethical business practices guide our work.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-primary text-primary">
                  About CanoSolutions
                </Badge>
                <h1 className="text-h1 font-inter font-bold text-textPrimary">
                  Transforming Businesses Through <span className="text-gradient">Innovation</span>
                </h1>
                <p className="text-xl text-textSecondary leading-relaxed">
                  Founded in 2022, CanoSolutions has rapidly emerged as Maharashtra's most trusted partner for AI, IoT,
                  and digital transformation solutions. We combine startup agility with enterprise expertise to deliver
                  cutting-edge technology solutions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-textSecondary">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-textSecondary">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-textSecondary">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">99%</div>
                  <div className="text-textSecondary">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="CanoSolutions Team"
                width={600}
                height={500}
                className="w-full h-auto rounded-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-h3 font-inter font-bold text-textPrimary">Our Mission</h2>
                <p className="text-textSecondary leading-relaxed">
                  To democratize access to cutting-edge technology solutions by making AI, IoT, and Cloud computing
                  accessible to businesses of all sizes. We believe every organization deserves the opportunity to
                  leverage technology for growth and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-h3 font-inter font-bold text-textPrimary">Our Vision</h2>
                <p className="text-textSecondary leading-relaxed">
                  To be globally recognized as the most trusted technology partner for digital transformation, known for
                  our innovation, reliability, and commitment to client success. We envision a future where technology
                  seamlessly enhances human potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Our Journey</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">From startup to government-trusted partner in just two years</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <Card className="flex-1 bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-inter font-semibold text-textPrimary">{milestone.event}</h3>
                      <Badge variant="outline" className="text-xs">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-textSecondary">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 font-inter font-bold text-textPrimary">Our Values</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={value.title} className="text-center border-0 shadow-lg card-hover">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-inter font-semibold text-textPrimary">{value.title}</h3>
                    <p className="text-textSecondary text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-padding bg-primary text-white">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-h2 font-inter font-bold">Government Recognition</h2>
              <p className="text-xl opacity-90">
                We're proud to be recognized by Holkar Science City with a prestigious government grant for our
                innovative approach to smart city solutions.
              </p>
            </div>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Award className="w-12 h-12 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-2xl font-bold">Holkar Science City Grant</div>
                    <div className="opacity-80">Innovation in Smart City Solutions</div>
                  </div>
                </div>
                <p className="opacity-90 leading-relaxed max-w-3xl mx-auto">
                  This recognition validates our commitment to developing cutting-edge technology solutions that address
                  real-world challenges in urban infrastructure and public services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
