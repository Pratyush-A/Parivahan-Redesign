"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  FileCheck2,
  FileText,
  Headphones,
  Hourglass,
  Info,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

type StepState = "completed" | "active" | "pending";

type JourneyStep = {
  number: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

const stepperSteps: JourneyStep[] = [
  {
    number: "01",
    title: "Details",
    description: "Completed",
    status: "completed",
  },
  {
    number: "02",
    title: "Documents",
    description: "Completed",
    status: "completed",
  },
  {
    number: "03",
    title: "Payment",
    description: "Completed",
    status: "completed",
  },
  {
    number: "04",
    title: "Verification",
    description: "You are here",
    status: "current",
  },
];

const timeline = [
  {
    number: "01",
    title: "Application submitted",
    description: "12 May 2026, 10:30 AM",
    status: "Completed",
    state: "completed" as StepState,
  },
  {
    number: "02",
    title: "Documents verified",
    description: "12 May 2026, 11:05 AM",
    status: "Completed",
    state: "completed" as StepState,
  },
  {
    number: "03",
    title: "Payment received",
    description: "12 May 2026, 11:10 AM",
    status: "Completed",
    state: "completed" as StepState,
  },
  {
    number: "04",
    title: "RTO verification",
    description: "Your application is under review by the RTO.",
    status: "In progress",
    state: "active" as StepState,
  },
  {
    number: "05",
    title: "Ownership updated",
    description: "Ownership will be updated in the system.",
    status: "Pending",
    state: "pending" as StepState,
  },
  {
    number: "06",
    title: "Updated RC available",
    description: "Updated RC will be available for download.",
    status: "Pending",
    state: "pending" as StepState,
  },
];

/* ==========================================================================
   CAR PREVIEW GRAPHIC (Modern White Hatchback matching reference UI)
   ========================================================================== */
function CarGraphic() {
  return (
    <div className="relative flex h-16 w-24 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 200 110"
        className="h-full w-full object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="98" rx="80" ry="8" fill="#CBD5E1" opacity="0.6" />
        <path
          d="M 15 78 Q 20 62 48 58 L 65 34 Q 74 26 108 26 L 140 26 Q 158 26 168 42 L 184 62 Q 192 70 192 84 L 188 92 Q 186 94 176 94 L 24 94 Q 15 94 15 84 Z"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        <path
          d="M 52 58 L 68 35 Q 74 28 104 28 L 138 28 Q 154 28 164 42 L 176 58 Z"
          fill="#E2E8F0"
        />
        <path d="M 72 36 L 105 36 L 105 56 L 56 56 Z" fill="#38BDF8" opacity="0.8" />
        <path d="M 110 36 L 138 36 Q 146 36 154 44 L 168 56 L 110 56 Z" fill="#38BDF8" opacity="0.8" />
        <rect x="105" y="34" width="5" height="24" fill="#64748B" />
        <path d="M 18 68 Q 24 64 32 66 L 30 76 Q 20 78 18 68 Z" fill="#FEF08A" stroke="#FACC15" strokeWidth="1" />
        <path d="M 15 76 Q 22 76 26 84 L 16 86 Z" fill="#1E293B" />
        <path d="M 32 68 Q 100 66 182 66" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="88" y="62" width="12" height="3" rx="1.5" fill="#94A3B8" />
        <rect x="132" y="62" width="12" height="3" rx="1.5" fill="#94A3B8" />
        <g transform="translate(48, 88)">
          <circle cx="0" cy="0" r="17" fill="#1E293B" />
          <circle cx="0" cy="0" r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
        </g>
        <g transform="translate(154, 88)">
          <circle cx="0" cy="0" r="17" fill="#1E293B" />
          <circle cx="0" cy="0" r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
        </g>
      </svg>
    </div>
  );
}

export default function VehicleOwnershipTransferVerification() {
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  function handleCopyApplication() {
    navigator.clipboard?.writeText("VT-2026-001284");
    setCopied(true);
    notify("Application number copied to clipboard.");
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]">
      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed right-5 top-24 z-[90] flex max-w-[360px] items-start gap-3 rounded-xl border border-[#BBF7D0] bg-white px-4 py-3 shadow-xl transition-all"
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
              className="text-[#1A56DB] transition-colors hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              Home
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services"
              className="text-[#1A56DB] transition-colors hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              Services
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services/vehicle-registration"
              className="text-[#1A56DB] transition-colors hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              My Vehicle
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services/vehicle/ownership-transfer"
              className="text-[#1A56DB] transition-colors hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              Transfer Vehicle Ownership
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <span className="font-semibold text-[#172554]" aria-current="page">
              Verification
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="bg-white py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
              Transfer Vehicle Ownership
            </h1>

            <p className="mt-1 text-sm text-[#64748B]">
              Your application is with the RTO for verification.
            </p>
          </div>

          <button
            type="button"
            onClick={() => notify("Your application has been saved in Drafts.")}
            className="inline-flex min-h-[42px] items-center justify-center gap-2 self-start rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] sm:self-auto"
          >
            <Bookmark size={15} strokeWidth={2} aria-hidden="true" />
            Save for Later
          </button>
        </div>
      </section>

      {/* =====================================================
          3. PROGRESS STEPPER
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
            {stepperSteps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <li
                  key={step.number}
                  className="relative flex items-center gap-3.5 pr-2"
                >
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      isCompleted
                        ? "bg-[#15803D] text-white"
                        : isCurrent
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "bg-[#94A3B8] text-white",
                    ].join(" ")}
                  >
                    {isCompleted ? (
                      <Check size={16} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      step.number
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        "text-xs font-bold",
                        isCurrent || isCompleted
                          ? "text-[#172554]"
                          : "text-[#334155]",
                      ].join(" ")}
                    >
                      {step.title}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-[#64748B]">
                      {step.description}
                    </p>
                  </div>

                  {index < stepperSteps.length - 1 && (
                    <div
                      className="hidden h-px flex-1 border-t border-dashed border-[#CBD5E1] lg:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* =====================================================
          4. MAIN CONTENT
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-2 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          {/* =================================================
              LEFT COLUMN: HERO, TIMELINE, ACTIONS & CTA
          ================================================= */}
          <div className="space-y-6">
            {/* Card 1: Verification Hero Card */}
            <section className="rounded-2xl border border-[#BDD4FF] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <FileCheck2 size={26} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#155EEF]">
                    Verification in progress
                  </h2>

                  <p className="mt-1 text-xs text-[#475569]">
                    Your application is currently under review by the RTO.
                  </p>
                </div>
              </div>

              {/* Metadata 3-Column Bar */}
              <div className="mt-7 grid gap-4 border-t border-[#E2E8F0] pt-5 sm:grid-cols-3 sm:gap-0">
                {/* 1. Application Number */}
                <div className="sm:pr-4">
                  <p className="text-[11px] text-[#64748B]">Application number</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#172554]">VT-2026-001284</span>
                    <button
                      type="button"
                      onClick={handleCopyApplication}
                      className="text-[#64748B] hover:text-[#172554]"
                      aria-label="Copy application number"
                    >
                      {copied ? (
                        <Check size={13} className="text-[#15803D]" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Submitted On */}
                <div className="sm:border-l sm:border-[#E2E8F0] sm:px-4">
                  <p className="text-[11px] text-[#64748B]">Submitted on</p>
                  <p className="mt-1 text-xs font-bold text-[#172554]">12 May 2026, 10:30 AM</p>
                </div>

                {/* 3. Expected Next Update */}
                <div className="sm:border-l sm:border-[#E2E8F0] sm:pl-4">
                  <p className="text-[11px] text-[#64748B]">Expected next update</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#172554]">
                    <Calendar size={13} className="text-[#2563EB]" />
                    Within 2–3 working days
                  </p>
                </div>
              </div>

              {/* Notification Banner */}
              <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-[#EFF6FF] px-4 py-3 border border-[#D6E6FF]">
                <Info size={16} className="shrink-0 text-[#2563EB]" />
                <p className="text-xs font-medium text-[#334155]">
                  We will notify you on SMS and Email once there is an update.
                </p>
              </div>
            </section>

            {/* Card 2: Application progress (Vertical Timeline) */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <h2 className="text-base font-bold text-[#172554]">
                Application progress
              </h2>

              <ol className="mt-6 space-y-6">
                {timeline.map((item, index) => {
                  const isCompleted = item.state === "completed";
                  const isActive = item.state === "active";

                  return (
                    <li key={item.number} className="relative flex items-start gap-4">
                      {/* Vertical line connector */}
                      {index < timeline.length - 1 && (
                        <span
                          className={[
                            "absolute left-[13px] top-7 h-[calc(100%+12px)] w-px",
                            isCompleted ? "bg-[#22C55E]" : "bg-[#CBD5E1]",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      )}

                      {/* Number circle badge */}
                      <div
                        className={[
                          "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-xs",
                          isCompleted
                            ? "bg-[#15803D] text-white"
                            : isActive
                              ? "bg-[#2563EB] text-white"
                              : "bg-[#CBD5E1] text-white",
                        ].join(" ")}
                      >
                        {isCompleted ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          item.number
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3
                            className={[
                              "text-xs font-bold",
                              isActive ? "text-[#155EEF]" : "text-[#172554]",
                            ].join(" ")}
                          >
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#64748B]">
                            {item.description}
                          </p>
                        </div>

                        <span
                          className={[
                            "inline-flex w-fit items-center rounded-full px-3 py-0.5 text-[10px] font-bold",
                            isCompleted
                              ? "bg-[#DCFCE7] text-[#15803D]"
                              : isActive
                                ? "bg-[#DBEAFE] text-[#2563EB]"
                                : "bg-[#F1F5F9] text-[#64748B]",
                          ].join(" ")}
                        >
                          {item.status}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Card 3: What's happening now? */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <Hourglass size={18} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    What&apos;s happening now?
                  </h2>

                  <p className="mt-1 text-xs font-semibold text-[#334155]">
                    Your documents and payment have been received.
                  </p>

                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    The RTO is currently reviewing your ownership-transfer request. This may include document checks, verification of details, and internal approvals.
                  </p>
                </div>
              </div>
            </section>

            {/* Card 4: Important actions (4 Equal Grid Cards) */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
              <h2 className="text-xs font-bold text-[#172554]">
                Important actions
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1. Track Application */}
                <Link
                  href="/applications/VT-2026-001284"
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#CBD5E1] hover:shadow-2xs"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                      <Search size={18} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold text-[#172554]">Track application</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">View real-time status of your application.</p>
                  </div>

                  <span className="mt-4 inline-flex min-h-[34px] w-full items-center justify-center gap-1 rounded-lg border border-[#CBD5E1] text-[10px] font-bold text-[#172554] transition group-hover:bg-[#F8F9FA]">
                    Track Now <ArrowRight size={12} />
                  </span>
                </Link>

                {/* 2. Download Receipt */}
                <button
                  type="button"
                  onClick={() => notify("Your payment receipt is downloading...")}
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 text-left transition-all hover:border-[#CBD5E1] hover:shadow-2xs"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                      <Download size={18} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold text-[#172554]">Download receipt</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Download your payment receipt for reference.</p>
                  </div>

                  <span className="mt-4 inline-flex min-h-[34px] w-full items-center justify-center gap-1 rounded-lg border border-[#CBD5E1] text-[10px] font-bold text-[#172554] transition group-hover:bg-[#F8F9FA]">
                    Download <ArrowRight size={12} />
                  </span>
                </button>

                {/* 3. Contact Help */}
                <Link
                  href="/help"
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#CBD5E1] hover:shadow-2xs"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                      <Headphones size={18} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold text-[#172554]">Contact help</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Get assistance from our support team.</p>
                  </div>

                  <span className="mt-4 inline-flex min-h-[34px] w-full items-center justify-center gap-1 rounded-lg border border-[#CBD5E1] text-[10px] font-bold text-[#172554] transition group-hover:bg-[#F8F9FA]">
                    Get Help <ArrowRight size={12} />
                  </span>
                </Link>

                {/* 4. Find RTO */}
                <Link
                  href="/rto"
                  className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#CBD5E1] hover:shadow-2xs"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                      <Building2 size={18} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold text-[#172554]">Find RTO</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Find details and locations of RTO offices.</p>
                  </div>

                  <span className="mt-4 inline-flex min-h-[34px] w-full items-center justify-center gap-1 rounded-lg border border-[#CBD5E1] text-[10px] font-bold text-[#172554] transition group-hover:bg-[#F8F9FA]">
                    Find RTO <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </section>

            {/* Card 5: Delay / Reassurance Banner */}
            <section className="flex flex-col gap-4 rounded-2xl border border-[#FCD34D] bg-[#FFFBEB] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
                  <Clock3 size={20} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#78350F]">
                    Taking longer than expected?
                  </h2>

                  <p className="mt-0.5 max-w-[620px] text-[11px] leading-relaxed text-[#92400E]">
                    Some applications may take longer due to high volume, verification requirements, or other administrative reasons. We appreciate your patience.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href="/help"
                  className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
                >
                  <Headphones size={13} />
                  Contact Support
                </Link>

                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#2563EB] bg-white px-3.5 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
                >
                  <Info size={13} />
                  Know More
                </button>
              </div>
            </section>

            {/* Card 6: Bottom Status CTA */}
            <section className="flex flex-col gap-4 rounded-2xl border border-[#BDD4FF] bg-[#EFF6FF] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs">
                  <FileText size={18} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    You can leave this page.
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    We will keep you updated on your application status.
                  </p>
                </div>
              </div>

              <Link
                href="/applications/VT-2026-001284"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#172554] px-7 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
              >
                <span className="text-white !text-white">View Application Status</span>
                <ArrowRight size={15} className="text-white !text-white" />
              </Link>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN: SIDEBAR
          ================================================= */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Card 1: Application details */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Application details
              </h2>

              <div className="mt-4">
                <p className="text-[11px] text-[#64748B]">Vehicle</p>
                <p className="mt-0.5 text-xs font-bold text-[#172554]">MH 12 AB 1234</p>

                <div className="mt-3 flex items-center gap-3">
                  <CarGraphic />
                  <div>
                    <p className="text-xs font-bold text-[#172554]">Maruti Suzuki Swift VXi</p>
                    <p className="mt-0.5 text-[11px] text-[#64748B]">2021 • Petrol • Manual</p>
                  </div>
                </div>

                <div className="my-4 border-t border-[#E2E8F0]" />

                <p className="text-[11px] text-[#64748B]">Ownership transfer</p>
                <p className="mt-0.5 text-xs font-semibold text-[#334155]">Seller → Buyer</p>

                <div className="my-4 border-t border-[#E2E8F0]" />

                <p className="text-[11px] text-[#64748B]">Application number</p>
                <p className="mt-0.5 text-xs font-bold text-[#172554]">VT-2026-001284</p>

                <div className="my-4 border-t border-[#E2E8F0]" />

                <p className="text-[11px] text-[#64748B]">Payment reference</p>
                <p className="mt-0.5 text-xs font-bold text-[#172554]">PAY-2026-483921</p>

                <div className="my-4 border-t border-[#E2E8F0]" />

                <p className="text-[11px] text-[#64748B]">Payment status</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                  <CheckCircle2 size={15} strokeWidth={2.5} aria-hidden="true" />
                  Payment received
                </p>
              </div>
            </div>

            {/* Card 2: RTO information */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                RTO information
              </h2>

              <div className="mt-4">
                <p className="text-[11px] text-[#64748B]">RTO Name</p>
                <p className="mt-0.5 text-xs font-bold text-[#172554]">RTO, Pune (Haveli), Maharashtra</p>

                <div className="mt-3 flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#64748B]" />
                  <p className="text-[11px] leading-relaxed text-[#475569]">
                    SR No. 103, Mundhwa, Near Magarpatta City, Pune – 411036, Maharashtra
                  </p>
                </div>

                <div className="my-4 border-t border-[#E2E8F0]" />

                <div className="space-y-2">
                  <a
                    href="tel:02026123456"
                    className="flex items-center gap-2 text-[11px] font-semibold text-[#1A56DB] hover:underline"
                  >
                    <Phone size={13} />
                    020 2612 3456
                  </a>

                  <a
                    href="mailto:pune-haveli@rtomaharashtra.gov.in"
                    className="flex items-center gap-2 text-[11px] font-semibold text-[#1A56DB] hover:underline"
                  >
                    <Mail size={13} />
                    pune-haveli@rtomaharashtra.gov.in
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => notify("Map view is available in the RTO locator.")}
                  className="mt-4 inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
                >
                  <MapPin size={13} />
                  View on Map
                </button>
              </div>
            </div>

            {/* Card 3: What happens next? */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                What happens next?
              </h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <FileCheck2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">RTO verifies the request</h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">The RTO will verify your documents and application details.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">Ownership is updated</h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">Once approved, ownership will be updated in the system.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <Download size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">Updated RC becomes available</h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">You can download your updated RC from your application.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <Headphones size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">You receive a notification</h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">We will notify you by SMS and Email at important steps.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          5. INFORMATIONAL MODAL (KNOW MORE)
      ===================================================== */}
      {showInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="verification-info-title"
        >
          <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <Info size={20} />
                </div>

                <div>
                  <h2
                    id="verification-info-title"
                    className="text-base font-bold text-[#172554]"
                  >
                    About RTO verification
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    What happens while your application is under review?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close information"
              >
                <X size={17} />
              </button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#475569]">
              The RTO reviews the information and documents submitted with your ownership-transfer application. Processing time can vary depending on verification requirements, workload, and other administrative checks.
            </p>

            <div className="mt-4 rounded-xl border border-[#D6E6FF] bg-[#EFF6FF] p-3.5">
              <p className="text-[11px] leading-relaxed text-[#334155]">
                You do not need to remain on this page. We will keep your application status updated and notify you when there is an important change.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="mt-6 min-h-[42px] w-full rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white transition hover:bg-[#1E3A8A]"
            >
              <span className="text-white !text-white">Got it</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          6. BOTTOM OFFICIAL MORTH NOTICE RIBBON
      ===================================================== */}
      <div className="mt-12 border-t border-[#E2E8F0] bg-white py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
          <LockKeyhole size={13} className="text-[#15803D]" aria-hidden="true" />
          <span>This is an official website of the Ministry of Road Transport and Highways (MoRTH), Government of India.</span>
        </p>
      </div>
    </main>
  );
}
