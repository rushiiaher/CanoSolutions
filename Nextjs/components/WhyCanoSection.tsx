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
          <h2 className="text-h2  font-bold text-textPrimary">Why Choose Cano Solutions?</h2>
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
                className={`bg-white border-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-xl overflow-hidden fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-1 bg-gradient-to-r from-primary to-primary/70"></div>
                <CardContent className="p-10 text-center space-y-8">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(30,136,229,0.15)] border border-primary/5">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>

                  {/* Badge */}
                  <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    {feature.highlight}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-textPrimary">{feature.title}</h3>
                    <p className="text-textSecondary leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-borders/10 relative overflow-hidden">
         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-3">2022</div>
              <div className="text-textSecondary font-medium">Established</div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-3">100+</div>
              <div className="text-textSecondary font-medium">Projects</div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-3">100+</div>
              <div className="text-textSecondary font-medium">Happy Clients</div>
            </div>
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-3">100%</div>
              <div className="text-textSecondary font-medium">On-Time Delivery</div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mb-20 z-0"></div>
        </div>
      </div>
    </section>
  )
}
