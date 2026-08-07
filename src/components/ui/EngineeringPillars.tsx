import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Zap,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Cpu,
  Workflow
} from 'lucide-react';
import './EngineeringPillars.css';

export interface PillarData {
  id: 'performance' | 'architecture' | 'clarity' | 'motion';
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  metrics: { label: string; value: string }[];
  details: {
    heading: string;
    items: string[];
  }[];
  techStack: string[];
}

const PILLARS_DATA: PillarData[] = [
  {
    id: 'performance',
    title: 'Sub-Second Performance',
    tagline: 'Speed & Optimization',
    description: 'Optimized bundle sizes, zero-runtime bloat, dynamic lazy loading, and constant 60fps rendering.',
    icon: <Zap className="icon-animated" size={28} />,
    color: '#FF6B6B',
    glow: 'rgba(255, 107, 107, 0.5)',
    metrics: [
      { label: 'Lighthouse Performance', value: '99+' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'First Contentful Paint', value: '< 0.4s' },
      { label: 'Bundle Footprint', value: '< 45 KB' }
    ],
    details: [
      {
        heading: 'Core Performance Strategy',
        items: [
          'Aggressive asset compression, tree-shaking, and code splitting per route.',
          'GPU-accelerated CSS animations using transform & opacity only.',
          'Zero expensive main-thread blockings, ensuring responsive layout calculations.'
        ]
      },
      {
        heading: 'Runtime Optimization',
        items: [
          'De-debounced user events, requestAnimationFrame synchronization.',
          'Pre-fetched critical route bundles for near-instantaneous page changes.'
        ]
      }
    ],
    techStack: ['Vite', 'Tree Shaking', 'CSS Hardware Accel', 'Web Vitals']
  },
  {
    id: 'architecture',
    title: 'Type-Safe Architecture',
    tagline: 'Reliability & Scale',
    description: 'Strict TypeScript contracts, modular component breakdown, clear data flows, and zero hidden state mutations.',
    icon: <Code2 className="icon-animated" size={28} />,
    color: '#4ECDC4',
    glow: 'rgba(78, 205, 196, 0.5)',
    metrics: [
      { label: 'TypeScript Strictness', value: '100%' },
      { label: 'Any Types Allowed', value: '0' },
      { label: 'Component Reusability', value: 'High' },
      { label: 'Build Reliability', value: '99.9%' }
    ],
    details: [
      {
        heading: 'Architectural Standards',
        items: [
          'Uncompromising strict-mode TypeScript compilation with no implicitly typed values.',
          'Decoupled UI components from data fetching logic for predictable testing.',
          'Standardized design system token variables mapped across light and dark themes.'
        ]
      },
      {
        heading: 'Maintainability & Quality',
        items: [
          'Explicit prop interfaces with precise union types and non-null guarantees.',
          'Scalable folder structure built for seamless feature expansion.'
        ]
      }
    ],
    techStack: ['TypeScript Strict', 'React 18', 'Clean Architecture', 'Design Tokens']
  },
  {
    id: 'clarity',
    title: 'High-Contrast Clarity',
    tagline: 'Visual Precision',
    description: 'Minimalist monochrome design framing dynamic colors, emphasizing content hierarchy, accessibility, and high contrast.',
    icon: <Layers className="icon-animated" size={28} />,
    color: '#FFD93D',
    glow: 'rgba(255, 217, 61, 0.5)',
    metrics: [
      { label: 'WCAG Compliance', value: 'AAA' },
      { label: 'Contrast Ratio', value: '12.5:1' },
      { label: 'Design Consistency', value: '100%' },
      { label: 'Readability Index', value: 'High' }
    ],
    details: [
      {
        heading: 'Design & Visual Hierarchy',
        items: [
          'Curated color contrast enforcing strict optical weight between primary headers and body text.',
          'Intentional whitespace rhythm (8px grid standard) guiding user focus naturally.',
          'Semantic typography scaling tailored for high-density reading and scanning.'
        ]
      },
      {
        heading: 'Accessibility First',
        items: [
          'Fully accessible ARIA landmarks, keyboard navigable flow, and focus state highlights.',
          'Color-blind accessible color contrast pairing across light and dark modes.'
        ]
      }
    ],
    techStack: ['WCAG AAA', 'Responsive Layout', 'Semantic HTML5', 'Design System']
  },
  {
    id: 'motion',
    title: 'Fluid Micro-Motion',
    tagline: 'Delightful Feedback',
    description: 'Subtle interactive hover responses, physics-inspired kinetic mechanics, spring transitions, and responsive feedback.',
    icon: <Sparkles className="icon-animated" size={28} />,
    color: '#95E1D3',
    glow: 'rgba(149, 225, 211, 0.5)',
    metrics: [
      { label: 'Animation Latency', value: '0 ms' },
      { label: 'Interpolation Curve', value: 'Cubic' },
      { label: 'Interactive Polish', value: 'Premium' },
      { label: 'Jank Frequency', value: '0%' }
    ],
    details: [
      {
        heading: 'Motion Design Philosophy',
        items: [
          'Purposeful micro-interactions providing immediate sensory feedback for user inputs.',
          'Physics-driven spring curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for organic UI feel.',
          'Reduced-motion fallback support honoring user browser accessibility preferences.'
        ]
      },
      {
        heading: 'Interactive Layers',
        items: [
          'Magnetic buttons, ambient particle backgrounds, and glowing cursor hover states.',
          'Page transition staging and reveal animations on scroll.'
        ]
      }
    ],
    techStack: ['Framer Motion Concept', 'Custom CSS Physics', 'RAF Hooks', 'GPU Canvas']
  }
];

export const EngineeringPillars: React.FC = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPillar(null);
    };
    if (selectedPillar) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPillar]);

  return (
    <div className="pillars-wrapper">
      {/* Background SVG Network Connections for Desktop */}
      <div className="pillars-network-bg" aria-hidden="true">
        <svg className="pillars-network-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradPerf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGradArch" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#95E1D3" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Pillars Grid */}
      <div className="pillars-grid">
        {PILLARS_DATA.map((pillar) => (
          <div
            key={pillar.id}
            className="pillar-card"
            data-pillar={pillar.id}
            data-active={hoveredPillar === pillar.id}
            onMouseEnter={() => setHoveredPillar(pillar.id)}
            onMouseLeave={() => setHoveredPillar(null)}
            onClick={() => setSelectedPillar(pillar)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${pillar.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPillar(pillar);
              }
            }}
          >
            {/* Header */}
            <div className="pillar-card-header">
              <div className="pillar-icon-box">
                {pillar.icon}
              </div>
              <span className="pillar-tag">{pillar.tagline}</span>
            </div>

            {/* Body */}
            <div className="pillar-card-body">
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>

              {/* Metrics */}
              <div className="pillar-metrics-grid">
                {pillar.metrics.map((metric, idx) => (
                  <div key={idx} className="pillar-metric-item">
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="pillar-card-footer">
              <span className="pillar-action-btn">
                Explore Specifications
                <ArrowRight className="pillar-action-icon" size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Pillar Specification Modal */}
      {selectedPillar && createPortal(
        <div
          className="pillar-modal-backdrop"
          onClick={() => setSelectedPillar(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pillar-modal-content"
            data-pillar={selectedPillar.id}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="pillar-modal-close"
              onClick={() => setSelectedPillar(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="pillar-modal-header">
              <div className="pillar-modal-icon">
                {selectedPillar.icon}
              </div>
              <div>
                <span className="pillar-modal-subtitle">{selectedPillar.tagline}</span>
                <h2 className="pillar-modal-title">{selectedPillar.title}</h2>
              </div>
            </div>

            <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              {selectedPillar.description}
            </p>

            {/* Metrics */}
            <div className="pillar-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '16px' }}>
              {selectedPillar.metrics.map((m, idx) => (
                <div key={idx} className="pillar-metric-item" style={{ padding: '14px' }}>
                  <span className="metric-value" style={{ fontSize: '1.25rem' }}>{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Details breakdown */}
            {selectedPillar.details.map((sec, idx) => (
              <div key={idx} className="pillar-modal-section">
                <h4 className="pillar-modal-section-title">
                  <Workflow size={18} style={{ color: selectedPillar.color }} />
                  {sec.heading}
                </h4>
                <ul className="pillar-modal-list">
                  {sec.items.map((item, i) => (
                    <li key={i} className="pillar-modal-item">
                      <CheckCircle2 className="pillar-modal-item-icon" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Tech stack tags */}
            <div className="pillar-modal-section">
              <h4 className="pillar-modal-section-title">
                <Cpu size={18} style={{ color: selectedPillar.color }} />
                Tech Stack & Enforcement
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {selectedPillar.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: selectedPillar.color
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
