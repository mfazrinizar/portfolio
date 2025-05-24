import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/shared/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 text-muted-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 inline-block" aria-label="mfazrinizar.com homepage">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm">
              Discovering new insights at the intersection of technology and research
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Navigate</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#home" className="hover:text-primary">Home</Link></li>
                  <li><Link href="/#projects" className="hover:text-primary">Projects</Link></li>
                  <li><Link href="/#about" className="hover:text-primary">About</Link></li>
                  <li><Link href="/#contact" className="hover:text-primary">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="https://github.com/mfazrinizar/portfolio" className="hover:text-primary">Repository</Link></li>
                  <li><Link href="https://github.com/mfazrinizar/portfolio" className="hover:text-primary">Docs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Connect</h3>
                <div className="flex space-x-4">
                  <Link href="https://github.com/mfazrinizar" aria-label="GitHub" className="hover:text-primary"><Github size={20} /></Link>
                  <Link href="https://linkedin.com/in/mfazrinizar" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={20} /></Link>
                  <Link href="https://instagram.com/mfazrinizar" aria-label="Instagram" className="hover:text-primary"><Instagram size={20} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy;{currentYear} mfazrinizar.com | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
