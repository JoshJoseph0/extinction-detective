import { gsap } from 'gsap';

/**
 * Gently floats Mr. Planet in place. Keep the returned tween to pause or kill it.
 * @param {Element | string} target Element or GSAP selector for Mr. Planet.
 * @param {number} speed Speed multiplier; values above 1 animate faster.
 */
export function floatMrPlanet(target, speed = 1) {
  if (!Number.isFinite(speed) || speed <= 0) {
    throw new RangeError('Animation speed must be a positive number.');
  }

  return gsap.to(target, {
    y: -8,
    duration: 0.8 / speed,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
}
