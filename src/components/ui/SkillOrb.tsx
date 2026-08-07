import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { SkillItem } from '../../data/skills';
import type { Point2D } from '../../utils/physicsEngine';
import { useFloatingAnimation } from '../../hooks/useFloatingAnimation';
import { useMagneticInteraction } from '../../hooks/useMagneticInteraction';
import { useEntranceAnimation } from '../../hooks/useEntranceAnimation';
import {
  Code2,
  Server,
  Workflow,
  Layout,
  Atom,
  FileCode,
  Globe,
  Sparkles,
  Palette,
  Layers,
  Cpu,
  Terminal,
  Database,
  GitBranch,
  GitPullRequest,
  Box,
  Cloud,
  type LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Server,
  Workflow,
  Layout,
  Atom,
  FileCode,
  Globe,
  Sparkles,
  Palette,
  Layers,
  Cpu,
  Terminal,
  Database,
  GitBranch,
  GitPullRequest,
  Box,
  Cloud
};

interface SkillOrbProps {
  skill: SkillItem;
  index: number;
  mousePos: Point2D;
  hoveredSkillId: string | null;
  isInViewport: boolean;
  onHover: (id: string | null) => void;
  onClick: (skill: SkillItem) => void;
}

export const SkillOrb: React.FC<SkillOrbProps> = ({
  skill,
  index,
  mousePos,
  hoveredSkillId,
  isInViewport,
  onHover,
  onClick
}) => {
  // Nested layer DOM refs to isolate transform animations cleanly
  const entranceRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const isHovered = hoveredSkillId === skill.id;
  const isAnotherHovered = hoveredSkillId !== null && hoveredSkillId !== skill.id;

  // Layer 1: Entrance Vector Reveal on Outer Container
  useEntranceAnimation(entranceRef, skill.entranceDirection, index, isInViewport);

  // Layer 2: Organic Float & Drift on Middle Container
  useFloatingAnimation(floatingRef, index, isHovered);

  // Layer 3: Magnetic Cursor Spring Pull on Inner Orb
  const magneticOffset = useMagneticInteraction(orbRef, mousePos, !isHovered);

  const IconComponent = ICON_MAP[skill.iconName] || Code2;

  // Dimensions based on orb size variant
  const getSizePx = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'lg':
        return { orb: 120, icon: 28, font: '0.88rem' };
      case 'md':
        return { orb: 104, icon: 24, font: '0.80rem' };
      case 'sm':
        return { orb: 88, icon: 20, font: '0.74rem' };
    }
  };

  const dimensions = getSizePx(skill.size);
  const brandPrimary = skill.brandColors.primary;
  const brandGlow = skill.brandColors.glow;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(skill);
    }
  };

  return (
    /* Layer 1: Entrance Animation Wrapper */
    <div
      ref={entranceRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        zIndex: isHovered || isFocused ? 40 : 2
      }}
    >
      {/* Layer 2: GSAP Continuous Floating & Rotation Wrapper */}
      <div
        ref={floatingRef}
        style={{
          display: 'inline-block',
          position: 'relative'
        }}
      >
        {/* Layer 3: Framer Motion Interactive Magnetic & Hover Orb */}
        <motion.div
          ref={orbRef}
          role="button"
          tabIndex={0}
          aria-label={`${skill.name} - ${skill.category} - ${skill.proficiency}% Proficiency`}
          onMouseEnter={() => onHover(skill.id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => {
            setIsFocused(true);
            onHover(skill.id);
          }}
          onBlur={() => {
            setIsFocused(false);
            onHover(null);
          }}
          onClick={() => onClick(skill)}
          onKeyDown={handleKeyDown}
          animate={{
            scale: isHovered ? 1.15 : isAnotherHovered ? 0.94 : 1,
            opacity: isAnotherHovered ? 0.65 : 1,
            x: magneticOffset.x,
            y: isHovered ? -14 : magneticOffset.y
          }}
          transition={{
            scale: { type: 'spring', stiffness: 400, damping: 25 },
            opacity: { duration: 0.2 },
            x: { type: 'spring', stiffness: 350, damping: 22 },
            y: { type: 'spring', stiffness: 350, damping: 22 }
          }}
          style={{
            width: `${dimensions.orb}px`,
            height: `${dimensions.orb}px`,
            borderRadius: '50%',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: isHovered ? 'rgba(15, 15, 25, 0.90)' : 'rgba(255, 255, 255, 0.04)',
            border: `1.5px solid ${isHovered || isFocused ? brandPrimary : 'rgba(255, 255, 255, 0.12)'}`,
            boxShadow: isHovered || isFocused
              ? `0 0 35px ${brandGlow}, 0 15px 35px rgba(0, 0, 0, 0.8)`
              : `0 8px 20px rgba(0, 0, 0, 0.5)`,
            userSelect: 'none',
            outline: 'none',
            flexShrink: 0,
            willChange: 'transform'
          }}
        >
          {/* Top Specular Highlight Reflection */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: '20%',
              width: '60%',
              height: '25%',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              opacity: isHovered ? 0.95 : 0.7
            }}
          />

          {/* Hover Reflection Glare Sweep Animation */}
          {isHovered && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1.2
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.28) 50%, transparent 80%)',
                pointerEvents: 'none'
              }}
            />
          )}

          {/* Technology Icon */}
          <div
            style={{
              color: isHovered || isFocused ? brandPrimary : '#ffffff',
              marginBottom: '4px',
              transition: 'color 0.2s ease, filter 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: isHovered || isFocused ? `drop-shadow(0 0 8px ${brandGlow})` : 'none'
            }}
          >
            <IconComponent size={dimensions.icon} />
          </div>

          {/* Technology Label */}
          <span
            style={{
              fontSize: dimensions.font,
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
              textShadow: isHovered || isFocused ? `0 0 10px ${brandGlow}` : '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {skill.name}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
