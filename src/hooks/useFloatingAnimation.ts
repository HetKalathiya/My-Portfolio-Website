import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { generateFloatingAnimation } from '../utils/physicsEngine';

export function useFloatingAnimation(
  elementRef: React.RefObject<HTMLDivElement | null>,
  index: number,
  isPaused: boolean = false
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const config = generateFloatingAnimation(index);

    // Deterministic GSAP timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Vertical sine wave
    tl.fromTo(
      el,
      { y: -config.verticalAmplitude },
      {
        y: config.verticalAmplitude,
        duration: config.verticalFrequency / 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      },
      0
    );

    // Horizontal drift
    tl.fromTo(
      el,
      { x: -config.horizontalAmplitude },
      {
        x: config.horizontalAmplitude,
        duration: config.horizontalFrequency / 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      },
      config.phaseOffset
    );

    // Subtle 3D-like rotation drift
    tl.fromTo(
      el,
      { rotation: -config.rotationSpeed / 2 },
      {
        rotation: config.rotationSpeed / 2,
        duration: 10 + index * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      },
      0
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [elementRef, index]);

  useEffect(() => {
    if (timelineRef.current) {
      if (isPaused) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.play();
      }
    }
  }, [isPaused]);
}
