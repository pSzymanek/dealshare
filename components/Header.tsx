import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-3 py-2 sm:min-h-24 sm:gap-5 sm:py-3">
        <Link href="/" aria-label="dealshare - strona główna" className="flex items-center">
          <Image src="/logo-main-cropped.png" alt="dealshare" width={343} height={90} priority className="h-12 w-auto sm:h-16 lg:h-[72px]" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Główna nawigacja">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-navy/75 transition hover:bg-electric/5 hover:text-electric">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="/kontakt" variant="ghost">
            Porozmawiajmy!
          </Button>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
