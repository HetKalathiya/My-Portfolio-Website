import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { MagneticButton } from '../components/ui/MagneticButton';
import { EXPERIENCE_DATA } from '../data/experience';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  ArrowRight,
  FileText,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

export const Experience: React.FC = () => {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      {/* Header Banner */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <SectionHeader
            badge="Career History & Credentials"
            title="WORK EXPERIENCE"
            description="Track record of engineering roles, internship deliverables, responsive web projects, and verified enterprise credentials."
          />
        </div>
      </section>

      {/* Metrics Impact Banner */}
      <section style={{ marginBottom: '60px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              { label: 'Internship Role', value: 'Web Developer', icon: <Briefcase size={22} /> },
              { label: 'Organization', value: 'TechnoApp Solution', icon: <TrendingUp size={22} /> },
              { label: 'Evaluation Grade', value: 'Exemplary', icon: <Zap size={22} /> },
              { label: 'Official Verification', value: 'Offer & Certificate', icon: <ShieldCheck size={22} /> }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_APPLE }}
                className="glass-panel"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  {metric.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Experience Vertical Timeline */}
      <section style={{ marginBottom: '100px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '36px',
              position: 'relative',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {EXPERIENCE_DATA.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: EASE_APPLE }}
                className="glass-panel"
                style={{
                  padding: '40px',
                  borderLeft: '4px solid #ffffff',
                  position: 'relative'
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '20px'
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Internship Experience
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '1.1rem', color: '#a1a1aa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <Briefcase size={18} style={{ color: '#ffffff' }} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        color: '#ffffff',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}
                    >
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Role Description */}
                <p style={{ color: '#d4d4d8', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '14px'
                    }}
                  >
                    Key Responsibilities & Deliverables:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7', fontSize: '0.98rem', lineHeight: '1.5' }}>
                        <CheckCircle2 size={18} style={{ color: '#ffffff', marginTop: '2px', flexShrink: 0 }} />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: exp.documents ? '28px' : '0px' }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#71717a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '10px'
                    }}
                  >
                    Technologies & Skills:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.78rem',
                          padding: '5px 12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#a1a1aa',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 500
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Documents (Offer Letter & Certificate) */}
                {exp.documents && exp.documents.length > 0 && (
                  <div
                    style={{
                      paddingTop: '24px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FileText size={16} />
                      <span>Verified Verification Documents:</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                      {exp.documents.map((doc, dIdx) => (
                        <a
                          key={dIdx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 18px',
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '10px',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {doc.type === 'offer_letter' ? <FileText size={16} /> : <Award size={16} />}
                            <span>{doc.title}</span>
                            <ExternalLink size={14} style={{ opacity: 0.7 }} />
                          </motion.div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Recognition Grid */}
      <section className="section-padding" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <SectionHeader
            badge="Accreditations"
            title="CERTIFICATIONS & RECOGNITION"
            description="Verified enterprise credentials and technical awards."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                title: 'Claude 101 Certificate of Completion',
                issuer: 'Anthropic AI',
                year: '2026',
                url: '/Het_Kalathiya_Anthropic_Claude_101_Certificate.pdf'
              }
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Award size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 700, marginBottom: '4px' }}>
                    {cert.title}
                  </h4>
                  <div style={{ fontSize: '0.88rem', color: '#a1a1aa' }}>{cert.issuer}</div>
                  <div style={{ fontSize: '0.78rem', color: '#71717a', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>
                    Issued {cert.year}
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <FileText size={14} />
                      <span>View Certificate</span>
                      <ExternalLink size={12} style={{ opacity: 0.7 }} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="section-padding">
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '50px 36px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '850px',
              margin: '0 auto'
            }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-display)' }}>
              READY TO DISCUSS A ROLE OR PROJECT?
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '1.05rem', marginBottom: '28px' }}>
              I am available for full-stack engineering roles, contract architecture projects, and strategic technical consulting.
            </p>
            <NavLink to="/contact" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <MagneticButton variant="primary">
                <span>Get In Touch</span>
                <ArrowRight size={18} />
              </MagneticButton>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
