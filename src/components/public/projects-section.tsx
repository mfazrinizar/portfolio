import { ProjectCard } from '@/components/public/project-card';
import { projects } from '@/lib/constants';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Featured Projects
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            The best published work collection of my contributions.
          </p>
        </div>
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
    </section>
  );
}