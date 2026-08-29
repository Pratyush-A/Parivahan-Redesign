"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileCheck2,
  FileImage,
  FileText,
  Headphones,
  IdCard,
  Info,
  Lock,
  LockKeyhole,
  Maximize2,
  Plus,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";

type DocumentStatus = "fetched" | "authorize" | "upload";

type DocumentItem = {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  filename?: string;
  icon: React.ElementType;
  tone: "blue" | "green" | "cyan" | "purple" | "orange";
};

const initialDocuments: DocumentItem[] = [
  {
    id: "rc",
    title: "Registration Certificate (RC)",
    description: "Original RC of the vehicle",
    status: "fetched",
    filename: "RC_MH12AB1234.pdf",
    icon: FileText,
    tone: "blue",
  },
  {
    id: "insurance",
    title: "Valid Insurance",
    description: "Active vehicle insurance copy",
    status: "fetched",
    filename: "Insurance_2024.pdf",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    id: "puc",
    title: "Pollution Certificate (PUC)",
    description: "Valid PUC certificate",
    status: "fetched",
    filename: "PUC_MH12AB1234.pdf",
    icon: FileText,
    tone: "cyan",
  },
  {
    id: "identity",
    title: "Identity Proof (Seller & Buyer)",
    description: "Aadhaar / PAN / Passport",
    status: "authorize",
    icon: IdCard,
    tone: "purple",
  },
  {
    id: "address",
    title: "Address Proof (Seller & Buyer)",
    description: "Address proof of seller & buyer",
    status: "authorize",
    icon: ShieldCheck,
    tone: "blue",
  },
  {
    id: "sale-agreement",
    title: "Sale Agreement",
    description: "Duly signed sale agreement",
    status: "authorize",
    icon: FileText,
    tone: "orange",
  },
];

const stepperSteps = [
  {
    number: "01",
    title: "Details",
    description: "Enter vehicle and owner details",
    status: "completed",
  },
  {
    number: "02",
    title: "Documents",
    description: "Upload and verify documents",
    status: "current",
  },
  {
    number: "03",
    title: "Payment",
    description: "Pay the applicable transfer fees",
    status: "upcoming",
  },
  {
    number: "04",
    title: "Verification",
    description: "RTO verification and ownership update",
    status: "upcoming",
  },
];

const beforeYouContinue = [
  "Ensure the vehicle is not under loan or hypothecation.",
  "All challans should be cleared.",
  "Seller and buyer details must match the documents.",
  "The vehicle should be registered in the same state.",
];

function iconClasses(tone: DocumentItem["tone"]) {
  const styles = {
    blue: "bg-[#EFF6FF] text-[#2563EB]",
    green: "bg-[#F0FDF4] text-[#15803D]",
    cyan: "bg-[#ECFEFF] text-[#0891B2]",
    purple: "bg-[#FAF5FF] text-[#7C3AED]",
    orange: "bg-[#FFF7ED] text-[#EA580C]",
  };
  return styles[tone];
}

export default function VehicleOwnershipTransferDocuments() {
  const router = useRouter();

  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [source, setSource] = useState<"digilocker" | "manual">("digilocker");
  const [consentDocument, setConsentDocument] = useState<DocumentItem | null>(null);
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadTargetRef = useRef<string | null>(null);

  const allComplete = useMemo(
    () => documents.every((doc) => doc.status === "fetched"),
    [documents],
  );

  function updateDocument(id: string, updates: Partial<DocumentItem>) {
    setDocuments((current) =>
      current.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc)),
    );
  }

  function handleAuthorize(doc: DocumentItem) {
    setConsentDocument(doc);
  }

  function handleAllowAccess() {
    if (!consentDocument) return;

    let filename = `${consentDocument.id.toUpperCase()}_Verified.pdf`;
    if (consentDocument.id === "identity") filename = "Aadhaar_ID_Verified.pdf";
    if (consentDocument.id === "address") filename = "Address_Proof_Verified.pdf";
    if (consentDocument.id === "sale-agreement") filename = "Sale_Agreement_Signed.pdf";

    updateDocument(consentDocument.id, {
      status: "fetched",
      filename,
    });

    setConsentDocument(null);
  }

  function handleOpenUpload(documentId: string) {
    uploadTargetRef.current = documentId;
    fileInputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !uploadTargetRef.current) return;

    const targetId = uploadTargetRef.current;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, JPG, or PNG file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB. Please select a smaller file.");
      event.target.value = "";
      return;
    }

    setUploadingId(targetId);

    setTimeout(() => {
      updateDocument(targetId, {
        status: "fetched",
        filename: file.name,
      });
      setUploadingId(null);
    }, 600);

    event.target.value = "";
  }

  function handleSaveForLater() {
    setSaved(true);
  }

  function handleContinue() {
    if (!allComplete) return;
    router.push("/services/vehicle/ownership-transfer/payment");
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />

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
              Documents
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
              Upload and verify the required documents.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveForLater}
            className="inline-flex min-h-[42px] items-center justify-center gap-2 self-start rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] sm:self-auto"
          >
            <Bookmark size={15} strokeWidth={2} aria-hidden="true" />
            {saved ? "Saved in Drafts" : "Save for Later"}
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
              LEFT: DOCUMENTS WORKFLOW
          ================================================= */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <FileCheck2 size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    Documents you&apos;ll need
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Upload clear and valid documents. You can use DigiLocker or upload manually.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="hidden items-center gap-1.5 text-xs font-bold text-[#1A56DB] hover:underline sm:inline-flex"
              >
                <Info size={14} aria-hidden="true" />
                How it works
              </button>
            </div>

            {/* Source Selection Tabs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* DigiLocker Tab */}
              <button
                type="button"
                onClick={() => setSource("digilocker")}
                className={[
                  "flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition-all",
                  source === "digilocker"
                    ? "border-[#2563EB] bg-[#F4F8FF] text-[#2563EB] ring-2 ring-[#2563EB]/15 shadow-2xs"
                    : "border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" />
                <span>DigiLocker <span className="font-medium text-[#2563EB]">(Recommended)</span></span>
              </button>

              {/* Manual Upload Tab */}
              <button
                type="button"
                onClick={() => setSource("manual")}
                className={[
                  "flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition-all",
                  source === "manual"
                    ? "border-[#2563EB] bg-[#F4F8FF] text-[#2563EB] ring-2 ring-[#2563EB]/15 shadow-2xs"
                    : "border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <Upload size={16} strokeWidth={2} aria-hidden="true" />
                <span>Manual Upload</span>
              </button>
            </div>

            {/* DigiLocker Consent Bar */}
            {source === "digilocker" && (
              <div className="mt-4 flex flex-col gap-2.5 rounded-xl border border-[#CFE0FA] bg-[#EFF6FF] p-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={17} className="shrink-0 text-[#2563EB]" aria-hidden="true" />
                  <p className="text-xs font-medium text-[#334155]">
                    We will securely access your documents from DigiLocker with your consent.
                  </p>
                </div>

                <button
                  type="button"
                  className="self-start text-xs font-bold text-[#1A56DB] hover:underline sm:self-auto"
                >
                  Learn more
                </button>
              </div>
            )}

            {/* Document Cards List */}
            <div className="mt-5 space-y-3">
              {documents.map((doc) => {
                const Icon = doc.icon;
                const isFetched = doc.status === "fetched";
                const isUploading = uploadingId === doc.id;

                return (
                  <article
                    key={doc.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#CBD5E1] sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Left: Icon & Title */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClasses(
                          doc.tone,
                        )}`}
                      >
                        <Icon size={20} strokeWidth={2} aria-hidden="true" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-[#172554]">
                            {doc.title}
                            <span className="ml-1 text-[#B91C1C]">*</span>
                          </h3>

                          <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                            Required
                          </span>
                        </div>

                        <p className="mt-0.5 text-[11px] text-[#64748B]">
                          {doc.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions / Status */}
                    <div className="flex shrink-0 items-center gap-4 sm:justify-end">
                      {isFetched ? (
                        <>
                          <div className="text-right">
                            <p className="flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                              <CheckCircle2 size={15} strokeWidth={2.5} aria-hidden="true" />
                              <span>Fetched from DigiLocker</span>
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#64748B]">
                              {doc.filename}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setPreviewDocument(doc)}
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#86EFAC] bg-white px-3.5 text-xs font-bold text-[#15803D] transition hover:bg-[#F0FDF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                          >
                            <Eye size={14} aria-hidden="true" />
                            View
                            <ChevronDown size={13} aria-hidden="true" />
                          </button>
                        </>
                      ) : source === "digilocker" && doc.status === "authorize" ? (
                        <button
                          type="button"
                          onClick={() => handleAuthorize(doc)}
                          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#1A56DB] shadow-2xs transition hover:bg-[#F4F8FF] hover:border-[#BFDBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                        >
                          <Plus size={15} strokeWidth={2.5} aria-hidden="true" />
                          <span>Authorize <span className="block text-[10px] font-normal text-[#64748B]">Get from DigiLocker</span></span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => handleOpenUpload(doc.id)}
                          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                        >
                          {isUploading ? (
                            <span className="flex items-center gap-2 text-xs">
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#CBD5E1] border-t-[#2563EB]" />
                              Uploading...
                            </span>
                          ) : (
                            <>
                              <Upload size={14} strokeWidth={2} aria-hidden="true" />
                              <span>Upload <span className="block text-[10px] font-normal text-[#64748B]">PDF, JPG or PNG</span></span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Document Notice Box */}
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 shrink-0 text-[#D97706]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-[#92400E]">
                    Some documents may not be available in DigiLocker.
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#B45309]">
                    You can switch to Manual Upload for those documents.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSource("manual")}
                className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#FCD34D] bg-white px-4 text-xs font-bold text-[#92400E] shadow-2xs transition hover:bg-[#FFFDF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
              >
                <Upload size={13} strokeWidth={2.2} aria-hidden="true" />
                Switch to Manual Upload
              </button>
            </div>

            {/* Document Guidelines */}
            <div className="mt-8">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold text-[#172554]">
                  Document guidelines
                </h3>
                <div className="h-px flex-1 bg-[#E2E8F0]" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1 */}
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D]">
                    <FileText size={16} aria-hidden="true" />
                  </div>
                  <h4 className="mt-2.5 text-xs font-bold text-[#172554]">Clear & readable</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Ensure text is clear and readable.</p>
                </div>

                {/* 2 */}
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF5FF] text-[#7C3AED]">
                    <FileImage size={16} aria-hidden="true" />
                  </div>
                  <h4 className="mt-2.5 text-xs font-bold text-[#172554]">File format</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Accepts PDF, JPG, PNG (Max 5 MB per file)</p>
                </div>

                {/* 3 */}
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                    <Maximize2 size={15} aria-hidden="true" />
                  </div>
                  <h4 className="mt-2.5 text-xs font-bold text-[#172554]">All edges visible</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Capture all corners of the document.</p>
                </div>

                {/* 4 */}
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7ED] text-[#EA580C]">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </div>
                  <h4 className="mt-2.5 text-xs font-bold text-[#172554]">Valid documents</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#64748B]">Ensure documents are valid and up-to-date.</p>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-8 border-t border-[#E2E8F0] pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href="/services/vehicle/ownership-transfer/details"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    Back to Details
                  </Link>
                  <p className="mt-2 text-[11px] text-[#64748B]">
                    You can go back and edit your details.
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#172554] px-8 text-sm font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                  >
                    <span className="text-white !text-white">Continue to Payment</span>
                    <ArrowRight size={16} className="text-white !text-white" aria-hidden="true" />
                  </button>

                  <p className="mt-2 flex items-center gap-1 text-[11px] text-[#64748B]">
                    <Lock size={11} className="text-[#94A3B8]" aria-hidden="true" />
                    Your information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT: GUIDANCE SIDEBAR
          ================================================= */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Card 1: Your journey */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Your journey
              </h2>

              <ol className="mt-5 space-y-4">
                {/* Step 01 (Completed) */}
                <li className="relative flex items-start gap-3">
                  <span
                    className="absolute left-3.5 top-7 h-[calc(100%+8px)] w-px bg-[#CBD5E1]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-[11px] font-bold text-white shadow-xs">
                    <Check size={14} strokeWidth={3} />
                  </div>

                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#172554]">Details</p>
                      <p className="text-[11px] text-[#15803D]">Completed</p>
                    </div>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </div>
                </li>

                {/* Step 02 (Active) */}
                <li className="relative flex items-start gap-3">
                  <span
                    className="absolute left-3.5 top-7 h-[calc(100%+8px)] w-px bg-[#CBD5E1]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white shadow-xs">
                    02
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#172554]">Documents</p>
                    <p className="text-[11px] font-medium text-[#2563EB]">You are here</p>
                  </div>
                </li>

                {/* Step 03 */}
                <li className="relative flex items-start gap-3">
                  <span
                    className="absolute left-3.5 top-7 h-[calc(100%+8px)] w-px bg-[#CBD5E1]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#94A3B8] text-[11px] font-bold text-white">
                    03
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#334155]">Payment</p>
                    <p className="text-[11px] text-[#64748B]">Pay transfer fees online</p>
                  </div>
                </li>

                {/* Step 04 */}
                <li className="relative flex items-start gap-3">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#94A3B8] text-[11px] font-bold text-white">
                    04
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#334155]">Verification</p>
                    <p className="text-[11px] text-[#64748B]">RTO verifies and updates ownership</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Card 2: Before you continue */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Before you continue
              </h2>

              <ul className="mt-4 space-y-3.5">
                {beforeYouContinue.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                      <Check size={10} strokeWidth={3} />
                    </span>

                    <span className="text-[11px] leading-relaxed text-[#475569]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Need help? */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#172554]">
                  <Headphones size={18} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    Need help?
                  </h2>
                  <p className="text-[11px] text-[#64748B]">
                    Our support team is here to help you at every step.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <Link
                  href="/help/guides/vehicle-ownership-transfer"
                  className="flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  <FileText size={14} aria-hidden="true" />
                  View User Guide
                </Link>

                <Link
                  href="/help"
                  className="flex min-h-[40px] items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  <span className="flex items-center gap-2">
                    <Headphones size={14} aria-hidden="true" />
                    Visit Help Center
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Card 4: Your data is safe with us */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <ShieldCheck size={19} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    Your data is safe with us
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    All information is encrypted and handled as per Government of India data security standards.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <Image
                  src="/images/digital-india.svg"
                  alt="Digital India"
                  width={80}
                  height={28}
                  className="h-6 w-auto object-contain"
                />

                <span className="h-5 w-px bg-[#CBD5E1]" aria-hidden="true" />

                <Image
                  src="/images/digilocker.svg"
                  alt="DigiLocker"
                  width={85}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          5. CONSENT MODAL
      ===================================================== */}
      {consentDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
        >
          <div className="w-full max-w-[430px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <ShieldCheck size={20} aria-hidden="true" />
                </div>

                <div>
                  <h2
                    id="consent-title"
                    className="text-base font-bold text-[#172554]"
                  >
                    Allow DigiLocker access?
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    {consentDocument.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConsentDocument(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#475569]">
              We&apos;ll use your consent to securely fetch this document from DigiLocker.
            </p>

            <div className="mt-4 rounded-xl border border-[#D6E6FF] bg-[#EFF6FF] p-3.5">
              <div className="flex items-start gap-2.5">
                <LockKeyhole
                  size={15}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                  aria-hidden="true"
                />
                <p className="text-[11px] leading-relaxed text-[#334155]">
                  Only the document needed for this application will be requested.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConsentDocument(null)}
                className="min-h-[42px] rounded-xl border border-[#CBD5E1] px-4 text-xs font-bold text-[#172554] hover:bg-[#F8F9FA]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAllowAccess}
                className="min-h-[42px] rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white transition hover:bg-[#1E3A8A]"
              >
                <span className="text-white !text-white">Allow Access</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          6. DOCUMENT PREVIEW MODAL
      ===================================================== */}
      {previewDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
        >
          <div className="w-full max-w-[650px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2
                  id="preview-title"
                  className="text-base font-bold text-[#172554]"
                >
                  {previewDocument.title}
                </h2>
                <p className="mt-0.5 text-xs text-[#64748B]">
                  {previewDocument.filename}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDocument(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close document preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex min-h-[300px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="w-[240px] rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-xs">
                <div className="mx-auto h-6 w-20 rounded bg-[#E2E8F0]" />
                <div className="mt-6 space-y-2">
                  <span className="block h-2 rounded bg-[#E2E8F0]" />
                  <span className="block h-2 w-4/5 rounded bg-[#E2E8F0]" />
                  <span className="block h-2 w-3/5 rounded bg-[#E2E8F0]" />
                </div>
                <div className="mt-6 h-20 rounded border border-[#E2E8F0] bg-[#F8FAFC]" />
                <div className="mt-5 space-y-2">
                  <span className="block h-2 rounded bg-[#E2E8F0]" />
                  <span className="block h-2 w-4/5 rounded bg-[#E2E8F0]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 size={16} aria-hidden="true" />
                Verified from DigiLocker
              </span>

              <button
                type="button"
                onClick={() => setPreviewDocument(null)}
                className="min-h-[38px] rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white transition hover:bg-[#1E3A8A]"
              >
                <span className="text-white !text-white">Close Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          7. BOTTOM OFFICIAL MORTH NOTICE RIBBON
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
