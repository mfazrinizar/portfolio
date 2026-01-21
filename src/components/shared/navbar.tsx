"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  // Initial mount animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo glitch entrance
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          x: -30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Nav items staggered entrance
      const navLinks = navItemsRef.current?.querySelectorAll("a");
      if (navLinks) {
        gsap.fromTo(
          navLinks,
          {
            opacity: 0,
            y: -20,
            rotateX: -45,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5,
          },
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover effect for nav items
  useEffect(() => {
    const navLinks = navItemsRef.current?.querySelectorAll("a");
    if (!navLinks) return;

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
      // Neon glow pulse
      gsap.to(target, {
        boxShadow:
          "0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.2)",
        duration: 0.3,
      });
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getNavOffset = () => {
    const nav = document.querySelector("header");
    return nav ? nav.clientHeight + 8 : 80;
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hash = href.startsWith("/#") ? href.slice(1) : href;
    const isHome = pathname === "/" || pathname === "/#home";
    if (hash.startsWith("#") && isHome) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      setTimeout(() => {
        const targetId = hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const nav = document.querySelector("header");
          const offset =
            window.innerWidth < 768
              ? nav
                ? nav.clientHeight - 8
                : 56
              : nav
                ? nav.clientHeight + 8
                : 80;
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-accent/30 shadow-neon-sm"
          : "bg-background/80 backdrop-blur-sm border-border",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 max-w-7xl">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/#home"
          onClick={(e) => handleScrollTo(e, "/#home")}
          className="flex items-center gap-2 group"
          aria-label="mfazrinizar.com homepage"
        >
          <Terminal className="h-5 w-5 text-accent group-hover:animate-blink" />
          <span className="font-heading font-bold text-lg uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
            mfazrinizar<span className="text-accent">.</span>com
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          ref={navItemsRef}
          className="hidden items-center space-x-1 md:flex"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="px-4 py-2 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 border border-transparent hover:border-accent/30 cyber-chamfer-sm group"
            >
              <span className="text-accent mr-1 font-bold">
                {String(index + 1).padStart(2, "0")}.
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                className="border border-border hover:border-accent hover:shadow-neon-sm"
              >
                <Menu className="h-6 w-6 text-accent" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background border-l-2 border-accent p-6"
            >
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              {/* Mobile menu header */}
              <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-accent" />
                  <span className="font-heading font-bold text-lg uppercase tracking-widest">
                    mfazrinizar<span className="text-accent">.</span>com
                  </span>
                </div>
              </div>

              {/* Mobile navigation items */}
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="px-4 py-3 font-mono text-base uppercase tracking-widest text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 border-2 border-border hover:border-accent cyber-chamfer-sm flex items-center"
                  >
                    <span className="text-accent mr-3 font-bold">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu footer */}
              <div className="mt-8 pt-4 border-t border-border">
                <p className="font-mono text-xs text-muted-foreground text-center">
                  <span className="text-accent animate-blink">●</span> SYSTEM
                  ONLINE
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
