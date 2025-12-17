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
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", alt: "Amazon" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png", alt: "Wipro" },
  ]
  
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .scroller-container {
            overflow: hidden;
            margin: 8px 0;
          }
          .scroller {
            display: flex;
            align-items: center;
            gap: 20px;
            width: max-content;
            animation: icon-scroller-left 60s linear infinite;
            will-change: transform;
          }
          .scroller:hover {
            animation-play-state: paused;
          }
          .scroller-reverse {
            display: flex;
            align-items: center;
            gap: 20px;
            width: max-content;
            animation: icon-scroller-right 60s linear infinite;
            will-change: transform;
          }
          .scroller-reverse:hover {
            animation-play-state: paused;
          }
          .scroller-img {
            width: 160px;
            height: 80px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          @keyframes icon-scroller-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes icon-scroller-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @media (max-width: 800px) {
            .scroller-img { 
              width: 140px; 
              height: 70px; 
              padding: 12px; 
            }
          }
          @media (max-width: 500px) {
            .scroller-img { 
              width: 120px; 
              height: 60px; 
              padding: 10px; 
            }
          }
        `
      }} />
      
      {/* Government logos - Left to Right */}
      <div className="scroller-container">
        <div className="scroller">
          {[...govLogos, ...govLogos, ...govLogos, ...govLogos].map((logo, index) => (
            <div key={`gov-${index}`} className="scroller-img">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={50}
                className="h-auto w-auto max-h-12 max-w-32 object-contain"
                unoptimized={logo.src.startsWith('http')}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Private company logos - Right to Left */}
      <div className="scroller-container">
        <div className="scroller-reverse">
          {[...privateLogos, ...privateLogos, ...privateLogos, ...privateLogos].map((logo, index) => (
            <div key={`private-${index}`} className="scroller-img">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={50}
                className="h-auto w-auto max-h-12 max-w-32 object-contain"
                unoptimized={logo.src.startsWith('http')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}