export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-20 bg-muted rounded-lg"></div>
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-8 bg-muted rounded w-full"></div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="h-12 bg-muted rounded-lg flex-1"></div>
          <div className="h-12 bg-muted rounded-lg w-24"></div>
          <div className="h-12 bg-muted rounded-lg w-32"></div>
        </div>
      ))}
    </div>
  )
}
