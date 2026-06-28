"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function openMenu() {
    setIsOpen(true);
  }

  return (
    <div className="shrink-0 lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={openMenu}
        onTouchEnd={(event) => {
          event.preventDefault();
          openMenu();
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:text-electric"
      >
        <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
          <span className="absolute h-0.5 w-3.5 -translate-y-1.5 rounded-full bg-deal-gradient" />
          <span className="absolute h-0.5 w-3.5 rounded-full bg-deal-gradient" />
          <span className="absolute h-0.5 w-3.5 translate-y-1.5 rounded-full bg-deal-gradient" />
        </span>
        <span className="hidden min-[380px]:inline">Menu</span>
      </button>

      <div className={`fixed inset-0 z-[100] max-w-[100dvw] overflow-hidden transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Zamknij menu"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-navy/30 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="mobile-menu"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
          className="absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[calc(100dvw-32px)] max-w-[340px] flex-col overflow-y-auto overflow-x-hidden border-l border-white/65 bg-white/78 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 shadow-glow backdrop-blur-2xl transition-transform duration-300 ease-out sm:px-5 sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pt-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,209,209,0.08),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.68),rgba(243,248,252,0.52))]" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Menu</p>
            </div>
            <button
              type="button"
              aria-label="Zamknij menu"
              onClick={() => setIsOpen(false)}
              className="button-glass relative inline-flex h-11 w-11 items-center justify-center rounded-md bg-deal-gradient text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-card"
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
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between rounded-md border border-slate-200 bg-white/88 px-4 py-2.5 text-sm font-bold text-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-electric/25 hover:bg-electric/5 hover:text-electric hover:shadow-card sm:py-3 sm:text-base"
              >
                {item.label}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </nav>

          <div className="relative z-10 mt-6 grid grid-cols-2 gap-2">
            <Link href="/panel" onClick={() => setIsOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-navy">Moje konto</Link>
            <Link href="/potrzeba" onClick={() => setIsOpen(false)} className="button-glass isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-md bg-deal-gradient px-3 text-sm font-bold text-white shadow-glow"><span className="relative z-10">Porozmawiajmy</span></Link>
          </div>

          <Link href="/" onClick={() => setIsOpen(false)} aria-label="dealshare - strona główna" className="relative z-10 mt-auto flex justify-center pb-2 pt-10">
            <Image src="/logo-dark.png" alt="dealshare" width={204} height={76} className="opacity-95 drop-shadow-[0_8px_18px_rgba(0,31,77,0.24)]" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
