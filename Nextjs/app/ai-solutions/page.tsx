import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import TechLogo from "@/components/TechLogo"

export const metadata: Metadata = {
  title: "AI & Machine Learning Solutions | Cano Solutions",
  description:
    "Transform your business with intelligent automation, predictive analytics, and AI-powered solutions. Expert AI development services in Pune & Maharashtra.",
}

const aiServices = [
  {
    title: "Intelligent Chatbots",
    description: "24/7 customer support with natural language processing",
    icon: Brain,
    features: ["Multi-language support", "Context awareness", "Integration ready"],
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights for better business decisions",
    icon: TrendingUp,
    features: ["Real-time predictions", "Custom dashboards", "ROI tracking"],
  },
  {
    title: "Computer Vision",
    description: "Automated visual inspection and quality control",
    icon: Target,
    features: ["Object detection", "Quality assurance", "Real-time processing"],
  },
  {
    title: "Process Automation",
    description: "Streamline operations with intelligent automation",
    icon: Zap,
    features: ["Workflow optimization", "Error reduction", "Cost savings"],
  },
]

const useCases = [
  {
    title: "Smart Inventory Management",
    description: "AI-powered demand forecasting and automated reordering",
    savings: "30% cost reduction",
    image: "/imgs/Smart Inventory Management.jpeg",
  },
  {
    title: "Customer Insights",
    description: "Behavioral analysis and personalized recommendations",
    savings: "25% revenue increase",
    image: "/imgs/Customer Insights.jpeg",
  },
  {
    title: "Quality Control",
    description: "Automated defect detection in manufacturing",
    savings: "50% faster inspection",
    image: "/imgs/Quality Control.jpeg",
  },
]

const techStack = [
  "TensorFlow",
  "PyTorch",
  "OpenAI GPT",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Keras",
  "Hugging Face",
  "LangChain",
  "Azure AI",
  "AWS SageMaker",
  "Google AI",
]

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white to-neutralCard relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Brain className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                AI & Machine Learning
              </Badge>
              <h1 className="text-h1  font-bold text-textPrimary">
                Harness the Power of <span className="text-primary font-bold">Intelligent Automation</span>
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                Transform your business operations with cutting-edge AI solutions. From intelligent chatbots to
                predictive analytics, we build AI systems that drive real business value.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="btn-primary">
                  Get Your AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">40%</div>
                <div className="text-sm text-textSecondary">Efficiency Boost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">₹2Cr+</div>
                <div className="text-sm text-textSecondary">Client Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-textSecondary">AI Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Our AI Solutions</h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive AI services designed to solve real business challenges and drive measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiServices.map((service, index) => {
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

      {/* Use Cases */}
      <section className="section-padding bg-neutralCard">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2  font-bold text-textPrimary">Real-World Applications</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              See how our AI solutions deliver measurable results across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-card"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg  font-semibold text-textPrimary">{useCase.title}</h3>
                    <p className="text-textSecondary text-sm">{useCase.description}</p>
                    <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {useCase.savings}
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
            <h2 className="text-h2  font-bold text-textPrimary">Our AI Technology Stack</h2>
            <p className="text-xl text-textSecondary max-w-4xl mx-auto">
              We use industry-leading tools and frameworks to build robust AI solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <TechLogo key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-max text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-h2  font-bold">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl opacity-90">
              Get a free AI readiness assessment and discover the opportunities for intelligent automation in your
              organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#digital-revolution">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Schedule AI Consultation
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
