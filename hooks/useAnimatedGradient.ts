'use client';

import { useEffect, useState } from 'react';

export function useAnimatedGradient() {
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const position = (elapsed / 10000) * 200;
      setGradientPosition(position % 200);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return gradientPosition;
}

export default useAnimatedGradient;
