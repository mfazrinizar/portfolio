"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Terminal } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be 50 characters or less." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." })
    .max(100, { message: "Subject must be 100 characters or less." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must be 1000 characters or less." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!document.cookie.includes("csrfToken")) {
      fetch("/api/csrf")
        .then((res) => res.json())
        .then((data) => {
          document.cookie = `csrfToken=${data.csrfToken}; path=/; SameSite=Strict`;
        });
    }
  }, []);

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrfToken="))
        ?.split("=")[1];

      console.log(csrfToken);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken ?? "",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        toast({
          title: "Connection Throttled",
          description:
            "Too many transmissions detected. Please wait before retrying.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to send message");
      toast({
        title: "Transmission Complete",
        description: "Message received successfully. Awaiting response...",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Transmission Failed",
        description: "Connection error. Please try again later.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <Terminal className="w-5 h-5 text-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          message_protocol.init()
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs uppercase tracking-widest text-accent">
                    <span className="text-muted-foreground mr-1">$</span>
                    user_name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your identifier..." {...field} />
                  </FormControl>
                  <FormMessage className="font-mono text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs uppercase tracking-widest text-accent">
                    <span className="text-muted-foreground mr-1">$</span>
                    email_addr
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@domain.net"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-xs uppercase tracking-widest text-accent">
                  <span className="text-muted-foreground mr-1">$</span>
                  subject_line
                </FormLabel>
                <FormControl>
                  <Input placeholder="Message topic..." {...field} />
                </FormControl>
                <FormMessage className="font-mono text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-xs uppercase tracking-widest text-accent">
                  <span className="text-muted-foreground mr-1">$</span>
                  message_body
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your transmission..."
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-mono text-xs" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Transmit Message
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
