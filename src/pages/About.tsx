import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { MagneticButton } from '../components/ui/MagneticButton';
import { SkillsSection } from '../components/ui/SkillsSection';
import { Download, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      {/* Header Banner */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <SectionHeader
            badge="Biography & Specialization"
            title="ABOUT ME"
            description="Full-stack UI/UX software engineer specialized in building high-contrast, scalable digital products and clean frontend architectures."
          />
        </div>
      </section>

      {/* Bio Grid */}
      <section style={{ marginBottom: '100px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'stretch'
            }}
          >
            {/* Profile Photo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-panel"
              style={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: '380px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '24px'
              }}
            >
              <img
                src="/profile.png"
                alt="Het Kalathiya"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(110%) brightness(90%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.2) 60%, rgba(5,5,5,0) 100%)'
                }}
              />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                  Het Kalathiya
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>
                  Full Stack Web Developer
                </p>
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel"
              style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '16px' }}>
                  Engineering Mindset
                </h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '20px', fontSize: '1rem' }}>
                  I build intelligent software that combines artificial intelligence with modern full-stack development. My focus is on creating fast, scalable, and user-centric applications that solve practical problems instead of simply showcasing technology.
                </p>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '1rem' }}>
                  From training machine learning models to designing responsive interfaces and developing secure backend systems, I enjoy working across the complete development lifecycle. Every project I build emphasizes clean architecture, performance, maintainability, and exceptional user experience.
                </p>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <MagneticButton
                  href="/Het_Kalathiya_Resume.pdf"
                  target="_blank"
                  variant="primary"
                >
                  <span>Download Resume (PDF)</span>
                  <Download size={18} />
                </MagneticButton>
              </div>
            </motion.div>

            {/* Quick Facts Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel"
              style={{ padding: '40px' }}
            >
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '24px' }}>
                Key Highlights
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Primary Focus', val: 'Artificial Intelligence, Full Stack Development' },
                  { label: 'Location', val: 'Surat, Gujarat (Available for Remote / Global)' },
                  { label: 'Current Expertise', val: 'AI Model Development, REST APIs, Cloud Deployment' },
                  { label: 'Education', val: 'B.Tech. in Computer Science & Engineering' },
                  { label: 'Languages', val: 'Gujarati (Native), Hindi (Conversational), English (Fluent)' }
                ].map((item, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Orbital Skills Section */}
      <SkillsSection />

      {/* Experience Page Link Banner */}
      <section className="section-padding" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '48px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Career History
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
                EXPLORE WORK EXPERIENCE & CREDENTIALS
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '1rem', marginTop: '6px', maxWidth: '600px' }}>
                View detailed timelines of enterprise engineering roles, key deliverables, Lighthouse metrics, and AWS/Meta accreditations.
              </p>
            </div>

            <NavLink to="/experience" style={{ textDecoration: 'none' }}>
              <MagneticButton variant="primary">
                <span>View Experience Page</span>
                <ArrowRight size={18} />
              </MagneticButton>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
