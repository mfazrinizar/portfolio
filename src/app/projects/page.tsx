import { ProjectCard } from '@/components/public/project-card';
import { PageHeader } from '@/components/shared/page-header';
import { projects } from '@/lib/constants';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <PageHeader
          title="My Portfolio"
          description="Explore a collection of my projects, showcasing my skills in web development, design, and problem-solving."
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
      <Footer />
    </div>
  );
}
