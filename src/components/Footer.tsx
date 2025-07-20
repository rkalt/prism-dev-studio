import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(footerRef.current,
      { 
        opacity: 0, 
        y: 60, 
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

    // Floating particles animation
    const particles = footerRef.current?.querySelectorAll('.particle');
    particles?.forEach((particle, index) => {
      gsap.to(particle, {
        y: -20,
        duration: 3 + (index * 0.5),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.2
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 bg-gradient-to-t from-background via-background/95 to-transparent overflow-hidden"
    >
      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary/40 rounded-full blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                <span className="bg-gradient-neon bg-clip-text text-transparent glow-text">
                  Rudraksh
                </span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Full Stack Developer crafting innovative digital experiences 
                with cutting-edge technologies and creative solutions.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" weight="fill" />
              <span>and lots of ☕</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:glow-text"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">
              Let's Connect
            </h4>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Email:</strong><br />
                rudraksh@example.com
              </p>
              <p>
                <strong className="text-foreground">Location:</strong><br />
                Available Worldwide
              </p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="neon-button flex items-center space-x-2 text-sm px-4 py-2"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rudraksh Kapoor. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and GSAP
          </p>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-neon opacity-30" />
    </footer>
  );
};

export default Footer;