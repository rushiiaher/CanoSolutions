"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiService } from "@/lib/api-utils"
import { useState } from "react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  company: z.string().optional(),
  message: z.string().min(10, "Project brief is required").max(1000),
});

type ConsultationFormProps = {
  title?: string
  description?: string
  variant?: "hero" | "section" | "contact"
  className?: string
}

export default function ConsultationForm({
  title = "Get a Free Consultation",
  description = "Our experts will get back to you within 24 hours.",
  variant = "hero",
  className,
}: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitMessage("")
    try {
      await ApiService.createInquiry({ 
        firstName: values.fullName.split(' ')[0] || values.fullName,
        lastName: values.fullName.split(' ').slice(1).join(' ') || '',
        email: values.email,
        phone: values.phone || '',
        company: values.company || '',
        service: values.service,
        message: values.message
      })
      setSubmitMessage("Thank you! Your consultation request has been submitted successfully. We'll get back to you within 24 hours.")
      form.reset()
      setTimeout(() => setSubmitMessage(""), 5000)
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Failed to send inquiry.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-300 border-0 overflow-hidden",
        {
          "bg-white/95 backdrop-blur-md shadow-2xl hover:shadow-3xl": variant === "hero",
          "bg-white text-gray-900 shadow-xl hover:shadow-2xl": variant === "section",
          "bg-white shadow-lg": variant === "contact",
        },
        className
      )}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle
          className={cn("font-bold text-gray-900", {
            "text-2xl md:text-3xl": variant === "hero",
            "text-3xl md:text-4xl": variant === "section",
            "text-2xl": variant === "contact",
          })}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn("text-base mt-2", {
            "text-gray-600": variant === "hero" || variant === "contact",
            "text-gray-600": variant === "section",
          })}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your@email.com" 
                        className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Phone *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="+91 98765 43210" 
                        className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">What service are you interested in? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Android Development">Android Development</SelectItem>
                      <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                      <SelectItem value="LMS/IoT Systems">LMS/IoT Systems</SelectItem>
                      <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      <SelectItem value="Not sure / Let's discuss">Not sure / Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-gray-500">Company (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your company name" 
                      className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-primary"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Project Brief / Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your project, requirements, timeline, or any specific questions you have..."
                      className="min-h-[100px] border-gray-300 focus:border-primary focus:ring-primary resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] shadow-lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                "Get Free Consultation →"
              )}
            </Button>
            
            {submitMessage && (
              <div
                className={cn(
                  "p-4 rounded-lg text-sm text-center font-medium transition-all duration-300",
                  {
                    "bg-green-50 text-green-700 border border-green-200": submitMessage.includes("successfully"),
                    "bg-red-50 text-red-700 border border-red-200": !submitMessage.includes("successfully"),
                  }
                )}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
