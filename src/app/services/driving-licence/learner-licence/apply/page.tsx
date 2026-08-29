import type { Metadata } from "next";
import LearnerLicenceApply from "@/components/services/LearnerLicenceApply";

export const metadata: Metadata = {
  title: "Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 1: Check eligibility, select applicant type and vehicle class to start your Learner Licence application online.",
};

export default function LearnerLicenceApplyPage() {
  return <LearnerLicenceApply />;
}
