import type { Metadata } from "next";
import LearnerLicenceUploadDocuments from "@/components/services/LearnerLicenceUploadDocuments";

export const metadata: Metadata = {
  title:
    "Upload Documents — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 4: Upload self-attested copies of identity proof, address proof, age proof, and photograph for your Learner Licence application.",
};

export default function UploadDocumentsPage() {
  return <LearnerLicenceUploadDocuments />;
}
