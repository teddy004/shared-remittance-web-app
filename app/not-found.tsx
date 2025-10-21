import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "@/lib/icons"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-purple-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/">
          <Button className="bg-purple-600">Go Back Home</Button>
        </Link>
      </div>
    </div>
  )
}
