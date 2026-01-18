import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 cyber-chamfer-sm",
  {
    variants: {
      variant: {
        default:
          "border-accent bg-accent/20 text-accent hover:shadow-neon-sm hover:border-accent",
        secondary:
          "border-accent-secondary bg-accent-secondary/20 text-accent-secondary hover:shadow-neon-secondary",
        destructive:
          "border-destructive bg-destructive/20 text-destructive hover:shadow-neon-lg",
        outline:
          "border-border text-foreground bg-transparent hover:border-accent hover:text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
