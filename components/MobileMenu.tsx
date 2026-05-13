"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/lib/site";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="shrink-0 lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-navy shadow-sm transition hover:border-electric/30 hover:bg-electric/5 hover:text-electric"
      >
        <span className="relative flex h-5 w-5 items-center justify-center rounded bg-electric/8 text-electric" aria-hidden="true">
          <span className="absolute h-0.5 w-3.5 -translate-y-1.5 rounded-full bg-current" />
          <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
          <span className="absolute h-0.5 w-3.5 translate-y-1.5 rounded-full bg-current" />
        </span>
        <span className="hidden min-[380px]:inline">Menu</span>
      </button>

      {isMounted
        ? createPortal(
            <div className={`fixed inset-0 z-[100] max-w-[100dvw] overflow-hidden transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Zamknij menu"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-navy/30 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="mobile-menu"
          className={`absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[calc(100dvw-32px)] max-w-[340px] flex-col overflow-y-auto overflow-x-hidden border-l border-white/70 bg-white/90 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 shadow-glow backdrop-blur-2xl transition-transform duration-300 ease-out sm:px-5 sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pt-5 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,209,209,0.1),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.84),rgba(243,248,252,0.74))]" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Menu</p>
            </div>
            <button
              type="button"
              aria-label="Zamknij menu"
              onClick={() => setIsOpen(false)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-electric shadow-sm transition hover:border-electric/30 hover:bg-electric/5"
            >
              <span className="absolute h-0.5 w-4 rotate-45 rounded-full bg-current" />
              <span className="absolute h-0.5 w-4 -rotate-45 rounded-full bg-current" />
            </button>
          </div>

          <nav className="relative z-10 mt-6 grid gap-2.5 sm:mt-8 sm:gap-3" aria-label="Nawigacja mobilna">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-md border border-slate-200 bg-white/88 px-4 py-2.5 text-sm font-bold text-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-electric/25 hover:bg-electric/5 hover:text-electric hover:shadow-card sm:py-3 sm:text-base"
              >
                {item.label}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </nav>

          <Link
            href="/kontakt"
            className="button-glass relative z-10 isolate mt-6 inline-flex min-h-11 items-center justify-center overflow-hidden rounded-md bg-deal-gradient px-5 py-3 text-sm font-bold text-white shadow-glow sm:mt-auto"
          >
            <span className="relative z-10">Porozmawiajmy</span>
          </Link>
        </aside>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
