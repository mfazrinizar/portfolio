
import { HeroSection } from '@/components/public/hero-section';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import ProjectsSection from '@/components/public/projects-section';
import AboutSection from '@/components/public/about-section';
import ContactSection from '@/components/public/contact-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <HeroSection />
        </section>
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}