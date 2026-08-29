import type { Metadata } from "next";
import ChallanReceiptView from "@/components/challan/ChallanReceiptView";

export const metadata: Metadata = {
  title: "Challan Payment Receipt | Parivahan 2.0 - Government of India",
  description: "Official payment receipt for traffic challan settlement.",
};

export default async function ServicesChallanReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChallanReceiptView id={id} />;
}
