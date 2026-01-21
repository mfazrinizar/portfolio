"use client";

import {
  useEffect,
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export function useGSAPContext() {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAPContext must be used within GSAPProvider");
  }
  return context;
}

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // GSAP defaults for cyberpunk theme
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6,
    });

    // ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false,
      toggleActions: "play none none none",
    });

    // Refresh ScrollTrigger on route change
    const handleRouteChange = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <GSAPContext.Provider value={{ gsap, ScrollTrigger }}>
      {children}
    </GSAPContext.Provider>
  );
}

// Animated comps
interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlitchText({
  children,
  className = "",
  delay = 0,
}: GlitchTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      delay,
    });

    gsap.set(el, { opacity: 0, y: 20 });

    tl.to(el, { opacity: 1, y: 0, duration: 0.1 })
      .to(el, { x: -4, duration: 0.04, ease: "power2.inOut" })
      .to(el, { x: 4, skewX: 5, duration: 0.04, ease: "power2.inOut" })
      .to(el, { x: -2, skewX: -3, duration: 0.04, ease: "power2.inOut" })
      .to(el, { x: 2, skewX: 2, duration: 0.04, ease: "power2.inOut" })
      .to(el, { x: 0, skewX: 0, duration: 0.08, ease: "power2.out" });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay]);

  return (
    <span ref={elementRef} className={className}>
      {children}
    </span>
  );
}

interface CyberRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function CyberReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: CyberRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const directions = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { x: 60, y: 0 },
      right: { x: -60, y: 0 },
    };

    const { x, y } = directions[direction];

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y,
        x,
        clipPath:
          direction === "up"
            ? "inset(100% 0 0 0)"
            : direction === "down"
              ? "inset(0 0 100% 0)"
              : direction === "left"
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
      },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        x: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.8,
        delay,
        ease: "power3.out",
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [direction, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("[data-stagger-item]");
    if (!items.length) return;

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: staggerDelay,
        ease: "power3.out",
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface NeonPulseProps {
  children: ReactNode;
  className?: string;
  color?: "accent" | "secondary" | "tertiary";
}

export function NeonPulse({
  children,
  className = "",
  color = "accent",
}: NeonPulseProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const colors = {
      accent: "#00ff88",
      secondary: "#ff00ff",
      tertiary: "#00d4ff",
    };

    const glowColor = colors[color];

    // Entry animation
    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    entryTl
      .fromTo(
        el,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4 },
      )
      .fromTo(
        el,
        { boxShadow: `0 0 0px ${glowColor}00` },
        {
          boxShadow: `0 0 20px ${glowColor}60, 0 0 40px ${glowColor}30`,
          duration: 0.3,
        },
      );

    return () => {
      entryTl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [color]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleChars?: string;
}

export function ScrambleText({
  text,
  className = "",
  scrambleChars = "!<>-_\\/[]{}—=+*^?#_01アイウ",
}: ScrambleTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.textContent = "";

    const animation = gsap.to(
      { progress: 0 },
      {
        progress: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        duration: 1.2,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          el.textContent = text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < Math.floor(progress * text.length)) {
                return text[index];
              }
              return scrambleChars[
                Math.floor(Math.random() * scrambleChars.length)
              ];
            })
            .join("");
        },
      },
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [text, scrambleChars]);

  return (
    <span ref={elementRef} className={className}>
      {text}
    </span>
  );
}

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function Counter({
  end,
  duration = 2,
  suffix = "",
  className = "",
}: CounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      value: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.floor(obj.value) + suffix;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [end, duration, suffix]);

  return (
    <span ref={elementRef} className={className}>
      0{suffix}
    </span>
  );
}

interface ScanRevealProps {
  children: ReactNode;
  className?: string;
  scanColor?: string;
}

export function ScanReveal({
  children,
  className = "",
  scanColor = "#00ff88",
}: ScanRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scanLine = scanLineRef.current;
    if (!container || !scanLine) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      container.querySelector("[data-content]"),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    ).fromTo(
      scanLine,
      { top: 0, opacity: 1 },
      { top: "100%", opacity: 0, duration: 0.8, ease: "power2.inOut" },
      0,
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div data-content>{children}</div>
      <div
        ref={scanLineRef}
        className="absolute left-0 w-full h-1 pointer-events-none z-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${scanColor}, transparent)`,
          boxShadow: `0 0 10px ${scanColor}, 0 0 20px ${scanColor}`,
        }}
      />
    </div>
  );
}
