import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Thumbnail Header */}
      <div
        style={{
          height: '220px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0a0a0a'
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(80%) contrast(110%) brightness(85%)',
            transition: 'transform 0.5s ease, filter 0.5s ease'
          }}
          className="card-image"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.3) 60%, rgba(13,13,13,0) 100%)'
          }}
        />

        {/* Year Pill */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '14px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600
          }}
        >
          {project.year}
        </div>

        {/* Category Pill */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#050505',
            padding: '4px 12px',
            borderRadius: '14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Body Content */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '6px'
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#ffffff',
              opacity: 0.7,
              fontWeight: 500,
              marginBottom: '14px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {project.subtitle}
          </p>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#a1a1aa',
              lineHeight: '1.5',
              marginBottom: '20px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {project.description}
          </p>
        </div>

        <div>
          {/* Metrics Pill Row if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '16px',
                padding: '10px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {project.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '20px'
            }}
          >
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 9px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  color: '#e4e4e7',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <button
              onClick={() => onSelect(project)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: 0
              }}
              className="interactive"
            >
              <span>Case Study</span>
              <ArrowUpRight size={16} />
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#a1a1aa',
                  transition: 'color 0.2s',
                  padding: '6px'
                }}
                className="interactive"
                title="View Source Code"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#a1a1aa',
                  transition: 'color 0.2s',
                  padding: '6px'
                }}
                className="interactive"
                title="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-panel:hover .card-image {
          transform: scale(1.05);
          filter: grayscale(0%) contrast(100%) brightness(100%);
        }
      `}</style>
    </motion.div>
  );
};
