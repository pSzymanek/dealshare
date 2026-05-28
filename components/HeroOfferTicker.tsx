"use client";

import Link from "next/link";
import { PointerEvent, useEffect, useRef, useState } from "react";
import type { Offer } from "@/lib/offers";

type HeroOfferTickerProps = {
  offers: Offer[];
};

const dragThreshold = 6;
const scrollSpeed = 0.022;

function wrapOffset(value: number, loopHeight: number) {
  if (loopHeight <= 0) {
    return 0;
  }

  return ((value % loopHeight) + loopHeight) % loopHeight;
}

export function HeroOfferTicker({ offers }: HeroOfferTickerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const loopHeightRef = useRef(0);
  const isDraggingRef = useRef(false);
  const movedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const loopedOffers = [...offers, ...offers];

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const trackElement: HTMLDivElement = trackRef.current;

    function measure() {
      loopHeightRef.current = trackElement.scrollHeight / 2;
      offsetRef.current = wrapOffset(offsetRef.current, loopHeightRef.current);
      trackElement.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(trackElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    let frameId = 0;
    let lastTime = performance.now();

    function tick(time: number) {
      const elapsed = time - lastTime;
      lastTime = time;

      if (track && !isPaused && !isDraggingRef.current) {
        offsetRef.current = wrapOffset(offsetRef.current + elapsed * scrollSpeed, loopHeightRef.current);
        track.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
      }

      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPaused]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    pointerIdRef.current = event.pointerId;
    startYRef.current = event.clientY;
    startOffsetRef.current = offsetRef.current;
    isDraggingRef.current = true;
    movedRef.current = false;
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track || !isDraggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const deltaY = event.clientY - startYRef.current;

    if (Math.abs(deltaY) > dragThreshold) {
      movedRef.current = true;
    }

    offsetRef.current = wrapOffset(startOffsetRef.current - deltaY, loopHeightRef.current);
    track.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport || pointerIdRef.current !== event.pointerId) {
      return;
    }

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    pointerIdRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
  }

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (!movedRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    movedRef.current = false;
  }

  return (
    <div
      ref={viewportRef}
      className={`hero-offer-ticker relative mt-6 h-[370px] overflow-hidden px-1 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={handleClickCapture}
      aria-label="Najnowsze oferty"
    >
      <div ref={trackRef} className="grid gap-4 will-change-transform">
        {loopedOffers.map((offer, index) => {
          const isDuplicate = index >= offers.length;

          return (
            <Link
              key={`${offer.slug}-${index}`}
              href={`/oferty/${offer.slug}`}
              aria-hidden={isDuplicate}
              tabIndex={isDuplicate ? -1 : undefined}
              draggable={false}
              className="group rounded-md border border-white/14 bg-white/8 p-4 text-white shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan/45 hover:bg-white/12"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${offer.isIndividual ? "text-fuchsia-300" : "text-cyan"}`}>{offer.category}</p>
                  <h3 className="mt-2 text-lg font-black tracking-tight">{offer.title}</h3>
                </div>
                <span className="shrink-0 rounded border border-white/12 bg-white/10 px-2 py-1 text-xs font-bold text-white/72">{offer.status}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/68">{offer.description}</p>
              <span className="mt-3 inline-flex text-sm font-bold text-cyan transition group-hover:text-white">
                Sprawdź szczegóły <span aria-hidden="true" className="arrow-mark ml-2 transition group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
