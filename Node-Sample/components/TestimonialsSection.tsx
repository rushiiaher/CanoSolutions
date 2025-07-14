"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    position: "Director",
    company: "Holkar Science City",
    content:
      "CanoSolutions delivered an exceptional smart city solution that exceeded our expectations. Their innovative approach and technical expertise made them the perfect partner for our government initiative.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "CTO",
    company: "TechCorp Industries",
    content:
      "The AI-powered automation system developed by CanoSolutions transformed our manufacturing processes. We've seen a 40% increase in efficiency and significant cost savings.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Principal",
    company: "Modern Public School",
    content:
      "Their smart school management system revolutionized our operations. From automated attendance to energy management, everything works seamlessly. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-neutralCard">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-h2 font-inter font-bold text-textPrimary">What Our Clients Say</h2>
          <p className="text-xl text-textSecondary max-w-4xl mx-auto">
            Don't just take our word for it. Here's what government organizations and enterprises say about working with
            CanoSolutions.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-primary mx-auto opacity-20" />

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl text-textSecondary leading-relaxed italic max-w-3xl mx-auto">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-textPrimary">{testimonials[currentTestimonial].name}</div>
                    <div className="text-textSecondary">{testimonials[currentTestimonial].position}</div>
                    <div className="text-primary font-medium">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-borders"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Client Logos */}
       
      </div>
    </section>
  )
}
