import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export const metadata: Metadata = { title: "Ustaw nowe hasło", robots: { index: false, follow: false } };

export default function ResetPasswordPage() {
  return (
    <main className="bg-mist py-14 sm:py-20">
      <Container>
        <Suspense fallback={<p className="text-center text-sm text-slate-500">Ładowanie...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </main>
  );
}
