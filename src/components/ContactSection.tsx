import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate form elements
    const formElements = formRef.current?.querySelectorAll('.form-element');
    formElements?.forEach((element, index) => {
      tl.fromTo(element,
        { 
          opacity: 0, 
          x: -30, 
          filter: 'blur(5px)' 
        },
        { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)', 
          duration: 0.6, 
          ease: 'power2.out' 
        }, index * 0.1
      );
    });

    // Social icons animation
    const socialIcons = sectionRef.current?.querySelectorAll('.social-icon');
    socialIcons?.forEach((icon, index) => {
      tl.fromTo(icon,
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
        }, `-=${0.6 - (index * 0.1)}`
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form submission animation
    gsap.to('.submit-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    try {
      // Form will be submitted to Formspree
      const form = e.target as HTMLFormElement;
      await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      // Success animation
      gsap.to('.submit-button', {
        backgroundColor: '#10B981',
        color: '#ffffff',
        duration: 0.3
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: GithubLogo,
      href: 'https://github.com/rudraksh',
      label: 'GitHub',
      color: 'hover:text-neon-blue'
    },
    {
      icon: LinkedinLogo,
      href: 'https://linkedin.com/in/rudraksh',
      label: 'LinkedIn',
      color: 'hover:text-neon-purple'
    },
    {
      icon: TwitterLogo,
      href: 'https://twitter.com/rudraksh',
      label: 'Twitter',
      color: 'hover:text-neon-cyan'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Let's </span>
              <span className="bg-gradient-neon bg-clip-text text-transparent glow-text">
                Connect
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can work together 
              to create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <form 
                ref={formRef}
                action="https://formspree.io/f/movlqezb"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="form-element">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full glass-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full glass-input"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full glass-input resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button neon-button w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <PaperPlaneTilt size={20} className={isSubmitting ? 'animate-bounce' : ''} />
                </button>
              </form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Get in Touch
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm always open to discussing new opportunities, 
                    innovative projects, and potential collaborations.
                  </p>
                  <p>
                    Whether you're a startup looking for a technical co-founder, 
                    an agency needing expert development, or a company seeking 
                    digital transformation, let's talk.
                  </p>
                </div>

                {/* Response Time */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      Usually responds within 24 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Connect on Social
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon p-4 glass-card rounded-full transition-all duration-300 ${social.color} group`}
                    >
                      <social.icon 
                        size={24} 
                        className="group-hover:scale-110 transition-transform duration-300" 
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">4+</div>
                    <div className="text-sm text-muted-foreground">Years Exp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
    </section>
  );
};

export default ContactSection;