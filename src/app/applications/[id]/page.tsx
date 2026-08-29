import type { Metadata } from "next";
import ApplicationDetailsView from "@/components/applications/ApplicationDetailsView";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Application ${id} Status | Parivahan 2.0 - Government of India`,
    description: `Track real-time status, timeline and documents for Parivahan application ${id}.`,
  };
}

export default async function ApplicationStatusPage({ params }: Props) {
  const { id } = await params;
  return <ApplicationDetailsView applicationId={id} />;
}
