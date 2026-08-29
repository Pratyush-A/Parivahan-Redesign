import type { Metadata } from "next";
import ChallanDetailPage from "@/components/challan/ChallanDetailPage";

export const metadata: Metadata = {
  title: "Challan Detail | Parivahan 2.0 - Government of India",
  description: "View traffic violation details, evidence, and pay challan online.",
};

export default async function ChallanDetailRoute({
  params,
}: {
  params: Promise<{ challanId: string }>;
}) {
  const { challanId } = await params;
  return <ChallanDetailPage challanId={challanId} />;
}
