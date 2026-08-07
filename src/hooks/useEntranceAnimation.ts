import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { EntranceDirection } from '../data/skills';

export function useEntranceAnimation(
  elementRef: React.RefObject<HTMLDivElement | null>,
  direction: EntranceDirection,
  index: number,
  isInViewport: boolean
) {
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !isInViewport || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    let initialX = 0;
    let initialY = 0;
    let initialScale = 0.5;

    switch (direction) {
      case 'left':
        initialX = -100;
        break;
      case 'right':
        initialX = 100;
        break;
      case 'top':
        initialY = -100;
        break;
      case 'bottom':
        initialY = 100;
        break;
      case 'behind':
        initialScale = 0.2;
        break;
    }

    const delay = 0.15 + (index % 6) * 0.12;

    gsap.fromTo(
      el,
      {
        x: initialX,
        y: initialY,
        scale: initialScale,
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.0,
        delay: delay,
        ease: 'back.out(1.5)'
      }
    );
  }, [elementRef, direction, index, isInViewport]);
}
