import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
  target?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  href,
  target
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#ffffff',
          color: '#050505',
          border: '1px solid #ffffff',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        };
    }
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 28px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '0.95rem',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
        ...getStyle()
      }}
      className="interactive"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {content}
      </a>
    );
  }

  return <div onClick={onClick} style={{ display: 'inline-block' }}>{content}</div>;
};
