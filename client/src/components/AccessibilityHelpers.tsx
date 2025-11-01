import { useEffect } from "react";

/**
 * Announces screen reader messages
 */
export function announceToScreenReader(message: string) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus trap for modals and dialogs
 */
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }, [isActive, containerRef]);
}

/**
 * Skip to main content link
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  );
}

/**
 * Screen reader only text
 */
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Keyboard navigation helper
 */
export function useKeyboardNavigation(
  items: any[],
  onSelect: (index: number) => void,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return;

    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          currentIndex = (currentIndex + 1) % items.length;
          onSelect(currentIndex);
          break;
        case "ArrowUp":
          e.preventDefault();
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          onSelect(currentIndex);
          break;
        case "Home":
          e.preventDefault();
          currentIndex = 0;
          onSelect(currentIndex);
          break;
        case "End":
          e.preventDefault();
          currentIndex = items.length - 1;
          onSelect(currentIndex);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, onSelect, isActive]);
}

/**
 * Add ARIA labels to interactive elements
 */
export function addAriaLabel(label: string, description?: string) {
  return {
    "aria-label": label,
    ...(description && { "aria-describedby": description }),
  };
}

/**
 * Manage focus for better keyboard navigation
 */
export function useFocusManagement() {
  const saveFocus = () => {
    return document.activeElement as HTMLElement;
  };

  const restoreFocus = (element: HTMLElement | null) => {
    element?.focus();
  };

  return { saveFocus, restoreFocus };
}

