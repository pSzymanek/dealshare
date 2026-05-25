"use client";

import Link from "next/link";
import { PointerEvent, useEffect, useRef, useState } from "react";
import type { Offer } from "@/lib/offers";

type HeroOfferTickerProps = {
  offers: Offer[];
};

const dragThreshold = 6;

export function HeroOfferTicker({ offers }: HeroOfferTickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const isDraggingRef = useRef(false);
  const movedRef = useRef(false);
  const resumeTimerRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const loopedOffers = [...offers, ...offers];

  useEffect(() => {
    return () => window.clearTimeout(resumeTimerRef.current);
  }, []);

  useEffect(() => {
    const ticker = scrollRef.current;

    if (!ticker || isPaused || isDragging) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    function tick(time: number) {
      const elapsed = time - lastTime;
      lastTime = time;

      if (ticker) {
        ticker.scrollTop += elapsed * 0.022;
        const loopPoint = ticker.scrollHeight / 2;

        if (ticker.scrollTop >= loopPoint) {
          ticker.scrollTop -= loopPoint;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isDragging, isPaused]);

  function pauseBriefly() {
    window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1200);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const ticker = scrollRef.current;

    if (!ticker) {
      return;
    }

    pointerIdRef.current = event.pointerId;
    startYRef.current = event.clientY;
    startScrollTopRef.current = ticker.scrollTop;
    isDraggingRef.current = true;
    movedRef.current = false;
    setIsDragging(true);
    setIsPaused(true);
    ticker.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const ticker = scrollRef.current;

    if (!ticker || !isDraggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const deltaY = event.clientY - startYRef.current;

    if (Math.abs(deltaY) > dragThreshold) {
      movedRef.current = true;
    }

    ticker.scrollTop = startScrollTopRef.current - deltaY;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const ticker = scrollRef.current;

    if (!ticker || pointerIdRef.current !== event.pointerId) {
      return;
    }

    if (ticker.hasPointerCapture(event.pointerId)) {
      ticker.releasePointerCapture(event.pointerId);
    }

    pointerIdRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
    pauseBriefly();
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
      ref={scrollRef}
      className={`hero-offer-ticker relative mt-6 h-[370px] overflow-y-auto pr-1 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onWheel={pauseBriefly}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseBriefly}
      onTouchCancel={pauseBriefly}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={handleClickCapture}
      aria-label="Najnowsze oferty"
    >
      <div className="grid gap-4">
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
