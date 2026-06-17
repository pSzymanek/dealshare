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

  return (
    <div
      aria-hidden="true"
      className={`scroll-cue pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transition duration-500 ${isHidden ? "scroll-cue-hidden" : ""}`}
    >
      <span className="scroll-cue-arrow" />
    </div>
  );
}
