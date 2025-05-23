import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import ContactSection from '@/components/public/contact-section';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}