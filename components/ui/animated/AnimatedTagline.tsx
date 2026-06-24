'use client';

import { motion } from 'motion/react';

export default function AnimatedTagline() {
  return (
    <div className="text-left mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-section-title text-gray-900"
      >
        {/* Row 1 */}
        <div>
          The only{' '}
          <span className="text-primary italic">one-stop-shop</span>
          {' '}for
        </div>
        {/* Row 2 */}
        <div>
          foreigners in Poland.
        </div>
      </motion.div>
    </div>
  );
}
