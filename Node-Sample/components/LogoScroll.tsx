"use client"

import Image from "next/image"

interface LogoScrollProps {
  className?: string
  variant?: "corporate" | "government"
}

export default function LogoScroll({ className = "", variant = "government" }: LogoScrollProps) {
  // Combined list of all logos
  const allLogos = [
    { src: "/GOV-LOGO/GOV_OF_INDIA.png", alt: "Government of India" },
    { src: "/GOV-LOGO/GOV_OF_MAHA.png", alt: "Government of Maharashtra" },
    { src: "/GOV-LOGO/GOV_OF_BIHAR.png", alt: "Government of Bihar" },
    { src: "/GOV-LOGO/GOV_OF_J&K.png", alt: "Government of J&K" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", alt: "Google" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png", alt: "Accenture" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/2560px-Deloitte.svg.png", alt: "Deloitte" },
  ]
  
  // Use all logos regardless of variant
  const logos = allLogos
  
  // Create a double set of logos for seamless scrolling
  const scrollLogos = [...logos, ...logos, ...logos, ...logos]
  
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="logo-scroll-container">
        <div className="logo-scroll animate-scroll">
          {scrollLogos.map((logo, index) => (
            <div key={index} className="logo-item">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm flex items-center justify-center h-16 w-36">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={50}
                  className="h-auto w-auto max-h-10 object-contain"
                  style={{ filter: 'grayscale(0.4) contrast(1.1)' }}
                  unoptimized={logo.src.startsWith('http')} // For external images
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
