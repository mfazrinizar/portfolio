"use client";
import { useEffect, useRef, useState } from 'react';
import { phrases } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 60;
  const deletingSpeed = 30;
  const pauseTime = 2500;
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          timeout = setTimeout(handleTyping, typingSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          timeout = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
          timeout = setTimeout(handleTyping, typingSpeed);
        }
      }
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => {
      mounted.current = false;
      clearTimeout(timeout);
    };
  }, [charIndex, isDeleting, phraseIndex]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-background via-muted/50 to-background py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl animate-pulse-slower"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex justify-center mb-12 md:hidden">
          <div className="relative w-[250px] h-[250px] group">
            <div className="group absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full transform group-hover:scale-105" />
            <Image
              src="/images/logo.png"
              alt="Abstract representation of code or design"
              width={600}
              height={600}
              className="rounded-full shadow-2xl object-cover relative z-10 transform transition-transform duration-500 animate-pulse-slow group-hover:rotate-1 group-hover:scale-105"
              priority
              data-ai-hint="technology design"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="text-primary font-semibold tracking-wide uppercase min-h-[2.5rem] block">
              {displayText}
              <span className="animate-pulse-text">|</span>
            </span>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Standing on the Shoulders<br className="hidden md:block" /> of Giants
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-xl mx-auto md:mx-0">
              Greetings! I&apos;m <span className="font-bold text-foreground">M. Fazri Nizar</span>. I engineer robust software solutions and thrive on discovering new insights at the intersection of technology and research.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button size="lg" asChild>
                <Link href="#projects" onClick={(e) => handleScrollTo(e, '#projects')}>
                  View My Work <ArrowRight className="ml-2" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link href="/path-to-your-resume.pdf" target="_blank">
                  <Download className="mr-2" /> Download Resume
                </Link>
              </Button> */}
            </div>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <Link href="https://github.com/mfazrinizar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </Link>
              <Link href="https://linkedin.com/in/mfazrinizar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="https://instagram.com/mfazrinizar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
            </div>
          </div>
          {/* Logo on the right for md+ */}
          <div className="hidden md:block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full transform group-hover:scale-105"></div>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={600}
              height={600}
              className="rounded-full shadow-2xl object-cover relative z-10 transform transition-transform duration-500 animate-pulse-slow group-hover:rotate-1 group-hover:scale-105"
              priority
              data-ai-hint="technology design"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.05); }
  }
  @keyframes pulse-slower {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.03); }
  }
  @keyframes pulse-text {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.0; transform: scale(1.02); }
  }
  .animate-pulse-text { animation: pulse-text 1.25s infinite ease-in-out; }
  .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
  .animate-pulse-slower { animation: pulse-slower 10s infinite ease-in-out; }
`;
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
