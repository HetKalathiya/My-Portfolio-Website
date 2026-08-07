import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillItem } from '../../data/skills';
import { X, CheckCircle2, Sparkles, Award } from 'lucide-react';

interface SkillDetailModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  // Close on Escape key press and disable body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skill) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const brandColor = skill.brandColors.primary;
  const glowColor = skill.brandColors.glow;

  return createPortal(
    <AnimatePresence>
      {skill && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-skill-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#0a0a0f',
              border: `1.5px solid ${glowColor}`,
              borderRadius: '24px',
              padding: '36px',
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px ${glowColor}`,
              zIndex: 2,
              color: '#ffffff',
              overflow: 'hidden'
            }}
          >
            {/* Header Accent Glow Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close skill details"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#a1a1aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a1a1aa';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <X size={18} />
            </button>

            {/* Top Identity Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: `2px solid ${brandColor}`,
                  boxShadow: `0 0 20px ${glowColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: brandColor,
                  fontSize: '1.8rem',
                  fontWeight: 800
                }}
              >
                {skill.name.charAt(0)}
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: brandColor,
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {skill.category}
                </span>

                <h3
                  id="modal-skill-title"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    margin: '4px 0 0'
                  }}
                >
                  {skill.name}
                </h3>
              </div>
            </div>

            {/* Proficiency Rating Meter */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '18px 20px',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={16} style={{ color: brandColor }} />
                  Technical Mastery
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: brandColor, fontFamily: 'var(--font-mono)' }}>
                  {skill.proficiency}%
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${brandColor}, #ffffff)`,
                    boxShadow: `0 0 12px ${brandColor}`
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <p style={{ color: '#d4d4d8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
              {skill.description}
            </p>

            {/* Highlights List */}
            <div>
              <h4
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#a1a1aa',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={14} style={{ color: brandColor }} />
                Core Capabilities & Architecture
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skill.highlights.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#e4e4e7' }}>
                    <CheckCircle2 size={16} style={{ color: brandColor, flexShrink: 0 }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
