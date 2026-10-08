import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = React.memo(({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 500,
  threshold = 0.08,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentEl = domRef.current;
    if (!currentEl) return;

    // Check if already in viewport on mount (e.g., above the fold)
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsDone(true), delay + duration + 50);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentEl);
          setTimeout(() => {
            setIsDone(true);
          }, delay + duration + 50);
        }
      },
      {
        threshold,
        rootMargin: '50px 0px 0px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold, delay, duration]);

  // Once animation finishes, clear transform and will-change to free GPU memory
  if (isDone) {
    return (
      <div ref={domRef} className={className}>
        {children}
      </div>
    );
  }

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'scale(0.97)';
    }
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? 'transform, opacity' : 'auto',
      }}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

