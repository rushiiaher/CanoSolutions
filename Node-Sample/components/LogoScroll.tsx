"use client"

import Image from "next/image"

interface LogoScrollProps {
  className?: string
}

export default function LogoScroll({ className = "" }: LogoScrollProps) {
  // Government logos
  const govLogos = [
    { src: "/GOV-LOGO/GOV_OF_INDIA.png", alt: "Government of India" },
    { src: "/GOV-LOGO/GOV_OF_MAHA.png", alt: "Government of Maharashtra" },
    { src: "/GOV-LOGO/GOV_OF_BIHAR.png", alt: "Government of Bihar" },
    { src: "/GOV-LOGO/GOV_OF_J&K.png", alt: "Government of J&K" },
  ]
  
  // Private company logos
  const privateLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", alt: "Google" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png", alt: "Accenture" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/2560px-Deloitte.svg.png", alt: "Deloitte" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", alt: "Amazon" },
  ]
  
  // Create multiple sets for seamless scrolling
  const govScrollLogos = [...govLogos, ...govLogos, ...govLogos]
  const privateScrollLogos = [...privateLogos, ...privateLogos, ...privateLogos]
  
  return (
    <div className={`w-full overflow-hidden space-y-4 ${className}`}>
      {/* Government logos - Left to Right */}
      <div className="logo-scroll-container">
        <div className="logo-scroll animate-scroll-left-to-right">
          {govScrollLogos.map((logo, index) => (
            <div key={`gov-${index}`} className="logo-item">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center h-16 w-32">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="h-auto w-auto max-h-8 object-contain"
                  style={{ filter: 'grayscale(0.4) contrast(1.1)' }}
                  unoptimized={logo.src.startsWith('http')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Private company logos - Right to Left */}
      <div className="logo-scroll-container">
        <div className="logo-scroll animate-scroll-right-to-left">
          {privateScrollLogos.map((logo, index) => (
            <div key={`private-${index}`} className="logo-item">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center h-16 w-32">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="h-auto w-auto max-h-8 object-contain"
                  style={{ filter: 'grayscale(0.4) contrast(1.1)' }}
                  unoptimized={logo.src.startsWith('http')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
