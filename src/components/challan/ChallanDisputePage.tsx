"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CarFront,
  Check,
  CheckCircle2,
  CircleOff,
  Edit2,
  FileWarning,
  HelpCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

const disputeReasons = [
  {
    id: "not_driving",
    title: "I was not driving the vehicle",
    description: "Someone else was driving when the challan was issued.",
    icon: UserRoundX,
  },
  {
    id: "not_my_vehicle",
    title: "This is not my vehicle",
    description: "The vehicle details on the challan are incorrect.",
    icon: CarFront,
  },
  {
    id: "violation_did_not_happen",
    title: "The violation did not happen",
    description: "I believe the violation recorded on the challan is incorrect.",
    icon: CircleOff,
  },
  {
    id: "already_paid",
    title: "I have already paid this challan",
    description: "The payment has already been made but the challan still shows as unpaid.",
    icon: BadgeCheck,
  },
  {
    id: "issued_incorrectly",
    title: "The challan was issued incorrectly",
    description: "There is another error with this challan.",
    icon: FileWarning,
  },
  {
    id: "other",
    title: "Other reason",
    description: "Tell us about another issue.",
    icon: MoreHorizontal,
  },
];

export default function ChallanDisputePage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Form states
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "f1",
      name: "vehicle-document.jpg",
      size: "1.2 MB",
    },
  ]);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  // Flow states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedReasonObj = disputeReasons.find((r) => r.id === selectedReason);

  function handleContinue() {
    setErrorMsg(null);

    if (currentStep === 1) {
      if (!selectedReason) {
        setErrorMsg("Please choose a reason before continuing.");
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === 2) {
      if (!explanation.trim()) {
        setErrorMsg("Please explain what happened.");
        return;
      }
      if (explanation.trim().length < 20) {
        setErrorMsg("Please explain what happened in at least 20 characters.");
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  }

  function handleBack() {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleAddMockFile() {
    const newFile: UploadedFile = {
      id: `f_${Date.now()}`,
      name: `supporting-evidence-${uploadedFiles.length + 1}.png`,
      size: "2.4 MB",
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  }

  function handleRemoveFile(id: string) {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function handleSubmitDispute() {
    if (!declarationAccepted) {
      setErrorMsg("Please confirm the declaration before submitting.");
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F9FA] pb-32 text-[#111827]"
    >
      {/* =====================================================
          1. BREADCRUMB
      ===================================================== */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1120px] px-4 py-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[#64748B]"
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
            <span className="font-semibold text-[#172554]" aria-current="page">
              Dispute Challan
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          PROCESSING OVERLAY
      ===================================================== */}
      {isProcessing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-xs"
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
              <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#BFDBFE] border-t-[#2563EB]" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#172554]">
              Submitting your dispute...
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Please do not close or refresh this window while we record your request.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS STATE
      ===================================================== */}
      {isSubmitted ? (
        <div className="mx-auto max-w-[760px] px-4 pt-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                <CheckCircle2 size={40} strokeWidth={2.5} />
              </div>

              <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#172554]">
                Dispute submitted
              </h1>

              <p className="mx-auto mt-2 max-w-[480px] text-xs leading-relaxed text-[#64748B]">
                Your dispute has been submitted successfully. We will review your request and update you when there is progress.
              </p>
            </div>

            {/* Reference Details */}
            <div className="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B]">
                    Dispute Reference
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-bold text-[#172554]">
                    DSP-2026-001284
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B]">
                    Challan Number
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-bold text-[#172554]">
                    MH12052600012345
                  </p>
                </div>

                <div className="border-t border-[#E2E8F0] pt-3 sm:border-t-0 sm:pt-0">
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B]">
                    Submitted On
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#172554]">
                    12 May 2026, 10:45 AM
                  </p>
                </div>

                <div className="border-t border-[#E2E8F0] pt-3 sm:border-t-0 sm:pt-0">
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B]">
                    Status
                  </p>
                  <span className="mt-1 inline-flex rounded-md bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-bold text-[#15803D]">
                    Under review
                  </span>
                </div>
              </div>
            </div>

            {/* What happens next timeline */}
            <div className="mt-8">
              <h2 className="text-sm font-bold text-[#172554]">What happens next?</h2>

              <div className="mt-4 space-y-4">
                {/* 1. Dispute received */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={15} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#172554]">1. Dispute received</p>
                    <p className="text-[11px] text-[#64748B]">
                      Your request has been recorded and assigned to the traffic review cell.
                    </p>
                  </div>
                </div>

                {/* 2. Under review */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] ring-4 ring-[#EFF6FF]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2563EB]">2. Under review</p>
                    <p className="text-[11px] text-[#64748B]">
                      A reviewing officer will check the challan, photographic evidence, and the explanation you submitted.
                    </p>
                  </div>
                </div>

                {/* 3. Decision */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#64748B]">3. Decision</p>
                    <p className="text-[11px] text-[#64748B]">
                      You will be notified via SMS and email when the review is complete (usually within 7-10 working days).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/applications"
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                Track dispute
              </Link>

              <Link
                href="/challan/MH12052600012345"
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] transition hover:bg-[#F8FAFC]"
              >
                View Challan
              </Link>

              <Link
                href="/challan/results"
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                Back to Challans
              </Link>
            </div>

            {/* Security note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#64748B]">
              <ShieldCheck size={14} className="text-[#15803D]" />
              <span>Your dispute submission is securely recorded.</span>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================
            GUIDED DISPUTE FLOW CONTAINER
        ===================================================== */
        <div className="mx-auto max-w-[1120px] px-4 pt-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
              Dispute a challan
            </h1>

            <p className="mt-1 text-sm text-[#64748B]">
              If you believe this challan was issued incorrectly, you can submit a dispute and tell us what happened.
            </p>
          </div>

          {/* Challan Summary Card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Challan you&apos;re disputing
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                  <div>
                    <span className="text-[#64748B]">Challan: </span>
                    <strong className="font-mono text-[#172554]">MH12052600012345</strong>
                  </div>

                  <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

                  <div>
                    <span className="text-[#64748B]">Vehicle: </span>
                    <strong className="text-[#172554]">MH12AB1234</strong>
                  </div>

                  <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

                  <div>
                    <span className="text-[#64748B]">Violation: </span>
                    <strong className="text-[#172554]">Over Speeding</strong>
                  </div>

                  <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

                  <div>
                    <span className="text-[#64748B]">Amount: </span>
                    <strong className="text-[#DC2626]">₹1,000</strong>
                  </div>

                  <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

                  <div>
                    <span className="text-[#64748B]">Issued On: </span>
                    <span className="font-medium text-[#172554]">05 May 2026, 11:15 AM</span>
                  </div>

                  <span className="inline-flex rounded-md bg-[#FEF2F2] px-2 py-0.5 text-[10px] font-bold text-[#B91C1C]">
                    Pending
                  </span>
                </div>
              </div>

              <Link
                href="/challan/MH12052600012345"
                className="inline-flex min-h-[36px] items-center gap-1 text-xs font-bold text-[#1A56DB] hover:underline"
              >
                View full challan details →
              </Link>
            </div>
          </section>

          {/* Progress Stepper */}
          <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs sm:p-5">
            <div className="grid grid-cols-4 gap-2 text-xs font-bold">
              {/* Step 1 */}
              <div
                className={[
                  "flex items-center gap-2.5 pb-1 border-b-2 transition-colors",
                  currentStep === 1
                    ? "border-[#2563EB] text-[#2563EB]"
                    : currentStep > 1
                      ? "border-[#15803D] text-[#15803D]"
                      : "border-transparent text-[#94A3B8]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    currentStep === 1
                      ? "bg-[#2563EB] text-white"
                      : currentStep > 1
                        ? "bg-[#15803D] text-white"
                        : "bg-[#E2E8F0] text-[#64748B]",
                  ].join(" ")}
                >
                  {currentStep > 1 ? <Check size={13} strokeWidth={3} /> : "01"}
                </div>
                <span className="truncate">01 Reason</span>
              </div>

              {/* Step 2 */}
              <div
                className={[
                  "flex items-center gap-2.5 pb-1 border-b-2 transition-colors",
                  currentStep === 2
                    ? "border-[#2563EB] text-[#2563EB]"
                    : currentStep > 2
                      ? "border-[#15803D] text-[#15803D]"
                      : "border-transparent text-[#94A3B8]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    currentStep === 2
                      ? "bg-[#2563EB] text-white"
                      : currentStep > 2
                        ? "bg-[#15803D] text-white"
                        : "bg-[#E2E8F0] text-[#64748B]",
                  ].join(" ")}
                >
                  {currentStep > 2 ? <Check size={13} strokeWidth={3} /> : "02"}
                </div>
                <span className="truncate">02 Details</span>
              </div>

              {/* Step 3 */}
              <div
                className={[
                  "flex items-center gap-2.5 pb-1 border-b-2 transition-colors",
                  currentStep === 3
                    ? "border-[#2563EB] text-[#2563EB]"
                    : currentStep > 3
                      ? "border-[#15803D] text-[#15803D]"
                      : "border-transparent text-[#94A3B8]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    currentStep === 3
                      ? "bg-[#2563EB] text-white"
                      : currentStep > 3
                        ? "bg-[#15803D] text-white"
                        : "bg-[#E2E8F0] text-[#64748B]",
                  ].join(" ")}
                >
                  {currentStep > 3 ? <Check size={13} strokeWidth={3} /> : "03"}
                </div>
                <span className="truncate">03 Evidence</span>
              </div>

              {/* Step 4 */}
              <div
                className={[
                  "flex items-center gap-2.5 pb-1 border-b-2 transition-colors",
                  currentStep === 4
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#94A3B8]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    currentStep === 4
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#E2E8F0] text-[#64748B]",
                  ].join(" ")}
                >
                  04
                </div>
                <span className="truncate">04 Review</span>
              </div>
            </div>
          </div>

          {/* Validation Error Banner */}
          {errorMsg && (
            <div
              className="mt-6 flex items-center gap-2.5 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-xs font-semibold text-[#B91C1C]"
              role="alert"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* =====================================================
              STEP 1: REASON
          ===================================================== */}
          {currentStep === 1 && (
            <div className="mt-6 space-y-6">
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
                <h2 className="text-lg font-bold text-[#172554]">
                  Why are you disputing this challan?
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Choose the reason that best describes your situation.
                </p>

                <div
                  role="radiogroup"
                  aria-label="Dispute reasons"
                  className="mt-6 grid gap-3.5 sm:grid-cols-2"
                >
                  {disputeReasons.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedReason === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedReason(item.id)}
                        className={[
                          "flex min-h-[88px] items-start gap-4 rounded-xl border p-4 text-left transition-all",
                          isSelected
                            ? "border-[#2563EB] bg-[#EFF6FF] ring-2 ring-[#2563EB]/20"
                            : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]",
                        ].join(" ")}
                      >
                        {/* Radio indicator */}
                        <div
                          className={[
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                            isSelected ? "border-[#2563EB]" : "border-[#94A3B8]",
                          ].join(" ")}
                        >
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                          )}
                        </div>

                        {/* Icon */}
                        <div
                          className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            isSelected
                              ? "bg-white text-[#2563EB] shadow-2xs border border-[#BFDBFE]"
                              : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]",
                          ].join(" ")}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="flex-1">
                          <p className="text-xs font-bold text-[#172554]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Helpful Note Panel */}
              <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs border border-[#BFDBFE]">
                    <HelpCircle size={18} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">
                      Not sure which reason to choose?
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#334155]">
                      Choose the option that best matches your situation. You will have a chance to explain what happened in the next step.
                    </p>
                    <Link
                      href="/help"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
                    >
                      Need help? Contact support →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 2: DETAILS
          ===================================================== */}
          {currentStep === 2 && (
            <div className="mt-6 space-y-6">
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
                <h2 className="text-lg font-bold text-[#172554]">
                  Tell us what happened
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Give us a short explanation so the reviewing officer can understand your concern.
                </p>

                {/* Selected Reason reminder chip */}
                {selectedReasonObj && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-3 py-2 text-xs font-semibold text-[#172554]">
                    <span className="text-[10px] uppercase tracking-wider text-[#2563EB]">
                      Selected Reason:
                    </span>
                    <span>{selectedReasonObj.title}</span>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="dispute-explanation"
                      className="block text-xs font-bold text-[#172554]"
                    >
                      Your explanation <span className="text-[#B91C1C]">*</span>
                    </label>
                    <span
                      className={[
                        "text-[10px]",
                        explanation.length > 500
                          ? "font-bold text-[#B91C1C]"
                          : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {explanation.length} / 500
                    </span>
                  </div>

                  <textarea
                    id="dispute-explanation"
                    rows={5}
                    maxLength={500}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explain what happened..."
                    className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-xs text-[#172554] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    aria-describedby="explanation-help"
                  />
                  <p id="explanation-help" className="mt-1.5 text-[11px] text-[#64748B]">
                    Minimum 20 characters. Be concise and factual.
                  </p>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="dispute-additional"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Additional information (Optional)
                  </label>
                  <textarea
                    id="dispute-additional"
                    rows={3}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any witnesses, vehicle location context, or additional notes..."
                    className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-xs text-[#172554] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                  <p className="mt-1 text-[10px] text-[#64748B]">
                    You don&apos;t need to repeat information already shown above.
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* =====================================================
              STEP 3: EVIDENCE
          ===================================================== */}
          {currentStep === 3 && (
            <div className="mt-6 space-y-6">
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
                <h2 className="text-lg font-bold text-[#172554]">
                  Add supporting evidence
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Upload documents or images that help explain your dispute.
                </p>

                {/* Upload Area */}
                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-8 text-center transition hover:bg-[#F1F5F9]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <Upload size={22} />
                  </div>

                  <p className="mt-3 text-xs font-bold text-[#172554]">
                    Drag and drop files here
                  </p>
                  <p className="mt-1 text-[11px] text-[#64748B]">or</p>

                  <button
                    type="button"
                    onClick={handleAddMockFile}
                    className="mt-2 inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#2563EB] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs hover:bg-[#EFF6FF]"
                  >
                    <Plus size={14} />
                    Browse files
                  </button>

                  <p className="mt-3 text-[10px] text-[#64748B]">
                    JPG, PNG or PDF · Maximum 5 MB per file
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2.5">
                    <p className="text-xs font-bold text-[#172554]">
                      Uploaded files ({uploadedFiles.length})
                    </p>

                    <div className="divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0]">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3.5 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                              <Paperclip size={16} />
                            </div>
                            <div>
                              <p className="font-semibold text-[#172554]">{file.name}</p>
                              <p className="text-[10px] text-[#64748B]">{file.size}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                            aria-label={`Remove file ${file.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Evidence Privacy Note */}
              <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs border border-[#BFDBFE]">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">
                      Your documents are used only to review this dispute.
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#334155]">
                      Do not upload unnecessary personal information or confidential documents. Evidence is optional; you can continue without uploading.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 4: REVIEW & SUBMIT
          ===================================================== */}
          {currentStep === 4 && (
            <div className="mt-6 space-y-6">
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
                <h2 className="text-lg font-bold text-[#172554]">
                  Review your dispute
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Check your information before submitting.
                </p>

                <div className="mt-6 space-y-4">
                  {/* Review Section 1: Reason */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <span className="font-bold text-[#64748B]">Reason</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                    <p className="mt-2.5 text-xs font-bold text-[#172554]">
                      {selectedReasonObj?.title || "Not selected"}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#64748B]">
                      {selectedReasonObj?.description}
                    </p>
                  </div>

                  {/* Review Section 2: Explanation */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <span className="font-bold text-[#64748B]">Explanation</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                    <p className="mt-2.5 whitespace-pre-wrap text-xs leading-relaxed text-[#172554]">
                      {explanation || "No explanation entered"}
                    </p>
                    {additionalInfo && (
                      <div className="mt-3 border-t border-[#E2E8F0] pt-2">
                        <span className="text-[10px] text-[#64748B]">Additional Remarks: </span>
                        <p className="mt-0.5 text-[11px] text-[#475569]">{additionalInfo}</p>
                      </div>
                    )}
                  </div>

                  {/* Review Section 3: Evidence */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <span className="font-bold text-[#64748B]">Evidence</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                    {uploadedFiles.length > 0 ? (
                      <ul className="mt-2.5 space-y-1.5">
                        {uploadedFiles.map((f) => (
                          <li key={f.id} className="flex items-center gap-2 text-xs font-semibold text-[#172554]">
                            <Paperclip size={13} className="text-[#2563EB]" />
                            <span>{f.name}</span>
                            <span className="text-[10px] font-normal text-[#64748B]">({f.size})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2.5 text-xs text-[#64748B]">No files uploaded.</p>
                    )}
                  </div>
                </div>

                {/* Declaration Checkbox */}
                <div className="mt-6 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarationAccepted}
                      onChange={(e) => setDeclarationAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded accent-[#2563EB] cursor-pointer"
                    />
                    <div className="text-xs text-[#334155]">
                      <p className="font-bold text-[#172554]">
                        I confirm that the information provided is correct to the best of my knowledge.
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                        I understand that submitting false information may result in action under applicable law.
                      </p>
                    </div>
                  </label>
                </div>
              </section>
            </div>
          )}

          {/* =====================================================
              STICKY BOTTOM ACTION BAR
          ===================================================== */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#BFD4FF] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md">
            <div className="mx-auto max-w-[1120px] px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] shadow-2xs hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                ) : (
                  <Link
                    href="/challan/results"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#64748B] shadow-2xs hover:bg-[#F8FAFC]"
                  >
                    Cancel
                  </Link>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={currentStep === 1 && !selectedReason}
                    className={[
                      "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-7 text-xs font-bold shadow-sm transition",
                      currentStep === 1 && !selectedReason
                        ? "cursor-not-allowed bg-[#CBD5E1] text-[#64748B]"
                        : "bg-[#2563EB] text-white !text-white hover:bg-[#1D4ED8] focus-visible:ring-2 focus-visible:ring-[#0EA5E9]",
                    ].join(" ")}
                  >
                    <span className={currentStep === 1 && !selectedReason ? "" : "text-white !text-white"}>
                      Continue
                    </span>
                    <ArrowRight
                      size={15}
                      className={currentStep === 1 && !selectedReason ? "" : "text-white !text-white"}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitDispute}
                    disabled={!declarationAccepted}
                    className={[
                      "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-8 text-xs font-bold shadow-sm transition",
                      declarationAccepted
                        ? "bg-[#2563EB] text-white !text-white hover:bg-[#1D4ED8] focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                        : "cursor-not-allowed bg-[#CBD5E1] text-[#64748B]",
                    ].join(" ")}
                  >
                    <span className={declarationAccepted ? "text-white !text-white" : ""}>
                      Submit dispute
                    </span>
                    <ArrowRight
                      size={15}
                      className={declarationAccepted ? "text-white !text-white" : ""}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
