'use client';

import { motion } from 'motion/react';
import { theme } from '@/lib/theme';
import { useState, MouseEvent } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  enableRipple?: boolean;
  disabled?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  enableRipple = true,
  disabled = false,
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const baseClasses = `inline-flex items-center justify-center gap-2 ${theme.fontWeight.semibold} ${theme.transition.default} relative overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-hover ${theme.shadow.lg}`,
    secondary: `bg-white text-primary border-2 border-gray-300 hover:border-primary`,
    outline: `bg-transparent border-2 border-dashed border-primary text-primary hover:bg-primary-light`,
  };

  const sizeClasses = {
    sm: `px-4 py-2 ${theme.fontSize.sm} ${theme.radius.full}`,
    md: `px-6 py-3 ${theme.fontSize.base} ${theme.radius.full}`,
    lg: `px-8 py-4 ${theme.fontSize.lg} ${theme.radius.full}`,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (enableRipple) {
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = {
        x,
        y,
        id: Date.now(),
      };

      setRipples([...ripples, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  const rippleContent = (
    <>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            opacity: variant === 'primary' ? 0.3 : 0.2,
          }}
          initial={{ width: 0, height: 0, opacity: variant === 'primary' ? 0.3 : 0.2 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={theme.animation.spring.default}
      >
        {children}
        {rippleContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={classes}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={theme.animation.spring.default}
    >
      {children}
      {rippleContent}
    </motion.button>
  );
}
