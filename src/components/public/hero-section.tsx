"use client";
import { useEffect, useRef, useState } from "react";
import { phrases, terminalCommands } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Instagram,
  Terminal,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 60;
  const deletingSpeed = 30;
  const pauseTime = 2500;
  const mounted = useRef(true);

  // GSAP refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const hudPanelRef = useRef<HTMLDivElement>(null);
  const terminalPanelRef = useRef<HTMLDivElement>(null);
  const statsPanelRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<
    { type: "input" | "output"; text: string }[]
  >([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence messages
  const bootMessages = [
    { text: "Initializing system...", delay: 0 },
    { text: "Loading kernel modules... [OK]", delay: 400 },
    { text: "Mounting filesystem... [OK]", delay: 800 },
    { text: "Establishing secure connection...", delay: 1200 },
    { text: "Decrypting user data... [OK]", delay: 1600 },
    { text: "Loading AI subsystems...", delay: 2000 },
    { text: "Neural interface ready... [OK]", delay: 2400 },
    { text: "System boot complete.", delay: 2800 },
    { text: "Welcome to NIZAR_OS v2.0", delay: 3200 },
  ];

  // GSAP Hero Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          ctaRef.current,
          socialRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        },
      );

      gsap.set(
        [hudPanelRef.current, terminalPanelRef.current, statsPanelRef.current],
        {
          opacity: 0,
          x: 100,
          scale: 0.95,
        },
      );

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Title animation with glitch effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out",
      })
        .to(titleRef.current, {
          x: -5,
          duration: 0.04,
          ease: "power2.inOut",
        })
        .to(titleRef.current, {
          x: 5,
          skewX: 5,
          duration: 0.04,
          ease: "power2.inOut",
        })
        .to(titleRef.current, {
          x: -3,
          skewX: -3,
          duration: 0.04,
          ease: "power2.inOut",
        })
        .to(titleRef.current, {
          x: 0,
          skewX: 0,
          duration: 0.08,
          ease: "power2.out",
        })

        // Subtitle fade in
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2",
        )

        // Description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )

        // CTA buttons
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )

        // Social links
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )

        // HUD panels slide in from right
        .to(
          hudPanelRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )

        .to(
          statsPanelRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );

      // Stats number animation
      const stats = document.querySelectorAll("[data-stat-value]");
      stats.forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-stat-value") || "0");
        const suffix = stat.getAttribute("data-stat-suffix") || "";
        gsap.fromTo(
          stat,
          { textContent: "0" },
          {
            textContent: endValue,
            duration: 2,
            delay: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              stat.textContent =
                Math.floor(parseFloat(stat.textContent || "0")) + suffix;
            },
          },
        );
      });

      // Circuit pattern drawing animation - diagonal reveal from top-left to bottom-right
      if (circuitRef.current) {
        // Set initial opacity immediately
        gsap.set(circuitRef.current, { opacity: 0.2 });

        // Initial reveal animation
        gsap.fromTo(
          circuitRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 5,
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Boot sequence animation
  useEffect(() => {
    bootMessages.forEach(({ text, delay }) => {
      setTimeout(() => {
        setBootSequence((prev) => [...prev, text]);
      }, delay);
    });

    const bootTimer = setTimeout(() => {
      setBootComplete(true);
    }, 3600);

    const terminalTimer = setTimeout(() => {
      setShowTerminal(true);
    }, 4000);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(terminalTimer);
    };
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [
      ...terminalHistory,
      { type: "input" as const, text: cmd },
    ];

    if (cmd === "clear") {
      setTerminalHistory([]);
    } else {
      const response =
        terminalCommands[cmd] ||
        `Command not found: "${cmd}". Type "help" for available commands.`;
      newHistory.push({ type: "output" as const, text: response });
      setTerminalHistory(newHistory);
    }
    setTerminalInput("");
  };

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

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-background min-h-screen flex items-center overflow-hidden grid-pattern py-20 md:py-32 lg:py-40"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-tertiary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Circuit pattern overlay */}
      <div ref={circuitRef} className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="304"
              height="304"
              patternUnits="userSpaceOnUse"
            >
              <path
                fill="#00ff88"
                fillOpacity={0.25}
                d="M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col space-y-6">
            {/* Terminal prompt */}
            <div className="inline-block">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  welcome_to_sprawl
                </span>
              </div>
            </div>

            {/* Main heading with glitch effect */}
            <div className="space-y-3">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider sm:tracking-widest leading-tight"
              >
                <span className="neon-text">M. Fazri</span>
                {/* <br /> */}
                <span className="neon-text-secondary"> Nizar</span>
              </h1>

              {/* Typing effect subtitle */}
              <div ref={subtitleRef} className="space-y-2">
                <div className="h-10 sm:h-12 flex items-center">
                  <span className="font-mono text-base sm:text-lg md:text-xl text-accent-tertiary">
                    $ {displayText}
                    <span className="cursor-blink ml-1">█</span>
                  </span>
                </div>
                <p className="text-muted-foreground font-mono text-[10px] sm:text-sm uppercase tracking-wider">
                  Standing on the shoulders of giants
                </p>
              </div>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-base md:text-lg text-foreground leading-relaxed max-w-md"
            >
              Welcome to my digital domain. I craft elegant solutions at the
              intersection of research and engineering, turning complex problems
              into beautiful, functional realities.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
              >
                <Button className="bg-accent text-background hover:bg-accent/90 shadow-neon-lg uppercase font-bold tracking-wider h-12 px-8 cyber-chamfer-sm group">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* <Button 
                variant="outline" 
                className="border-2 border-accent text-accent hover:bg-accent/10 hover:shadow-neon uppercase font-bold tracking-wider h-12 px-8 cyber-chamfer-sm"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button> */}
            </div>

            {/* Social links */}
            <div
              ref={socialRef}
              className="flex items-center gap-4 pt-4 border-t border-border"
            >
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                Connect:
              </span>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/mfazrinizar",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://linkedin.com/in/mfazrinizar",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    url: "https://instagram.com/mfazrinizar",
                  },
                  {
                    icon: GraduationCap,
                    label: "Google Scholar",
                    url: "https://scholar.google.com/citations?user=mKYdQmkAAAAJ",
                  },
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={social.label}
                  >
                    <div className="p-2 border border-border hover:border-accent hover:shadow-neon-sm transition-all duration-200 cyber-chamfer-sm group-hover:bg-accent/10">
                      <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Holographic terminal HUD */}
          <div className="hidden lg:flex flex-col gap-4">
            {/* Top HUD panel with logo background */}
            <div
              ref={hudPanelRef}
              className="holographic cyber-chamfer p-6 space-y-4 border-2 border-accent/50 shadow-neon-lg relative overflow-hidden"
            >
              {/* Logo background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <Image
                  src="/images/logo.png"
                  alt="Logo Background"
                  width={200}
                  height={200}
                  className="object-contain filter blur-sm"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">
                    ● SYSTEM STATUS
                  </span>
                  <span className="text-2xl animate-blink">⚬</span>
                </div>

                {/* Boot sequence animation */}
                {!bootComplete ? (
                  <div className="space-y-2 font-mono text-xs text-foreground mt-4">
                    {/* Boot progress bar */}
                    <div className="boot-progress mb-3">
                      <div className="boot-progress-bar" />
                    </div>

                    {/* Boot messages */}
                    <div className="h-28 overflow-hidden scan-line">
                      {bootSequence.map((msg, idx) => (
                        <div
                          key={idx}
                          className="animate-fadeIn flex items-center gap-2"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <span
                            className={
                              msg.includes("[OK]")
                                ? "text-accent"
                                : msg.includes("Welcome")
                                  ? "text-accent-secondary"
                                  : "text-accent-tertiary"
                            }
                          >
                            {msg.includes("[OK]")
                              ? "✓"
                              : msg.includes("Welcome")
                                ? "★"
                                : "▸"}
                          </span>
                          <span
                            className={
                              msg.includes("Welcome")
                                ? "text-accent-secondary font-bold"
                                : ""
                            }
                          >
                            {msg}
                          </span>
                        </div>
                      ))}
                      {bootSequence.length < bootMessages.length && (
                        <div className="flex items-center gap-2 text-accent-tertiary">
                          <span className="cyber-spinner !w-3 !h-3 !border" />
                          <span className="animate-pulse">Processing...</span>
                        </div>
                      )}
                    </div>

                    {/* Hex data display */}
                    <div className="text-[10px] text-muted-foreground/40 font-mono overflow-hidden whitespace-nowrap">
                      <span className="inline-block animate-shimmer">
                        0x4E495A4152 :: 0x53595354454D :: 0x52454144595F
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-xs text-foreground mt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-accent">{">"}</span>{" "}
                      <span>
                        Status:{" "}
                        <span className="text-accent font-bold">ONLINE</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full bg-accent animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span className="text-accent">{">"}</span>{" "}
                      <span>
                        Connection:{" "}
                        <span className="text-accent-tertiary font-bold">
                          STABLE
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full bg-accent animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                      <span className="text-accent">{">"}</span>{" "}
                      <span>
                        Signal:{" "}
                        <span className="text-accent-secondary font-bold">
                          MAXIMUM
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent-tertiary animate-ping" />
                      <span className="text-accent-tertiary">{">"}</span>{" "}
                      <span className="animate-rgb-shift">
                        Ready for input...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Terminal - shown after delay */}
            {showTerminal && (
              <div className="holographic cyber-chamfer border-2 border-accent-tertiary/50 shadow-neon-tertiary overflow-hidden animate-fadeIn terminal-loading">
                <div className="bg-accent-tertiary/20 px-4 py-2 border-b border-accent-tertiary/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-accent-tertiary" />
                    <span className="font-mono text-xs text-accent-tertiary uppercase tracking-wider">
                      Interactive Terminal
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-destructive/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-accent/70" />
                  </div>
                </div>
                <div
                  ref={terminalRef}
                  className="p-4 font-mono text-xs h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/30 crt-flicker"
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="text-muted-foreground mb-2 flex items-center gap-2">
                    <span className="text-accent-tertiary">{">"}</span>
                    <span>Type &quot;help&quot; for commands</span>
                  </div>
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        item.type === "input"
                          ? "text-accent"
                          : "text-foreground/80"
                      }
                    >
                      {item.type === "input" ? `$ ${item.text}` : item.text}
                    </div>
                  ))}
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="flex items-center gap-1 mt-1"
                  >
                    <span className="text-accent">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-accent caret-accent"
                      placeholder="type a command..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              </div>
            )}

            {/* Bottom HUD panel with stats */}
            <div
              ref={statsPanelRef}
              className="holographic cyber-chamfer p-6 border-2 border-accent-secondary/50 shadow-neon-secondary"
            >
              <div className="grid grid-cols-3 gap-4 font-mono text-center">
                <div className="hex-loading p-2">
                  <div
                    className="text-2xl font-bold text-accent-secondary"
                    data-stat-value="100"
                    data-stat-suffix="+"
                  >
                    0+
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Projects
                  </div>
                </div>
                <div
                  className="hex-loading p-2"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className="text-2xl font-bold text-accent-tertiary"
                    data-stat-value="3"
                    data-stat-suffix="+"
                  >
                    0+
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Years
                  </div>
                </div>
                <div
                  className="hex-loading p-2"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div
                    className="text-2xl font-bold text-accent"
                    data-stat-value="100"
                    data-stat-suffix="%"
                  >
                    0%
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Dedicated
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile HUD panels - shown below content on smaller screens */}
          <div className="lg:hidden space-y-4">
            {/* Mobile System Status with boot animation */}
            <div className="holographic cyber-chamfer p-4 border-2 border-accent/50 shadow-neon relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">
                  ● SYSTEM STATUS
                </span>
                <span className="text-lg animate-blink">⚬</span>
              </div>

              {!bootComplete ? (
                <div className="space-y-2 font-mono text-[10px] sm:text-xs">
                  {/* Boot progress bar */}
                  <div className="boot-progress mb-2">
                    <div className="boot-progress-bar" />
                  </div>

                  {/* Boot messages */}
                  <div className="h-20 overflow-hidden scan-line">
                    {bootSequence.slice(-4).map((msg, idx) => (
                      <div
                        key={idx}
                        className="animate-fadeIn flex items-center gap-1 sm:gap-2"
                      >
                        <span
                          className={
                            msg.includes("[OK]")
                              ? "text-accent"
                              : msg.includes("Welcome")
                                ? "text-accent-secondary"
                                : "text-accent-tertiary"
                          }
                        >
                          {msg.includes("[OK]")
                            ? "✓"
                            : msg.includes("Welcome")
                              ? "★"
                              : "▸"}
                        </span>
                        <span
                          className={
                            msg.includes("Welcome")
                              ? "text-accent-secondary font-bold"
                              : ""
                          }
                        >
                          {msg}
                        </span>
                      </div>
                    ))}
                    {bootSequence.length < bootMessages.length && (
                      <div className="flex items-center gap-2 text-accent-tertiary">
                        <span className="cyber-spinner !w-2 !h-2 !border" />
                        <span className="animate-pulse">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>
                      Status:{" "}
                      <span className="text-accent font-bold">ONLINE</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-tertiary animate-pulse" />
                    <span>
                      Signal:{" "}
                      <span className="text-accent-tertiary font-bold">
                        STABLE
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Stats panel */}
            <div className="holographic cyber-chamfer p-4 border-2 border-accent-secondary/50 shadow-neon-secondary">
              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="hex-loading p-2">
                  <div className="text-xl sm:text-2xl font-bold text-accent-secondary animate-pulse-slow">
                    100+
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                    Projects
                  </div>
                </div>
                <div
                  className="hex-loading p-2"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className="text-xl sm:text-2xl font-bold text-accent-tertiary animate-pulse-slow"
                    style={{ animationDelay: "0.5s" }}
                  >
                    3+
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                    Years
                  </div>
                </div>
                <div
                  className="hex-loading p-2"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div
                    className="text-xl sm:text-2xl font-bold text-accent animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  >
                    100%
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                    Dedicated
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Terminal - shown after boot */}
            {showTerminal && (
              <div className="holographic cyber-chamfer border-2 border-accent-tertiary/50 shadow-neon-tertiary overflow-hidden animate-fadeIn terminal-loading">
                <div className="bg-accent-tertiary/20 px-3 py-2 border-b border-accent-tertiary/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-accent-tertiary" />
                    <span className="font-mono text-[10px] sm:text-xs text-accent-tertiary uppercase tracking-wider">
                      Terminal
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                  </div>
                </div>
                <div
                  className="p-3 font-mono text-[10px] sm:text-xs h-28 overflow-y-auto crt-flicker"
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="text-muted-foreground mb-2 flex items-center gap-1">
                    <span className="text-accent-tertiary">{">"}"</span>
                    Type &quot;help&quot; for commands
                  </div>
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        item.type === "input"
                          ? "text-accent"
                          : "text-foreground/80"
                      }
                    >
                      {item.type === "input" ? `$ ${item.text}` : item.text}
                    </div>
                  ))}
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="flex items-center gap-1 mt-1"
                  >
                    <span className="text-accent">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-accent caret-accent text-[10px] sm:text-xs"
                      placeholder="type a command..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
