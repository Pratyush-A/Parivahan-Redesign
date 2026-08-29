import type { Metadata } from "next";
import ChallanResultsPage from "@/components/challan/ChallanResultsPage";

export const metadata: Metadata = {
  title: "Challan Results | Parivahan 2.0 - Government of India",
  description:
    "Review your pending and paid traffic challans. Select and pay securely online.",
};

export default function ChallanResultsRoute() {
  return <ChallanResultsPage />;
}
