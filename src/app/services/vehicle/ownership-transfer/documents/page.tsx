import type { Metadata } from "next";
import VehicleOwnershipTransferDocuments from "@/components/services/VehicleOwnershipTransferDocuments";

export const metadata: Metadata = {
  title: "Transfer Vehicle Ownership — Documents | Parivahan 2.0 - Government of India",
  description:
    "Step 02 of vehicle ownership transfer: Upload and verify required documents securely via DigiLocker or manual upload.",
};

export default function OwnershipTransferDocumentsPage() {
  return <VehicleOwnershipTransferDocuments />;
}
