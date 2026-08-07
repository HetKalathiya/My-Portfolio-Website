import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { ParticleSystem } from './ParticleSystem';
import { SkillOrb } from './SkillOrb';
import { SkillDetailModal } from './SkillDetailModal';
import { ALL_SKILLS_DATA, type SkillItem } from '../../data/skills';
import type { Point2D } from '../../utils/physicsEngine';

export const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseAnimFrameRef = useRef<number | null>(null);

  const [mousePos, setMousePos] = useState<Point2D>({ x: 600, y: 300 });
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  // Throttled mouse move handler using requestAnimationFrame to prevent event flooding
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || mouseAnimFrameRef.current !== null) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    mouseAnimFrameRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: clientX - rect.left,
          y: clientY - rect.top
        });
      }
      mouseAnimFrameRef.current = null;
    });
  };

  // Scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (mouseAnimFrameRef.current !== null) {
        cancelAnimationFrame(mouseAnimFrameRef.current);
      }
    };
  }, []);

  // Filter skills by selected category
  const filteredSkills =
    activeCategory === 'All'
      ? ALL_SKILLS_DATA
      : ALL_SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  const activeSkillObj = ALL_SKILLS_DATA.find((s) => s.id === hoveredSkillId);
  const activeBrandColor = activeSkillObj ? activeSkillObj.brandColors.primary : null;

  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'DevOps & Cloud', 'AI & ML'];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: '#050505',
        padding: '120px 0 140px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '100px'
      }}
    >
      {/* Matte Black Background with Ambient Lighting Spotlight */}
      <Background mousePos={mousePos} activeGlowColor={activeBrandColor} />

      {/* Particle System Emitting Brand Colored Particles */}
      <ParticleSystem intensity={0.6} mousePos={mousePos} activeBrandColor={activeBrandColor} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#a1a1aa',
                fontFamily: 'var(--font-mono)',
                display: 'inline-block',
                marginBottom: '14px',
                padding: '6px 20px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              Interactive Physics Ecosystem
            </span>

            <h2
              style={{
                fontSize: '3.2rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                color: '#ffffff',
                fontFamily: 'var(--font-display)'
              }}
            >
              TECHNICAL SKILLS
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#a1a1aa',
                lineHeight: '1.6',
                margin: '0 auto',
                fontWeight: 400,
                maxWidth: '620px'
              }}
            >
              Sentient, interactive floating technology orbs powered by spring physics, brand-accurate colors, and magnetic attraction. Click any orb to view detailed proficiency metrics.
            </p>
          </motion.div>
        </div>

        {/* Category Navigation Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '64px'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#000000' : '#a1a1aa',
                  boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Floating Skill Orbs Playground Area */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '36px 44px',
            maxWidth: '1150px',
            margin: '0 auto',
            minHeight: '380px',
            padding: '20px 0'
          }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillOrb
              key={skill.id}
              skill={skill}
              index={index}
              mousePos={mousePos}
              hoveredSkillId={hoveredSkillId}
              isInViewport={isInViewport}
              onHover={setHoveredSkillId}
              onClick={setSelectedSkill}
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal on Click */}
      <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  );
};
