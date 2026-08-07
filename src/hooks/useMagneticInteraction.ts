import { useEffect, useRef, useState } from 'react';
import type { Point2D } from '../utils/physicsEngine';

export function useMagneticInteraction(
  elementRef: React.RefObject<HTMLDivElement | null>,
  mousePos: Point2D,
  enabled: boolean = true
) {
  const [offset, setOffset] = useState<Point2D>({ x: 0, y: 0 });
  const lastOffsetRef = useRef<Point2D>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      if (lastOffsetRef.current.x !== 0 || lastOffsetRef.current.y !== 0) {
        lastOffsetRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      }
      return;
    }

    const el = elementRef.current;
    const rect = el.getBoundingClientRect();
    const orbCenterX = rect.left + rect.width / 2;
    const orbCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - orbCenterX;
    const dy = mousePos.y - orbCenterY;
    const dist = Math.hypot(dx, dy);

    const magneticRadius = 120;

    if (dist < magneticRadius && dist > 0) {
      const force = (1 - dist / magneticRadius) * 16;
      const angle = Math.atan2(dy, dx);
      const nextX = Math.cos(angle) * force;
      const nextY = Math.sin(angle) * force;

      lastOffsetRef.current = { x: nextX, y: nextY };
      setOffset({ x: nextX, y: nextY });
    } else if (lastOffsetRef.current.x !== 0 || lastOffsetRef.current.y !== 0) {
      lastOffsetRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });
    }
  }, [mousePos.x, mousePos.y, enabled]);

  return offset;
}
