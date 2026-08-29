import type { Metadata } from "next";
import VehicleOwnershipTransferDetails from "@/components/services/VehicleOwnershipTransferDetails";

export const metadata: Metadata = {
  title: "Transfer Vehicle Ownership — Details | Parivahan 2.0 - Government of India",
  description:
    "Step 01 of vehicle ownership transfer: Enter vehicle registration number and complete verified seller and buyer details.",
};

export default function OwnershipTransferDetailsPage() {
  return <VehicleOwnershipTransferDetails />;
}
