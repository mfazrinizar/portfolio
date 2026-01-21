"use client";

import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      // Image zoom and brightness
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          scale: 1.15,
          filter: "brightness(1.2)",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Title glitch effect
      if (titleRef.current) {
        const tl = gsap.timeline();
        tl.to(titleRef.current, {
          x: 2,
          textShadow: "-2px 0 #ff00ff, 2px 0 #00d4ff",
          duration: 0.05,
        })
          .to(titleRef.current, {
            x: -2,
            textShadow: "2px 0 #ff00ff, -2px 0 #00d4ff",
            duration: 0.05,
          })
          .to(titleRef.current, {
            x: 0,
            textShadow: "0 0 10px rgba(0, 255, 136, 0.5)",
            duration: 0.1,
          });
      }

      // Corner accents animate in
      cornersRef.current.forEach((corner, i) => {
        gsap.fromTo(
          corner,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: i * 0.05,
            ease: "back.out(2)",
          },
        );
      });

      // Card lift with neon glow
      gsap.to(card, {
        y: -8,
        boxShadow:
          "0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Reset image
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          scale: 1,
          filter: "brightness(1)",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Reset title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: 0,
          textShadow: "none",
          duration: 0.2,
        });
      }

      // Corner accents animate out
      cornersRef.current.forEach((corner) => {
        gsap.to(corner, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      });

      // Reset card
      gsap.to(card, {
        y: 0,
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Magnetic tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeaveReset = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeaveReset);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeaveReset);
    };
  }, []);
  return (
    <Link href={`/projects/${project.id}`} passHref className="block group">
      <div
        ref={cardRef}
        className="h-full overflow-hidden border-2 border-border hover:border-accent transition-colors duration-300 cyber-chamfer flex flex-col bg-card hover:bg-card/80 relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
          <div className="terminal-dot terminal-dot-red"></div>
          <div className="terminal-dot terminal-dot-yellow"></div>
          <div className="terminal-dot terminal-dot-green"></div>
          <span className="text-xs text-muted-foreground font-mono ml-2 uppercase tracking-widest">
            {project.title}
          </span>
        </div>

        {/* Project image */}
        {project.imageUrl && (
          <div
            ref={imageRef}
            className="aspect-[16/9] overflow-hidden relative"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover"
              data-ai-hint="project preview"
            />
            {/* Glitch overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(255, 0, 255, 0.1) 0px, rgba(255, 0, 255, 0.1) 2px, transparent 2px, transparent 4px)",
              }}
            />
          </div>
        )}

        {/* Content */}
        <CardHeader className="relative">
          <CardTitle
            ref={titleRef}
            className="text-xl text-accent group-hover:text-accent-secondary transition-colors duration-200 uppercase tracking-wide font-bold"
          >
            {project.title}
          </CardTitle>
          <CardDescription className="text-foreground/70 font-mono text-sm line-clamp-3 min-h-[3.8rem]">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between">
          {/* Tags */}
          <div>
            {project.tags && project.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    className="text-xs bg-accent/20 text-accent border border-accent/40 hover:border-accent hover:shadow-neon-sm uppercase font-mono tracking-widest cyber-chamfer-sm"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge className="text-xs bg-border/50 text-muted-foreground border border-border/50 uppercase font-mono tracking-widest cyber-chamfer-sm">
                    +{project.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* View details button */}
          <Button
            variant="outline"
            className="mt-auto text-xs font-mono text-accent border-accent hover:bg-accent hover:text-background hover:shadow-neon uppercase tracking-widest font-bold flex items-center group-hover:translate-x-1 transition-all duration-300 cyber-chamfer-sm"
          >
            View Details
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </CardContent>

        {/* Corner accents on hover */}
        <div
          ref={(el) => {
            if (el) cornersRef.current[0] = el;
          }}
          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent opacity-0"
        />
        <div
          ref={(el) => {
            if (el) cornersRef.current[1] = el;
          }}
          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent opacity-0"
        />
        <div
          ref={(el) => {
            if (el) cornersRef.current[2] = el;
          }}
          className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent opacity-0"
        />
        <div
          ref={(el) => {
            if (el) cornersRef.current[3] = el;
          }}
          className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent opacity-0"
        />
      </div>
    </Link>
  );
}
