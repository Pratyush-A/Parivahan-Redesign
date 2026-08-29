import type { Metadata } from "next";
import ApplicationDetailsView from "@/components/applications/ApplicationDetailsView";

export const metadata: Metadata = {
  title: "My Applications | Parivahan 2.0 - Government of India",
  description: "Track all your active transport and RTO applications.",
};

export default function ApplicationsPage() {
  return <ApplicationDetailsView applicationId="VT-2026-001284" />;
}
