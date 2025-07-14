import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Twitter } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Abhijit Prakash Nikam",
    position: "Director & Co-Founder",
    bio: "Visionary leader driving CanoSolutions' mission to transform businesses through innovative AI and IoT solutions. Expert in digital transformation and government partnerships.",
    image: "/abhi.jpeg",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    name: "Samradnyee Prakash Nikam",
    position: "Director & Co-Founder",
    bio: "Technical strategist specializing in enterprise solutions and smart systems. Passionate about delivering tailored software solutions for modern businesses.",
    image: "/sam.jpeg",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    name: "Vinay Bharti",
    position: "Chief Technology Officer",
    bio: "Technology leader with expertise in AI/ML, cloud architecture, and enterprise solutions. Drives technical innovation and oversees development of cutting-edge software solutions.",
    image: "/vinod.jpeg",
    linkedin: "https://www.linkedin.com/in/vinay-bharti/",
    github: "#",
    twitter: "#",
  },
]

export default function TeamSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-h2 font-inter font-bold text-textPrimary">Meet the Innovators</h2>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            Our young, dynamic team combines deep technical expertise with fresh perspectives to deliver innovative
            solutions that drive real business transformation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className={`card-hover border-0 shadow-lg fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-card">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover object-center transition-transform duration-300 hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-inter font-semibold text-textPrimary">{member.name}</h3>
                    <p className="text-primary font-medium text-sm sm:text-base">{member.position}</p>
                  </div>

                  <p className="text-textSecondary text-sm leading-relaxed">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex space-x-3 pt-2">
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent touch-target">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent touch-target">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent touch-target">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Culture Section */}
        <div className="mt-16 bg-neutralCard rounded-card p-8">
          <div className="text-center space-y-6">
            <h3 className="text-h3 font-inter font-bold text-textPrimary">Our Culture</h3>
            <p className="text-textSecondary max-w-2xl mx-auto">
              We believe in fostering innovation through collaboration, continuous learning, and a passion for solving
              complex problems with elegant solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Innovation First</div>
                <p className="text-textSecondary text-sm">Always exploring cutting-edge technologies</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Client Success</div>
                <p className="text-textSecondary text-sm">Your success is our primary measure</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Continuous Growth</div>
                <p className="text-textSecondary text-sm">Learning and evolving every day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
