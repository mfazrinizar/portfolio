import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Terminal,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 text-muted-foreground border-t-2 border-border relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:px-6 relative z-10 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand section */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 group"
              aria-label="mfazrinizar.com homepage"
            >
              <Terminal className="h-5 w-5 text-accent group-hover:animate-blink" />
              <span className="font-heading font-bold text-xl uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                mfazrinizar<span className="text-accent">.</span>com
              </span>
            </Link>
            <p className="text-sm font-mono leading-relaxed">
              <span className="text-accent">$</span> Building the future, one
              pixel at a time. Discovering new insights at the intersection of
              technology and research.
            </p>
            {/* Status indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-accent">
                System Online
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="mb-4 font-heading font-bold uppercase tracking-widest text-accent text-sm">
              Navigate
            </h3>
            <ul className="space-y-3 text-sm font-mono">
              {[
                { label: "Home", href: "/#home" },
                { label: "Projects", href: "/#projects" },
                { label: "About", href: "/#about" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                  >
                    <span className="text-accent opacity-50 group-hover:opacity-100">
                      {">"}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-heading font-bold uppercase tracking-widest text-accent-tertiary text-sm">
              Resources
            </h3>
            <ul className="space-y-3 text-sm font-mono">
              {[
                {
                  label: "Repository",
                  href: "https://github.com/mfazrinizar/portfolio",
                  external: true,
                },
                {
                  label: "Documentation",
                  href: "https://github.com/mfazrinizar/portfolio",
                  external: true,
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent-tertiary transition-colors group"
                    target={link.external ? "_blank" : undefined}
                  >
                    <span className="text-accent-tertiary opacity-50 group-hover:opacity-100">
                      {">"}
                    </span>
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-4 font-heading font-bold uppercase tracking-widest text-accent-secondary text-sm">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: Github,
                  href: "https://github.com/mfazrinizar",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/mfazrinizar",
                  label: "LinkedIn",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com/mfazrinizar",
                  label: "Instagram",
                },
                {
                  icon: GraduationCap,
                  href: "https://scholar.google.com/citations?user=mKYdQmkAAAAJ",
                  label: "Google Scholar",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 border-2 border-border bg-muted/50 hover:border-accent-secondary hover:shadow-neon-secondary transition-all duration-200 cyber-chamfer-sm group"
                  target="_blank"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent-secondary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-accent">&lt;</span> &copy;{currentYear}{" "}
              mfazrinizar.com | All rights reserved{" "}
              <span className="text-accent">/&gt;</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-accent-tertiary">Protocol:</span> HTTPS |{" "}
              <span className="text-accent-secondary">Build:</span> v1.0.0 |{" "}
              <span className="text-accent">Status:</span>{" "}
              <span className="animate-blink">●</span> Active
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
