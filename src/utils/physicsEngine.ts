// Physics math and engine utility per Cinematic Skills Spec v2.0

export interface Point2D {
  x: number;
  y: number;
}

export interface FloatingConfig {
  verticalAmplitude: number;
  verticalFrequency: number;
  horizontalAmplitude: number;
  horizontalFrequency: number;
  rotationSpeed: number;
  phaseOffset: number;
}

export function calculateDistance(p1: Point2D, p2: Point2D): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

export function generateFloatingAnimation(index: number): FloatingConfig {
  // Deterministic seed blending index to ensure smooth repeat
  const seed = (index * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  const rnd2 = ((seed * 9301 + 49297) % 233280) / 233280;

  return {
    verticalAmplitude: 8 + rnd * 7,           // 8-15px vertical float
    verticalFrequency: 2.5 + rnd2 * 2,         // 2.5-4.5 seconds cycle
    horizontalAmplitude: 6 + rnd2 * 6,         // 6-12px horizontal drift
    horizontalFrequency: 3.5 + rnd * 3,        // 3.5-6.5 seconds cycle
    rotationSpeed: (rnd - 0.5) * 90,           // -45 to +45 deg per float loop
    phaseOffset: rnd * 0.8                     // Stagger offset
  };
}

export function applySpringForce(
  current: number,
  target: number,
  springConstant: number = 0.1
): number {
  const distance = target - current;
  return distance * springConstant;
}

export const MAGNETIC_RADIUS = 140; // Pixels radius of influence

export function calculateMagneticOffset(
  mousePos: Point2D,
  orbCenter: Point2D,
  maxOffset: number = 24
): Point2D {
  const dist = calculateDistance(mousePos, orbCenter);

  if (dist >= MAGNETIC_RADIUS || dist === 0) {
    return { x: 0, y: 0 };
  }

  // Force magnitude decays linearly with distance from orb center
  const force = 1 - dist / MAGNETIC_RADIUS;
  const angle = Math.atan2(mousePos.y - orbCenter.y, mousePos.x - orbCenter.x);

  const pullDistance = force * maxOffset;

  return {
    x: Math.cos(angle) * pullDistance,
    y: Math.sin(angle) * pullDistance
  };
}
