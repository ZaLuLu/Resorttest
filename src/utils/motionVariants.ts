import { Variants, Transition } from 'framer-motion';

// Standard Brand Transitions
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

export const slowSpringTransition: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 18,
};

export const silkTransition: Transition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
};

export const crossFadeTransition: Transition = {
  duration: 0.9,
  ease: [0.25, 1, 0.5, 1],
};

// Reusable Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: silkTransition,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: silkTransition,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: silkTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const cardPop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
};

// Reduced Motion Fallback
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
