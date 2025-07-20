import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll('.orb');
    
    orbs?.forEach((orb, index) => {
      gsap.to(orb, {
        y: -30 - (index * 10),
        x: 20 - (index * 15),
        duration: 3 + (index * 0.5),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.5
      });

      gsap.to(orb, {
        rotation: 360,
        duration: 8 + (index * 2),
        repeat: -1,
        ease: 'none'
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large background orbs */}
      <div className="orb absolute w-96 h-96 rounded-full opacity-20 top-10 -right-20 bg-gradient-to-br from-neon-blue to-neon-purple blur-3xl" />
      <div className="orb absolute w-80 h-80 rounded-full opacity-15 -bottom-20 -left-20 bg-gradient-to-br from-neon-pink to-neon-cyan blur-3xl" />
      <div className="orb absolute w-64 h-64 rounded-full opacity-25 top-1/3 left-1/4 bg-gradient-to-br from-neon-purple to-primary blur-2xl" />
      
      {/* Small floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="orb absolute w-2 h-2 rounded-full bg-primary opacity-40 blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      
      {/* Medium glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`medium-${i}`}
          className="orb absolute w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary opacity-30 blur-md"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;