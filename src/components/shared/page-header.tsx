import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:mx-0 md:text-xl">
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-6 text-center md:text-left">{children}</div>}
      </div>
    </div>
  );
}
