import type { Metadata } from "next";
import VehicleOwnershipTransferPayment from "@/components/services/VehicleOwnershipTransferPayment";

export const metadata: Metadata = {
  title: "Transfer Vehicle Ownership — Payment | Parivahan 2.0 - Government of India",
  description:
    "Step 03 of vehicle ownership transfer: Review your transfer charges and complete payment securely via UPI, Card, or Net Banking.",
};

export default function OwnershipTransferPaymentPage() {
  return <VehicleOwnershipTransferPayment />;
}
