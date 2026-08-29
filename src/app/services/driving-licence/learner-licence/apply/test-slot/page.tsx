import type { Metadata } from "next";
import LearnerLicenceTestSlot from "@/components/services/LearnerLicenceTestSlot";

export const metadata: Metadata = {
  title:
    "Book LL Test Slot — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 5: Select your preferred test mode (Online or at RTO), choose date and time slot for your Learner Licence test.",
};

export default function TestSlotPage() {
  return <LearnerLicenceTestSlot />;
}
