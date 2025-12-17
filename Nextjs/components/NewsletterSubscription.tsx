"use client"

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { ApiService } from "@/lib/api-utils";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await ApiService.createSubscription(email);
      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to subscribe");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-secondary" />
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
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        {message && (
          <p className={`text-sm ${
            message.includes('Successfully') ? 'text-secondary' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
