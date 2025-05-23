import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="210"
      height="30"
      viewBox="0 0 150 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="mfazrinizar.com Logo"
      {...props}
    >
      <text
        x="0" 
        y="22"
        fontFamily="var(--font-geist-sans), sans-serif" 
        fontSize="22"
        fontWeight="600"
        className="fill-primary" 
      >
        mfazrinizar.com
      </text>
    </svg>
  );
}
