import type { Metadata } from "next";
import ChallanLandingPage from "@/components/challan/ChallanLandingPage";

export const metadata: Metadata = {
  title: "Check Challan | Parivahan 2.0 - Government of India",
  description:
    "Check pending traffic challans, pay online and stay on the right side of the road. 100% secure government payments.",
};

export default function ChallanPage() {
  return <ChallanLandingPage />;
}
