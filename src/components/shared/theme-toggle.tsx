"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-accent" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-accent" />
          <span className="sr-only">Toggle theme</span>
          {/* Glow effect on hover */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/10 rounded" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="cyber-chamfer-sm border-accent/30 bg-surface/95 backdrop-blur-sm"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="font-mono text-sm cursor-pointer hover:bg-accent/10 hover:text-accent"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>[LIGHT]</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="font-mono text-sm cursor-pointer hover:bg-accent/10 hover:text-accent"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>[DARK]</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="font-mono text-sm cursor-pointer hover:bg-accent/10 hover:text-accent"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>[SYSTEM]</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
