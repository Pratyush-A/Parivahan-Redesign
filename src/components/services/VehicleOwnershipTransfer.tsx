"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Headphones,
  IdCard,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Upload,
  UserCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

type ProcessStep = {
  number: string;
  badgeBg: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconStyle: string;
};

type DocumentItem = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconStyle: string;
};

const processSteps: ProcessStep[] = [
  {
    number: "1",
    badgeBg: "bg-[#2563EB]",
    title: "Enter Details",
    description: "Provide vehicle and new owner details.",
    icon: FileText,
    iconStyle: "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]",
  },
  {
    number: "2",
    badgeBg: "bg-[#7C3AED]",
    title: "Upload Documents",
    description: "Upload required documents and complete verification.",
    icon: Upload,
    iconStyle: "bg-[#FAF5FF] text-[#7C3AED] border-[#F3E8FF]",
  },
  {
    number: "3",
    badgeBg: "bg-[#15803D]",
    title: "Pay Fees",
    description: "Pay the applicable transfer fees online.",
    icon: IndianRupeeSymbol,
    iconStyle: "bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]",
  },
  {
    number: "4",
    badgeBg: "bg-[#EA580C]",
    title: "RTO Verification",
    description: "RTO verifies your application and updates ownership.",
    icon: CheckCircle2,
    iconStyle: "bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]",
  },
];

const documents: DocumentItem[] = [
  {
    title: "Registration Certificate (RC)",
    description: "Original RC of the vehicle",
    icon: FileCheck2,
    iconStyle: "bg-[#EFF6FF] text-[#2563EB]",
  },
  {
    title: "Valid Insurance",
    description: "Active vehicle insurance copy",
    icon: ShieldCheck,
    iconStyle: "bg-[#F0FDF4] text-[#15803D]",
  },
  {
    title: "Pollution Certificate",
    description: "Valid PUC certificate",
    icon: FileText,
    iconStyle: "bg-[#ECFEFF] text-[#0891B2]",
  },
  {
    title: "Identity Proof",
    description: "Aadhaar / PAN / Passport",
    icon: IdCard,
    iconStyle: "bg-[#FAF5FF] text-[#7C3AED]",
  },
  {
    title: "Address Proof",
    description: "Address proof of seller & buyer",
    icon: MapPin,
    iconStyle: "bg-[#EFF6FF] text-[#2563EB]",
  },
  {
    title: "Sale Agreement",
    description: "Duly signed sale agreement",
    icon: FileText,
    iconStyle: "bg-[#ECFEFF] text-[#0891B2]",
  },
];

const beforeYouStart = [
  "Ensure the vehicle is not under loan or hypothecation.",
  "All challans should be cleared.",
  "Seller and buyer details must match the documents.",
  "The vehicle should be registered in the same state.",
];

function IndianRupeeSymbol({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-bold ${className}`}
      style={{ fontSize: size * 0.9, lineHeight: 1 }}
      aria-hidden="true"
    >
      ₹
    </span>
  );
}

/* ==========================================================================
   TRANSFER ILLUSTRATION (Accurate SVG representation matching the reference)
   ========================================================================== */
function TransferIllustration() {
  return (
    <div
      className="relative aspect-[1.62/1] w-full overflow-hidden rounded-[24px] border border-[#DCE7F7] bg-[#EAF2FB] shadow-xs"
      role="img"
      aria-label="Illustration depicting vehicle ownership transfer between seller and buyer outside RTO Office"
    >
      {/* Sky & background clouds */}
      <svg
        viewBox="0 0 540 330"
        className="h-full w-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Soft Sky gradient */}
        <rect width="540" height="330" fill="#EBF3FC" />

        {/* Ambient background foliage / trees */}
        <ellipse cx="60" cy="220" rx="75" ry="90" fill="#D5E5F7" opacity="0.6" />
        <ellipse cx="480" cy="220" rx="75" ry="90" fill="#D5E5F7" opacity="0.6" />
        <ellipse cx="110" cy="240" rx="55" ry="60" fill="#E2EDF9" opacity="0.8" />
        <ellipse cx="430" cy="240" rx="55" ry="60" fill="#E2EDF9" opacity="0.8" />

        {/* Soft floating clouds */}
        <g fill="#FFFFFF" opacity="0.85">
          <ellipse cx="90" cy="70" rx="35" ry="12" />
          <ellipse cx="110" cy="65" rx="25" ry="15" />
          <ellipse cx="440" cy="80" rx="40" ry="13" />
          <ellipse cx="465" cy="74" rx="28" ry="16" />
        </g>

        {/* Ground */}
        <rect y="270" width="540" height="60" fill="#DFECF9" />

        {/* RTO Office Building (Center Background) */}
        <g>
          {/* Main structure */}
          <rect x="180" y="70" width="180" height="200" rx="10" fill="#FFFFFF" opacity="0.9" />
          <rect x="190" y="80" width="160" height="190" fill="#F0F6FD" />

          {/* RTO Office Signboard Banner */}
          <rect x="200" y="88" width="140" height="28" rx="6" fill="#D1E2F5" />
          <text
            x="270"
            y="107"
            textAnchor="middle"
            fill="#5B7B9E"
            fontSize="12"
            fontWeight="800"
            letterSpacing="0.08em"
            fontFamily="system-ui, sans-serif"
          >
            RTO OFFICE
          </text>

          {/* Building Windows */}
          <g fill="#DCE9F7">
            <rect x="205" y="130" width="36" height="34" rx="3" />
            <rect x="252" y="130" width="36" height="34" rx="3" />
            <rect x="299" y="130" width="36" height="34" rx="3" />

            <rect x="205" y="174" width="36" height="34" rx="3" />
            <rect x="252" y="174" width="36" height="34" rx="3" />
            <rect x="299" y="174" width="36" height="34" rx="3" />
          </g>

          {/* Entrance Door */}
          <rect x="245" y="222" width="50" height="48" rx="4" fill="#CBDDF2" />
        </g>

        {/* Circular Transfer Badge (Above document) */}
        <g transform="translate(270, 110)">
          <circle cx="0" cy="0" r="23" fill="#FFFFFF" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
          <circle cx="0" cy="0" r="20" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          {/* Bidirectional arrows */}
          <path d="M-10 -4 L6 -4 M2 -8 L7 -4 L2 0" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 4 L-6 4 M-2 8 L-7 4 L-2 0" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Blue Vehicle (Car) on Left */}
        <g transform="translate(85, 140)">
          {/* Car Shadow */}
          <ellipse cx="90" cy="142" rx="90" ry="10" fill="#CBDCF0" />

          {/* Car Body Base */}
          <path
            d="M 10 115 Q 15 88 50 82 L 70 54 Q 78 48 105 48 L 135 48 Q 148 48 158 60 L 175 84 Q 185 92 186 112 L 186 126 Q 186 132 178 132 L 18 132 Q 10 132 10 125 Z"
            fill="#2563EB"
          />
          {/* Cabin Roof / Upper Body */}
          <path
            d="M 52 82 L 72 54 Q 78 48 105 48 L 135 48 Q 148 48 158 60 L 172 82 Z"
            fill="#3B82F6"
          />
          {/* Windows */}
          <path d="M 76 56 L 108 56 L 108 80 L 58 80 Z" fill="#BFDBFE" />
          <path d="M 114 56 L 136 56 Q 145 56 152 64 L 164 80 L 114 80 Z" fill="#BFDBFE" />

          {/* Headlights */}
          <ellipse cx="20" cy="100" rx="7" ry="5" fill="#FEF08A" />
          <ellipse cx="180" cy="100" rx="4" ry="4" fill="#FCA5A5" />

          {/* Front Grille & Bumper */}
          <rect x="8" y="106" width="16" height="8" rx="2" fill="#1D4ED8" />

          {/* Wheels */}
          <circle cx="45" cy="130" r="17" fill="#1E293B" />
          <circle cx="45" cy="130" r="8" fill="#E2E8F0" />
          <circle cx="45" cy="130" r="3" fill="#1E293B" />

          <circle cx="152" cy="130" r="17" fill="#1E293B" />
          <circle cx="152" cy="130" r="8" fill="#E2E8F0" />
          <circle cx="152" cy="130" r="3" fill="#1E293B" />
        </g>

        {/* Person 1: Seller (Current Owner) in Blue Polo */}
        <g transform="translate(195, 95)">
          {/* Hair */}
          <path d="M 40 18 Q 30 18 28 32 Q 40 24 54 28 Q 54 18 40 18 Z" fill="#0F172A" />
          {/* Head */}
          <circle cx="42" cy="34" r="12" fill="#FBCFE8" />
          {/* Neck */}
          <rect x="39" y="44" width="7" height="9" fill="#F472B6" opacity="0.6" />

          {/* Torso / Blue Polo */}
          <path d="M 24 52 L 60 52 L 56 116 L 28 116 Z" fill="#1D4ED8" />
          {/* Collar */}
          <path d="M 36 52 L 42 62 L 48 52" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />

          {/* Left Arm reaching forward */}
          <path d="M 52 58 Q 70 66 84 76" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
          {/* Hand holding document */}
          <circle cx="87" cy="79" r="5" fill="#FBCFE8" />

          {/* Legs & Pants */}
          <rect x="29" y="116" width="12" height="90" rx="3" fill="#1E293B" />
          <rect x="44" y="116" width="12" height="90" rx="3" fill="#0F172A" />

          {/* Shoes */}
          <ellipse cx="33" cy="206" rx="8" ry="4" fill="#0F172A" />
          <ellipse cx="48" cy="206" rx="8" ry="4" fill="#0F172A" />
        </g>

        {/* Handheld Official Document / Certificate */}
        <g transform="translate(268, 160)">
          {/* Document Sheet */}
          <rect x="-16" y="-6" width="34" height="46" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.1))" />
          {/* Document Header lines */}
          <rect x="-10" y="0" width="22" height="3" rx="1.5" fill="#2563EB" />
          <rect x="-10" y="6" width="16" height="2" rx="1" fill="#94A3B8" />
          <rect x="-10" y="11" width="20" height="2" rx="1" fill="#CBD5E1" />
          <rect x="-10" y="16" width="18" height="2" rx="1" fill="#CBD5E1" />

          {/* Green Verified Shield Badge on Doc */}
          <circle cx="4" cy="28" r="8" fill="#DCFCE7" />
          <path d="M 1 28 L 3 30 L 7 26" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Person 2: Buyer (New Owner) in Green Polo */}
        <g transform="translate(305, 95)">
          {/* Hair */}
          <path d="M 40 18 Q 50 18 52 32 Q 40 24 26 28 Q 26 18 40 18 Z" fill="#0F172A" />
          {/* Head */}
          <circle cx="38" cy="34" r="12" fill="#FBCFE8" />
          {/* Neck */}
          <rect x="35" y="44" width="7" height="9" fill="#F472B6" opacity="0.6" />

          {/* Torso / Green Polo */}
          <path d="M 20 52 L 56 52 L 52 116 L 24 116 Z" fill="#15803D" />
          {/* Collar */}
          <path d="M 32 52 L 38 62 L 44 52" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />

          {/* Right Arm reaching forward to receive doc */}
          <path d="M 28 58 Q 12 66 -2 76" stroke="#15803D" strokeWidth="8" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="-5" cy="79" r="5" fill="#FBCFE8" />

          {/* Legs & Pants */}
          <rect x="25" y="116" width="12" height="90" rx="3" fill="#1E293B" />
          <rect x="40" y="116" width="12" height="90" rx="3" fill="#0F172A" />

          {/* Shoes */}
          <ellipse cx="29" cy="206" rx="8" ry="4" fill="#0F172A" />
          <ellipse cx="44" cy="206" rx="8" ry="4" fill="#0F172A" />
        </g>
      </svg>
    </div>
  );
}

export default function VehicleOwnershipTransfer() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="bg-[#F8F9FA] text-[#111827]">
      {/* =========================================================
          1. BREADCRUMB
      ========================================================= */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-3.5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]"
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

            <span className="font-semibold text-[#172554]" aria-current="page">
              Transfer Vehicle Ownership
            </span>
          </nav>
        </div>
      </div>

      {/* =========================================================
          2. SERVICE HERO
      ========================================================= */}
      <section className="bg-[#F4F8FC] pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.12fr] lg:gap-14">
            {/* Left Column: Heading & CTAs */}
            <div>
              <span className="inline-flex rounded-full bg-[#EAF7EF] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#15803D]">
                MY VEHICLE
              </span>

              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0A1B44] sm:text-5xl lg:text-[54px]">
                Transfer Vehicle
                <br />
                Ownership
              </h1>

              <p className="mt-5 max-w-[540px] text-base leading-relaxed text-[#475569] sm:text-lg">
                Bought or sold a vehicle? Transfer ownership to the new owner
                in a few simple steps.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="/services/vehicle/ownership-transfer/details"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#172554] px-7 text-sm font-bold text-white !text-white shadow-sm transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  <span className="text-white !text-white font-bold">Start Now</span>
                  <ArrowRight size={16} className="text-white !text-white" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSaved(!saved)}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 text-sm font-bold text-[#172554] transition-colors hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  <Bookmark
                    size={16}
                    strokeWidth={2}
                    className={saved ? "fill-[#172554] text-[#172554]" : "text-[#172554]"}
                    aria-hidden="true"
                  />
                  {saved ? "Saved in Drafts" : "Save for Later"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs font-semibold text-[#475569]">
                <span className="inline-flex items-center gap-1.5 text-[#15803D]">
                  <Check
                    size={15}
                    strokeWidth={3}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  100% Secure
                </span>

                <span className="text-[#94A3B8]" aria-hidden="true">
                  •
                </span>

                <span>End-to-end encrypted</span>

                <span className="text-[#94A3B8]" aria-hidden="true">
                  •
                </span>

                <span>Government Verified</span>
              </div>
            </div>

            {/* Right Column: Illustration Visual Container */}
            <div className="w-full">
              <TransferIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. SERVICE FACTS BAR
      ========================================================= */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto -mt-7 max-w-[1280px] rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-1 divide-y divide-[#E2E8F0] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {/* Fact 1: Estimated Time */}
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                <Clock3 size={22} strokeWidth={2} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-[#64748B]">
                  Estimated Time
                </p>
                <p className="mt-0.5 text-base font-bold text-[#172554]">
                  15–20 mins
                </p>
                <p className="text-[11px] text-[#64748B]">On average</p>
              </div>
            </div>

            {/* Fact 2: RTO Visit */}
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAF5FF] text-[#7C3AED]">
                <FileText size={22} strokeWidth={2} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-[#64748B]">
                  RTO Visit
                </p>
                <p className="mt-0.5 text-base font-bold text-[#172554]">
                  May be required
                </p>
                <p className="text-[11px] text-[#64748B]">As per your RTO</p>
              </div>
            </div>

            {/* Fact 3: Eligibility */}
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D]">
                <ShieldCheck size={22} strokeWidth={2} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-[#64748B]">
                  Eligibility
                </p>
                <p className="mt-0.5 text-base font-bold text-[#172554]">
                  Vehicle must be registered
                </p>
                <p className="text-[11px] text-[#64748B]">In your state</p>
              </div>
            </div>

            {/* Fact 4: Service Fee */}
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF7ED] text-[#EA580C]">
                <IndianRupeeSymbol size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-[#64748B]">
                  Service Fee
                </p>
                <p className="mt-0.5 text-base font-bold text-[#172554]">
                  ₹300
                </p>
                <p className="text-[11px] text-[#64748B]">
                  Additional state fee may apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. OVERVIEW + WHO CAN USE THIS SERVICE
      ========================================================= */}
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl">
                Overview
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
                This service allows the current vehicle owner to transfer the
                registered ownership of a vehicle to a new owner. Both parties
                need to provide required details, upload documents and pay the
                applicable fees.
              </p>

              <ul className="mt-6 space-y-3.5">
                {[
                  "Transfer ownership of a vehicle to a new owner",
                  "Online submission of documents and verification",
                  "Track your application in real-time",
                  "Receive updates on your registered mobile number",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-[#334155]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who can use this service? */}
            <div className="rounded-2xl border border-[#DCE7F7] bg-[#F5F9FE] p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#172554]">
                Who can use this service?
              </h3>

              <div className="mt-5 space-y-3">
                {/* Seller */}
                <div className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <UserRound size={19} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#172554]">
                      Seller (Current Owner)
                    </h4>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Start the transfer request and share details
                    </p>
                  </div>
                </div>

                {/* Buyer */}
                <div className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <UserCheck size={19} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#172554]">
                      Buyer (New Owner)
                    </h4>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Accept the request and complete verification
                    </p>
                  </div>
                </div>
              </div>

              {/* Notice note */}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5">
                <Lightbulb
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D97706]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-[#92400E]">
                  Both seller and buyer must have a valid mobile number and
                  government-issued ID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. HOW IT WORKS
      ========================================================= */}
      <section
        aria-labelledby="how-it-works-heading"
        className="border-t border-[#E2E8F0] bg-[#F8F9FA] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl"
          >
            How it works
          </h2>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative flex flex-col">
                  {/* Step Card */}
                  <div className="relative flex min-h-[175px] flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs">
                    <div className="flex items-start justify-between">
                      {/* Step Number Badge */}
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${step.badgeBg}`}
                      >
                        {step.number}
                      </span>

                      {/* Icon Box */}
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${step.iconStyle}`}
                      >
                        <Icon size={19} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-sm font-bold text-[#172554]">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                      {step.description}
                    </p>
                  </div>

                  {/* Horizontal connector line on desktop */}
                  {index < processSteps.length - 1 && (
                    <div
                      className="absolute -right-2.5 top-[29px] z-10 hidden w-5 border-t-2 border-dashed border-[#CBD5E1] lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. DOCUMENTS + BEFORE YOU START
      ========================================================= */}
      <section className="border-t border-[#E2E8F0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
            {/* Documents you'll need */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl">
                Documents you&apos;ll need
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {documents.map((doc) => {
                  const Icon = doc.icon;

                  return (
                    <div
                      key={doc.title}
                      className="flex min-h-[82px] items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${doc.iconStyle}`}
                      >
                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-[#172554]">
                          {doc.title}
                        </h3>
                        <p className="mt-0.5 truncate text-[11px] text-[#64748B]">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DigiLocker Notice Strip */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#DCE7F7] bg-[#EFF6FF] p-4">
                <ShieldCheck
                  size={19}
                  className="shrink-0 text-[#2563EB]"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#334155]">
                  Documents will be verified securely via{" "}
                  <span className="font-bold text-[#2563EB]">DigiLocker</span>{" "}
                  or manual upload.
                </p>
              </div>
            </div>

            {/* Before you start */}
            <aside className="rounded-2xl border border-[#DCE7F7] bg-[#F5F9FE] p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#172554]">
                Before you start
              </h3>

              <ul className="mt-5 space-y-4">
                {beforeYouStart.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-xs leading-relaxed text-[#475569]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. HELP CTA
      ========================================================= */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-2xl border border-[#D6E5F8] bg-[#EFF6FF] p-6 sm:p-8 lg:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDEBFC] text-[#172554]">
                <Headphones size={24} strokeWidth={2} aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#172554] sm:text-xl">
                  Need help with this service?
                </h2>
                <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
                  Our support team is here to assist you at every step.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/help/guides/vehicle-ownership-transfer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#AFC8EA] bg-white px-5 text-sm font-bold text-[#172554] shadow-2xs transition-colors hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
              >
                <FileText size={16} aria-hidden="true" />
                View User Guide
              </Link>

              <Link
                href="/help"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#172554] px-5 text-sm font-bold text-white !text-white shadow-2xs transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
              >
                <span className="text-white !text-white">Visit Help Center</span>
                <ArrowRight size={16} className="text-white !text-white" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
