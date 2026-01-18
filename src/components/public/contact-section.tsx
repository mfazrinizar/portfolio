import { Mail, Phone, MapPin, Send } from "lucide-react";
import { ContactForm } from "@/components/public/contact-form";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-32 bg-background relative overflow-hidden grid-pattern"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section header */}
        <div className="mb-10 sm:mb-16 space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Send className="w-5 h-5 sm:w-6 sm:h-6 text-accent-secondary" />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
              [Contact]
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider sm:tracking-widest leading-tight">
            <span className="neon-text-secondary">Initiate</span>
            <br />
            <span className="neon-text">Communication</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-mono max-w-3xl mx-auto px-2">
            I&apos;m always excited to discuss new projects, creative ideas, or
            opportunities to collaborate. Drop me a message and let&apos;s build
            something extraordinary together.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16 md:grid-cols-3">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="border-2 border-accent cyber-chamfer p-6 md:p-8 shadow-neon-lg bg-card/50 backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-wide text-accent">
              Quick Contact
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="p-4 bg-muted/50 border-2 border-border cyber-chamfer-sm hover:border-accent hover:shadow-neon-sm transition-all duration-200 group">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1 group-hover:animate-blink" />
                  <div className="flex-1">
                    <h4 className="font-bold text-accent uppercase text-sm tracking-wide">
                      Email
                    </h4>
                    <a
                      href="mailto:mfazrinizar@gmail.com"
                      className="text-foreground/80 hover:text-accent font-mono text-sm break-all transition-colors"
                    >
                      mfazrinizar@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-muted/50 border-2 border-border cyber-chamfer-sm hover:border-accent-tertiary hover:shadow-neon-tertiary transition-all duration-200 group">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-tertiary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-accent-tertiary uppercase text-sm tracking-wide">
                      Location
                    </h4>
                    <p className="text-foreground/80 font-mono text-sm">
                      South Sumatera, Indonesia
                    </p>
                    <p className="text-muted-foreground font-mono text-xs mt-1">
                      Remote work: Global
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="p-4 bg-muted/50 border-2 border-accent/50 cyber-chamfer-sm">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent animate-pulse flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-accent uppercase text-sm tracking-wide">
                      Availability
                    </h4>
                    <p className="text-foreground/80 font-mono text-sm">
                      Open for opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="p-4 bg-accent/10 border border-accent/30 cyber-chamfer-sm">
              <p className="font-mono text-xs text-accent uppercase tracking-widest">
                <span className="animate-blink">●</span> Expected response time:
                24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">&lt;</span> Message transmission
            protocol active <span className="text-accent">/&gt;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
