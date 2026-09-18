import { Variants, Transition } from 'framer-motion';

// Standard Brand Transitions
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 16,
};

export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

export const slowSpringTransition: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 18,
};

export const silkTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export const crossFadeTransition: Transition = {
  duration: 0.8,
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
  hidden: { opacity: 0, y: 35, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -25, rotateX: -6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: silkTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: silkTransition,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: silkTransition,
  },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -35 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 22,
    },
  },
};

export const cardPop: Variants = {
  hidden: { opacity: 0, scale: 0.93, y: 25 },
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

