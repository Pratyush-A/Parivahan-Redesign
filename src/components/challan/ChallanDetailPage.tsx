"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Headphones,
  Info,
  LockKeyhole,
  MapPin,
  Printer,
  Receipt,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import PaymentGatewayDialog from "@/components/payment/PaymentGatewayDialog";

interface ChallanDetailRecord {
  number: string;
  status: "Pending" | "Paid";
  daysLeft: number;
  issuedOn: string;
  dueDate: string;
  paidOn?: string;
  paymentId?: string;
  vehicleNumber: string;
  vehicleClass: string;
  makeModel: string;
  fuelType: string;
  registrationDate: string;
  state: string;
  violation: string;
  violationDescription: string;
  location: string;
  landmark: string;
  gps: string;
  offenceSection: string;
  penaltyAmount: number;
  compoundingAmount: number;
  amountPaid: number;
  source: string;
  authority: string;
  officerName: string;
  officerId: string;
  station: string;
  contact: string;
  capturedBy: string;
  evidenceCode: string;
  timeline: {
    event1Title: string;
    event1Date: string;
    event1Desc: string;
    event1Status: string;
    event1Pending: boolean;
    event2Title: string;
    event2Date: string;
    event2Desc: string;
    event2Status: string;
    event3Title: string;
    event3Date: string;
    event3Desc: string;
    event3Status: string;
  };
}

const challanDatabase: Record<string, ChallanDetailRecord> = {
  MH12052600012345: {
    number: "MH12052600012345",
    status: "Pending",
    daysLeft: 20,
    issuedOn: "05 May 2026, 11:15 AM",
    dueDate: "25 May 2026",
    vehicleNumber: "MH12AB1234",
    vehicleClass: "LMV",
    makeModel: "Maruti Suzuki / Swift VXI",
    fuelType: "Petrol",
    registrationDate: "15 Aug 2021",
    state: "Maharashtra",
    violation: "Over Speeding",
    violationDescription: "Exceeding 80 km/h in 60 km/h zone",
    location: "Pune - Hinjewadi Phase 1",
    landmark: "Near Infosys Phase 1 Gate",
    gps: "18.5913° N, 73.7385° E",
    offenceSection: "183(1) MV Act",
    penaltyAmount: 1000,
    compoundingAmount: 1000,
    amountPaid: 0,
    source: "Manual (Field)",
    authority: "Pune City Traffic Police",
    officerName: "Traffic Inspector R. Patil",
    officerId: "MH1205",
    station: "Hinjewadi Traffic Unit",
    contact: "020-12345678",
    capturedBy: "Traffic Enforcement Camera",
    evidenceCode: "CAM-04",
    timeline: {
      event1Title: "Challan Issued",
      event1Date: "05 May 2026, 11:15 AM",
      event1Desc: "Challan issued for Over Speeding by Traffic Inspector R. Patil",
      event1Status: "Pending",
      event1Pending: true,
      event2Title: "Violation Captured",
      event2Date: "05 May 2026, 11:13 AM",
      event2Desc: "Violation captured by traffic enforcement camera",
      event2Status: "Completed",
      event3Title: "Vehicle Detected",
      event3Date: "05 May 2026, 11:13 AM",
      event3Desc: "Vehicle detected at 85 km/h in 60 km/h zone",
      event3Status: "Completed",
    },
  },
  MH12052600067890: {
    number: "MH12052600067890",
    status: "Pending",
    daysLeft: 17,
    issuedOn: "02 May 2026, 09:45 AM",
    dueDate: "22 May 2026",
    vehicleNumber: "MH12AB1234",
    vehicleClass: "LMV",
    makeModel: "Maruti Suzuki / Swift VXI",
    fuelType: "Petrol",
    registrationDate: "15 Aug 2021",
    state: "Maharashtra",
    violation: "No Parking",
    violationDescription: "Prohibited Area / Obstructing Traffic",
    location: "Pune - Katraj Bypass Road",
    landmark: "Near Katraj Bus Terminal",
    gps: "18.4575° N, 73.8677° E",
    offenceSection: "119/177 MV Act",
    penaltyAmount: 500,
    compoundingAmount: 500,
    amountPaid: 0,
    source: "Field Officer Device",
    authority: "Pune City Traffic Police",
    officerName: "Traffic Constable S. More",
    officerId: "MH1202",
    station: "Katraj Traffic Division",
    contact: "020-24371190",
    capturedBy: "Field Traffic Patrol Unit",
    evidenceCode: "CAM-02",
    timeline: {
      event1Title: "Challan Issued",
      event1Date: "02 May 2026, 09:45 AM",
      event1Desc: "Challan issued for No Parking violation by Constable S. More",
      event1Status: "Pending",
      event1Pending: true,
      event2Title: "Violation Photographed",
      event2Date: "02 May 2026, 09:42 AM",
      event2Desc: "Vehicle photographed parked illegally in marked yellow zone",
      event2Status: "Completed",
      event3Title: "Patrol Inspection",
      event3Date: "02 May 2026, 09:40 AM",
      event3Desc: "Traffic patrol identified vehicle blocking bus entrance",
      event3Status: "Completed",
    },
  },
  MH10042600033445: {
    number: "MH10042600033445",
    status: "Paid",
    daysLeft: 0,
    issuedOn: "10 Apr 2026, 04:20 PM",
    dueDate: "30 Apr 2026",
    paidOn: "12 Apr 2026, 02:15 PM",
    paymentId: "PAY120426556677",
    vehicleNumber: "MH12AB1234",
    vehicleClass: "LMV",
    makeModel: "Maruti Suzuki / Swift VXI",
    fuelType: "Petrol",
    registrationDate: "15 Aug 2021",
    state: "Maharashtra",
    violation: "Red Light Jump",
    violationDescription: "Signal Violation at Baner Junction",
    location: "Pune - Baner Road",
    landmark: "Near Baner Flyover",
    gps: "18.5590° N, 73.7868° E",
    offenceSection: "119 MV Act",
    penaltyAmount: 500,
    compoundingAmount: 500,
    amountPaid: 500,
    source: "Automated RLVD System",
    authority: "Pune City Traffic Police",
    officerName: "Traffic Sub-Inspector V. Kulkarni",
    officerId: "MH1010",
    station: "Baner Traffic Unit",
    contact: "020-27293300",
    capturedBy: "RLVD Automated High-Res Camera",
    evidenceCode: "RLVD-09",
    timeline: {
      event1Title: "Payment Cleared",
      event1Date: "12 Apr 2026, 02:15 PM",
      event1Desc: "Paid online via UPI Gateway (ID: PAY120426556677)",
      event1Status: "Paid",
      event1Pending: false,
      event2Title: "Challan Issued",
      event2Date: "10 Apr 2026, 04:20 PM",
      event2Desc: "Challan generated for Red Light Violation",
      event2Status: "Completed",
      event3Title: "Signal Jump Logged",
      event3Date: "10 Apr 2026, 04:19 PM",
      event3Desc: "Stop line sensor and optical trigger recorded violation",
      event3Status: "Completed",
    },
  },
};

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function DetailItem({
  label,
  value,
  icon: Icon,
  danger = false,
}: {
  label: string;
  value: string;
  icon?: typeof CalendarDays;
  danger?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium text-[#64748B]">{label}</p>

      <div className="mt-1 flex items-start gap-1.5">
        {Icon && (
          <Icon
            size={14}
            className={[
              "mt-0.5 shrink-0",
              danger ? "text-[#B91C1C]" : "text-[#2563EB]",
            ].join(" ")}
          />
        )}

        <p
          className={[
            "text-xs font-semibold leading-snug sm:text-sm",
            danger ? "text-[#B91C1C]" : "text-[#172554]",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
      <h2 className="text-sm font-bold text-[#172554]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ActionRow({
  icon: Icon,
  children,
  onClick,
}: {
  icon: typeof Download;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[46px] w-full items-center gap-3 border-b border-[#E2E8F0] py-2 text-left text-xs font-semibold text-[#1A56DB] last:border-b-0 transition hover:bg-[#F8FAFC] rounded-lg px-2"
    >
      <Icon size={16} className="text-[#2563EB]" />
      <span className="flex-1">{children}</span>
      <ChevronRight size={15} className="text-[#94A3B8]" />
    </button>
  );
}

function InfoRow({
  icon: Icon,
  children,
  iconClass = "text-[#2563EB] bg-[#EFF6FF]",
}: {
  icon: typeof CalendarDays;
  children: React.ReactNode;
  iconClass?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={[
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          iconClass,
        ].join(" ")}
      >
        <Icon size={14} />
      </div>

      <p className="text-xs leading-relaxed text-[#334155]">{children}</p>
    </div>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 17h14l-1-6H6l-1 6Z" />
      <path d="M7 11 8.5 7h7l1.5 4" />
      <path d="M7 17v2M17 17v2M5 14h14" />
      <circle cx="8" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
    </svg>
  );
}

export default function ChallanDetailPage({
  challanId = "MH12052600012345",
}: {
  challanId?: string;
}) {
  const [showPayment, setShowPayment] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Look up specific challan or fallback to first
  const challan =
    challanDatabase[challanId] ||
    (challanId.includes("67890")
      ? challanDatabase["MH12052600067890"]
      : challanId.includes("33445")
        ? challanDatabase["MH10042600033445"]
        : {
            ...challanDatabase["MH12052600012345"],
            number: challanId,
          });

  const isPaid = challan.status === "Paid";
  const amountDue = isPaid ? 0 : challan.penaltyAmount;

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function downloadChallan() {
    notify("Challan details prepared for download.");
  }

  function shareChallan() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `Challan ${challan.number}`,
          text: `Traffic challan details for ${challan.vehicleNumber}`,
          url: window.location.href,
        })
        .catch(() => undefined);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href);
      notify("Share link copied to clipboard.");
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F9FA] pb-36 text-[#111827]"
    >
      {/* Toast alert */}
      {toast && (
        <div
          className="fixed right-5 top-24 z-[90] flex max-w-[360px] items-start gap-3 rounded-xl border border-[#BBF7D0] bg-white px-4 py-3 shadow-xl"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#15803D]" />
          <p className="text-xs font-semibold text-[#172554]">{toast}</p>
        </div>
      )}

      {/* =====================================================
          1. BREADCRUMB
      ===================================================== */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-[#64748B]"
          >
            <Link
              href="/"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Home
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services/challan"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Challan
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services/challan/results"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Results
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <span className="font-semibold text-[#172554]" aria-current="page">
              Challan Detail
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="border-b border-[#E2E8F0] bg-white py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
                Challan Detail
              </h1>

              <p className="mt-1 text-sm text-[#64748B]">
                Review challan information, violation details, and payment status.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={downloadChallan}
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#1A56DB] shadow-2xs transition hover:bg-[#F8FAFC]"
              >
                <Download size={15} />
                Download Challan
              </button>

              <button
                type="button"
                onClick={() => notify("Redirecting to dispute grievance portal...")}
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8FAFC]"
              >
                <ShieldCheck size={15} />
                Dispute Challan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. CHALLAN SUMMARY HEADER CARD
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
          <div className="grid items-center gap-4 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[#E2E8F0]">
            {/* 1. Status */}
            <div className="flex items-center gap-3.5 md:pr-4">
              <div
                className={[
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                  isPaid
                    ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                    : "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
                ].join(" ")}
              >
                {isPaid ? (
                  <Check size={24} strokeWidth={2.5} />
                ) : (
                  <FileText size={24} strokeWidth={2} />
                )}
              </div>

              <div>
                <span
                  className={[
                    "inline-flex rounded-md px-2.5 py-0.5 text-[10px] font-bold",
                    isPaid
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-[#FEF2F2] text-[#B91C1C]",
                  ].join(" ")}
                >
                  {challan.status}
                </span>

                <p
                  className={[
                    "mt-1 text-xs font-bold",
                    isPaid ? "text-[#15803D]" : "text-[#DC2626]",
                  ].join(" ")}
                >
                  {isPaid ? "Paid in full" : `${challan.daysLeft} days left`}
                </p>
              </div>
            </div>

            {/* 2. Challan Number */}
            <div className="md:px-5">
              <p className="text-[10px] font-medium text-[#64748B]">Challan Number</p>
              <p className="mt-1 font-mono text-xs font-bold text-[#172554] sm:text-sm">
                {challan.number}
              </p>
            </div>

            {/* 3. Issued On */}
            <div className="md:px-5">
              <p className="text-[10px] font-medium text-[#64748B]">Issued On</p>
              <p className="mt-1 text-xs font-bold text-[#172554]">
                {challan.issuedOn}
              </p>
            </div>

            {/* 4. Due Date */}
            <div className="md:pl-5">
              <p className="text-[10px] font-medium text-[#64748B]">
                {isPaid ? "Paid On" : "Due Date"}
              </p>
              <p
                className={[
                  "mt-1 text-xs font-bold sm:text-sm",
                  isPaid ? "text-[#15803D]" : "text-[#172554]",
                ].join(" ")}
              >
                {isPaid ? challan.paidOn : challan.dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          4. MAIN TWO-COLUMN LAYOUT (66% / 34%)
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            {/* 1. Vehicle Information */}
            <SectionCard title="Vehicle Information">
              <div className="rounded-xl border border-[#E2E8F0] p-4 sm:p-5">
                <div className="grid gap-5 sm:grid-cols-3 sm:divide-x sm:divide-[#E2E8F0]">
                  {/* Left */}
                  <div className="flex items-start gap-3.5 sm:pr-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                      <CarIcon />
                    </div>

                    <div className="space-y-3">
                      <DetailItem
                        label="Vehicle Number"
                        value={challan.vehicleNumber}
                      />
                      <DetailItem
                        label="Vehicle Class"
                        value={challan.vehicleClass}
                      />
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="space-y-3 sm:px-5">
                    <DetailItem
                      label="Make / Model"
                      value={challan.makeModel}
                    />
                    <DetailItem
                      label="Fuel Type"
                      value={challan.fuelType}
                    />
                  </div>

                  {/* Right */}
                  <div className="space-y-3 sm:pl-5">
                    <DetailItem
                      label="Registration Date"
                      value={challan.registrationDate}
                    />
                    <DetailItem
                      label="State"
                      value={challan.state}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 2. Violation Details */}
            <SectionCard title="Violation Details">
              <div className="rounded-xl border border-[#E2E8F0] p-4 sm:p-5">
                <div className="grid gap-6 sm:grid-cols-2 sm:divide-x sm:divide-[#E2E8F0]">
                  {/* Left Column */}
                  <div className="space-y-4 sm:pr-6">
                    <DetailItem
                      label="Violation Type"
                      value={challan.violation}
                    />

                    <DetailItem
                      label="Violation Description"
                      value={challan.violationDescription}
                    />

                    <DetailItem
                      label="Location"
                      value={challan.location}
                      icon={MapPin}
                    />

                    <DetailItem
                      label="Landmark"
                      value={challan.landmark}
                      icon={MapPin}
                    />

                    <DetailItem
                      label="GPS Coordinates"
                      value={challan.gps}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 sm:pl-6">
                    <DetailItem
                      label="Offence Section"
                      value={challan.offenceSection}
                    />

                    <DetailItem
                      label="Penalty Amount"
                      value={formatCurrency(challan.penaltyAmount)}
                    />

                    <DetailItem
                      label="Compounding Amount"
                      value={formatCurrency(challan.compoundingAmount)}
                    />

                    <DetailItem
                      label="Fine Type"
                      value="Compoundable"
                    />

                    <DetailItem
                      label="Challan Source"
                      value={challan.source}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 3. Evidence / Location */}
            <SectionCard title="Evidence / Location">
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Visual Map Placeholder */}
                <div className="relative min-h-[140px] overflow-hidden rounded-xl border border-[#CBD5E1] bg-[#EAF0E6] shadow-inner">
                  {/* Styled road grid */}
                  <div className="absolute inset-0 opacity-60">
                    <div className="absolute left-[15%] top-0 h-full w-3 -rotate-12 bg-white" />
                    <div className="absolute left-0 top-[40%] h-3 w-full rotate-6 bg-white" />
                    <div className="absolute left-[60%] top-0 h-full w-2 rotate-45 bg-[#DCE7D6]" />
                    <div className="absolute left-0 top-[75%] h-2 w-full -rotate-6 bg-[#DCE7D6]" />
                  </div>

                  {/* Marker Pin */}
                  <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DC2626] text-white shadow-md">
                    <MapPin size={18} fill="currentColor" />
                  </div>

                  <div className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold text-[#172554] shadow-xs truncate max-w-[90%]">
                    {challan.location.split("-")[1]?.trim() || challan.location}
                  </div>
                </div>

                {/* Captured By Info */}
                <div className="flex flex-col justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[10px] font-medium text-[#64748B]">Captured By</p>
                  <p className="mt-1 text-xs font-bold text-[#172554]">
                    {challan.capturedBy}
                  </p>

                  <p className="mt-4 text-[10px] font-medium text-[#64748B]">Captured On</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#172554]">
                    <CalendarDays size={14} className="text-[#2563EB]" />
                    {challan.issuedOn}
                  </p>
                </div>

                {/* Camera / Evidence Frame */}
                <div>
                  <p className="mb-1.5 text-[10px] font-medium text-[#64748B]">
                    Image / Evidence
                  </p>
                  <div className="relative flex min-h-[120px] items-center justify-center overflow-hidden rounded-xl border border-[#CBD5E1] bg-[#475569]">
                    {/* Simulated Traffic Photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-700/50" />
                    
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs">
                      <Camera size={20} />
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white font-mono">
                      <Camera size={11} />
                      <span>{challan.evidenceCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 4. Activity Timeline */}
            <SectionCard title="Activity Timeline">
              <div className="relative space-y-5">
                {/* Event 1 */}
                <div className="relative flex gap-3.5">
                  <div className="absolute left-[15px] top-8 h-[calc(100%+8px)] w-0.5 bg-[#BFDBFE]" />
                  <div
                    className={[
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      challan.timeline.event1Pending
                        ? "bg-[#FEF2F2] text-[#DC2626]"
                        : "bg-[#DCFCE7] text-[#15803D]",
                    ].join(" ")}
                  >
                    {challan.timeline.event1Pending ? (
                      <FileText size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p
                        className={[
                          "text-xs font-bold",
                          challan.timeline.event1Pending
                            ? "text-[#DC2626]"
                            : "text-[#15803D]",
                        ].join(" ")}
                      >
                        {challan.timeline.event1Title}
                      </p>
                      <p className="text-[10px] text-[#64748B]">
                        {challan.timeline.event1Date}
                      </p>
                      <p className="mt-1 text-xs text-[#475569]">
                        {challan.timeline.event1Desc}
                      </p>
                    </div>
                    <span
                      className={[
                        "w-fit rounded-md px-2 py-0.5 text-[10px] font-bold",
                        challan.timeline.event1Pending
                          ? "bg-[#FEF2F2] text-[#B91C1C]"
                          : "bg-[#DCFCE7] text-[#15803D]",
                      ].join(" ")}
                    >
                      {challan.timeline.event1Status}
                    </span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative flex gap-3.5">
                  <div className="absolute left-[15px] top-8 h-[calc(100%+8px)] w-0.5 bg-[#BFDBFE]" />
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <Camera size={16} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#172554]">
                        {challan.timeline.event2Title}
                      </p>
                      <p className="text-[10px] text-[#64748B]">
                        {challan.timeline.event2Date}
                      </p>
                      <p className="mt-1 text-xs text-[#475569]">
                        {challan.timeline.event2Desc}
                      </p>
                    </div>
                    <span className="w-fit rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {challan.timeline.event2Status}
                    </span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative flex gap-3.5">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <User size={16} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#172554]">
                        {challan.timeline.event3Title}
                      </p>
                      <p className="text-[10px] text-[#64748B]">
                        {challan.timeline.event3Date}
                      </p>
                      <p className="mt-1 text-xs text-[#475569]">
                        {challan.timeline.event3Desc}
                      </p>
                    </div>
                    <span className="w-fit rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {challan.timeline.event3Status}
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* 1. Quick Actions */}
            <SectionCard title="Quick Actions">
              {isPaid ? (
                <Link
                  href={`/challan/receipt/${challan.paymentId || "TXN-CHL-PAID"}`}
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-4 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#166534]"
                >
                  <Receipt size={15} className="text-white !text-white" />
                  <span className="text-white !text-white">View Payment Receipt</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  <LockKeyhole size={15} className="text-white !text-white" />
                  <span className="text-white !text-white">
                    Pay Challan {formatCurrency(challan.penaltyAmount)}
                  </span>
                  <ArrowRight size={14} className="text-white !text-white" />
                </button>
              )}

              <div className="mt-3">
                <ActionRow icon={Download} onClick={downloadChallan}>
                  Download Challan
                </ActionRow>

                <ActionRow
                  icon={ShieldCheck}
                  onClick={() => notify("Redirecting to dispute grievance portal...")}
                >
                  Dispute Challan
                </ActionRow>

                <ActionRow icon={Share2} onClick={shareChallan}>
                  Share Challan
                </ActionRow>

                <ActionRow icon={Printer} onClick={() => window.print()}>
                  Print Challan
                </ActionRow>
              </div>
            </SectionCard>

            {/* 2. Issuing Authority */}
            <SectionCard title="Issuing Authority">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2.5 text-xs">
                  <div>
                    <p className="text-[10px] text-[#64748B]">Issuing Authority</p>
                    <p className="font-semibold text-[#172554]">{challan.authority}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#64748B]">Officer Name</p>
                    <p className="font-semibold text-[#172554]">{challan.officerName}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#64748B]">Officer ID</p>
                    <p className="font-semibold text-[#172554]">{challan.officerId}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#64748B]">Station / Unit</p>
                    <p className="font-semibold text-[#172554]">{challan.station}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#64748B]">Contact</p>
                    <p className="font-semibold text-[#172554]">{challan.contact}</p>
                  </div>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                  <ShieldCheck size={22} />
                </div>
              </div>
            </SectionCard>

            {/* 3. Amount & Payment Info */}
            <SectionCard title="Amount & Payment Info">
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#475569]">
                  <span>Penalty Amount</span>
                  <span className="font-semibold text-[#172554]">
                    {formatCurrency(challan.penaltyAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-[#475569]">
                  <span>Compounding Amount</span>
                  <span className="font-semibold text-[#172554]">
                    {formatCurrency(challan.compoundingAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-[#475569]">
                  <span>Amount Paid</span>
                  <span
                    className={[
                      "font-semibold",
                      isPaid ? "text-[#15803D]" : "text-[#172554]",
                    ].join(" ")}
                  >
                    {formatCurrency(challan.amountPaid)}
                  </span>
                </div>

                <div className="border-t border-[#E2E8F0] pt-2.5 flex justify-between items-center text-sm font-bold">
                  <span className="text-[#172554]">Amount Due</span>
                  <span
                    className={[
                      "text-base",
                      isPaid ? "text-[#15803D]" : "text-[#DC2626]",
                    ].join(" ")}
                  >
                    {formatCurrency(amountDue)}
                  </span>
                </div>

                <div className="border-t border-[#E2E8F0] pt-2.5 flex justify-between items-center">
                  <span className="text-[11px] text-[#475569]">Payment Status</span>
                  <span
                    className={[
                      "rounded-md px-2 py-0.5 text-[10px] font-bold",
                      isPaid
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-[#FEF2F2] text-[#B91C1C]",
                    ].join(" ")}
                  >
                    {challan.status}
                  </span>
                </div>
              </div>
            </SectionCard>

            {/* 4. Important Information */}
            <SectionCard title="Important Information">
              <div className="space-y-3">
                <InfoRow icon={CalendarDays}>
                  Pay before{" "}
                  <strong className="text-[#172554]">{challan.dueDate}</strong> to
                  avoid additional action and penalties.
                </InfoRow>

                <InfoRow icon={AlertCircle} iconClass="text-[#B45309] bg-[#FEF3C7]">
                  Non-payment may lead to additional disciplinary action and vehicle impound.
                </InfoRow>

                <InfoRow icon={Info}>
                  You can raise a dispute if you believe this challan was issued in error.
                </InfoRow>
              </div>
            </SectionCard>

            {/* 5. Need Help */}
            <div className="rounded-2xl border border-[#F6D58A] bg-[#FFFBEB] p-5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
                  <Headphones size={20} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#78350F]">Need Help?</h2>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[#92400E]">
                    Our support team is here to help you with your challan related queries.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/help"
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-2 text-[11px] font-bold text-[#172554] shadow-2xs hover:bg-[#F8FAFC]"
                >
                  <Headphones size={13} />
                  Contact Support
                </Link>

                <Link
                  href="/help"
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#AFC8F5] bg-white px-2 text-[11px] font-bold text-[#2563EB] shadow-2xs hover:bg-[#EFF6FF]"
                >
                  Help Center
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          5. STICKY PAYMENT BAR
      ===================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#BFD4FF] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-6 divide-x divide-[#E2E8F0]">
              <div>
                <p
                  className={[
                    "text-[10px] font-bold uppercase tracking-wider",
                    isPaid ? "text-[#15803D]" : "text-[#B91C1C]",
                  ].join(" ")}
                >
                  {challan.status}
                </p>
                <p
                  className={[
                    "text-xs font-bold",
                    isPaid ? "text-[#15803D]" : "text-[#DC2626]",
                  ].join(" ")}
                >
                  {isPaid ? "Settled" : `${challan.daysLeft} days left`}
                </p>
              </div>

              <div className="pl-4 sm:pl-6">
                <p className="text-[10px] text-[#64748B]">Challan Number</p>
                <p className="font-mono text-xs font-bold text-[#172554]">
                  {challan.number}
                </p>
              </div>

              <div className="pl-4 sm:pl-6">
                <p className="text-[10px] text-[#64748B]">Amount Due</p>
                <p
                  className={[
                    "text-sm font-bold sm:text-base",
                    isPaid ? "text-[#15803D]" : "text-[#DC2626]",
                  ].join(" ")}
                >
                  {formatCurrency(amountDue)}
                </p>
              </div>
            </div>

            {isPaid ? (
              <Link
                href={`/challan/receipt/${challan.paymentId || "TXN-CHL-PAID"}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#15803D] px-7 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#166534]"
              >
                <Receipt size={15} className="text-white !text-white" />
                <span className="text-white !text-white">View Payment Receipt</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setShowPayment(true)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-7 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
              >
                <LockKeyhole size={15} className="text-white !text-white" />
                <span className="text-white !text-white">
                  Pay Challan {formatCurrency(challan.penaltyAmount)}
                </span>
                <ArrowRight size={15} className="text-white !text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          6. OFFICIAL MORTH FOOTER RIBBON
      ===================================================== */}
      <div className="mt-12 border-t border-[#E2E8F0] bg-white py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
          <LockKeyhole size={13} className="text-[#15803D]" />
          <span>This is an official website of the Ministry of Road Transport and Highways (MoRTH), Government of India.</span>
        </p>
      </div>

      {/* =====================================================
          REUSED PAYMENT GATEWAY DIALOG
      ===================================================== */}
      {!isPaid && (
        <PaymentGatewayDialog
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          title="Pay Challan"
          subtitle="Review your payment details before proceeding."
          paymentFor="Traffic Challan"
          itemCount={1}
          itemLabel="Challan Number"
          amount={challan.penaltyAmount}
          convenienceFee={0}
          referenceId={challan.number}
          receiptUrlPrefix="/challan/receipt"
        />
      )}
    </main>
  );
}
