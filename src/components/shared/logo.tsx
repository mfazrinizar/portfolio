import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="210"
      height="30"
      viewBox="0 0 210 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="mfazrinizar.com Logo"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
      {...props}
    >
      {/* Terminal prompt */}
      <text
        x="0"
        y="22"
        fontFamily="'Share Tech Mono', monospace"
        fontSize="18"
        fontWeight="400"
        fill="#ff00ff"
      >
        &gt;
      </text>

      {/* Main text */}
      <text
        x="18"
        y="22"
        fontFamily="'Orbitron', monospace"
        fontSize="18"
        fontWeight="700"
        fill="#00ff88"
        letterSpacing="2"
      >
        mfazrinizar
      </text>

      {/* Extension */}
      <text
        x="150"
        y="22"
        fontFamily="'Share Tech Mono', monospace"
        fontSize="18"
        fontWeight="400"
        fill="#00d4ff"
      >
        .com
      </text>

      {/* Cursor blink */}
      <rect x="195" y="8" width="10" height="16" fill="#00ff88" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
