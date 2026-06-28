import { AdminNav } from "@/components/AdminNav";
import { requireRole } from "@/lib/auth-guards";

export default async function AdminLayout({children}:{children:React.ReactNode}){await requireRole("admin");return <main className="min-h-screen bg-slate-100"><div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Dealshare</p><h1 className="mt-1 text-2xl font-black text-navy">Administracja</h1></div><AdminNav/></div>{children}</div></main>}
