export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        <p className="mt-4 text-gray-600">Loading exchange rates...</p>
      </div>
    </div>
  )
}
