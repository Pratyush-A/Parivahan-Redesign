import type { Metadata } from "next";
import LearnerLicenceReview from "@/components/services/LearnerLicenceReview";

export const metadata: Metadata = {
  title:
    "Review & Confirm — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 6: Review your personal information, address, uploaded documents, and booked slot before proceeding to payment.",
};

export default function ReviewPage() {
  return <LearnerLicenceReview />;
}
