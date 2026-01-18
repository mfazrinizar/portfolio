"use client";

import { HeroSection } from "@/components/public/hero-section";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import ProjectsSection from "@/components/public/projects-section";
import AboutSection from "@/components/public/about-section";
import ContactSection from "@/components/public/contact-section";
import { motion } from "framer-motion";

// Cyberpunk-inspired digital/glitch animation variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const glitchVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    skewX: -5,
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <HeroSection />
        </motion.div>
        <motion.div
          variants={glitchVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ProjectsSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AboutSection />
        </motion.div>
        <motion.div
          variants={glitchVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ContactSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
