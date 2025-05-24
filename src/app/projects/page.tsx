"use client";

import { ProjectCard } from '@/components/public/project-card';
import { PageHeader } from '@/components/shared/page-header';
import { projects } from '@/lib/constants';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const variant = {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };


  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.section
                id="home"
                variants={variant}
                initial="hidden"
                whileInView="visible"
              >
      <main className="flex-grow">
        <PageHeader
          title="My Portfolio"
          description="Explore my projects and contributions that showcase my skills and passion for software engineering and research."
        />
        <div className="container mx-auto px-4 py-12 md:px-6">
          {projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No projects to display at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      </motion.section>
      <Footer />
    </div>
  );
}
