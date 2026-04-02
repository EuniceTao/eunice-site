/**
 * @file Reveal.jsx
 * @description 滚动进入动效：轻微上移 + 淡入，克制但有质感。
 */

import React from 'react';
import { motion, useInView } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 12 }) {
  const ref = React.useRef(null); // ref
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' }); // 进入视口

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

