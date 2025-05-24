"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle'; 
import { navItems } from '@/lib/constants';

export function Navbar() {
  const pathname = usePathname(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false); 
  }, [pathname]);


  const getNavOffset = () => {
    const nav = document.querySelector('header');
    return nav ? nav.clientHeight + 8 : 80; 
  };

 const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const hash = href.startsWith("/#") ? href.slice(1) : href;
  const isHome = pathname === "/" || pathname === "/#home";
  if (hash.startsWith("#") && isHome) {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const targetId = hash.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const nav = document.querySelector('header');
        const offset =
          window.innerWidth < 768
            ? (nav ? nav.clientHeight - 8 : 56)
            : (nav ? nav.clientHeight + 8 : 80);
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    }, 300);
  }
};

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/#home" onClick={(e) => handleScrollTo(e, '/#home')} className="flex items-center" aria-label="mfazrinizar.com homepage">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className="text-base font-medium hover:bg-primary/10 hover:text-primary text-foreground/80"
            >
              <Link href={item.href} onClick={(e) => handleScrollTo(e, item.href)}>{item.label}</Link>
            </Button>
          ))}
          <div className="ml-2">
             <ThemeToggle />
          </div>
        </nav>
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open mobile menu" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <div className="mb-6 flex items-center justify-between">
                 <Link href="/#home" onClick={(e) => handleScrollTo(e, '/#home')} className="flex items-center" aria-label="mfazrinizar.com homepage">
                    <Logo className="h-7 w-auto" />
                  </Link>
              </div>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className="justify-start text-lg text-foreground/80"
                  >
                    <Link href={item.href} onClick={(e) => handleScrollTo(e, item.href)}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
