"use client";

import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link href={`/projects/${project.id}`} passHref className="block group">
      <div className="h-full overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 group-hover:shadow-neon cyber-chamfer flex flex-col bg-card hover:bg-card/80 group-hover:-translate-y-1">
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
          <div className="aspect-[16/9] overflow-hidden relative">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
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
          <CardTitle className="text-xl text-accent group-hover:text-accent-secondary transition-colors duration-200 uppercase tracking-wide font-bold">
            {project.title}
          </CardTitle>
          <CardDescription className="text-foreground/70 font-mono text-sm line-clamp-3">
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
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}
