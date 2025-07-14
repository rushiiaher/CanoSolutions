export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-4xl">
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>CanoSolutions respects your privacy. This policy outlines how we collect and use your information.</p>
        </div>
      </div>
    </div>
  )
}