import type { Metadata } from "next";
import ChallanDisputeReason from "@/components/challan/ChallanDisputeReason";

export const metadata: Metadata = {
  title: "Dispute a Challan | Parivahan 2.0 - Government of India",
  description: "Submit an online traffic challan dispute grievance through a simple guided process.",
};

export default function ChallanDisputePage() {
  return <ChallanDisputeReason />;
}
