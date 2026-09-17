import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CinematicRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  enable3DElevation?: boolean;
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = '',
  enable3DElevation = true,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: 'blur(10px)',
        ...(enable3DElevation ? { rotateX: 8, transformPerspective: 1000 } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ...(enable3DElevation ? { rotateX: 0 } : {}),
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cinematic bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
