"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  FileCheck2,
  FileText,
  Headphones,
  Hourglass,
  LockKeyhole,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

type Props = {
  applicationId: string;
};

const timelineSteps = [
  {
    number: "01",
    title: "Application submitted",
    timestamp: "12 May 2026, 10:30 AM",
    description: "Application details registered and initial checks passed.",
    status: "completed",
  },
  {
    number: "02",
    title: "Documents verified",
    timestamp: "12 May 2026, 11:05 AM",
    description: "Original RC, Insurance, PUC, Identity and Address proofs validated via DigiLocker.",
    status: "completed",
  },
  {
    number: "03",
    title: "Payment received",
    timestamp: "12 May 2026, 11:10 AM",
    description: "Transfer fee of ₹400 received securely via UPI (Ref: PAY-2026-483921).",
    status: "completed",
  },
  {
    number: "04",
    title: "RTO verification",
    timestamp: "Expected in 2–3 working days",
    description: "Assigned to RTO Officer, Pune (Haveli) for final verification and sanction.",
    status: "active",
  },
  {
    number: "05",
    title: "Ownership updated in VAHAN",
    timestamp: "Pending approval",
    description: "Central vehicle registry updated with new buyer details.",
    status: "pending",
  },
  {
    number: "06",
    title: "Updated RC available",
    timestamp: "Pending approval",
    description: "Digital Smart RC ready for instant download via DigiLocker & Parivahan.",
    status: "pending",
  },
];

const documents = [
  { name: "Registration Certificate (RC)", file: "RC_MH12AB1234.pdf", source: "DigiLocker" },
  { name: "Valid Insurance Copy", file: "Insurance_2024.pdf", source: "DigiLocker" },
  { name: "Pollution Certificate (PUC)", file: "PUC_MH12AB1234.pdf", source: "DigiLocker" },
  { name: "Identity Proof (Aadhaar/PAN)", file: "Aadhaar_ID_Verified.pdf", source: "DigiLocker" },
  { name: "Address Proof", file: "Address_Proof_Verified.pdf", source: "DigiLocker" },
  { name: "Signed Sale Agreement", file: "Sale_Agreement_Signed.pdf", source: "Uploaded" },
];

export default function ApplicationDetailsView({ applicationId }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleCopy() {
    navigator.clipboard?.writeText(applicationId);
    setCopied(true);
    notify("Application number copied.");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]">
      {/* Toast Notification */}
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
              href="/services"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Services
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <Link
              href="/services/vehicle/ownership-transfer"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              My Applications
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <span className="font-semibold text-[#172554]" aria-current="page">
              {applicationId}
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="bg-white py-6 border-b border-[#E2E8F0]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
                Application: {applicationId}
              </h1>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg border border-[#CBD5E1] bg-white px-2 py-1 text-xs font-semibold text-[#64748B] hover:text-[#172554] hover:bg-[#F8F9FA]"
                aria-label="Copy application number"
              >
                <Copy size={13} />
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-bold text-[#2563EB] border border-[#BFDBFE]">
                <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                RTO Verification — In Progress
              </span>
            </div>

            <p className="mt-1 text-sm text-[#64748B]">
              Transfer Vehicle Ownership • MH 12 AB 1234 (Maruti Suzuki Swift VXi)
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => notify("Payment receipt downloaded successfully.")}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
            >
              <Download size={15} />
              Download Receipt
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
            >
              <Printer size={15} />
              Print
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. MAIN CONTENT
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          {/* =================================================
              LEFT COLUMN: SUMMARY & TIMELINE
          ================================================= */}
          <div className="space-y-6">
            {/* Status Hero Card */}
            <section className="rounded-2xl border border-[#BDD4FF] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <Hourglass size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-base font-bold text-[#172554]">
                      Application Status: Under RTO Review
                    </h2>
                    <span className="text-[11px] font-semibold text-[#64748B]">
                      Last updated: Today, 11:10 AM
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                    Your documents and fee payment of ₹400 have been verified. The application is currently assigned to an officer at <strong>RTO, Pune (Haveli)</strong> for approval.
                  </p>
                </div>
              </div>

              {/* Application Details Summary Grid */}
              <div className="mt-6 grid gap-4 border-t border-[#E2E8F0] pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] text-[#64748B]">Vehicle Number</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">MH 12 AB 1234</p>
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">Current Owner (Seller)</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">Rajesh Kumar Sharma</p>
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">New Owner (Buyer)</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">Pratyush Acharya</p>
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">Payment Reference</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">PAY-2026-483921 (₹400)</p>
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">RTO Office</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">Pune (Haveli) — MH12</p>
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">Estimated Completion</p>
                  <p className="mt-0.5 text-xs font-bold text-[#15803D]">15 May 2026</p>
                </div>
              </div>
            </section>

            {/* Application Progress Timeline */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#172554]">
                  Detailed Application Timeline
                </h2>
                <span className="text-xs font-semibold text-[#2563EB]">Step 4 of 6</span>
              </div>

              <ol className="mt-7 space-y-6">
                {timelineSteps.map((step, index) => {
                  const isCompleted = step.status === "completed";
                  const isActive = step.status === "active";

                  return (
                    <li key={step.number} className="relative flex items-start gap-4">
                      {index < timelineSteps.length - 1 && (
                        <span
                          className={[
                            "absolute left-[13px] top-7 h-[calc(100%+12px)] w-px",
                            isCompleted ? "bg-[#22C55E]" : "bg-[#CBD5E1]",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      )}

                      <div
                        className={[
                          "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-xs",
                          isCompleted
                            ? "bg-[#15803D] text-white"
                            : isActive
                              ? "bg-[#2563EB] text-white ring-4 ring-[#2563EB]/15"
                              : "bg-[#CBD5E1] text-white",
                        ].join(" ")}
                      >
                        {isCompleted ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          step.number
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3
                            className={[
                              "text-xs font-bold",
                              isActive ? "text-[#155EEF]" : "text-[#172554]",
                            ].join(" ")}
                          >
                            {step.title}
                          </h3>
                          <p className="mt-0.5 text-[11px] text-[#64748B]">
                            {step.description}
                          </p>
                        </div>

                        <span
                          className={[
                            "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold",
                            isCompleted
                              ? "bg-[#DCFCE7] text-[#15803D]"
                              : isActive
                                ? "bg-[#DBEAFE] text-[#2563EB]"
                                : "bg-[#F1F5F9] text-[#64748B]",
                          ].join(" ")}
                        >
                          {step.timestamp}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Submitted Documents Section */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
              <h2 className="text-base font-bold text-[#172554]">
                Submitted Documents
              </h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                All documents are securely archived and accessible to authorized RTO verification staff.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#2563EB] shadow-2xs border border-[#E2E8F0]">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#172554]">{doc.name}</p>
                        <p className="text-[10px] text-[#64748B]">{doc.file} • <span className="text-[#15803D] font-semibold">{doc.source}</span></p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => notify(`Opening ${doc.file} preview.`)}
                      className="text-xs font-bold text-[#1A56DB] hover:underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN: SIDEBAR
          ================================================= */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Actions & Shortcuts
              </h2>

              <div className="mt-4 space-y-2.5">
                <Link
                  href="/services/vehicle/ownership-transfer"
                  className="flex min-h-[42px] items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeft size={14} />
                    Back to Service Landing
                  </span>
                  <ChevronRight size={14} />
                </Link>

                <Link
                  href="/services"
                  className="flex min-h-[42px] items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 size={14} />
                    Explore All Services
                  </span>
                  <ChevronRight size={14} />
                </Link>

                <Link
                  href="/help"
                  className="flex min-h-[42px] items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
                >
                  <span className="flex items-center gap-2">
                    <Headphones size={14} />
                    Help & Support
                  </span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* RTO Information */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Processing RTO Details
              </h2>

              <div className="mt-4">
                <p className="text-xs font-bold text-[#172554]">RTO, Pune (Haveli), Maharashtra</p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#475569]">
                  SR No. 103, Mundhwa, Near Magarpatta City, Pune – 411036
                </p>

                <div className="my-3.5 border-t border-[#E2E8F0]" />

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
              </div>
            </div>

            {/* Security & Authenticity */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    Government of India Verified
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    Protected under Digital India and the Ministry of Road Transport & Highways (MoRTH) standards.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          4. BOTTOM OFFICIAL MORTH NOTICE RIBBON
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
