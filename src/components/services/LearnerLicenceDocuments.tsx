"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  FileCheck2,
  FileSearch,
  Headphones,
  House,
  IdCard,
  Image as ImageIcon,
  Info,
  LockKeyhole,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

type DocumentItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof IdCard;
  guidelines: string[];
  expandedGuidelines: string[];
};

const documents: DocumentItem[] = [
  {
    id: "identity",
    number: "1.",
    title: "Identity Proof (Any one)",
    description: "Aadhaar Card, Passport, Voter ID, PAN Card, etc.",
    icon: IdCard,
    guidelines: ["Valid and not expired", "Clear and readable copy"],
    expandedGuidelines: [
      "Document should belong to the applicant.",
      "Name and photograph should be clearly visible.",
      "Original document may be required during verification at RTO.",
      "Accepted formats: PDF, JPG, PNG (Max size: 2MB).",
    ],
  },
  {
    id: "address",
    number: "2.",
    title: "Address Proof (Any one)",
    description:
      "Aadhaar Card, Utility Bill, Bank Passbook, Ration Card, etc.",
    icon: House,
    guidelines: [
      "Issued within last 6 months",
      "Should contain current address",
    ],
    expandedGuidelines: [
      "Address should match the details entered in the application.",
      "Use a document that clearly displays the complete residential address.",
      "Utility bills must be recent (within the last 6 months).",
      "Accepted formats: PDF, JPG, PNG (Max size: 2MB).",
    ],
  },
  {
    id: "dob",
    number: "3.",
    title: "Date of Birth Proof (Any one)",
    description:
      "Birth Certificate, Aadhaar Card, Passport, School Certificate, etc.",
    icon: CalendarDays,
    guidelines: [
      "Should clearly mention date of birth",
      "Issued by a competent authority",
    ],
    expandedGuidelines: [
      "Date of birth must be clearly readable and match exactly.",
      "Document should be issued by a recognized government or educational authority.",
      "Accepted formats: PDF, JPG, PNG (Max size: 2MB).",
    ],
  },
  {
    id: "photo",
    number: "4.",
    title: "Passport Size Photograph",
    description: "Recent colour photograph as per the guidelines.",
    icon: ImageIcon,
    guidelines: [
      "Size: 3.5 cm × 4.5 cm",
      "White background, front face, no cap or goggles",
    ],
    expandedGuidelines: [
      "Use a recent colour photograph (taken within the last 3 months).",
      "Face must occupy 70-80% of the photograph area.",
      "Avoid shadows, headwear, tinted glasses, or masks.",
      "Accepted formats: JPG, PNG (Max size: 500KB).",
    ],
  },
];

export default function LearnerLicenceDocuments() {
  const [openDocument, setOpenDocument] = useState<string | null>(null);

  function toggleDocument(id: string) {
    setOpenDocument((current) => (current === id ? null : id));
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
          <span className="font-semibold text-[#172554]">Documents</span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[158px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <FileCheck2
                size={58}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <FileCheck2
                size={29}
                strokeWidth={1.7}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[27px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Documents Required
              </h1>

              <p className="mt-2 max-w-[650px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                These documents are required for applying for a Learner Licence (LL).
              </p>

              <p className="mt-0.5 max-w-[650px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Please ensure your documents are valid and clearly readable.
              </p>
            </div>

            {/* Hero Artwork Frame */}
            <div
              aria-label="Learner licence and documents illustration"
              className="relative ml-6 hidden h-[150px] w-[430px] shrink-0 lg:block"
            >
              {/* Architectural line art hint */}
              <div className="absolute bottom-0 right-0 h-[85px] w-[330px] opacity-25">
                <div className="absolute bottom-0 left-0 h-[63px] w-[58px] rounded-t-full border border-[#B8A9E7]" />
                <div className="absolute bottom-0 left-[68px] h-[78px] w-[54px] rounded-t-[35px] border border-[#B8A9E7]" />
                <div className="absolute bottom-0 left-[133px] h-[58px] w-[50px] rounded-t-full border border-[#B8A9E7]" />
                <div className="absolute bottom-0 right-[42px] h-[74px] w-[55px] rounded-t-[30px] border border-[#B8A9E7]" />
              </div>

              {/* Floating Learner Licence Card */}
              <div className="absolute right-[108px] top-[10px] z-10 h-[108px] w-[205px] -rotate-[1deg] overflow-hidden rounded-[8px] border border-[#B8C8E4] bg-white shadow-[0_8px_18px_rgba(23,37,84,0.08)]">
                <div className="flex h-[27px] items-center justify-between bg-[#6135B8] px-3.5">
                  <span className="text-[8px] font-bold tracking-wider text-white">
                    LEARNER LICENCE
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                </div>

                <div className="flex gap-2.5 p-2.5">
                  <div className="flex h-[44px] w-[38px] shrink-0 items-center justify-center rounded-md bg-[#EEF2FF] text-[#6D28D9]">
                    <FileCheck2 size={20} />
                  </div>

                  <div className="flex-1 space-y-1.5 pt-1">
                    <div className="h-2 w-full rounded bg-[#E2E8F0]" />
                    <div className="h-1.5 w-[75%] rounded bg-[#CBD5E1]" />
                    <div className="h-1.5 w-[60%] rounded bg-[#CBD5E1]" />
                  </div>
                </div>
              </div>

              {/* Folder mockup */}
              <div className="absolute bottom-[12px] right-[4px] z-20 h-[63px] w-[92px] rounded-[4px_4px_8px_8px] bg-[#9B6DE2] shadow-[0_7px_15px_rgba(109,40,217,0.15)]">
                <div className="absolute -top-[8px] left-[7px] h-[12px] w-[40px] rounded-t-[4px] bg-[#A77BE6]" />
                <div className="absolute left-[9px] top-[13px] h-[37px] w-[74px] rounded-[3px] border border-[#BDA4ED] bg-[#A77BE6]" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INFORMATION ALERT
        ===================================================== */}
        <section className="mt-3 flex min-h-[46px] items-center gap-3 rounded-[7px] border border-[#BBD3FA] bg-[#F0F6FF] px-4 py-2.5">
          <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
            <Info size={13} strokeWidth={2.5} />
          </span>
          <p className="text-[11px] font-semibold leading-5 text-[#172554] sm:text-[12px]">
            All documents should be self-attested. Original documents may be required for verification at the RTO.
          </p>
        </section>

        {/* =====================================================
            MAIN CONTENT (70% Left / 30% Right)
        ===================================================== */}
        <section className="mt-3 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* Left: List of Documents */}
          <div className="rounded-[10px] border border-[#DCE5F1] bg-white p-4 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-[18px]">
            <h2 className="text-[17px] font-bold tracking-[-0.02em] text-[#172554]">
              List of Documents
            </h2>

            <div className="mt-3 space-y-2">
              {documents.map((document) => {
                const isOpen = openDocument === document.id;

                return (
                  <DocumentAccordion
                    key={document.id}
                    document={document}
                    isOpen={isOpen}
                    onToggle={() => toggleDocument(document.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-3">
            <ReminderCard />
            <ScanningSupportCard />
            <TrackCard />
          </aside>
        </section>

        {/* =====================================================
            BOTTOM APPLY CTA CARD
        ===================================================== */}
        <section className="mt-3 rounded-[10px] border border-[#E5D8F7] bg-[#F7F1FF] p-4 sm:p-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
              <FileCheck2 size={23} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-[14px] font-bold text-[#172554]">
                Ready to apply for Learner Licence?
              </h2>
              <p className="mt-1 text-[10px] leading-4 text-[#475569] sm:text-[11px]">
                Proceed to fill your application and upload the required documents.
              </p>
            </div>

            <Link
              href="/services/driving-licence/learner-licence/apply"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#2563EB] px-6 text-[12px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 sm:w-auto shadow-2xs"
            >
              <span>Apply for Learner Licence</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* =====================================================
            TRUST STRIP
        ===================================================== */}
        <section className="mt-3 overflow-hidden rounded-[11px] border border-[#DCE5F1] bg-[#EEF5FF]">
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
   DOCUMENT ACCORDION ROW
============================================================ */

function DocumentAccordion({
  document,
  isOpen,
  onToggle,
}: {
  document: DocumentItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = document.icon;
  const panelId = `document-guidelines-${document.id}`;

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E0E7F0] bg-white transition focus-within:ring-2 focus-within:ring-[#0EA5E9]">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex min-h-[80px] w-full items-center gap-3 px-3 py-3 text-left transition hover:bg-[#FBFCFF] sm:px-4"
      >
        {/* Left: Icon Badge */}
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
          <Icon size={19} strokeWidth={1.8} />
        </div>

        {/* Center-Left: Document Info */}
        <div className="min-w-0 flex-[1.05]">
          <p className="text-[11px] font-bold leading-4 text-[#172554] sm:text-[12px]">
            {document.number} {document.title}
          </p>
          <p className="mt-1 text-[9px] leading-4 text-[#475569] sm:text-[10px]">
            {document.description}
          </p>
        </div>

        {/* Center-Right: Guidelines */}
        <div className="hidden flex-1 border-l border-[#DCE5F1] pl-6 sm:block">
          <p className="text-[10px] font-bold text-[#172554]">Guidelines</p>
          <ul className="mt-1 space-y-0.5">
            {document.guidelines.map((guideline) => (
              <li
                key={guideline}
                className="flex items-start gap-2 text-[9px] leading-4 text-[#475569]"
              >
                <span className="mt-[6px] h-[3.5px] w-[3.5px] shrink-0 rounded-full bg-[#172554]" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Expand Chevron */}
        <div className="ml-auto pl-2">
          <ChevronDown
            size={18}
            className={[
              "text-[#172554] transition-transform duration-200",
              isOpen ? "rotate-180 text-[#2563EB]" : "",
            ].join(" ")}
          />
        </div>
      </button>

      {/* Expanded Guidance Panel */}
      {isOpen && (
        <div
          id={panelId}
          className="border-t border-[#E0E7F0] bg-[#F4F8FF] px-4 py-4 sm:ml-[57px] sm:mr-4 sm:mb-3 sm:rounded-[7px]"
        >
          <p className="text-[11px] font-bold text-[#172554]">
            Additional Guidelines &amp; Accepted Formats
          </p>
          <ul className="mt-2 space-y-1.5">
            {document.expandedGuidelines.map((guideline) => (
              <li
                key={guideline}
                className="flex items-start gap-2 text-[10px] leading-4 text-[#475569]"
              >
                <span className="mt-1.5 h-[4px] w-[4px] shrink-0 rounded-full bg-[#2563EB]" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RIGHT SIDEBAR CARDS
============================================================ */

function ReminderCard() {
  return (
    <article className="rounded-[10px] border border-[#F4D9B3] bg-[#FFF9F0] p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[14px] font-bold text-[#A85300]">
          Important Reminders
        </h2>

        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FFF0CF] text-[#F59E0B]">
          <Bell size={22} />
        </div>
      </div>

      <ul className="mt-2 space-y-2.5">
        <ReminderItem>All documents should be self-attested.</ReminderItem>
        <ReminderItem>
          Original documents may be required for verification at the RTO.
        </ReminderItem>
        <ReminderItem>
          Ensure documents are clear, valid and not expired.
        </ReminderItem>
        <ReminderItem>Upload only PDF, JPG or PNG files.</ReminderItem>
      </ul>
    </article>
  );
}

function ReminderItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[10px] leading-4 text-[#334155]">
      <span className="mt-0.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
        <span className="text-[9px] font-black">✓</span>
      </span>
      <span>{children}</span>
    </li>
  );
}

function ScanningSupportCard() {
  return (
    <article className="rounded-[10px] border border-[#E5D8F7] bg-[#F7F1FF] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[13px] font-bold text-[#5B21B6]">
            Need Help Scanning Documents?
          </h2>
          <p className="mt-1 max-w-[195px] text-[10px] leading-4 text-[#475569]">
            Visit your nearest CSC or use our guide to scan documents correctly.
          </p>
          <Link
            href="/help"
            className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
          >
            <span>View Scanning Guide</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
          <Printer size={22} />
        </div>
      </div>
    </article>
  );
}

function TrackCard() {
  return (
    <article className="rounded-[10px] border border-[#D7EFE3] bg-[#F1FCF5] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[13px] font-bold text-[#047857]">
            Track Your Application
          </h2>
          <p className="mt-1 max-w-[195px] text-[10px] leading-4 text-[#475569]">
            After submission, you can track the status of your Learner Licence application.
          </p>
          <Link
            href="/applications"
            className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#15803D] hover:underline"
          >
            <span>Track Now</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[#15803D] shadow-2xs">
          <FileSearch size={22} />
        </div>
      </div>
    </article>
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
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB]">
        <Icon size={21} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
          {description}
        </p>
      </div>
    </div>
  );
}
