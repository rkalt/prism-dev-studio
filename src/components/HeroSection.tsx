import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingOrbs from './FloatingOrbs';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Hero content animations
    tl.fromTo(headlineRef.current,
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1.2, 
        ease: 'power2.out' 
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30, 
        filter: 'blur(5px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power2.out' 
      }, '-=0.6'
    )
    .fromTo(ctaRef.current,
      { 
        opacity: 0, 
        scale: 0.8, 
        filter: 'blur(5px)' 
      },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)', 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, '-=0.4'
    )
    .fromTo(splineRef.current,
      { 
        opacity: 0, 
        x: 100, 
        scale: 0.9 
      },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        duration: 1.5, 
        ease: 'power2.out' 
      }, '-=1'
    );

    // Parallax scroll effect for Spline
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(splineRef.current, {
          y: self.progress * 100,
          duration: 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingOrbs />

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight opacity-0"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="bg-gradient-neon bg-clip-text text-transparent glow-text">
                Rudraksh
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-light">
                Full Stack Developer
              </span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0"
            >
              Crafting immersive digital experiences with cutting-edge technologies. 
              Specialized in React, Node.js, and modern web development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                ref={ctaRef}
                onClick={scrollToProjects}
                className="neon-button opacity-0"
              >
                View My Work
              </button>
              <button className="glass-card px-8 py-4 text-foreground font-medium tracking-wide border border-border/50 hover:border-primary/50 transition-all duration-300">
                Download CV
              </button>
            </div>
          </div>

          {/* Right Content - Spline 3D */}
          <div 
            ref={splineRef}
            className="relative h-96 md:h-[500px] lg:h-[600px] opacity-0"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-card">
              <iframe 
                src='https://my.spline.design/chips-SwDizsrTS3TOMzruVI4EmXkX/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="rounded-2xl"
              />
            </div>
            
            {/* Glow effect around Spline */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
          <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;