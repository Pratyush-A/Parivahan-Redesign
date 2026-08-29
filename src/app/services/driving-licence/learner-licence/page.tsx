import type { Metadata } from "next";
import LearnerLicenceLanding from "@/components/services/LearnerLicenceLanding";

export const metadata: Metadata = {
  title: "Get a Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Apply for a Learner Licence (LL) online. Check eligibility, required documents, fees, validity, and step-by-step application process.",
};

export default function LearnerLicencePage() {
  return <LearnerLicenceLanding />;
}
