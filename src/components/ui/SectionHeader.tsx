import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  centered = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: '56px',
        textAlign: centered ? 'center' : 'left',
        maxWidth: centered ? '700px' : '100%',
        margin: centered ? '0 auto 56px' : '0 0 56px'
      }}
    >
      {/* Category / Subtitle Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#e4e4e7',
          marginBottom: '16px',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#ffffff'
          }}
        />
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: description ? '16px' : '0',
          letterSpacing: '-0.03em'
        }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '1.1rem',
            color: '#a1a1aa',
            maxWidth: '650px',
            lineHeight: '1.6',
            margin: centered ? '0 auto' : '0'
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};
