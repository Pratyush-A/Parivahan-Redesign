import type { Metadata } from "next";
import LoginPage from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Login / Sign In | Parivahan 2.0 - Government of India",
  description:
    "Sign in to Parivahan 2.0 to access driving licence services, vehicle registration, challan management, and track application status.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
