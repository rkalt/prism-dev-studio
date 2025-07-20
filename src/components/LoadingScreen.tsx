import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(logoRef.current, 
      { 
        opacity: 0, 
        scale: 0.5, 
        filter: 'blur(20px)' 
      },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power2.out' 
      }
    );

    // Progress bar animation
    let progress = 0;
    const progressAnimation = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(percentageRef.current, {
        textContent: `${Math.floor(progress)}%`,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (progress >= 100) {
        clearInterval(progressAnimation);
        
        // Exit animation
        setTimeout(() => {
          tl.to(progressBarRef.current?.parentElement, {
            opacity: 0,
            duration: 0.5
          })
          .to(logoRef.current, {
            scale: 0.8,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.8,
            ease: 'power2.inOut'
          }, '-=0.3')
          .to(preloaderRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete();
            }
          }, '-=0.5');
        }, 500);
      }
    }, 100);

    return () => clearInterval(progressAnimation);
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{ background: 'var(--gradient-space)' }}
    >
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-32 h-32 top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
        <div className="floating-orb w-24 h-24 top-3/4 right-1/4" style={{ animationDelay: '2s' }} />
        <div className="floating-orb w-16 h-16 top-1/2 right-1/3" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Logo/Name */}
        <div ref={logoRef} className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold glow-text">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Rudraksh
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Full Stack Developer
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="loading-bar h-full w-0"
            />
          </div>
          <div 
            ref={percentageRef}
            className="text-sm text-muted-foreground font-mono"
          >
            0%
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;