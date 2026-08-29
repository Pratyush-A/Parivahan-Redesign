import type { Metadata } from "next";
import VehicleOwnershipTransfer from "@/components/services/VehicleOwnershipTransfer";

export const metadata: Metadata = {
  title: "Transfer Vehicle Ownership | Parivahan 2.0 - Government of India",
  description:
    "Transfer registered vehicle ownership to a new buyer online. Check eligibility, estimated time, fees, required documents, and step-by-step guidance.",
};

export default function TransferVehicleOwnershipPage() {
  return <VehicleOwnershipTransfer />;
}
