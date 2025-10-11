import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed" | "verified" | "in-progress"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    completed: "bg-success/10 text-success border-success/20",
    pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
    verified: "bg-success/10 text-success border-success/20",
    "in-progress": "bg-primary/10 text-primary border-primary/20",
  }

  const labels = {
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    verified: "Verified",
    "in-progress": "In Progress",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  )
}
