import type { Metadata } from "next";
import LearnerLicenceDocuments from "@/components/services/LearnerLicenceDocuments";

export const metadata: Metadata = {
  title: "Documents Required for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Check all document guidelines, identity proof, address proof, age proof, and photograph requirements for applying for a Learner Licence.",
};

export default function LearnerLicenceDocumentsPage() {
  return <LearnerLicenceDocuments />;
}
