'use client';

import { motion } from 'motion/react';
import { useCursorEffect } from '@/hooks';
import { theme } from '@/lib/theme';

export function CustomCursor() {
  const { cursorPosition, isHovering } = useCursorEffect();

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorPosition.x,
          y: cursorPosition.y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div
          className="w-4 h-4 rounded-full border-2 border-white"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </motion.div>

      {/* Follower cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorPosition.x,
          y: cursorPosition.y,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{
            backgroundColor: theme.colors.primary,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </>
  );
}

export default CustomCursor;