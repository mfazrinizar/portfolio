import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-accent/10 relative overflow-hidden",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-accent/5 after:to-transparent after:animate-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
