import { Card, CardContent } from "@/components/ui/card"
import { Award, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Government Trusted",
    description: "Ahilyadevi Holkar Startup Grant winner with proven track record in government and public sector projects.",
    highlight: "Grant Winner",
  },
  {
    icon: Zap,
    title: "Future-Ready Tech",
    description: "Specializing in cutting-edge technologies including Quantum Computing, AI, and next-gen solutions.",
    highlight: "Innovation Leader",
  },
  {
    icon: Users,
    title: "End-to-End Support",
    description:
      "From MVP development to enterprise scaling, we provide comprehensive support throughout your journey.",
    highlight: "Complete Solutions",
  },
]

export default function WhyCanoSection() {
  return (
    <section className="section-padding bg-neutralCard">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-h2 font-inter font-bold text-textPrimary">Why Choose CanoSolutions?</h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            We combine startup agility with enterprise expertise, delivering innovative solutions that drive measurable
            business outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={feature.title}
                className={`bg-white border-0 shadow-lg card-hover fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  {/* Badge */}
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {feature.highlight}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-inter font-semibold text-textPrimary">{feature.title}</h3>
                    <p className="text-textSecondary leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-card p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2022</div>
              <div className="text-textSecondary">Established</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-textSecondary">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-textSecondary">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-textSecondary">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
