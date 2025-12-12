import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a target element with a customizable duration
 * @param element - The target element to scroll to
 * @param duration - Duration of the scroll animation in milliseconds (default: 1500)
 */
export function smoothScrollToElement(
  element: HTMLElement,
  duration: number = 1500
): void {
  const startPosition: number = window.pageYOffset;
  const targetPosition: number = element.offsetTop;
  const distance: number = targetPosition - startPosition;
  let startTime: number | null = null;

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime: number): void {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed: number = currentTime - startTime;
    const progress: number = Math.min(timeElapsed / duration, 1);
    const ease: number = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
