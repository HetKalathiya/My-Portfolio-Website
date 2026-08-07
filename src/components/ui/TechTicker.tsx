import React from 'react';
import { motion } from 'framer-motion';

const TECH_ITEMS = [
  'React 18',
  'TypeScript',
  'Next.js',
  'Framer Motion',
  'Node.js',
  'GraphQL',
  'PostgreSQL',
  'Tailwind CSS',
  'Docker',
  'Rest APIs',
  'Design Systems',
  'W3C AAA Accessibility'
];

export const TechTicker: React.FC = () => {
  const doubledItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '30px 0',
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '40px',
          whiteSpace: 'nowrap',
          width: 'max-content'
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25
        }}
      >
        {doubledItems.map((tech, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: '#e4e4e7',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
              }}
            />
            <span>{tech}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
