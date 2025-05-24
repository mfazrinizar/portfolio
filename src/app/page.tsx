"use client"

import { HeroSection } from '@/components/public/hero-section';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import ProjectsSection from '@/components/public/projects-section';
import AboutSection from '@/components/public/about-section';
import ContactSection from '@/components/public/contact-section';
import { motion } from 'framer-motion';

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const projectsVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const aboutVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const contactVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.section
          id="home"
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
        >
          <HeroSection />
        </motion.section>
        <motion.section
          id="projects"
          variants={projectsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <ProjectsSection />
        </motion.section>
        <motion.section
          id="about"
          variants={aboutVariants}
          initial="hidden"
          whileInView="visible"
        >
          <AboutSection />
        </motion.section>
        <motion.section
          id="contact"
          variants={contactVariants}
          initial="hidden"
          whileInView="visible"
        >
          <ContactSection />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}