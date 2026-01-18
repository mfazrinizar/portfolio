"use client";

import { ProjectCard } from "@/components/public/project-card";
import { projects } from "@/lib/constants";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "framer-motion";
import { Code2, FolderOpen } from "lucide-react";

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Page header */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden grid-pattern">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-6 h-6 text-accent" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  [Portfolio_Archive]
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest leading-tight">
                <span className="neon-text">Digital</span>
                <br />
                <span className="neon-text-secondary">Creations</span>
              </h1>

              <p className="text-base md:text-lg text-foreground/80 font-mono max-w-3xl">
                Explore my complete portfolio — a comprehensive archive of
                projects and contributions showcasing my expertise in software
                engineering and research.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {projects.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Index badge */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 cyber-chamfer bg-muted border-2 border-accent flex items-center justify-center text-accent font-mono font-bold text-sm z-20">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center text-muted-foreground font-mono space-y-4 py-16">
                <p className="text-base">
                  $ <span className="text-accent animate-blink">█</span>
                </p>
                <p>
                  No projects found in the archive. Initializing data stream...
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
