import type { Metadata } from "next";
import LearnerLicenceAddressDetails from "@/components/services/LearnerLicenceAddressDetails";

export const metadata: Metadata = {
  title:
    "Address Details — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 3: Enter your current residential address and permanent address details for your Learner Licence application.",
};

export default function AddressDetailsPage() {
  return <LearnerLicenceAddressDetails />;
}
