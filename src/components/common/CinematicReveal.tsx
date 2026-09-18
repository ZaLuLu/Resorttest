import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface CinematicRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  className?: string;
  enable3DElevation?: boolean;
  spring?: boolean;
  staggerChildren?: number;
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 32,
  xOffset = 35,
  direction = 'up',
  className = '',
  enable3DElevation = true,
  spring = false,
  staggerChildren,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (direction) {
      case 'down':
        return { opacity: 0, y: -yOffset, filter: 'blur(8px)', ...(enable3DElevation ? { rotateX: -6 } : {}) };
      case 'left':
        return { opacity: 0, x: xOffset, filter: 'blur(8px)' };
      case 'right':
        return { opacity: 0, x: -xOffset, filter: 'blur(8px)' };
      case 'scale':
        return { opacity: 0, scale: 0.92, filter: 'blur(10px)' };
      case 'none':
        return { opacity: 0, filter: 'blur(6px)' };
      case 'up':
      default:
        return {
          opacity: 0,
          y: yOffset,
          filter: 'blur(10px)',
          ...(enable3DElevation ? { rotateX: 6, transformPerspective: 1000 } : {}),
        };
    }
  };

  const getAnimate = () => {
    return {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
    };
  };

  const transitionConfig = spring
    ? {
        type: 'spring' as const,
        stiffness: 140,
        damping: 18,
        delay,
      }
    : {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        ...transitionConfig,
        ...(staggerChildren ? { staggerChildren, delayChildren: delay } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

