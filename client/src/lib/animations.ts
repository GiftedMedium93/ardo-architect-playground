/**
 * Animation utilities for ARDO
 * Smooth, professional animations and transitions
 */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideInFromRight = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
  transition: { type: "spring", damping: 25, stiffness: 200 },
};

export const slideInFromLeft = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
  transition: { type: "spring", damping: 25, stiffness: 200 },
};

export const slideInFromBottom = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
  transition: { type: "spring", damping: 25, stiffness: 200 },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration: 0.2 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/**
 * CSS transition classes for Tailwind
 */
export const transitions = {
  default: "transition-all duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
  smooth: "transition-all duration-500 ease-out",
  spring: "transition-all duration-200 cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

/**
 * Hover effects
 */
export const hoverEffects = {
  lift: "hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
  glow: "hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300",
  scale: "hover:scale-105 transition-transform duration-200",
  brighten: "hover:brightness-110 transition-all duration-200",
};

/**
 * Loading animations
 */
export const loadingAnimations = {
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  ping: "animate-ping",
};

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Animate number counting
 */
export function animateNumber(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) {
  const startTime = performance.now();
  const difference = end - start;

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + difference * eased;
    
    callback(Math.round(current));

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Stagger animation delay calculator
 */
export function getStaggerDelay(index: number, baseDelay: number = 50): string {
  return `${index * baseDelay}ms`;
}

/**
 * Page transition wrapper
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

/**
 * Modal backdrop animation
 */
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

/**
 * Tooltip animation
 */
export const tooltipAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 5 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 5 },
  transition: { duration: 0.15 },
};

