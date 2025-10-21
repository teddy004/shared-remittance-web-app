export function HeaderSkeleton() {
  return (
    <header className="border-b bg-white/95 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="animate-pulse bg-muted rounded-md h-8 w-24"></div>
        <div className="hidden md:flex items-center gap-6 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded-md"></div>
        </div>
      </div>
    </header>
  );
}