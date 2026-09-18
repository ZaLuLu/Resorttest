import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars';
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'words',
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: type === 'words' ? 0.06 : 0.025,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: -30,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 24,
      },
    },
  };

  if (type === 'chars') {
    const chars = Array.from(text);
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        aria-label={text}
        className={`inline-block [perspective:1000px] ${className}`}
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            aria-hidden="true"
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text}
      className={`inline-block [perspective:1000px] ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            variants={itemVariants}
            aria-hidden="true"
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
export default SplitTextReveal;

