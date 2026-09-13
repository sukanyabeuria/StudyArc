import confetti from 'canvas-confetti';
import gsap, { isReducedMotion } from './gsapConfig';

/**
 * Spawns a tiny, lightweight particle sparkle burst around an element
 * @param {{ x: number, y: number }} [origin]
 */
export function triggerMicroSparkles(origin = { x: 0.5, y: 0.5 }) {
  if (isReducedMotion()) return;

  confetti({
    particleCount: 14,
    spread: 45,
    startVelocity: 16,
    ticks: 40,
    gravity: 1.2,
    origin,
    colors: ['#f97316', '#fbbf24', '#ffffff'],
    scalar: 0.55,
    shapes: ['circle']
  });
}

/**
 * Triggers a 3D floating "+XP" animation moving upward in 3D perspective and fading out
 * Specifications:
 * - scale: 0.5 -> 1
 * - y: 0 -> -60
 * - z: 0 -> 40 (translateZ)
 * - rotation: slight 3D rotation
 * - opacity: 1 -> 0
 * @param {HTMLElement} anchorElement - Element next to which the badge spawns
 * @param {string|number} [xpAmount=15] - XP amount to display
 * @param {Object} [options]
 */
export function animateFloatingXp(anchorElement, xpAmount = 15, options = {}) {
  if (!anchorElement || typeof document === 'undefined') return;

  const rect = anchorElement.getBoundingClientRect();
  const text = typeof xpAmount === 'number' ? `+${xpAmount} XP` : xpAmount;

  // Tiny spark burst at source
  const spawnX = (rect.left + rect.width / 2) / window.innerWidth;
  const spawnY = rect.top / window.innerHeight;
  triggerMicroSparkles({ x: spawnX, y: spawnY });

  // Create badge element
  const badge = document.createElement('div');
  badge.className = 'fixed z-50 pointer-events-none flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs shadow-lg shadow-orange-500/40 select-none';
  badge.style.transformStyle = 'preserve-3d';
  badge.style.perspective = '600px';
  badge.innerHTML = `
    <svg class="w-3 h-3 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
    </svg>
    <span>${text}</span>
  `;

  // Position at top center of anchor
  badge.style.left = `${rect.left + rect.width / 2}px`;
  badge.style.top = `${rect.top}px`;
  badge.style.transform = 'translate(-50%, -50%)';

  document.body.appendChild(badge);

  if (isReducedMotion()) {
    gsap.to(badge, {
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      onComplete: () => badge.remove()
    });
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      badge.remove();
      if (options.onComplete) options.onComplete();
    }
  });

  // Exact user requested 3D floating animation:
  // scale 0.5 -> 1, y: 0 -> -60, z: 0 -> 40, rotation: slight 3D rotation, opacity: 1 -> 0
  tl.fromTo(
    badge,
    {
      opacity: 0,
      scale: 0.5,
      y: 0,
      z: 0,
      rotateX: -15,
      rotateZ: -6,
      transformPerspective: 600
    },
    {
      opacity: 1,
      scale: 1.05,
      y: -24,
      z: 25,
      rotateX: 4,
      rotateZ: 0,
      duration: 0.32,
      ease: 'back.out(2)'
    }
  )
  .to(
    badge,
    {
      scale: 1,
      duration: 0.12,
      ease: 'power1.out'
    }
  )
  .to(
    badge,
    {
      opacity: 0,
      y: -60,
      z: 40,
      rotateX: 12,
      scale: 0.92,
      duration: 0.58,
      ease: 'power2.in',
      delay: 0.12
    }
  );
}

/**
 * Animate checkbox with elastic 3D scale up and brief rotation on toggle
 * @param {HTMLElement} checkboxElement
 * @param {boolean} [completed=true]
 */
export function animateCheckboxPop(checkboxElement, completed = true) {
  if (!checkboxElement || isReducedMotion()) return;

  if (completed) {
    gsap.fromTo(
      checkboxElement,
      {
        scale: 0.7,
        rotateZ: -24,
        rotateY: -20,
        transformPerspective: 500
      },
      {
        scale: 1.25,
        rotateZ: 6,
        rotateY: 0,
        duration: 0.28,
        ease: 'back.out(2.5)',
        onComplete: () => {
          gsap.to(checkboxElement, {
            scale: 1,
            rotateZ: 0,
            duration: 0.18,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        }
      }
    );
  } else {
    gsap.fromTo(
      checkboxElement,
      { scale: 0.85 },
      { scale: 1, duration: 0.2, ease: 'power2.out', clearProps: 'transform' }
    );
  }
}

/**
 * Animate task row completion with subtle flash feedback
 * @param {HTMLElement} rowElement
 * @param {boolean} [completed=true]
 */
export function animateTaskRowCompletion(rowElement, completed = true) {
  if (!rowElement || isReducedMotion()) return;

  if (completed) {
    gsap.fromTo(
      rowElement,
      { x: -4, scale: 0.99 },
      { x: 0, scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)', clearProps: 'transform' }
    );
  }
}

/**
 * Animate XP Progress bar smoothly with GSAP
 * @param {HTMLElement} barElement
 * @param {number} percent
 */
export function animateXpProgressBar(barElement, percent) {
  if (!barElement) return;

  gsap.to(barElement, {
    width: `${Math.min(Math.max(percent, 0), 100)}%`,
    duration: 0.85,
    ease: 'power2.out'
  });
}

/**
 * Animate level badge pop with 3D twist
 * @param {HTMLElement} badgeElement
 */
export function animateLevelBadgePop(badgeElement) {
  if (!badgeElement || isReducedMotion()) return;

  gsap.fromTo(
    badgeElement,
    {
      scale: 0.75,
      rotateY: 180,
      transformPerspective: 500
    },
    {
      scale: 1,
      rotateY: 0,
      duration: 0.55,
      ease: 'back.out(1.8)',
      clearProps: 'transform'
    }
  );
}

/**
 * Confetti celebration bursts with warm sanctuary colors
 * @param {Object} [origin={ x: 0.5, y: 0.6 }]
 */
export function triggerCelebrationConfetti(origin = { x: 0.5, y: 0.6 }) {
  if (isReducedMotion()) return;

  confetti({
    particleCount: 60,
    spread: 70,
    origin,
    colors: ['#f97316', '#fb923c', '#f59e0b', '#fbbf24', '#ffffff']
  });

  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 95,
      origin: { ...origin, y: (origin.y || 0.6) + 0.05 },
      colors: ['#ea580c', '#fbbf24', '#f97316', '#ffffff']
    });
  }, 260);
}

/**
 * Animate a numeric counter smoothly upward or downward
 * @param {HTMLElement} element - Target text element
 * @param {number} startVal - Initial number
 * @param {number} endVal - Final number
 * @param {Object} [options]
 */
export function animateNumberCounter(element, startVal, endVal, options = {}) {
  if (!element) return;

  if (isReducedMotion() || startVal === endVal) {
    element.textContent = `${options.prefix || ''}${endVal.toLocaleString()}${options.suffix || ''}`;
    return;
  }

  const obj = { val: startVal };
  gsap.to(obj, {
    val: endVal,
    duration: options.duration || 0.65,
    ease: options.ease || 'power2.out',
    onUpdate: () => {
      element.textContent = `${options.prefix || ''}${Math.round(obj.val).toLocaleString()}${options.suffix || ''}`;
    },
    onComplete: () => {
      element.textContent = `${options.prefix || ''}${endVal.toLocaleString()}${options.suffix || ''}`;
      if (options.onComplete) options.onComplete();
    }
  });
}
