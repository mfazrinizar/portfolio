"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Linkedin,
  MapPin,
  Award,
  Briefcase,
  ArrowRight,
  User,
} from "lucide-react";
import { skills, experiences, iconMap } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }

      // Profile card animation with scan effect
      if (profileRef.current) {
        gsap.fromTo(
          profileRef.current,
          { opacity: 0, x: -60, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: profileRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
        );
      }

      // Intro text animation
      if (introRef.current) {
        const paragraphs = introRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30, x: 20 },
          {
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
        );
      }

      // Skills grid animation
      if (skillsRef.current) {
        const skillItems = skillsRef.current.querySelectorAll("[data-skill]");
        gsap.fromTo(
          skillItems,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: {
              each: 0.05,
              from: "random",
            },
            ease: "back.out(1.7)",
          },
        );
      }

      // Experience timeline animation
      if (experienceRef.current) {
        const expItems =
          experienceRef.current.querySelectorAll("[data-experience]");
        gsap.fromTo(
          expItems,
          { opacity: 0, x: -40, y: 20 },
          {
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-tertiary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-10 sm:mb-16 space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-accent-tertiary" />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
              [About_Me]
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider sm:tracking-widest leading-tight">
            <span className="neon-text-tertiary">Who I Am</span>
            <br />
            <span className="text-foreground">In The Sprawl</span>
          </h2>
        </div>

        <div className="grid gap-8 md:gap-16 md:grid-cols-3">
          {/* Profile card */}
          <div ref={profileRef} className="md:col-span-1">
            {/* Profile image */}
            <div className="mb-4 sm:mb-6 cyber-chamfer overflow-hidden border-2 border-accent-tertiary shadow-neon-tertiary relative group max-w-[280px] sm:max-w-none mx-auto md:mx-0">
              <Image
                src="/images/profile.png"
                alt="M. Fazri Nizar - Profile Picture"
                width={400}
                height={600}
                className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
                data-ai-hint="professional portrait"
              />
              {/* Scan effect overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0, 212, 255, 0.1) 0px, rgba(0, 212, 255, 0.1) 2px, transparent 2px, transparent 4px)",
                }}
              />
            </div>

            {/* Contact info */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 border border-border cyber-chamfer-sm hover:border-accent-tertiary hover:shadow-neon-tertiary transition-all duration-200">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent-tertiary flex-shrink-0" />
                <span className="text-foreground text-xs sm:text-sm">
                  South Sumatera, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 border border-border cyber-chamfer-sm hover:border-accent hover:shadow-neon transition-all duration-200">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:mfazrinizar@gmail.com"
                  className="text-accent hover:underline text-xs sm:text-sm truncate"
                >
                  mfazrinizar@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 border border-border cyber-chamfer-sm hover:border-accent-secondary hover:shadow-neon-secondary transition-all duration-200">
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-accent-secondary flex-shrink-0" />
                <a
                  href="https://linkedin.com/in/mfazrinizar"
                  className="text-accent-secondary hover:underline truncate text-xs sm:text-sm"
                >
                  linkedin.com/in/mfazrinizar
                </a>
              </div>
            </div>

            <Button
              className="w-full bg-accent-tertiary text-background hover:bg-accent-tertiary/90 shadow-neon-tertiary uppercase font-bold tracking-wider h-12 cyber-chamfer-sm"
              asChild
            >
              <Link
                href="https://github.com/mfazrinizar?tab=repositories"
                target="_blank"
              >
                View My Complete Projects{" "}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* About content */}
          <div className="md:col-span-2 space-y-12">
            {/* Introduction */}
            <div ref={introRef} className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide leading-tight">
                <span className="neon-text">M. Fazri Nizar</span>
                <br />
                <span className="text-muted-foreground">
                  Software Engineer & Research Enthusiast
                </span>
              </h3>
              <div className="space-y-4 font-mono text-base leading-relaxed text-foreground/90">
                <p>
                  <span className="text-accent">$</span> I am a dedicated and
                  results-oriented{" "}
                  <span className="neon-text">Software Engineer</span> with{" "}
                  <span className="font-bold">3+ years</span> of professional
                  experience and a passionate{" "}
                  <span className="neon-text-secondary">
                    Research Enthusiast
                  </span>
                  .
                </p>
                <p>
                  <span className="text-accent">$</span> My passion lies in
                  engineering solutions in form of systems that solve real-world
                  problems. I thrive in collaborative environments and am always
                  eager to learn new technologies.
                </p>
                <p>
                  <span className="text-accent">$</span> When I&apos;m not
                  coding, I explore new research topics, collaborate on
                  innovative projects, and keep up with the latest tech trends
                  in the sprawl.
                </p>
              </div>
            </div>

            {/* Skills section */}
            <div ref={skillsRef} className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                <span>Core Competencies</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3">
                {skills.map((skill) => {
                  const Icon = iconMap[skill.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={skill.name}
                      data-skill
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-muted/50 border border-border cyber-chamfer-sm hover:border-accent hover:shadow-neon-sm hover:bg-muted transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:text-accent-secondary transition-colors flex-shrink-0" />
                      <span className="text-[10px] sm:text-sm font-mono font-semibold text-foreground/80 group-hover:text-foreground leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience section */}
            <div ref={experienceRef} className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent-secondary" />
                <span>Professional Journey</span>
              </h3>
              <div className="space-y-4 sm:space-y-6 relative">
                {/* Timeline connector */}
                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary hidden md:block" />

                {experiences.map((exp, index) => {
                  const ExpIcon = iconMap[exp.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={index}
                      data-experience
                      className="relative pl-10 sm:pl-16 md:pl-12"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-card border-2 border-accent-secondary flex items-center justify-center">
                        <ExpIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent-secondary" />
                      </div>

                      {/* Experience card */}
                      <div className="p-3 sm:p-4 bg-muted/50 border border-border cyber-chamfer-sm hover:border-accent-secondary hover:shadow-neon-secondary hover:bg-muted/70 transition-all duration-200">
                        <div className="flex flex-col gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-accent-secondary uppercase tracking-wide text-xs sm:text-sm md:text-base leading-tight">
                              {exp.role}
                            </h4>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-mono">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-[10px] sm:text-xs font-mono text-accent bg-accent/20 px-2 sm:px-3 py-1 cyber-chamfer-sm whitespace-nowrap self-start shrink-0">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/80 font-mono leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
