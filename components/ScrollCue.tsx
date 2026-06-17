"use client";

import { useEffect, useState } from "react";

type ScrollCueProps = {
  targetId: string;
};

export function ScrollCue({ targetId }: ScrollCueProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHidden(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -72% 0px",
        threshold: 0.01
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  function scrollToTarget() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      aria-label="Przewiń do statystyk"
      onClick={scrollToTarget}
      className={`scroll-cue absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transition duration-500 ${isHidden ? "scroll-cue-hidden pointer-events-none" : ""}`}
    >
      <span className="scroll-cue-ring">
        <span className="scroll-cue-arrow" aria-hidden="true" />
      </span>
    </button>
  );
}
