'use client';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = '', width, height }: LogoProps) {
  return (
    <img
      src="/branding/logo.svg"
      alt="FOREIGNERS.pl"
      className={`h-9 w-auto md:h-11 ${className}`}
      style={width && height ? { width, height, objectFit: 'contain' } : undefined}
    />
  );
}
