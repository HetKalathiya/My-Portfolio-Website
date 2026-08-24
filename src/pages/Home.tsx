import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechTicker } from '../components/ui/TechTicker';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Modal } from '../components/ui/Modal';
import { MagneticButton } from '../components/ui/MagneticButton';
import { EngineeringPillars } from '../components/ui/EngineeringPillars';
import { PROJECTS_DATA } from '../data/projects';
import type { Project } from '../data/projects';
import { ArrowRight, Terminal, MapPin, CheckCircle2 } from 'lucide-react';

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div>
      {/* Split Hero Section with Photo */}
      <section
        style={{
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '60px 0 80px'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE_APPLE }}
            >
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '30px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  marginBottom: '28px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 12px #ffffff'
                  }}
                />
                <span>FULL STACK WEB DEVELOPER & ARCHITECT</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                  fontWeight: 800,
                  lineHeight: '1.08',
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  marginBottom: '24px'
                }}
              >
                TURNING IDEAS INTO INTELLIGENT SOFTWARE.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.3 }}
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: '#a1a1aa',
                  maxWidth: '580px',
                  marginBottom: '36px',
                  lineHeight: '1.6'
                }}
              >
                I design and develop intelligent web applications that combine seamless user experiences with powerful automation. My expertise spans full-stack architecture, AI integration, and scalable cloud-native solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '48px'
                }}
              >
                <NavLink to="/projects" style={{ textDecoration: 'none' }}>
                  <MagneticButton variant="primary">
                    <span>Explore Featured Works</span>
                    <ArrowRight size={18} />
                  </MagneticButton>
                </NavLink>

                <NavLink to="/contact" style={{ textDecoration: 'none' }}>
                  <MagneticButton variant="secondary">
                    <span>Get In Touch</span>
                  </MagneticButton>
                </NavLink>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_APPLE, delay: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  paddingTop: '28px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {[
                  { label: 'Years Exp.', value: '0' },
                  { label: 'Projects', value: '2+' },
                  { label: 'Satisfaction', value: '100%' }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Photo Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE_APPLE, delay: 0.2 }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Photo Glassmorphic Frame */}
              <div
                className="glass-panel"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '440px',
                  height: '520px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
                }}
              >
                <img
                  src="/profile.png"
                  alt="Het Kalathiya"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(108%) brightness(95%)'
                  }}
                />

                {/* Gradient Bottom Fade */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0) 100%)'
                  }}
                />

                {/* Floating Name Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    right: 24,
                    backgroundColor: 'rgba(12, 12, 12, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                      Het Kalathiya
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      Full Stack Web Developer
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px'
                    }}
                  >
                    <MapPin size={12} />
                    <span>Surat, Gujarat</span>
                  </div>
                </div>

                {/* Top Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    backgroundColor: '#ffffff',
                    color: '#050505',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>Verified Engineer</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Ticker */}
      <TechTicker />

      {/* Featured Projects Showcase */}
      {featuredProjects.length > 0 && (
        <section className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
          <div className="container">
            <SectionHeader
              badge="Selected Work"
              title="FEATURED CASE STUDIES"
              description="Explore key full-stack platforms, design systems, and Web apps engineered for maximum performance and visual precision."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '32px',
                marginBottom: '48px'
              }}
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <NavLink to="/projects" style={{ textDecoration: 'none' }}>
                <MagneticButton variant="outline">
                  <span>View All Projects ({PROJECTS_DATA.length})</span>
                  <ArrowRight size={18} />
                </MagneticButton>
              </NavLink>
            </div>
          </div>
        </section>
      )}

      {/* Engineering Philosophy Section */}
      <section
        className="section-padding"
        style={{
          backgroundColor: '#030303',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Core Philosophy"
            title="ENGINEERING PILLARS"
            description="Four fundamental standards guiding every line of code and interface design."
            centered
          />

          <EngineeringPillars />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <Terminal size={24} />
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '16px'
              }}
            >
              HAVE A PROJECT IN MIND?
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#a1a1aa',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}
            >
              Let’s collaborate to build something performant, elegant, and impactful.
            </p>

            <NavLink to="/contact" style={{ textDecoration: 'none' }}>
              <MagneticButton variant="primary">
                <span>Start a Conversation</span>
                <ArrowRight size={18} />
              </MagneticButton>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
