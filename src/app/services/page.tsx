import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Parivahan 2.0 - Government of India",
  description:
    "Explore, discover, and complete transport and RTO digital services with confidence. Driving licences, vehicle registration, challans, permits, and fitness certificates.",
};

export default function Services() {
  return <ServicesPage />;
}
