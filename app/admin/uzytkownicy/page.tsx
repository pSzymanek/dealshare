import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
export default async function AdminUsersPage(){const rows=await db.select().from(users).orderBy(desc(users.createdAt));return <div><h2 className="text-3xl font-black text-navy">Użytkownicy</h2><div className="mt-6 divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">{rows.map(user=><div key={user.id} className="grid gap-2 p-4 sm:grid-cols-[1fr_1fr_140px]"><strong className="text-sm text-navy">{user.name}</strong><span className="text-sm text-slate-600">{user.email}</span><span className="text-xs text-slate-500">{user.createdAt.toLocaleDateString("pl-PL")}</span></div>)}</div></div>}
