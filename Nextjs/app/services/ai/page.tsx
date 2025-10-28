import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Brain, TrendingUp, Zap, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AIServicesPage() {
  const aiSolutions = [
    {
      title: "Predictive Analytics",
      description: "Forecast trends and make data-driven decisions with advanced machine learning models",
      icon: TrendingUp,
      features: ["Sales Forecasting", "Risk Assessment", "Demand Planning", "Market Analysis"],
    },
    {
      title: "Process Automation",
      description: "Streamline operations with intelligent automation and workflow optimization",
      icon: Zap,
      features: ["Document Processing", "Quality Control", "Workflow Automation", "Decision Support"],
    },
    {
      title: "Natural Language Processing",
      description: "Extract insights from text data and enable intelligent communication systems",
      icon: Brain,
      features: ["Sentiment Analysis", "Chatbots", "Document Analysis", "Language Translation"],
    },
    {
      title: "Computer Vision",
      description: "Analyze visual data for quality control, security, and operational insights",
      icon: Shield,
      features: ["Image Recognition", "Quality Inspection", "Security Monitoring", "Visual Analytics"],
    },
  ]

  const benefits = [
    { title: "300% ROI Average", description: "Typical return on investment within 12 months" },
    { title: "45% Efficiency Gain", description: "Average operational efficiency improvement" },
    { title: "24/7 Operation", description: "Continuous automated processing and monitoring" },
    { title: "99.9% Accuracy", description: "High-precision AI models with continuous learning" },
  ]

  const useCases = [
    {
      industry: "Manufacturing",
      title: "Predictive Maintenance",
      description: "Reduce downtime by 60% with AI-powered equipment monitoring and failure prediction",
      results: ["60% less downtime", "$2M annual savings", "Improved safety"],
    },
    {
      industry: "Healthcare",
      title: "Medical Image Analysis",
      description: "Accelerate diagnosis with AI-assisted medical imaging and pattern recognition",
      results: ["40% faster diagnosis", "95% accuracy rate", "Reduced costs"],
    },
    {
      industry: "Finance",
      title: "Fraud Detection",
      description: "Protect against financial fraud with real-time transaction monitoring and analysis",
      results: ["99.8% fraud detection", "50% false positives reduction", "Real-time alerts"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#DF2E35]/10 text-[#DF2E35] border-[#DF2E35]/20">
              AI & Machine Learning Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Business with
              <span className="text-[#DF2E35]"> Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Harness the power of AI and machine learning to automate processes, predict outcomes, and unlock insights
              that drive competitive advantage and operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#DF2E35] hover:bg-[#DF2E35]/90 text-white px-8 py-3">
                Start AI Implementation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
              >
                View Case Studies
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

      {/* AI Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AI Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive artificial intelligence solutions designed to solve real business challenges
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {aiSolutions.map((solution, index) => {
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

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real-World Success Stories</h2>
            <p className="text-xl text-gray-600">
              See how our AI solutions deliver measurable results across industries
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-[#DF2E35]/10 text-[#DF2E35] border-[#DF2E35]/20">
                    {useCase.industry}
                  </Badge>
                  <CardTitle className="text-xl text-gray-900">{useCase.title}</CardTitle>
                  <CardDescription className="text-gray-600">{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <BarChart3 className="h-4 w-4 text-[#DF2E35] mr-2 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#DF2E35]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Implement AI in Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free AI readiness assessment and discover the opportunities for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#DF2E35] hover:bg-gray-100 px-8 py-3">
              Schedule AI Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#DF2E35] px-8 py-3 bg-transparent"
            >
              Download AI Guide
            </Button>
          </div>
        </div>
      </section>


    </div>
  )
}
