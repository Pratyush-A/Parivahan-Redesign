import type { Metadata } from "next";
import ApplicationDetailsView from "@/components/applications/ApplicationDetailsView";

export const metadata: Metadata = {
  title: "Dashboard | Parivahan 2.0 - Government of India",
  description: "Citizen transport services dashboard and active applications.",
};

export default function DashboardPage() {
  return <ApplicationDetailsView applicationId="VT-2026-001284" />;
}
