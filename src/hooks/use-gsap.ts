"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Cyberpunk color palette
const CYBER_COLORS = {
  accent: "#00ff88",
  secondary: "#ff00ff",
  tertiary: "#00d4ff",
  background: "#0a0a0f",
};


export function useGlitchReveal(selector?: string) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = selector
      ? document.querySelectorAll(selector)
      : elementRef.current;
    if (!target) return;

    const elements = selector
      ? Array.from(target as NodeListOf<HTMLElement>)
      : [elementRef.current as HTMLElement];

    elements.forEach((el) => {
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Initial state
      gsap.set(el, { opacity: 0, y: 30 });

      // Glitch animation
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out",
      })
        .to(el, {
          x: -5,
          duration: 0.05,
          ease: "power2.inOut",
        })
        .to(el, {
          x: 5,
          duration: 0.05,
          ease: "power2.inOut",
        })
        .to(el, {
          x: -3,
          skewX: 5,
          duration: 0.05,
          ease: "power2.inOut",
        })
        .to(el, {
          x: 3,
          skewX: -3,
          duration: 0.05,
          ease: "power2.inOut",
        })
        .to(el, {
          x: 0,
          skewX: 0,
          duration: 0.1,
          ease: "power2.out",
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector]);

  return elementRef;
}


export function useTerminalType(text: string, speed: number = 50) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.set(el, { text: "" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Typing effect
    tl.to(el, {
      duration: text.length * (speed / 1000),
      text: {
        value: text,
        delimiter: "",
      },
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text, speed]);

  return elementRef;
}

export function useStaggerReveal(
  containerSelector?: string,
  childSelector: string = "> *",
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerSelector
      ? document.querySelector(containerSelector)
      : containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    // Initial state
    gsap.set(children, {
      opacity: 0,
      y: 40,
      scale: 0.95,
    });

    gsap.to(children, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: {
        each: 0.1,
        from: "start",
      },
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [containerSelector, childSelector]);

  return containerRef;
}


export function useScanLine() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Create scan line element
    const scanLine = document.createElement("div");
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${CYBER_COLORS.accent}, transparent);
      z-index: 50;
      pointer-events: none;
    `;
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.appendChild(scanLine);

    gsap.to(scanLine, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      top: "100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        scanLine.remove();
      },
    });

    return () => {
      if (scanLine.parentNode) scanLine.remove();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return elementRef;
}

export function useNeonFlicker() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
    )
      .to(el, { opacity: 0.3, duration: 0.05 })
      .to(el, { opacity: 1, duration: 0.05 })
      .to(el, { opacity: 0.5, duration: 0.03 })
      .to(el, { opacity: 1, duration: 0.03 })
      .to(el, { opacity: 0.7, duration: 0.02 })
      .to(el, { opacity: 1, duration: 0.1 });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return elementRef;
}


export function useParallaxFloat(intensity: number = 20) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -intensity,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [intensity]);

  return elementRef;
}


export function useDigitalCounter(endValue: number, duration: number = 2) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      value: endValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.floor(obj.value).toString();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [endValue, duration]);

  return elementRef;
}


export function useCyberBorder() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        boxShadow: `0 0 0px ${CYBER_COLORS.accent}`,
        borderColor: "transparent",
      },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        boxShadow: `0 0 20px ${CYBER_COLORS.accent}40, inset 0 0 10px ${CYBER_COLORS.accent}20`,
        borderColor: CYBER_COLORS.accent,
        duration: 0.8,
        ease: "power2.out",
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return elementRef;
}


export function useMatrixRain(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = new Array(columns).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテト";

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = CYBER_COLORS.accent;
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    return () => clearInterval(interval);
  }, [canvasRef]);
}

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================
export function useSmoothScroll() {
  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!element) return;

    const y =
      element.getBoundingClientRect().top + window.pageYOffset - offset;

    gsap.to(window, {
      scrollTo: { y, autoKill: true },
      duration: 1,
      ease: "power3.inOut",
    });
  }, []);

  return scrollTo;
}

// ============================================
// MAGNETIC HOVER EFFECT
// ============================================
export function useMagneticHover(strength: number = 0.3) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
}

// ============================================
// SECTION REVEAL ANIMATION
// ============================================
export function useSectionReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header animation
    const header = section.querySelector("[data-gsap='header']");
    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
        {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }

    // Cards/items stagger animation
    const items = section.querySelectorAll("[data-gsap='item']");
    if (items.length) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          scrollTrigger: {
            trigger: items[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }

    // Fade items
    const fadeItems = section.querySelectorAll("[data-gsap='fade']");
    if (fadeItems.length) {
      gsap.fromTo(
        fadeItems,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: fadeItems[0],
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return sectionRef;
}

// ============================================
// TEXT SPLIT AND REVEAL
// ============================================
export function useTextSplitReveal() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    // Split into characters
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
    });

    const chars = el.querySelectorAll("span");

    gsap.to(chars, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: {
        each: 0.03,
        from: "random",
      },
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return elementRef;
}

// ============================================
// SCRAMBLE TEXT EFFECT
// ============================================
export function useScrambleText(finalText: string) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const chars = "!<>-_\\/[]{}—=+*^?#_01";
    let iteration = 0;

    gsap.fromTo(
      { progress: 0 },
      { progress: 0 },
      {
        progress: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          el.textContent = finalText
            .split("")
            .map((char, index) => {
              if (index < Math.floor(progress * finalText.length)) {
                return finalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [finalText]);

  return elementRef;
}

// Export a utility to initialize all GSAP defaults
export function initGSAPDefaults() {
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });

  ScrollTrigger.defaults({
    markers: false,
    toggleActions: "play none none none",
  });
}
