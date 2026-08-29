import type { Metadata } from "next";
import LearnerLicencePersonalDetails from "@/components/services/LearnerLicencePersonalDetails";

export const metadata: Metadata = {
  title:
    "Personal Details — Apply for Learner Licence | Parivahan 2.0 - Government of India",
  description:
    "Step 2: Enter applicant personal details, parent names, marital status, and contact information for your Learner Licence application.",
};

export default function PersonalDetailsPage() {
  return <LearnerLicencePersonalDetails />;
}
