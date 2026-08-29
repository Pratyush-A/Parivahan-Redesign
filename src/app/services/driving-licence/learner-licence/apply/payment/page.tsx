import type { Metadata } from "next";
import LearnerLicencePayment from "@/components/services/LearnerLicencePayment";

export const metadata: Metadata = {
  title:
    "Fee Payment — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 7: Complete online fee payment for Learner Licence application and test slot booking.",
};

export default function PaymentPage() {
  return <LearnerLicencePayment />;
}
