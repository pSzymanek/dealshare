import type { Metadata } from "next";
import { AuthScreen } from "@/components/AuthScreen";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Logowanie i rejestracja", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="bg-mist py-14 sm:py-20">
      <Container>
        <AuthScreen />
      </Container>
    </main>
  );
}
