import type { Metadata } from "next";
import VehicleOwnershipTransferVerification from "@/components/services/VehicleOwnershipTransferVerification";

export const metadata: Metadata = {
  title: "Transfer Vehicle Ownership — Verification | Parivahan 2.0 - Government of India",
  description:
    "Step 04 of vehicle ownership transfer: Track your RTO verification status, view application progress, and download receipts.",
};

export default function OwnershipTransferVerificationPage() {
  return <VehicleOwnershipTransferVerification />;
}
