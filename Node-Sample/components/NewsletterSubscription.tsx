"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight } from "lucide-react"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      console.log('Submitting newsletter subscription')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions'
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      console.log('Response status:', response.status)

      if (response.ok) {
        console.log('Newsletter subscription successful')
        setMessage("Successfully subscribed to our newsletter!")
        setEmail("")
      } else {
        console.error('Newsletter subscription error:', data)
        setMessage(data.error || data.details || "Failed to subscribe")
      }
    } catch (error) {
      console.error('Newsletter subscription network error:', error)
      setMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-[#DF2E35]" />
        <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
      </div>
      <p className="text-white/80 text-sm">
        Subscribe to our newsletter for the latest updates and insights.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Button
          type="submit"
          className="w-full bg-[#DF2E35] hover:bg-[#DF2E35]/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        {message && (
          <p className={`text-sm ${
            message.includes('Successfully') ? 'text-green-400' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}