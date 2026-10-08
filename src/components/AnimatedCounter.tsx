import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number; // duration in ms
  prefix?: string;
  suffix?: string;
  className?: string;
  useGrouping?: boolean; // format with comma or raw digits (5000 vs 5,000)
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 1,
  duration = 2400,
  prefix = '',
  suffix = '+',
  className = '',
  useGrouping = false
}) => {
  const [count, setCount] = useState<number>(start);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px'
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // easeOutQuad or easeOutCubic for a satisfying natural acceleration & deceleration
    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const nextVal = Math.round(start + (end - start) * easedProgress);
      setCount(nextVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, start, end, duration]);

  const displayNumber = useGrouping
    ? count.toLocaleString('en-IN')
    : count.toString();

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {displayNumber}
      {suffix}
    </span>
  );
};
