import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/public/contact-form';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            I&apos;m always excited to discuss new projects, creative ideas, or opportunities to collaborate.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <Mail size={20} className="mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <a href="mailto:mfazrinizar@gmail.com" className="hover:text-primary">mfazrinizar@gmail.com</a>
                </div>
              </div>
              {/* <div className="flex items-start">
                <Phone size={20} className="mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Phone (Optional)</h4>
                  <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a>
                </div>
              </div> */}
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Location</h4>
                  <p>South Sumatera, Indonesia</p>
                  <p>Available for remote work globally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}