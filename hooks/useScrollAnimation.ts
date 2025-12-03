'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  amount?: 'some' | 'all' | number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, once = true, amount = 'some' } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return { ref, isInView };
}

export default useScrollAnimation;
