export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-4xl">
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>These terms govern your use of CanoSolutions services.</p>
        </div>
      </div>
    </div>
  )
}