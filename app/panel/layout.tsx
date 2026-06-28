import { PanelNav } from "@/components/PanelNav";
import { SignOutButton } from "@/components/SignOutButton";
import { requireAuth } from "@/lib/auth-guards";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { session, roles } = await requireAuth();

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-slate-50">
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-4 lg:block">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Panel Dealshare</p>
              <p className="mt-1 truncate text-sm font-bold text-navy">{session.user.name}</p>
            </div>
            <SignOutButton />
          </div>
          <PanelNav isPartner={roles.includes("partner")} isAdmin={roles.includes("admin")} />
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
