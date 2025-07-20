import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CodeSimple,
  Database,
  DeviceMobile,
  Globe,
  Lightning,
  Palette,
  Rocket,
  Stack
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: CodeSimple, name: 'Frontend', color: 'text-neon-blue' },
    { icon: Database, name: 'Backend', color: 'text-neon-purple' },
    { icon: DeviceMobile, name: 'Mobile', color: 'text-neon-pink' },
    { icon: Globe, name: 'Web3', color: 'text-neon-cyan' },
    { icon: Lightning, name: 'Performance', color: 'text-neon-blue' },
    { icon: Palette, name: 'UI/UX', color: 'text-neon-purple' },
    { icon: Rocket, name: 'DevOps', color: 'text-neon-pink' },
    { icon: Stack, name: 'Full Stack', color: 'text-neon-cyan' }
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

    tl.fromTo(imageRef.current,
      { 
        opacity: 0, 
        x: -50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power2.out' 
      }
    )
    .fromTo(contentRef.current,
      { 
        opacity: 0, 
        x: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power2.out' 
      }, '-=0.5'
    );

    // Skills animation
    const skillElements = skillsRef.current?.querySelectorAll('.skill-item');
    skillElements?.forEach((skill, index) => {
      tl.fromTo(skill,
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 20 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'back.out(1.7)' 
        }, `-=${0.8 - (index * 0.1)}`
      );
    });

    // Hover animations for skills
    skillElements?.forEach((skill) => {
      skill.addEventListener('mouseenter', () => {
        gsap.to(skill, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      skill.addEventListener('mouseleave', () => {
        gsap.to(skill, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Profile image container with glow */}
              <div className="absolute inset-0 bg-gradient-neon rounded-full blur-xl opacity-30 animate-pulse-glow" />
              <div className="relative w-full h-full glass-card rounded-full overflow-hidden border-2 border-primary/30">
                <img 
                  src="/lovable-uploads/5ce5baab-0966-4c26-a78d-b6251cc386f3.png" 
                  alt="Rudraksh Kapoor" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-neon rounded-full blur-sm opacity-60 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full blur-sm opacity-60 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-accent rounded-full blur-sm opacity-60 animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-foreground">About </span>
                <span className="bg-gradient-neon bg-clip-text text-transparent glow-text">
                  Me
                </span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate <span className="text-primary font-medium">Full Stack Developer</span> with 
                  over 4 years of experience crafting digital experiences that matter. 
                  I specialize in building scalable web applications using modern technologies.
                </p>
                <p>
                  My journey in tech started with curiosity and evolved into expertise across 
                  frontend frameworks, backend systems, and cloud infrastructure. I believe in 
                  writing clean, maintainable code and creating user-centric solutions.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Core Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-item glass-card p-4 text-center group cursor-pointer"
                  >
                    <skill.icon 
                      size={32} 
                      className={`mx-auto mb-2 ${skill.color} group-hover:animate-pulse`} 
                    />
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="neon-button">
                Let's Collaborate
              </button>
              <button className="glass-card px-6 py-3 text-foreground font-medium border border-border/50 hover:border-primary/50 transition-all duration-300">
                View Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;