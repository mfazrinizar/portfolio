import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import AboutSection from '@/components/public/about-section';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}