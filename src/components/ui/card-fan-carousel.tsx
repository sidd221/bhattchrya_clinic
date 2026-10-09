"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  title?: string;
  category?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
  onCardClick?: (index: number) => void;
  autoPlayInterval?: number; // In milliseconds, e.g. 5000 for 5 seconds
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 380) return 0.16;
  if (width < 480) return 0.20;
  if (width < 640) return 0.32;
  if (width < 768) return 0.45;
  if (width < 1024) return 0.70;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  // Ideal layout heights (in px at 16px root) matching the CSS breakpoints
  let idealPx: number;
  if (width < 380) idealPx = 17 * 16;       // 272px
  else if (width < 480) idealPx = 19 * 16;  // 304px
  else if (width < 640) idealPx = 23 * 16;  // 368px
  else if (width < 768) idealPx = 26 * 16;  // 416px
  else if (width < 1024) idealPx = 32 * 16; // 512px
  else idealPx = 38 * 16;                    // 608px

  const available = typeof window !== 'undefined' ? window.innerHeight * 0.7 : 500; // 70vh budget
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/60 dark:text-white/70 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none";

export default function SocialCards({
  cards,
  onCardClick,
  autoPlayInterval = 5000
}: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, cards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  // Jump directly to card index when pointer/dot is clicked
  const goToCard = useCallback((targetIndex: number) => {
    if (isAnimating.current || targetIndex === centerIndex) return;
    isAnimating.current = true;
    directionRef.current = targetIndex > centerIndex ? "right" : "left";
    setCenterIndex(targetIndex);
  }, [centerIndex]);

  // 5-second auto scroll (disabled on small screens where carousel is hidden)
  useEffect(() => {
    if (!autoPlayInterval || autoPlayInterval <= 0 || isPaused || !needsPagination) return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const timer = setInterval(() => {
      cycle("right");
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, needsPagination, cycle]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterDistance = 35 * multiplier;
          const enterX = direction === "right" ? enterDistance : -enterDistance;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 25 : -25, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitDistance = 35 * multiplier;
        const exitX = direction === "right" ? -exitDistance : exitDistance;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -25 : 25, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover interactions
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`, y: `${targetY}rem`, rotation: targetRot, scale: targetScale,
          duration: 0.35, delay, ease: "power2.out", overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!isAnimating.current) updateHoverLayout(activeSlot);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section
      className="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem]">
          {cards.map((card, index) => {
            const cardContent = (
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl border border-white/20 group/card bg-[#0A1B13] flex items-center justify-center cursor-pointer select-none"
                onClick={() => {
                  if (onCardClick) onCardClick(index);
                  else goToCard(index);
                }}
              >
                {/* Ambient blurred backdrop that matches image colors */}
                <img
                  src={card.imgUrl}
                  aria-hidden="true"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-125 transition-transform duration-700 group-hover/card:scale-135 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-[#07150E]/40 pointer-events-none" />

                {/* Crisp, contained, uncropped pure foreground image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 sm:p-3">
                  <img
                    src={card.imgUrl}
                    loading="lazy"
                    decoding="async"
                    alt={card.alt || card.title || `Gallery image ${index + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-md select-none transition-transform duration-500 group-hover/card:scale-[1.03]"
                  />
                </div>
              </div>
            );

            return card.linkUrl ? (
              <a
                key={index}
                href={card.linkUrl}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="fan-card block cursor-pointer"
              >
                {cardContent}
              </a>
            ) : (
              <div key={index} className="fan-card cursor-pointer">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex flex-col items-center gap-2.5 mt-5 sm:mt-6 md:mt-8 z-30 max-w-full px-2">
          {/* Controls bar: Previous Button, High-Contrast Interactive Pointer Dots, Next Button */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 bg-[#EDE6D9]/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-[#D5CABC] shadow-md max-w-full overflow-hidden">
            <button
              className="p-1.5 sm:p-2.5 rounded-full bg-[#153A2A] text-white hover:bg-[#0D261B] transition-colors shadow-sm cursor-pointer shrink-0"
              onClick={() => cycle("left")}
              aria-label="Previous image"
              title="Previous image"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Prominent High-Visibility Pointer Dots with Active Index Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-1">
              {cards.map((card, i) => {
                const isActive = i === centerIndex;
                return (
                  <button
                    key={i}
                    onClick={() => goToCard(i)}
                    aria-label={`Slide ${i + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#153A2A] ${
                      isActive
                        ? "w-5 sm:w-7 h-2 sm:h-2.5 bg-[#153A2A] shadow-sm"
                        : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#8C9B93] hover:bg-[#153A2A]/70"
                    }`}
                    title={`Slide ${i + 1}`}
                  />
                );
              })}
            </div>

            <button
              className="p-1.5 sm:p-2.5 rounded-full bg-[#153A2A] text-white hover:bg-[#0D261B] transition-colors shadow-sm cursor-pointer shrink-0"
              onClick={() => cycle("right")}
              aria-label="Next image"
              title="Next image"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Current Slide Info Badge */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#465A50] text-center px-4">
            <span className="font-semibold text-[#153A2A]">{centerIndex + 1} of {cards.length}</span>
          </div>
        </div>
      )}
    </section>
  );
}
