"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className={`border-borders last:border-0 transition-all duration-300 ${isOpen ? 'bg-white' : 'hover:bg-white/50'}`}>
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none group"
      >
        <h3 className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-textPrimary group-hover:text-primary'}`}>
          {question}
        </h3>
        <div
          className={`${isOpen ? 'bg-primary/10' : 'bg-neutralCard'} rounded-full p-1.5 flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-primary" : "text-textSecondary"}`} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 text-textSecondary leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSectionSimple() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What services does Cano Solutions offer?",
      answer: "We specialize in AI & Machine Learning, IoT & Smart Systems, Cloud & DevOps, Web & Mobile App Development, Digital Marketing, CRM/ERP platforms, LMS, and end-to-end digital transformation."
    },
    {
      question: "Who are your typical clients?",
      answer: "We serve government organizations (e.g., Governments of India, Maharashtra, Bihar, Jammu & Kashmir) and enterprises across various sectors."
    },
    {
      question: "What makes Cano Solutions stand out?",
      answer: "We blend startup agility with enterprise-level expertise, use future-ready tech (AI, IoT, Cloud, Quantum), and provide end-to-end support from MVP to full-scale rollout."
    },
    {
      question: "Are you a Govt. award-winning company?",
      answer: "Yes! We're proud recipients of the Ahilyadevi Holkar Startup Grant, showcasing our government-recognized innovation."
    },
    {
      question: "How many projects have you completed?",
      answer: "Over 100 successful projects delivered, earning 99% client satisfaction."
    },
    {
      question: "Where are your offices located?",
      answer: "We operate from Nashik and Pune in Maharashtra, India."
    },
    {
      question: "How can I contact you or request a consultation?",
      answer: "You can email hello@canosolutions.com, call +91 98765 43210, or fill out the \"Get Free Consultation\" form on our site."
    },
    {
      question: "Do you offer smart school solutions?",
      answer: "Yes—we've built IoT-based smart school systems for attendance, energy management, and security, boosting efficiency by 40%, saving 15 hours/week, and cutting costs by ₹2 L/month."
    },
    {
      question: "Have you developed ERP systems?",
      answer: "Absolutely. We modernized legacy systems with ERP solutions that automated workflows, sped up reporting 10x, and saved ₹50 L annually."
    },
    {
      question: "What technologies do you use for cloud infrastructure?",
      answer: "Our cloud services include migration, scalable infra management, security/compliance, and cost optimization, built on leading platforms like AWS, Azure, and Google Cloud."
    },
    {
      question: "Can you build mobile and web apps?",
      answer: "Yes—we develop responsive websites, PWAs, e-commerce sites, CMS, and native Android apps, all optimized for performance and UX."
    },
    {
      question: "What AI & ML services do you provide?",
      answer: "We offer predictive analytics, process automation, NLP, and computer vision solutions tailored to transform business operations."
    },
    {
      question: "What does your digital marketing include?",
      answer: "Our services feature SEO, PPC campaigns, social media marketing, and content strategy to boost your online visibility."
    },
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We commit to replying within 24 hours, plus we provide a custom solution roadmap within 48 hours—no obligations, transparent pricing."
    },
    {
      question: "What kind of support do you offer post-delivery?",
      answer: "We deliver full lifecycle support—from launch and monitoring to maintenance—ensuring smooth running and growth."
    },
    {
      question: "What budgets or team size do you cater to?",
      answer: "We accommodate a range of clients—from startups to large enterprises and government bodies—offering scalable solutions to fit diverse needs."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-neutralCard relative overflow-hidden">
      
      
      <div className="container-max relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            Got Questions?
          </div>
          <h2 className="text-h2 font-bold text-textPrimary">Frequently Asked Questions</h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            Find answers to common questions about our services, expertise, and approach
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-borders/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borders/10">
              <div className="divide-y divide-borders/10">
                {faqs.slice(0, 8).map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    toggleOpen={() => toggleFAQ(index)}
                  />
                ))}
              </div>
              <div className="divide-y divide-borders/10">
                {faqs.slice(8).map((faq, index) => (
                  <FAQItem
                    key={index + 8}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index + 8}
                    toggleOpen={() => toggleFAQ(index + 8)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}