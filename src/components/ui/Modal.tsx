import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import type { Project } from '../../data/projects';
import { MagneticButton } from './MagneticButton';
import { GithubIcon } from './SocialIcons';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '90px 20px 32px',
            overflowY: 'auto'
          }}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 99998
            }}
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              backgroundColor: '#0c0c0c',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
              zIndex: 99999,
              padding: '36px',
              margin: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                zIndex: 10
              }}
              className="interactive"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#ffffff',
                  color: '#050505',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                {project.category} // {project.year}
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}
              >
                {project.title}
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#a1a1aa',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Modal Cover Image */}
            <div
              style={{
                width: '100%',
                height: '320px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '32px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {project.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.8rem', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Overview */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '12px' }}>
                Architecture & Implementation Breakdown
              </h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '1rem' }}>
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>
                Key Technical Deliverables
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7' }}>
                    <CheckCircle2 size={18} style={{ color: '#ffffff', marginTop: '3px', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '12px' }}>
                Technologies & Tools
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Only show Live Demo button if a real URL exists */}
              {project.liveUrl && (
                <MagneticButton href={project.liveUrl} target="_blank" variant="primary">
                  <span>Launch Live Demo</span>
                  <ExternalLink size={18} />
                </MagneticButton>
              )}

              <MagneticButton href={project.githubUrl} target="_blank" variant="secondary">
                <span>View Source Code</span>
                <GithubIcon size={18} />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
