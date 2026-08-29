"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileText,
  FileUp,
  Headphones,
  LockKeyhole,
  Phone,
  Printer,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    number: "1",
    title: "Eligibility & Applicant Type",
    subtitle: "Verify basic eligibility",
  },
  {
    number: "2",
    title: "Personal Details",
    subtitle: "Enter applicant information",
  },
  {
    number: "3",
    title: "Address Details",
    subtitle: "Enter current address",
  },
  {
    number: "4",
    title: "Documents & Upload",
    subtitle: "Upload required documents",
  },
  {
    number: "5",
    title: "Test Centre & Date",
    subtitle: "Choose RTO and test slot",
  },
  {
    number: "6",
    title: "Review & Confirm",
    subtitle: "Review your application",
  },
  {
    number: "7",
    title: "Payment",
    subtitle: "Pay application fee",
  },
];

type DocumentKey = "identity" | "address" | "dob" | "photo";

type UploadedDoc = {
  name: string;
  size: string;
  type: string;
  isDigiLocker?: boolean;
};

export default function LearnerLicenceUploadDocuments() {
  const router = useRouter();

  // Document types selected
  const [idDocType, setIdDocType] = useState("aadhaar");
  const [addressDocType, setAddressDocType] = useState("aadhaar");
  const [dobDocType, setDobDocType] = useState("aadhaar");

  // Uploaded files state (simulated file uploads with realistic pre-populated or empty options)
  const [uploads, setUploads] = useState<Record<DocumentKey, UploadedDoc | null>>({
    identity: {
      name: "Aadhaar_Card_SelfAttested.pdf",
      size: "1.2 MB",
      type: "Aadhaar Card",
      isDigiLocker: true,
    },
    address: {
      name: "Electricity_Bill_April2026.pdf",
      size: "850 KB",
      type: "Utility Bill",
    },
    dob: {
      name: "Birth_Certificate.pdf",
      size: "620 KB",
      type: "Birth Certificate",
    },
    photo: {
      name: "Passport_Photo_WhiteBg.jpg",
      size: "240 KB",
      type: "Photograph",
    },
  });

  const [selfAttested, setSelfAttested] = useState(true);
  const [isDigiLockerLoading, setIsDigiLockerLoading] = useState(false);

  // Handle mock file upload
  function handleMockUpload(key: DocumentKey, defaultName: string, docType: string) {
    setUploads((prev) => ({
      ...prev,
      [key]: {
        name: defaultName,
        size: "940 KB",
        type: docType,
      },
    }));
  }

  // Remove file
  function handleRemove(key: DocumentKey) {
    setUploads((prev) => ({
      ...prev,
      [key]: null,
    }));
  }

  // Fast-track DigiLocker fetch simulation
  function handleDigiLockerFetch() {
    setIsDigiLockerLoading(true);
    setTimeout(() => {
      setUploads({
        identity: {
          name: "DigiLocker_Aadhaar_Verified.pdf",
          size: "1.1 MB",
          type: "Aadhaar Card",
          isDigiLocker: true,
        },
        address: {
          name: "DigiLocker_Aadhaar_Address.pdf",
          size: "1.1 MB",
          type: "Aadhaar Card",
          isDigiLocker: true,
        },
        dob: {
          name: "DigiLocker_Birth_Record.pdf",
          size: "720 KB",
          type: "Aadhaar / Birth Record",
          isDigiLocker: true,
        },
        photo: uploads.photo || {
          name: "Passport_Photo_WhiteBg.jpg",
          size: "240 KB",
          type: "Photograph",
        },
      });
      setIsDigiLockerLoading(false);
    }, 800);
  }

  const allUploaded =
    uploads.identity !== null &&
    uploads.address !== null &&
    uploads.dob !== null &&
    uploads.photo !== null &&
    selfAttested;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!allUploaded) return;

    router.push(
      "/services/driving-licence/learner-licence/apply/test-slot",
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827]"
    >
      <div className="mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 lg:px-[42px]">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-[12px]"
        >
          <Link
            href="/"
            className="text-[#64748B] transition hover:text-[#2563EB] hover:underline"
          >
            Home
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services"
            className="text-[#64748B] transition hover:text-[#2563EB] hover:underline"
          >
            Services
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services/driving-licence"
            className="text-[#64748B] transition hover:text-[#2563EB] hover:underline"
          >
            Driving Licence
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services/driving-licence/learner-licence"
            className="text-[#64748B] transition hover:text-[#2563EB] hover:underline"
          >
            Get a Learner Licence
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services/driving-licence/learner-licence/apply"
            className="text-[#64748B] transition hover:text-[#2563EB] hover:underline"
          >
            Apply
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <span className="font-semibold text-[#172554]">
            Documents &amp; Upload
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <FileCheck2
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <FileCheck2 size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Upload self-attested copies of your documents. Ensure all uploads are clear, legible, and within the file size limit.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                <TrustBadge
                  icon={ShieldCheck}
                  text="Secure & Trusted"
                  iconClass="text-[#6D28D9]"
                />
                <TrustBadge
                  icon={Clock3}
                  text="Quick & Easy"
                  iconClass="text-[#6D28D9]"
                />
                <TrustBadge
                  icon={ShieldCheck}
                  text="100% Government"
                  iconClass="text-[#F59E0B]"
                />
              </div>
            </div>

            {/* Hero Artwork Frame */}
            <div
              aria-hidden="true"
              className="relative ml-5 hidden h-[150px] w-[430px] shrink-0 lg:block"
            >
              <div className="absolute bottom-0 right-0 h-[70px] w-[315px] opacity-20">
                <div className="absolute bottom-0 left-0 h-[54px] w-[48px] rounded-t-full border border-[#8B75C8]" />
                <div className="absolute bottom-0 left-[60px] h-[68px] w-[50px] rounded-t-[30px] border border-[#8B75C8]" />
                <div className="absolute bottom-0 right-[55px] h-[58px] w-[52px] rounded-t-full border border-[#8B75C8]" />
              </div>

              <div className="absolute bottom-[20px] left-[8px] h-[74px] w-[160px] rounded-[30px_30px_12px_12px] border-[2.5px] border-[#CBD5E1] bg-white shadow-sm">
                <div className="absolute -bottom-[12px] left-[18px] h-[24px] w-[24px] rounded-full border-[3px] border-[#64748B] bg-white" />
                <div className="absolute -bottom-[12px] right-[18px] h-[24px] w-[24px] rounded-full border-[3px] border-[#64748B] bg-white" />
                <div className="absolute left-[24px] top-[9px] h-[24px] w-[48px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
                <div className="absolute right-[20px] top-[11px] h-[20px] w-[34px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
              </div>

              <div className="absolute right-[80px] top-[4px] z-10 h-[108px] w-[202px] -rotate-[1deg] overflow-hidden rounded-[8px] border border-[#B8C8E2] bg-white shadow-[0_8px_18px_rgba(23,37,84,0.08)]">
                <div className="flex h-[27px] items-center justify-between bg-[#6135B8] px-3.5">
                  <span className="text-[8px] font-bold tracking-wider text-white">
                    LEARNER LICENCE
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                </div>
                <div className="flex gap-2.5 p-2.5">
                  <div className="flex h-[42px] w-[36px] shrink-0 items-center justify-center rounded-md bg-[#EEF2FF] text-[#6D28D9]">
                    <FileCheck2 size={18} />
                  </div>
                  <div className="flex-1 space-y-1.5 pt-1">
                    <div className="h-2 w-full rounded bg-[#E2E8F0]" />
                    <div className="h-1.5 w-[75%] rounded bg-[#CBD5E1]" />
                    <div className="h-1.5 w-[60%] rounded bg-[#CBD5E1]" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[10px] right-0 z-20 h-[60px] w-[87px] rounded-[4px_4px_8px_8px] bg-[#9B6DE2] shadow-[0_6px_14px_rgba(109,40,217,0.15)]">
                <div className="absolute left-[7px] top-[-8px] h-[11px] w-[38px] rounded-t-[4px] bg-[#A77BE6]" />
                <div className="absolute left-[8px] top-[12px] h-[37px] w-[71px] rounded border border-[#BDA4ED] bg-[#A77BE6]" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            3-COLUMN CONSISTENT APPLICATION LAYOUT:
            Left: Application Steps (Vertical Stepper, ~20%)
            Center: Step 4 Documents Form Card (~55%)
            Right: Document Guidelines & Support (~25%)
        ===================================================== */}
        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[230px_minmax(0,1fr)_310px]">
          {/* ===================================================
              LEFT: APPLICATION STEPS (VERTICAL STEPPER)
          =================================================== */}
          <aside className="space-y-3">
            <div className="rounded-[10px] border border-[#DCE5F1] bg-white p-4 shadow-[0_2px_10px_rgba(23,37,84,0.02)]">
              <h2 className="text-[13px] font-bold text-[#172554]">
                Application Steps
              </h2>

              <div className="mt-4 space-y-2">
                {steps.map((step, index) => {
                  const isCompleted = index < 3; // Steps 1, 2, 3 completed
                  const isActive = index === 3; // Step 4 (Documents) active

                  return (
                    <div
                      key={step.number}
                      className={[
                        "flex items-start gap-3 rounded-[8px] p-2.5 transition",
                        isActive
                          ? "border border-[#C4B5FD] bg-[#FAF8FF]"
                          : isCompleted
                            ? "border border-transparent bg-[#F5F3FF]"
                            : "border border-transparent hover:bg-[#F8FAFC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          isCompleted
                            ? "bg-[#6D28D9] text-white shadow-2xs"
                            : isActive
                              ? "bg-[#6D28D9] text-white shadow-2xs"
                              : "border border-[#CBD5E1] bg-white text-[#64748B]",
                        ].join(" ")}
                      >
                        {isCompleted ? (
                          <Check size={13} strokeWidth={3} />
                        ) : (
                          step.number
                        )}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={[
                            "text-[10px] font-bold leading-tight",
                            isActive
                              ? "text-[#6D28D9]"
                              : isCompleted
                                ? "text-[#172554]"
                                : "text-[#334155]",
                          ].join(" ")}
                        >
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[8px] leading-3 text-[#64748B]">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom 100% Secure notice */}
            <div className="rounded-[10px] border border-[#E9D5FF] bg-[#FAF5FF] p-3.5">
              <div className="flex items-start gap-2.5">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
                  <ShieldCheck size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-[#5B21B6]">
                    Your data is 100% secure
                  </p>
                  <p className="mt-0.5 text-[8px] leading-3.5 text-[#475569]">
                    We protect your personal information as per Government policies.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* ===================================================
              CENTER: MAIN FORM CARD (STEP 4 OF 7)
          =================================================== */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-[#6D28D9]">
                Step 4 of 7
              </p>
              <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                4 Documents Required
              </span>
            </div>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Upload Documents
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Please upload self-attested copies of the required documents for verification.
            </p>

            {/* DigiLocker Fast-Track Box */}
            <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-[9px] border border-[#DDD6FE] bg-[#F5F3FF] p-3.5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
                  <UploadCloud size={19} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#5B21B6]">
                    Fast-Track with DigiLocker
                  </p>
                  <p className="text-[9px] text-[#64748B]">
                    Fetch your verified Aadhaar, identity, and birth records in 1-click.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDigiLockerFetch}
                disabled={isDigiLockerLoading}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-[6px] bg-[#6D28D9] px-4 text-[10px] font-bold text-white transition hover:bg-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] disabled:opacity-50 shadow-2xs"
              >
                {isDigiLockerLoading ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Check size={13} strokeWidth={3} />
                    <span>Fetch from DigiLocker</span>
                  </>
                )}
              </button>
            </div>

            {/* Document Upload Sections */}
            <div className="mt-5 space-y-4">
              {/* Document 1: Identity Proof */}
              <UploadCard
                number="1"
                title="Identity Proof"
                required
                docType={idDocType}
                onDocTypeChange={setIdDocType}
                options={[
                  { value: "aadhaar", label: "Aadhaar Card" },
                  { value: "passport", label: "Passport" },
                  { value: "voter", label: "Voter ID Card" },
                  { value: "pan", label: "PAN Card" },
                ]}
                uploadedDoc={uploads.identity}
                onUpload={() =>
                  handleMockUpload(
                    "identity",
                    "Aadhaar_Card_SelfAttested.pdf",
                    "Aadhaar Card",
                  )
                }
                onRemove={() => handleRemove("identity")}
              />

              {/* Document 2: Address Proof */}
              <UploadCard
                number="2"
                title="Address Proof"
                required
                docType={addressDocType}
                onDocTypeChange={setAddressDocType}
                options={[
                  { value: "aadhaar", label: "Aadhaar Card (With Address)" },
                  { value: "utility", label: "Utility Bill (Electricity/Water)" },
                  { value: "passbook", label: "Bank Passbook" },
                  { value: "ration", label: "Ration Card" },
                ]}
                uploadedDoc={uploads.address}
                onUpload={() =>
                  handleMockUpload(
                    "address",
                    "Electricity_Bill_April2026.pdf",
                    "Utility Bill",
                  )
                }
                onRemove={() => handleRemove("address")}
              />

              {/* Document 3: Date of Birth Proof */}
              <UploadCard
                number="3"
                title="Date of Birth Proof"
                required
                docType={dobDocType}
                onDocTypeChange={setDobDocType}
                options={[
                  { value: "aadhaar", label: "Aadhaar Card" },
                  { value: "birth_cert", label: "Birth Certificate" },
                  { value: "passport", label: "Passport" },
                  { value: "school_cert", label: "10th / School Leaving Certificate" },
                ]}
                uploadedDoc={uploads.dob}
                onUpload={() =>
                  handleMockUpload(
                    "dob",
                    "Birth_Certificate.pdf",
                    "Birth Certificate",
                  )
                }
                onRemove={() => handleRemove("dob")}
              />

              {/* Document 4: Passport Size Photograph */}
              <div className="rounded-[9px] border border-[#E2E8F0] bg-white p-4 transition focus-within:ring-2 focus-within:ring-[#8B5CF6]">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F1E9FF] text-[10px] font-bold text-[#6D28D9]">
                        4
                      </span>
                      <h3 className="text-[12px] font-bold text-[#172554]">
                        Passport Size Photograph <span className="text-[#DC2626]">*</span>
                      </h3>
                    </div>
                    <p className="mt-1 text-[9px] text-[#64748B]">
                      Recent color photograph (3.5 cm × 4.5 cm) on white background, front face.
                    </p>
                  </div>

                  {uploads.photo ? (
                    <div className="flex items-center gap-3 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] px-3 py-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-[#166534]">
                          {uploads.photo.name}
                        </p>
                        <p className="text-[8px] text-[#64748B]">{uploads.photo.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove("photo")}
                        className="ml-2 text-[#EF4444] hover:text-[#B91C1C]"
                        aria-label="Remove photograph"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleMockUpload(
                          "photo",
                          "Passport_Photo_WhiteBg.jpg",
                          "Photograph",
                        )
                      }
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-4 text-[10px] font-bold text-[#172554] transition hover:bg-[#F8FAFC]"
                    >
                      <FileUp size={14} />
                      <span>Upload Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Self-Attestation Declaration Checkbox */}
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
              <input
                type="checkbox"
                checked={selfAttested}
                onChange={(event) => setSelfAttested(event.target.checked)}
                className="peer sr-only"
              />
              <span
                className={[
                  "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition",
                  selfAttested
                    ? "border-[#6D28D9] bg-[#6D28D9] text-white"
                    : "border-[#CBD5E1] bg-white",
                ].join(" ")}
                aria-hidden="true"
              >
                {selfAttested && <Check size={13} strokeWidth={3} />}
              </span>

              <span className="text-[10px] leading-relaxed text-[#172554]">
                I solemnly declare that all uploaded documents are true, authentic, self-attested copies of the original documents. I understand that submitting false documents is punishable under the Motor Vehicles Act.
              </span>
            </label>

            {/* Actions: Back and Save & Continue */}
            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
              <Link
                href="/services/driving-licence/learner-licence/apply/address-details"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] border border-[#8CB2FF] bg-white px-6 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
              >
                <ArrowLeft size={17} />
                <span>Back to Address Details</span>
              </Link>

              <button
                type="submit"
                disabled={!allUploaded}
                className={[
                  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] px-8 text-[12px] font-bold text-white transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 shadow-2xs",
                  allUploaded
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                    : "bg-[#CBD5E1] cursor-not-allowed",
                ].join(" ")}
              >
                <span>Save &amp; Continue</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* ==================================================
              RIGHT: DOCUMENT GUIDELINES & SUPPORT
          ================================================== */}
          <aside className="space-y-3">
            {/* Card 1: Document Guidelines */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <FileText size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  Upload Guidelines
                </h2>
              </div>

              <ul className="mt-3 space-y-2 text-[9px] text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Accepted formats: PDF, JPG, PNG only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Maximum file size: 2 MB per document.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Ensure document text &amp; photo are sharp and legible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>All documents must be self-attested.</span>
                </li>
              </ul>
            </article>

            {/* Card 2: Scanning Help */}
            <article className="rounded-[10px] border border-[#E5D8F7] bg-[#F7F1FF] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#5B21B6]">
                    Need Help Scanning?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    Visit your nearest CSC or use our guide to scan documents properly.
                  </p>
                  <Link
                    href="/help"
                    className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>View Scanning Guide</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
                  <Printer size={22} />
                </span>
              </div>
            </article>

            {/* Card 3: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Assistance?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    For help with document upload or verification, contact our support team.
                  </p>
                  <Link
                    href="/help"
                    className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Visit Help Center</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs">
                  <Headphones size={22} />
                </span>
              </div>
            </article>
          </aside>
        </div>

        {/* =====================================================
            TRUST STRIP
        ===================================================== */}
        <section className="mt-4 overflow-hidden rounded-[11px] border border-[#DCE5F1] bg-[#EEF5FF]">
          <div className="grid divide-y divide-[#C7D6E9] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            <TrustBlock
              icon={ShieldCheck}
              title="100% Secure"
              description="Your data is safe with us."
            />
            <TrustBlock
              icon={LockKeyhole}
              title="Government Approved"
              description="Official platform of Government of India."
            />
            <TrustBlock
              icon={Headphones}
              title="24/7 Support"
              description="We're here to help you anytime."
            />
            <TrustBlock
              icon={Phone}
              title="Multiple Channels"
              description="Also available via SMS, IVR, WhatsApp & CSC."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   UPLOAD CARD SUBCOMPONENT
============================================================ */

function UploadCard({
  number,
  title,
  required,
  docType,
  onDocTypeChange,
  options,
  uploadedDoc,
  onUpload,
  onRemove,
}: {
  number: string;
  title: string;
  required?: boolean;
  docType: string;
  onDocTypeChange: (val: string) => void;
  options: Array<{ value: string; label: string }>;
  uploadedDoc: UploadedDoc | null;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[9px] border border-[#E2E8F0] bg-white p-4 transition focus-within:ring-2 focus-within:ring-[#8B5CF6]">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {/* Header and Dropdown */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F1E9FF] text-[10px] font-bold text-[#6D28D9]">
              {number}
            </span>
            <h3 className="text-[12px] font-bold text-[#172554]">
              {title} {required && <span className="text-[#DC2626]">*</span>}
            </h3>
          </div>

          <div className="relative mt-2 max-w-[280px]">
            <select
              value={docType}
              onChange={(e) => onDocTypeChange(e.target.value)}
              className="h-[38px] w-full appearance-none rounded-[6px] border border-[#CBD5E1] bg-white pl-3 pr-8 text-[10px] font-medium text-[#172554] outline-none transition focus:border-[#8B5CF6]"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>
        </div>

        {/* Upload State / Button */}
        <div>
          {uploadedDoc ? (
            <div className="flex items-center gap-3 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] px-3 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                <Check size={12} strokeWidth={3} />
              </span>
              <div className="min-w-0 text-left">
                <p className="truncate text-[10px] font-bold text-[#166534]">
                  {uploadedDoc.name}
                </p>
                <div className="flex items-center gap-2 text-[8px] text-[#64748B]">
                  <span>{uploadedDoc.size}</span>
                  {uploadedDoc.isDigiLocker && (
                    <span className="rounded bg-[#EDE9FE] px-1.5 py-0.2 text-[7px] font-bold text-[#6D28D9]">
                      DigiLocker
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="ml-2 text-[#EF4444] transition hover:text-[#B91C1C]"
                aria-label={`Remove ${title}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onUpload}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-4 text-[10px] font-bold text-[#172554] transition hover:bg-[#F8FAFC]"
            >
              <FileUp size={14} />
              <span>Upload Document</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO TRUST & TRUST BLOCK
============================================================ */

function TrustBadge({
  icon: Icon,
  text,
  iconClass,
}: {
  icon: typeof ShieldCheck;
  text: string;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} strokeWidth={2.2} className={iconClass} />
      <span className="text-[11px] font-semibold text-[#172554]">{text}</span>
    </div>
  );
}

function TrustBlock({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB]">
        <Icon size={21} />
      </span>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
          {description}
        </p>
      </div>
    </div>
  );
}
