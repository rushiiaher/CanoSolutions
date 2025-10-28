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
  firstName: z.string().min(2, "First name is too short").max(50),
  lastName: z.string().min(2, "Last name is too short").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message is too short").max(500),
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitMessage("")
    try {
      await ApiService.createInquiry({ ...values, company: values.company || "" })
      setSubmitMessage("Your inquiry has been sent successfully!")
      form.reset()
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Failed to send inquiry.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        {
          "bg-white/90 backdrop-blur-sm shadow-2xl": variant === "hero",
          "bg-white text-gray-900 shadow-lg": variant === "section",
          "bg-white": variant === "contact",
        },
        className
      )}
    >
      <CardHeader>
        <CardTitle
          className={cn("font-bold", {
            "text-textPrimary text-2xl": variant === "hero",
            "text-textPrimary text-3xl": variant === "section",
          })}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn({
            "text-textSecondary": variant === "hero" || variant === "contact",
            "text-textSecondary": variant === "section",
          })}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@gmail.com" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 73874 01021" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interested Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Android Development">Android Development</SelectItem>
                      <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                      <SelectItem value="LMS/IoT Solutions">LMS/IoT Solutions</SelectItem>
                      <SelectItem value="Cloud Infrastructure">Cloud Infrastructure</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How can we help you?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </Button>
            {submitMessage && (
              <p
                className={cn("text-sm text-center", {
                  "text-secondary": submitMessage.includes("success"),
                  "text-red-600": !submitMessage.includes("success"),
                })}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
