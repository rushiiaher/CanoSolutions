export default function CookiesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose max-w-4xl">
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>This policy explains how Cano Solutions uses cookies on our website.</p>
        </div>
      </div>
    </div>
  )
}