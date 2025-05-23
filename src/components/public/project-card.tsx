"use client";

import type { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} passHref className="block group">
      <Card className="h-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 group-hover:scale-[1.02] flex flex-col">
        {project.imageUrl && (
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="project preview"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <div>
            {project.tags && project.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-auto text-sm font-medium text-primary group-hover:underline flex items-center">
            View Details <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}