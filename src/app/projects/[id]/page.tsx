"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { projects } from '@/lib/constants';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ExternalLink, Github, CalendarDays, AppWindow } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { PageHeader } from '@/components/shared/page-header';
import { motion } from 'framer-motion';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const variant = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  const [project, setProject] = useState<Project | null | undefined>(undefined); 

  useEffect(() => {
    const foundProject = projects.find(p => p.id === projectId);
    setTimeout(() => {
      setProject(foundProject || null); 
    }, 300);
  }, [projectId]);

  if (project === undefined) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Spinner className="h-10 w-10 text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return ( 
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <motion.section
          id="project"
          variants={variant}
          initial="hidden"
          whileInView="visible"
          className="flex-grow flex items-center justify-center"
        >
        <main className="flex-grow container mx-auto px-4 py-12 md:px-6 text-center">
          <PageHeader title="Project Not Found" description="The project you are looking for does not exist or could not be loaded." />
          <Button onClick={() => router.push('/projects')} variant="outline" className="mt-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </main>
        </motion.section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <motion.section
        id="project"
        variants={variant}
        initial="hidden"
        whileInView="visible"
      >
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Button onClick={() => router.back()} variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back
            </Button>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">{project.description}</p>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              {project.images && project.images.length > 0 ? (
                <Carousel className="w-full rounded-lg overflow-hidden shadow-xl border mb-8">
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
                <div className="aspect-video relative w-full rounded-lg overflow-hidden shadow-xl border mb-8">
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

              <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                <h2 className="text-2xl font-semibold mb-3 text-foreground">About This Project</h2>
                <p>{project.longDescription || project.description}</p>
              </article>
            </div>

            <div className="md:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground/90">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.projectUrl && (
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground/90">Production Link:</h4>
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          View Project <ExternalLink size={16} className="ml-2 transition-transform group-hover:scale-110" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {project.githubUrl && (
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground/90">Source Code:</h4>
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          View on GitHub <Github size={16} className="ml-2 transition-transform group-hover:scale-110" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {project.detailsUrl && (
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground/90">Further Information:</h4>
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={project.detailsUrl} target="_blank" rel="noopener noreferrer">
                          View for Details <AppWindow size={16} className="ml-2 transition-transform group-hover:scale-110" />
                        </Link>
                      </Button>
                    </div>
                  )}
                  
                  {project.publishedAt && (
                    <div className="flex items-center text-sm text-muted-foreground">
                       <CalendarDays size={16} className="mr-2 text-primary" />
                       <span>Published: {new Date(project.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  )}
                   <div className="flex items-center text-sm text-muted-foreground">
                       <CalendarDays size={16} className="mr-2 text-primary" />
                       <span>Last Updated: {new Date(project.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      </motion.section>
      <Footer />
    </div>
  );
}