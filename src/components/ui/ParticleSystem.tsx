import React, { useEffect, useRef } from 'react';
import type { Point2D } from '../../utils/physicsEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  lifetime: number;
  maxLifetime: number;
  opacity: number;
}

interface ParticleSystemProps {
  intensity?: number; // 0 to 1
  mousePos?: Point2D;
  activeBrandColor?: string | null;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  intensity = 0.8,
  mousePos,
  activeBrandColor
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.floor(40 * intensity);
    const particles: Particle[] = [];

    const colors = [
      '#61DAFB',
      '#3178C6',
      '#F7DF1E',
      '#06B6D4',
      '#339933',
      '#3776AB',
      '#FF6F00',
      '#0078D4',
      '#FFFFFF'
    ];

    // Initialize ambient background particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        lifetime: Math.random() * 200 + 100,
        maxLifetime: 300,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn interactive particles near cursor if active color exists
      if (activeBrandColor && mousePos && Math.random() < 0.3) {
        particles.push({
          x: mousePos.x + (Math.random() - 0.5) * 30,
          y: mousePos.y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 1.5 - 0.2,
          size: Math.random() * 3 + 1.5,
          color: activeBrandColor,
          lifetime: 0,
          maxLifetime: 60,
          opacity: 0.9
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.lifetime += 1;

        // Wrap or decay
        if (p.lifetime >= p.maxLifetime) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.lifetime = 0;
        }

        const lifeFactor = 1 - p.lifetime / p.maxLifetime;
        const currentOpacity = p.opacity * lifeFactor;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentOpacity);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, activeBrandColor, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};
