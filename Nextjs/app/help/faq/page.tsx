"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const faqs = [
  {
    question: "How do I report a technical issue?",
    answer: "Navigate to the 'Report Issue' section from the sidebar, fill in the required details including issue description, priority level, and attach any relevant screenshots. Our support team will respond within 24-48 hours based on priority."
  },
  {
    question: "What are the different priority levels for tickets?",
    answer: "P1 (Critical) - System down, requires immediate attention. P2 (High) - Major functionality affected. P3 (Medium) - Minor issues affecting some users. P4 (Low) - General queries or feature requests."
  },
  {
    question: "How can I track my submitted tickets?",
    answer: "Go to 'My Tickets' section to view all your submitted tickets. You can filter by status, priority, and date. Click on any ticket to view detailed information and updates."
  },
  {
    question: "What is the typical response time for support tickets?",
    answer: "P1 tickets: 2-4 hours, P2 tickets: 8-12 hours, P3 tickets: 24-48 hours, P4 tickets: 48-72 hours. Response times may vary during peak periods or holidays."
  },
  {
    question: "Can I update or add information to an existing ticket?",
    answer: "Yes, open the ticket from 'My Tickets' section and use the comment section to add additional information, screenshots, or updates. The support team will be notified automatically."
  },
  {
    question: "How do I view product information and warranty details?",
    answer: "Visit the 'Products' section to see all assigned products, their specifications, warranty status, and maintenance history. You can search by product code or category."
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "On the login page, click 'Forgot Password' link. Enter your registered email address, and you'll receive a password reset link. Follow the instructions in the email to create a new password."
  },
  {
    question: "How can I change my email address or contact information?",
    answer: "Go to 'Settings' from the sidebar, then navigate to 'Profile Information' section. Update your email, phone number, or other contact details and click 'Save Changes'."
  },
  {
    question: "Who can I contact for urgent technical support?",
    answer: "For urgent issues (P1 priority), you can call our 24/7 helpline at +91 73874 01021 or email support@canosolutions.in. Make sure to mention your school code and ticket number if available."
  },
  {
    question: "How do I download reports or export ticket data?",
    answer: "In the Dashboard section, you'll find export options for various reports. Select the date range and report type, then click 'Export' to download in PDF or Excel format."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & FAQ</h1>
        <p className="text-gray-600">Find answers to commonly asked questions</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found matching your search.</p>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-2">Still need help?</h3>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer you're looking for, please contact our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-sm text-gray-600">support@canosolutions.in</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-sm text-gray-600">+91 73874 01021</p>
          </div>
        </div>
      </div>
    </div>
  )
}
