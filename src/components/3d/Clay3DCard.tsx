import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Clay3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
  variant?: 'white' | 'sand' | 'water';
}

export const Clay3DCard: React.FC<Clay3DCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glareOpacity = 0.22,
  scaleOnHover = 1.025,
  variant = 'white',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const variantClass = {
    white: 'clay-card border-2 border-white shadow-[0_14px_32px_rgba(22,41,38,0.08)]',
    sand: 'clay-card-sand border-2 border-white shadow-[0_14px_32px_rgba(181,135,91,0.1)]',
    water: 'clay-card-water border-2 border-white shadow-[0_18px_40px_rgba(19,117,134,0.1)]',
  }[variant];

  return (
    <div
      style={{ perspective: '1100px' }}
      className="relative w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-3xl p-4 transition-all duration-300 ${variantClass} ${className}`}
      >
        {/* Dynamic Specular Sunlight Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 65%)`,
          }}
        />

        {/* Content Container with 3D Depth Elevation */}
        <div
          style={{ transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)' }}
          className="relative z-10 transition-transform duration-200"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
export default Clay3DCard;

