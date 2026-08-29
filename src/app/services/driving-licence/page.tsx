import type { Metadata } from "next";
import DrivingLicenceLanding from "@/components/services/DrivingLicenceLanding";

export const metadata: Metadata = {
  title: "Driving Licence Services | Parivahan 2.0 - Government of India",
  description:
    "Apply for a Learner Licence, Driving Licence, Renew DL, Replace Lost or Damaged DL, Check Application Status, or View/Download DL online.",
};

export default function DrivingLicencePage() {
  return <DrivingLicenceLanding />;
}
