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
          <h2 className="text-h2  font-bold text-textPrimary">What Our Clients Say</h2>
          <p className="text-xl text-textSecondary max-w-4xl mx-auto">
            Don't just take our word for it. Here's what government organizations and enterprises say about working with
            CanoSolutions.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-0 rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary to-primary/50"></div>
            <CardContent className="p-12 sm:p-16">
              <div className="text-center space-y-10 relative">
                {/* Background Elements */}
                
                
                
                {/* Quote Icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center shadow-[0_10px_20px_rgba(223,46,53,0.1)]">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1 relative z-10">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-textSecondary leading-relaxed italic max-w-3xl mx-auto relative z-10">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl"></div>
                    <Image
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      width={90}
                      height={90}
                      className="rounded-full border-2 border-white shadow-lg relative z-10"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-textPrimary text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-textSecondary">{testimonials[currentTestimonial].position}</div>
                    <div className="text-primary font-medium">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial} 
              className="rounded-full bg-white border border-borders/30 shadow-md hover:shadow-lg w-12 h-12 transition-all duration-300 hover:-translate-y-1"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? "bg-primary w-8 shadow-[0_0_10px_rgba(223,46,53,0.5)]" 
                      : "bg-borders hover:bg-primary/50"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial} 
              className="rounded-full bg-white border border-borders/30 shadow-md hover:shadow-lg w-12 h-12 transition-all duration-300 hover:-translate-y-1"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>

        {/* Client Logos */}
       
      </div>
    </section>
  )
}
