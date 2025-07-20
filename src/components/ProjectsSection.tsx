import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "StudyMate AI",
      description: "AI-powered learning platform with personalized study materials and smart recommendations.",
      tech: ["React", "TypeScript", "Node.js", "OpenAI", "MongoDB"],
      image: "/lovable-uploads/b60976d7-a093-471a-ba2c-e14fd94e628f.png",
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 2,
      title: "CanvaSync",
      description: "Next-gen collaborative whiteboard with real-time synchronization and advanced tools.",
      tech: ["React", "WebRTC", "Socket.io", "Canvas API", "Redis"],
      image: "/lovable-uploads/ebbdfaaa-d927-432d-b68f-e541ef965162.png",
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 3,
      title: "Brainwave Chat",
      description: "Advanced AI chat application with multiple model support and rich conversation features.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "OpenAI", "Stripe"],
      image: "/lovable-uploads/76b10ec1-7b9a-4d75-b894-520203998a18.png",
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 4,
      title: "Huly Workspace",
      description: "All-in-one team collaboration platform replacing Linear, Jira, Slack, and Notion.",
      tech: ["Vue.js", "TypeScript", "Express", "MongoDB", "Docker"],
      image: "/lovable-uploads/177c9063-b909-4fc8-86b0-221dc0bd5f2b.png",
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 5,
      title: "CryptoTracker Pro",
      description: "Advanced cryptocurrency portfolio tracker with real-time data and analytics.",
      tech: ["React Native", "Redux", "CoinGecko API", "Firebase"],
      image: "/lovable-uploads/b60976d7-a093-471a-ba2c-e14fd94e628f.png",
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 6,
      title: "DevFlow IDE",
      description: "Cloud-based development environment with collaborative coding features.",
      tech: ["React", "Monaco Editor", "WebSocket", "Docker", "AWS"],
      image: "/lovable-uploads/ebbdfaaa-d927-432d-b68f-e541ef965162.png",
      links: {
        github: "#",
        live: "#"
      }
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power2.out' 
      }
    );

    // Animate project cards
    const projectCards = projectsRef.current?.querySelectorAll('.project-card');
    projectCards?.forEach((card, index) => {
      tl.fromTo(card,
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          ease: 'power2.out' 
        }, `-=${0.8 - (index * 0.1)}`
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Featured </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent glow-text">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.links.github}
                    className="p-2 glass-card rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <GithubLogo size={20} className="text-foreground" />
                  </a>
                  <a 
                    href={project.links.live}
                    className="p-2 glass-card rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Globe size={20} className="text-foreground" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    size={20} 
                    className="text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="neon-button">
            View All Projects
          </button>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-3xl" />
    </section>
  );
};

export default ProjectsSection;