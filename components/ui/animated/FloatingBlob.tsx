'use client';

import { motion } from 'motion/react';
import { theme } from '@/lib/theme';

interface FloatingBlobProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
}

export function FloatingBlob({
  color = theme.colors.primary,
  size = 400,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 20,
}: FloatingBlobProps) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-[0.08]"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        backgroundColor: color,
      }}
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default FloatingBlob;
