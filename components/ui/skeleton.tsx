import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-secondary/60 [background:linear-gradient(110deg,hsl(var(--secondary))_8%,hsl(var(--muted))_18%,hsl(var(--secondary))_33%)] [background-size:200%_100%] animate-shimmer",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
