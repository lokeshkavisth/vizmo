import type { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPageClient } from "@/components/dashboard/dashboard-page-client";

export const metadata: Metadata = {
  title: "Dashboard | Vizmo",
  description: "Manage your video chat rooms",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto py-8 space-y-6 border-x border-dashed">
        <div className="px-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Connect & Collaborate
          </h1>
          <p className="text-muted-foreground mt-1">
            Join interactive video rooms or create your own virtual space for
            meetings, events, and more
          </p>
        </div>

        <DashboardPageClient />
      </main>
    </div>
  );
}
