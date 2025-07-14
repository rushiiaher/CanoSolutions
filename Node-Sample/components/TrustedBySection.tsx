import Image from "next/image"

const clients = [
  {
    name: "Government of India",
    logo: "/GOV-LOGO/GOV_OF_INDIA.png"
  },
  {
    name: "Government of Maharashtra",
    logo: "/GOV-LOGO/GOV_OF_MAHA.png"
  },
  {
    name: "Government of Jammu and Kashmir",
    logo: "/GOV-LOGO/GOV_OF_J&K.png"
  },
  {
    name: "Government of Bihar",
    logo: "/GOV-LOGO/GOV_OF_BIHAR.png"
  }
]

export default function TrustedBySection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Organizations</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
            Proud to serve government institutions and drive digital transformation across India
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div 
              key={client.name} 
              className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[100px] sm:min-h-[120px] w-full"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-2 sm:mb-3">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={48}
                  height={48}
                  className="sm:w-16 sm:h-16 object-contain"
                  unoptimized
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 text-center font-medium leading-tight">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}