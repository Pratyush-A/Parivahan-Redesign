import type { Metadata } from "next";
import RtoFinderPage from "@/components/rto/RtoFinderPage";

export const metadata: Metadata = {
  title: "Find an RTO | Parivahan 2.0 - Government of India",
  description:
    "Search, compare and find the right RTO office for your needs. Check appointment availability, services, and CSC assisted centers.",
};

export default function RtoPage() {
  return <RtoFinderPage />;
}
