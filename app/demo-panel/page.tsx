import type { Metadata } from "next";
import { DemoPanel } from "@/components/DemoPanel";

export const metadata: Metadata = {
  title: "Podgląd konta",
  description: "Demonstracyjny podgląd konta Dealshare.",
  robots: { index: false, follow: false }
};

export default function DemoPanelPage() {
  return <DemoPanel />;
}
