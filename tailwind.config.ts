import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#0a0a0f',
  			foreground: '#e0e0e0',
  			card: '#12121a',
  			'card-foreground': '#e0e0e0',
  			muted: '#1c1c2e',
  			'muted-foreground': '#6b7280',
  			accent: '#00ff88',
  			'accent-foreground': '#0a0a0f',
  			'accent-secondary': '#ff00ff',
  			'accent-tertiary': '#00d4ff',
  			border: '#2a2a3a',
  			input: '#12121a',
  			ring: '#00ff88',
  			destructive: '#ff3366',
  			'destructive-foreground': '#0a0a0f',
  			popover: '#12121a',
  			'popover-foreground': '#e0e0e0',
  			primary: {
  				DEFAULT: '#00ff88',
  				foreground: '#0a0a0f'
  			},
  			secondary: {
  				DEFAULT: '#ff00ff',
  				foreground: '#e0e0e0'
  			},
  			sidebar: {
  				DEFAULT: '#12121a',
  				foreground: '#e0e0e0',
  				primary: '#00ff88',
  				'primary-foreground': '#0a0a0f',
  				accent: '#ff00ff',
  				'accent-foreground': '#0a0a0f',
  				border: '#2a2a3a',
  				ring: '#00ff88'
  			}
  		},
  		fontFamily: {
  			heading: ['var(--font-orbitron)', 'var(--font-share-tech-mono)', 'monospace'],
  			body: ['var(--font-jetbrains-mono)', 'var(--font-fira-code)', 'monospace'],
  			mono: ['var(--font-jetbrains-mono)', 'var(--font-fira-code)', 'monospace']
  		},
  		borderRadius: {
  			none: '0px',
  			sm: '2px',
  			base: '4px',
  			lg: '8px'
  		},
  		boxShadow: {
  			'neon': '0 0 5px #00ff88, 0 0 10px #00ff8840',
  			'neon-sm': '0 0 3px #00ff88, 0 0 6px #00ff8830',
  			'neon-lg': '0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830',
  			'neon-secondary': '0 0 5px #ff00ff, 0 0 20px #ff00ff60',
  			'neon-tertiary': '0 0 5px #00d4ff, 0 0 20px #00d4ff60',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'blink': {
  				'50%': { opacity: '0' }
  			},
  			'glitch': {
  				'0%, 100%': { transform: 'translate(0)' },
  				'20%': { transform: 'translate(-2px, 2px)' },
  				'40%': { transform: 'translate(2px, -2px)' },
  				'60%': { transform: 'translate(-1px, -1px)' },
  				'80%': { transform: 'translate(1px, 1px)' }
  			},
  			'scanline': {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(100vh)' }
  			},
  			'rgb-shift': {
  				'0%, 100%': { textShadow: '-2px 0 #ff00ff, 2px 0 #00d4ff' },
  				'50%': { textShadow: '2px 0 #ff00ff, -2px 0 #00d4ff' }
  			},
  			'pulse-slow': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.5' }
  			},
  			'shimmer': {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			'fadeIn': {
  				'0%': { opacity: '0', transform: 'translateY(-4px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'typewriter': {
  				'0%': { width: '0' },
  				'100%': { width: '100%' }
  			},
  			'flicker': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.8' },
  				'25%, 75%': { opacity: '0.9' }
  			},
  			'dataStream': {
  				'0%': { transform: 'translateY(0)', opacity: '1' },
  				'100%': { transform: 'translateY(-20px)', opacity: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'blink': 'blink 1s step-end infinite',
  			'glitch': 'glitch 0.3s ease-in-out infinite',
  			'scanline': 'scanline 8s linear infinite',
  			'rgb-shift': 'rgb-shift 2s ease-in-out infinite',
  			'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  			'shimmer': 'shimmer 2s infinite',
  			'fadeIn': 'fadeIn 0.3s ease-out forwards',
  			'typewriter': 'typewriter 2s steps(40) forwards',
  			'flicker': 'flicker 0.15s infinite',
  			'dataStream': 'dataStream 1s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
