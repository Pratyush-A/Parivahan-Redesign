"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CarFront,
  Check,
  CheckCircle2,
  CircleOff,
  Edit2,
  FileWarning,
  Info,
  LockKeyhole,
  MoreHorizontal,
  Paperclip,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";

type Reason = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const reasons: Reason[] = [
  {
    id: "not-driving",
    title: "I was not driving the vehicle",
    description: "Someone else was driving when the challan was issued.",
    icon: UserRoundX,
  },
  {
    id: "wrong-vehicle",
    title: "This is not my vehicle",
    description: "The vehicle details on the challan are incorrect.",
    icon: CarFront,
  },
  {
    id: "violation",
    title: "The violation did not happen",
    description: "I believe the violation recorded on the challan is incorrect.",
    icon: CircleOff,
  },
  {
    id: "already-paid",
    title: "I have already paid this challan",
    description: "The payment has already been made but the challan still shows as unpaid.",
    icon: BadgeCheck,
  },
  {
    id: "incorrect",
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

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

export default function ChallanDisputeReason() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedReason, setSelectedReason] = useState<string>("not-driving");
  const [error, setError] = useState("");

  // Step 2 state
  const [explanation, setExplanation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Step 3 state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "f1",
      name: "vehicle-document.jpg",
      size: "1.2 MB",
    },
  ]);

  // Step 4 state
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedReasonObj = reasons.find((r) => r.id === selectedReason);

  function continueToNextStep() {
    setError("");

    if (step === 1) {
      if (!selectedReason) {
        setError("Please select a reason to continue.");
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 2) {
      if (!explanation.trim()) {
        setError("Please explain what happened.");
        return;
      }
      if (explanation.trim().length < 20) {
        setError("Please explain what happened in at least 20 characters.");
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 3) {
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  }

  function handleAddMockFile() {
    const newFile: UploadedFile = {
      id: `f_${Date.now()}`,
      name: `evidence-doc-${uploadedFiles.length + 1}.png`,
      size: "2.4 MB",
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  }

  function handleRemoveFile(id: string) {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function handleSubmitDispute() {
    if (!declarationAccepted) {
      setError("Please confirm the declaration before submitting.");
      return;
    }

    setError("");
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
      className="min-h-screen bg-[#F8F9FA] text-[#111827]"
    >
      {/* Processing overlay */}
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

      {/* Success View */}
      {isSubmitted ? (
        <div className="mx-auto max-w-[760px] px-4 pt-10 sm:px-6 lg:px-8 pb-20">
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

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] ring-4 ring-[#EFF6FF]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2563EB]">2. Under review</p>
                    <p className="text-[11px] text-[#64748B]">
                      A reviewing officer will check the challan and the explanation you submitted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#64748B]">3. Decision</p>
                    <p className="text-[11px] text-[#64748B]">
                      You will be notified via SMS and email when the review is complete.
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
          </div>
        </div>
      ) : (
        /* =====================================================
            MAIN DISPUTE FLOW PAGE CONTAINER
        ===================================================== */
        <div className="mx-auto max-w-[1420px] px-5 pb-10 pt-5 sm:px-8 lg:px-[44px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-3 text-[13px]"
          >
            <Link
              href="/"
              className="text-[#2563EB] hover:underline"
            >
              Home
            </Link>

            <span className="text-[#94A3B8]">›</span>

            <Link
              href="/services/challan"
              className="text-[#2563EB] hover:underline"
            >
              Challan
            </Link>

            <span className="text-[#94A3B8]">›</span>

            <span className="font-medium text-[#172554]">
              Dispute Challan
            </span>
          </nav>

          {/* Title + Top Callout */}
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-[30px] font-bold leading-tight tracking-[-0.035em] text-[#172554] sm:text-[34px]">
                Dispute a challan
              </h1>

              <p className="mt-2 max-w-[650px] text-[14px] leading-[1.55] text-[#475569]">
                If you believe this challan was issued incorrectly, you can submit a dispute and tell us what happened.
              </p>
            </div>

            <div className="flex max-w-[550px] items-start gap-3 rounded-lg border border-[#F2C46D] bg-[#FFFCF5] px-4 py-3">
              <ShieldCheck
                size={25}
                className="mt-0.5 shrink-0 text-[#172554]"
              />

              <div>
                <p className="text-[11px] font-bold text-[#172554]">
                  Disputes help us keep the system fair and accurate.
                </p>

                <p className="mt-1 text-[10px] leading-4 text-[#475569]">
                  Please provide correct information to help us review your case effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Challan summary */}
          <section className="rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[15px] font-bold text-[#172554]">
                Challan you&apos;re disputing
              </h2>

              <span className="rounded-md bg-[#FEF2F2] px-3 py-1 text-[10px] font-bold text-[#B91C1C]">
                Pending
              </span>
            </div>

            <div className="my-3 h-px bg-[#E2E8F0]" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.1fr_1fr_0.8fr_1.15fr]">
              <SummaryItem
                label="Challan Number"
                value="MH12052600012345"
              />

              <SummaryItem
                label="Vehicle Number"
                value="MH12AB1234"
              />

              <SummaryItem
                label="Violation"
                value="Over Speeding"
              />

              <SummaryItem
                label="Amount"
                value="₹1,000"
              />

              <SummaryItem
                label="Issued On"
                value={
                  <>
                    05 May 2026,
                    <br />
                    11:15 AM
                  </>
                }
              />
            </div>

            <Link
              href="/challan/MH12052600012345"
              className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
            >
              View full challan details
              <ArrowRight size={13} />
            </Link>
          </section>

          {/* Stepper Card */}
          <section className="mt-5 rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-4 min-h-[76px] flex items-center">
            <DisputeStepper activeStep={step} />
          </section>

          {/* Error Banner */}
          {error && (
            <div
              className="mt-3 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[11px] font-semibold text-[#B91C1C]"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =====================================================
              STEP 1: REASON VIEW (Matches UI Reference)
          ===================================================== */}
          {step === 1 && (
            <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
              {/* Left Column: Reasons Card */}
              <section className="rounded-[10px] border border-[#E2E8F0] bg-white p-5 sm:p-6">
                <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
                  Why are you disputing this challan?
                </h2>

                <p className="mt-1 text-[11px] text-[#64748B]">
                  Choose the reason that best describes your situation.
                </p>

                <div
                  role="radiogroup"
                  aria-label="Reason for disputing challan"
                  className="mt-5 grid gap-3 sm:grid-cols-2"
                >
                  {reasons.map((reason) => {
                    const Icon = reason.icon;
                    const selected = selectedReason === reason.id;

                    return (
                      <button
                        key={reason.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          setSelectedReason(reason.id);
                          setError("");
                        }}
                        className={[
                          "relative flex min-h-[82px] items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition",
                          "focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-1",
                          selected
                            ? "border-[#2563EB] bg-[#F8FBFF]"
                            : "border-[#E2E8F0] bg-white hover:bg-[#FAFCFF]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full",
                            selected
                              ? "bg-[#EFF6FF] text-[#2563EB]"
                              : "bg-[#F1F6FF] text-[#2563EB]",
                          ].join(" ")}
                        >
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0 pr-5">
                          <p className="text-[11px] font-bold leading-4 text-[#172554] sm:text-[12px]">
                            {reason.title}
                          </p>

                          <p className="mt-1 text-[9px] leading-[1.45] text-[#64748B] sm:text-[10px]">
                            {reason.description}
                          </p>
                        </div>

                        <span
                          className={[
                            "absolute right-3 top-3 flex h-[20px] w-[20px] items-center justify-center rounded-full border",
                            selected
                              ? "border-[#2563EB] bg-white"
                              : "border-[#B9C3D3] bg-white",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          {selected && (
                            <span className="h-[9px] w-[9px] rounded-full bg-[#2563EB]" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Help Callout */}
                <div className="mt-3 flex items-center gap-3 rounded-[8px] border border-[#D5E4FA] bg-[#F3F8FF] px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB]">
                    <Info size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#172554]">
                      Not sure which reason to choose?
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-[#64748B]">
                      Choose the option that best matches your situation. You will have a chance to explain what happened in the next step.
                    </p>
                  </div>

                  <Link
                    href="/help"
                    className="hidden shrink-0 items-center gap-1 text-[9px] font-bold text-[#2563EB] hover:underline sm:flex"
                  >
                    Need help? Contact support
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </section>

              {/* Right Column: Information Panel */}
              <aside className="rounded-[10px] border border-[#E2E8F0] bg-white p-4 sm:p-5">
                <InfoSection
                  icon={Info}
                  title="Information"
                  text="Please provide correct and complete information to help us review your dispute faster."
                  highlighted
                />

                <div className="my-4 h-px bg-[#E2E8F0]" />

                <InfoSection
                  icon={ShieldCheck}
                  title="What happens next?"
                  text="After you submit your dispute, a reviewing officer will check your challan and the information you provide. You will be notified about the decision."
                />

                <div className="my-4 h-px bg-[#E2E8F0]" />

                <InfoSection
                  icon={LockKeyhole}
                  title="Your information is safe"
                  text="Your data is encrypted and used only for challan dispute review."
                />
              </aside>
            </div>
          )}

          {/* =====================================================
              STEP 2: DETAILS VIEW
          ===================================================== */}
          {step === 2 && (
            <div className="mt-3 rounded-[10px] border border-[#E2E8F0] bg-white p-6">
              <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
                Tell us what happened
              </h2>
              <p className="mt-1 text-[11px] text-[#64748B]">
                Give us a short explanation so the reviewing officer can understand your concern.
              </p>

              {selectedReasonObj && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#172554]">
                  <span className="text-[10px] uppercase tracking-wider text-[#2563EB]">
                    Reason:
                  </span>
                  <span>{selectedReasonObj.title}</span>
                </div>
              )}

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="dispute-step2-exp"
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
                  id="dispute-step2-exp"
                  rows={5}
                  maxLength={500}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain what happened..."
                  className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-xs text-[#172554] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                />
                <p className="mt-1.5 text-[11px] text-[#64748B]">
                  Minimum 20 characters. Be concise and factual.
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="dispute-step2-add"
                  className="block text-xs font-bold text-[#172554]"
                >
                  Additional information (Optional)
                </label>
                <textarea
                  id="dispute-step2-add"
                  rows={3}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any witnesses or context..."
                  className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-xs text-[#172554] placeholder-[#94A3B8] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                />
                <p className="mt-1 text-[10px] text-[#64748B]">
                  You don&apos;t need to repeat information already shown above.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 3: EVIDENCE VIEW
          ===================================================== */}
          {step === 3 && (
            <div className="mt-3 space-y-4">
              <section className="rounded-[10px] border border-[#E2E8F0] bg-white p-6">
                <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
                  Add supporting evidence
                </h2>
                <p className="mt-1 text-[11px] text-[#64748B]">
                  Upload documents or images that help explain your dispute.
                </p>

                <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-8 text-center transition hover:bg-[#F1F5F9]">
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

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2">
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

              <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs border border-[#BFDBFE]">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#172554]">
                      Your documents are used only to review this dispute.
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#334155]">
                      Do not upload unnecessary personal information. Evidence is optional; you can continue without uploading.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              STEP 4: REVIEW VIEW
          ===================================================== */}
          {step === 4 && (
            <div className="mt-3 rounded-[10px] border border-[#E2E8F0] bg-white p-6 space-y-5">
              <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
                Review your dispute
              </h2>
              <p className="mt-1 text-[11px] text-[#64748B]">
                Check your information before submitting.
              </p>

              <div className="space-y-4">
                {/* Reason */}
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                    <span className="font-bold text-[#64748B]">Reason</span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-xs font-bold text-[#172554]">
                    {selectedReasonObj?.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    {selectedReasonObj?.description}
                  </p>
                </div>

                {/* Explanation */}
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                    <span className="font-bold text-[#64748B]">Explanation</span>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-[#172554]">
                    {explanation || "No explanation entered"}
                  </p>
                  {additionalInfo && (
                    <div className="mt-2 border-t border-[#E2E8F0] pt-2">
                      <span className="text-[10px] text-[#64748B]">Additional Remarks: </span>
                      <p className="mt-0.5 text-[11px] text-[#475569]">{additionalInfo}</p>
                    </div>
                  )}
                </div>

                {/* Evidence */}
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                    <span className="font-bold text-[#64748B]">Evidence</span>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </div>
                  {uploadedFiles.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {uploadedFiles.map((f) => (
                        <li key={f.id} className="flex items-center gap-2 text-xs font-semibold text-[#172554]">
                          <Paperclip size={13} className="text-[#2563EB]" />
                          <span>{f.name}</span>
                          <span className="text-[10px] font-normal text-[#64748B]">({f.size})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-xs text-[#64748B]">No files uploaded.</p>
                  )}
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="mt-5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4">
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
            </div>
          )}

          {/* =====================================================
              BOTTOM ACTION BAR (Matches UI Reference)
          ===================================================== */}
          <section className="mt-3 flex flex-col-reverse gap-3 rounded-[10px] border border-[#E2E8F0] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            {step === 1 ? (
              <Link
                href="/challan/MH12052600012345"
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#2563EB] bg-white px-8 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#2563EB] bg-white px-8 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}

            <div className="flex flex-1 flex-col items-stretch gap-1 sm:ml-10">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={continueToNextStep}
                  className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-8 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitDispute}
                  disabled={!declarationAccepted}
                  className={[
                    "flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-8 text-[11px] font-bold text-white transition",
                    declarationAccepted
                      ? "bg-[#2563EB] hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
                      : "cursor-not-allowed bg-[#CBD5E1] text-[#64748B]",
                  ].join(" ")}
                >
                  Submit dispute
                  <ArrowRight size={16} />
                </button>
              )}

              {!selectedReason && step === 1 && (
                <p className="text-center text-[9px] text-[#64748B]">
                  Please select a reason to continue
                </p>
              )}
            </div>
          </section>

          {/* Security Footer Note */}
          <div className="flex items-center justify-center gap-2 py-5 text-center text-[9px] text-[#64748B]">
            <ShieldCheck size={14} className="text-[#2563EB]" />
            Your information is safe and secure with us.
          </div>
        </div>
      )}
    </main>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] text-[#64748B]">{label}</p>
      <div className="mt-1 text-[10px] font-bold leading-4 text-[#172554]">
        {value}
      </div>
    </div>
  );
}

function DisputeStepper({ activeStep }: { activeStep: number }) {
  const steps = [
    {
      number: "01",
      title: "Reason",
      description: "Why you are disputing",
      stepNum: 1,
    },
    {
      number: "02",
      title: "Details",
      description: "Explain what happened",
      stepNum: 2,
    },
    {
      number: "03",
      title: "Evidence",
      description: "Upload supporting files",
      stepNum: 3,
    },
    {
      number: "04",
      title: "Review",
      description: "Review and submit",
      stepNum: 4,
    },
  ];

  return (
    <div className="flex w-full items-center">
      {steps.map((s, index) => {
        const isCurrent = s.stepNum === activeStep;
        const isCompleted = s.stepNum < activeStep;

        return (
          <div
            key={s.number}
            className="flex min-w-0 flex-1 items-center"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={[
                  "flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  isCurrent
                    ? "bg-[#2563EB] text-white"
                    : isCompleted
                      ? "bg-[#15803D] text-white"
                      : "bg-[#F1F5F9] text-[#64748B]",
                ].join(" ")}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : s.number}
              </div>

              <div className="hidden min-w-0 sm:block">
                <p
                  className={[
                    "truncate text-[11px] font-bold",
                    isCurrent ? "text-[#2563EB]" : "text-[#172554]",
                  ].join(" ")}
                >
                  {s.title}
                </p>

                <p className="mt-0.5 truncate text-[9px] text-[#64748B]">
                  {s.description}
                </p>
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={[
                  "mx-4 h-px flex-1",
                  isCompleted ? "bg-[#15803D]" : "bg-[#DCE3ED]",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoSection({
  icon: Icon,
  title,
  text,
  highlighted = false,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-lg p-4",
        highlighted ? "bg-[#F3F8FF]" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
          <Icon size={17} />
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-[#172554]">{title}</h3>

          <p className="mt-1.5 text-[9px] leading-[1.65] text-[#475569]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
