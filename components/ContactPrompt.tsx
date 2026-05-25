"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const promptStorageKey = "dealshare-contact-prompt-shown";
const cookieConsentKey = "dealshare-cookie-consent";

export function ContactPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isCookieConsentResolved, setIsCookieConsentResolved] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const pathname = usePathname();
  const hideTimerRef = useRef<number>();
  const removeTimerRef = useRef<number>();

  const closePrompt = useCallback(() => {
    window.clearTimeout(hideTimerRef.current);
    window.clearTimeout(removeTimerRef.current);
    setIsEntered(false);
    removeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 420);
  }, []);

  useEffect(() => {
    setIsCookieConsentResolved(Boolean(localStorage.getItem(cookieConsentKey)));

    function handleConsent() {
      setIsCookieConsentResolved(true);
      setIsCookieBannerVisible(false);
    }

    function handleCookieBannerVisibility(event: Event) {
      const isOpen = Boolean((event as CustomEvent<boolean>).detail);
      setIsCookieBannerVisible(isOpen);

      if (isOpen) {
        closePrompt();
      }
    }

    window.addEventListener("dealshare-cookie-consent", handleConsent);
    window.addEventListener("dealshare-cookie-banner-visibility", handleCookieBannerVisibility);

    return () => {
      window.removeEventListener("dealshare-cookie-consent", handleConsent);
      window.removeEventListener("dealshare-cookie-banner-visibility", handleCookieBannerVisibility);
    };
  }, [closePrompt]);

  useEffect(() => {
    if (pathname === "/kontakt" || !isCookieConsentResolved || isCookieBannerVisible || sessionStorage.getItem(promptStorageKey)) {
      return;
    }

    const showPrompt = () => {
      if (!isCookieBannerVisible && !sessionStorage.getItem(promptStorageKey)) {
        sessionStorage.setItem(promptStorageKey, "true");
        setIsVisible(true);
        window.requestAnimationFrame(() => {
          setIsEntered(true);
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 320) {
        showPrompt();
      }
    };

    const timer = window.setTimeout(showPrompt, 9000);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCookieBannerVisible, isCookieConsentResolved, pathname]);

  useEffect(() => {
    if (!isVisible || !isEntered) {
      return;
    }

    hideTimerRef.current = window.setTimeout(closePrompt, 15000);

    return () => {
      window.clearTimeout(hideTimerRef.current);
    };
  }, [closePrompt, isEntered, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className={`fixed bottom-4 left-4 z-40 w-[calc(100vw-2rem)] max-w-[520px] transition duration-500 ease-out sm:bottom-6 sm:left-6 ${
        isEntered ? "translate-x-0 opacity-100" : "-translate-x-[calc(100%+2rem)] opacity-0"
      }`}
      aria-label="Kontakt dealshare"
    >
      <div className="overflow-hidden rounded-lg border border-white/80 bg-white/88 shadow-glow backdrop-blur-2xl">
        <div className="bg-[radial-gradient(circle_at_14%_12%,rgba(0,209,209,0.1),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.92),rgba(247,251,255,0.78))]">
          <div className="flex items-start justify-between gap-4 p-5 pb-3 sm:p-6 sm:pb-4">
            <Image src="/sygnet.png" alt="" width={42} height={42} className="h-10 w-10 shrink-0" />
            <button
              type="button"
              aria-label="Zamknij komunikat"
              onClick={closePrompt}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white/80 text-navy shadow-sm transition hover:border-electric/30 hover:bg-white hover:text-electric"
            >
              <span className="absolute h-0.5 w-3.5 rotate-45 rounded-full bg-current" />
              <span className="absolute h-0.5 w-3.5 -rotate-45 rounded-full bg-current" />
            </button>
          </div>

          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <h2 className="text-lg font-black tracking-tight text-navy">Dla firm z ofertą B2B</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Jeśli chcesz zaprezentować swoją ofertę przedsiębiorcom, opisz krótko kategorię, profil klienta i model współpracy.
            </p>
            <Link
              href="/kontakt"
              onClick={closePrompt}
              className="button-glass relative isolate mt-5 inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-md bg-deal-gradient px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 sm:w-auto"
            >
              <span className="relative z-10">Napisz do nas!</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
