'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scale?: number;
}

export function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '',
  scale = 0.8
}: ScaleInProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScaleIn;
