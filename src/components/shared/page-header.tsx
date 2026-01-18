import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="py-6 sm:py-8 md:py-12 relative">
      {/* Corner accents */}
      <div className="absolute top-0 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-accent opacity-60" />
      <div className="absolute top-0 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-accent opacity-60" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-3 sm:space-y-4 text-center md:text-left">
          {/* Terminal-style label */}
          <div className="font-mono text-[10px] sm:text-sm text-accent tracking-wider uppercase">
            <span className="text-accent-secondary">&gt;</span> section.header
          </div>

          <h1 className="text-2xl font-heading font-bold tracking-wider sm:tracking-widest text-foreground sm:text-3xl md:text-4xl lg:text-5xl uppercase neon-text">
            {title}
          </h1>

          {description && (
            <p className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground md:mx-0 md:text-xl font-body leading-relaxed">
              {description}
            </p>
          )}

          {/* Decorative line */}
          <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start pt-2">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-accent to-transparent" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rotate-45 animate-pulse-slow" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-accent-secondary to-transparent" />
          </div>
        </div>

        {children && (
          <div className="mt-6 text-center md:text-left">{children}</div>
        )}
      </div>
    </div>
  );
}
