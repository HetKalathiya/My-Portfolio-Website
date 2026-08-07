import React from 'react';
import type { Point2D } from '../../utils/physicsEngine';

interface BackgroundProps {
  mousePos?: Point2D;
  activeGlowColor?: string | null;
}

export const Background: React.FC<BackgroundProps> = ({ mousePos, activeGlowColor }) => {
  const spotlightX = mousePos?.x ?? 600;
  const spotlightY = mousePos?.y ?? 400;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050505',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Deep Dark Matte Radial Base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(20, 20, 32, 0.7) 0%, rgba(5, 5, 5, 1) 80%)'
        }}
      />

      {/* Dynamic Cursor Spotlight Light Source */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, ${
            activeGlowColor ? activeGlowColor.replace('0.6', '0.15') : 'rgba(255, 255, 255, 0.04)'
          }, transparent 80%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Subtle Mesh Grid Pattern for Futuristic Tech Depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 80%)',
          opacity: 0.6
        }}
      />
    </div>
  );
};
