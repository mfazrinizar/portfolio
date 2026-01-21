"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/public/project-card";
import { projects } from "@/lib/constants";
import { Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with glitch effect
      if (headerRef.current) {
        const headerElements = headerRef.current.children;

        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
        );
      }

      // Project cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-project-card]");

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotateX: 15,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: {
              each: 0.15,
              from: "start",
            },
            ease: "power3.out",
          },
        );

        // Add hover animations to cards
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              scale: 1.02,
              y: -8,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-32 bg-background relative grid-pattern overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-10 sm:mb-16 space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-secondary" />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
              [Projects]
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider sm:tracking-widest leading-tight">
            <span className="neon-text">Featured</span>
            <br />
            <span className="neon-text-secondary">Creations</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-mono max-w-2xl leading-relaxed">
            A curated collection of projects showcasing innovation,
            problem-solving, and technical excellence. Each represents a unique
            challenge conquered in the digital sprawl.
          </p>
        </div>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative"
          >
            {/* Connecting lines (decorative) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg className="w-full h-full" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </svg>
            </div>

            {/* Project cards */}
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="relative mt-8 md:mt-0"
                data-project-card
              >
                {/* Index badge - adjusted for mobile */}
                <div className="absolute -top-4 left-4 md:-top-6 md:-left-6 w-10 h-10 md:w-12 md:h-12 cyber-chamfer bg-muted border-2 border-accent flex items-center justify-center text-accent font-mono font-bold text-base md:text-lg z-20">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground font-mono space-y-4 py-16">
            <p className="text-base">
              $ <span className="text-accent animate-blink">█</span>
            </p>
            <p>No projects to display at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
