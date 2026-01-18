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

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 60;
  const deletingSpeed = 30;
  const pauseTime = 2500;
  const mounted = useRef(true);

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
      id="home"
      className="relative bg-background min-h-screen flex items-center overflow-hidden grid-pattern py-20 md:py-32 lg:py-40"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-tertiary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 600">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#00ff88" />
              <circle cx="180" cy="20" r="2" fill="#00ff88" />
              <circle cx="20" cy="180" r="2" fill="#00ff88" />
              <circle cx="180" cy="180" r="2" fill="#00ff88" />
              <line
                x1="20"
                y1="20"
                x2="180"
                y2="20"
                stroke="#00ff88"
                strokeWidth="0.5"
              />
              <line
                x1="20"
                y1="180"
                x2="180"
                y2="180"
                stroke="#00ff88"
                strokeWidth="0.5"
              />
              <line
                x1="20"
                y1="20"
                x2="20"
                y2="180"
                stroke="#00ff88"
                strokeWidth="0.5"
              />
              <line
                x1="180"
                y1="20"
                x2="180"
                y2="180"
                stroke="#00ff88"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#circuit)" />
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider sm:tracking-widest leading-tight">
                <span className="neon-text">M. Fazri</span>
                <br />
                <span className="neon-text-secondary">Nizar</span>
              </h1>

              {/* Typing effect subtitle */}
              <div className="space-y-2">
                <div className="h-10 sm:h-12 flex items-center">
                  <span className="font-mono text-base sm:text-lg md:text-xl text-accent-tertiary">
                    $ {displayText}
                    <span className="cursor-blink ml-1">█</span>
                  </span>
                </div>
                <p className="text-muted-foreground font-mono text-[10px] sm:text-sm uppercase tracking-wider">
                  Building the future, one byte at a time
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-foreground leading-relaxed max-w-md">
              Welcome to my digital domain. I craft elegant solutions at the
              intersection of research and engineering, turning complex problems
              into beautiful, functional realities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
              >
                <Button className="bg-accent text-background hover:bg-accent/90 shadow-neon-lg uppercase font-bold tracking-wider h-12 px-8 cyber-chamfer-sm">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
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
            <div className="flex items-center gap-4 pt-4 border-t border-border">
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
            <div className="holographic cyber-chamfer p-6 space-y-4 border-2 border-accent/50 shadow-neon-lg relative overflow-hidden">
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
            <div className="holographic cyber-chamfer p-6 border-2 border-accent-secondary/50 shadow-neon-secondary">
              <div className="grid grid-cols-3 gap-4 font-mono text-center">
                <div className="hex-loading p-2">
                  <div className="text-2xl font-bold text-accent-secondary animate-pulse-slow">
                    100+
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
                    className="text-2xl font-bold text-accent-tertiary animate-pulse-slow"
                    style={{ animationDelay: "0.5s" }}
                  >
                    3+
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
                    className="text-2xl font-bold text-accent animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  >
                    100%
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
