"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface LogoScrollProps {
  className?: string
}

export default function LogoScroll({ className = "" }: LogoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // List of logos to display
  const logos = [
    { src: "/canosolutions_logo.jpeg", alt: "CanoSolutions" },
    { src: "/GOVLOGO.png", alt: "Government of Maharashtra" },
    { src: "/GOV-LOGO/GOV_OF_INDIA.png", alt: "Government of India" },
    { src: "/GOV-LOGO/GOV_OF_BIHAR.png", alt: "Government of Bihar" },
    { src: "/GOV-LOGO/GOV_OF_J&K.png", alt: "Government of J&K" },
    { src: "/placeholder-logo.png", alt: "Partner" },
  ]
  
  // Duplicate logos for seamless scrolling
  const allLogos = [...logos, ...logos]
  
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    let animationId: number
    let scrollPosition = 0
    
    const scroll = () => {
      if (!scrollContainer) return
      
      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }
    
    animationId = requestAnimationFrame(scroll)
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div 
        ref={scrollRef}
        className="flex items-center space-x-12 py-4 overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: "smooth" }}
      >
        {allLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm flex items-center justify-center h-16 w-36">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={50}
                className="h-auto w-auto max-h-10 object-contain"
                style={{ filter: 'grayscale(0.4) contrast(1.1)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}