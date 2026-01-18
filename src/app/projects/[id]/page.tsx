"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { projects } from "@/lib/constants";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CalendarDays,
  AppWindow,
  Terminal,
  Code2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const variant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === projectId);
    setTimeout(() => {
      setProject(foundProject || null);
    }, 300);
  }, [projectId]);

  if (project === undefined) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="space-y-4 text-center">
            <Spinner className="h-10 w-10 text-accent" />
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">$</span> Loading project data
              <span className="animate-blink">...</span>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <motion.div
          variants={variant}
          initial="hidden"
          animate="visible"
          className="flex-grow flex items-center justify-center"
        >
          <main className="container mx-auto px-4 py-12 md:px-6 text-center max-w-2xl">
            <div className="cyber-chamfer border-2 border-destructive p-8 bg-muted/50 shadow-neon-lg">
              <h1 className="text-3xl font-black uppercase tracking-widest text-destructive mb-4">
                ERROR 404
              </h1>
              <p className="font-mono text-muted-foreground mb-6">
                <span className="text-accent">$</span> Project not found in the
                archive. Data stream corrupted.
              </p>
              <Button
                onClick={() => router.push("/projects")}
                variant="outline"
                className="group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Return to Archive
              </Button>
            </div>
          </main>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <motion.div variants={variant} initial="hidden" animate="visible">
        <main className="flex-grow py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Back button */}
            <div className="mb-8">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
                Back
              </Button>
            </div>

            {/* Header */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-6 h-6 text-accent" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  [Project_Details]
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest leading-tight neon-text">
                {project.title}
              </h1>
              <p className="text-lg text-foreground/80 font-mono max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="md:col-span-2">
                {/* Image carousel */}
                {project.images && project.images.length > 0 ? (
                  <Carousel className="w-full overflow-hidden cyber-chamfer border-2 border-accent shadow-neon-lg mb-8">
                    <CarouselContent>
                      {project.images.map((img, idx) => (
                        <CarouselItem key={idx}>
                          <div className="aspect-video relative">
                            <Image
                              src={img.url}
                              alt={img.alt || `Project image ${idx + 1}`}
                              fill
                              className="object-cover"
                              priority={idx === 0}
                              data-ai-hint="project screenshot"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : project.imageUrl ? (
                  <div className="aspect-video relative w-full overflow-hidden cyber-chamfer border-2 border-accent shadow-neon-lg mb-8">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      priority
                      data-ai-hint="project showcase"
                    />
                  </div>
                ) : null}

                {/* Description section */}
                <div className="cyber-chamfer border-2 border-border p-6 bg-muted/30">
                  <div className="terminal-header mb-4 -mx-6 -mt-6 border-b border-border px-4 py-3 bg-muted/50">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                    <span className="text-xs text-muted-foreground font-mono ml-2 uppercase tracking-widest">
                      project_overview.md
                    </span>
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-widest text-accent mb-4">
                    About This Project
                  </h2>
                  <p className="font-mono text-foreground/90 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="cyber-chamfer border-2 border-accent-secondary shadow-neon-secondary sticky top-24 bg-card p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                    <Terminal className="w-5 h-5 text-accent-secondary" />
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      project_info
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* Technologies */}
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-accent-secondary mb-3">
                        <span className="text-muted-foreground mr-1">$</span>
                        tech_stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project links */}
                    {project.projectUrl && (
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                          <span className="text-muted-foreground mr-1">$</span>
                          live_url
                        </h4>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full group"
                        >
                          <Link
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project{" "}
                            <ExternalLink
                              size={16}
                              className="ml-2 group-hover:scale-110 transition-transform"
                            />
                          </Link>
                        </Button>
                      </div>
                    )}

                    {project.githubUrl && (
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                          <span className="text-muted-foreground mr-1">$</span>
                          source_code
                        </h4>
                        <Button
                          asChild
                          variant="secondary"
                          className="w-full group"
                        >
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View GitHub{" "}
                            <Github
                              size={16}
                              className="ml-2 group-hover:scale-110 transition-transform"
                            />
                          </Link>
                        </Button>
                      </div>
                    )}

                    {project.detailsUrl && (
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-accent-tertiary mb-3">
                          <span className="text-muted-foreground mr-1">$</span>
                          more_info
                        </h4>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full group border-accent-tertiary text-accent-tertiary hover:bg-accent-tertiary/10 hover:shadow-neon-tertiary"
                        >
                          <Link
                            href={project.detailsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details{" "}
                            <AppWindow
                              size={16}
                              className="ml-2 group-hover:scale-110 transition-transform"
                            />
                          </Link>
                        </Button>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      {project.publishedAt && (
                        <div className="flex items-center text-xs text-muted-foreground font-mono">
                          <CalendarDays
                            size={14}
                            className="mr-2 text-accent"
                          />
                          <span>
                            Published:{" "}
                            {new Date(project.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground font-mono">
                        <CalendarDays
                          size={14}
                          className="mr-2 text-accent-secondary"
                        />
                        <span>
                          Updated:{" "}
                          {new Date(project.updatedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
