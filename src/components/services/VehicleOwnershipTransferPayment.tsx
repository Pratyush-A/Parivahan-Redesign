"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Headphones,
  Info,
  Lock,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type PaymentMethod = "upi" | "card" | "netbanking";

const fees = [
  {
    title: "Government Fee",
    description: "Ownership transfer fee",
    amount: 150,
  },
  {
    title: "Smart Card / RC Fee",
    description: "",
    amount: 200,
  },
  {
    title: "Service / Processing Fee",
    description: "",
    amount: 50,
  },
];

const stepperSteps = [
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
    description: "You are here",
    status: "current",
  },
  {
    number: "04",
    title: "Verification",
    description: "RTO verification and ownership update",
    status: "upcoming",
  },
];

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Axis Bank",
  "Canara Bank",
  "Union Bank of India",
];

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

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

/* ==========================================================================
   NPCI / UPI QR CODE MOCKUP SVG
   ========================================================================== */
function QrMockup() {
  return (
    <div className="relative flex h-[160px] w-[160px] shrink-0 items-center justify-center rounded-xl border border-[#CBD5E1] bg-white p-2.5 shadow-2xs">
      <svg viewBox="0 0 120 120" className="h-full w-full text-[#111827]" fill="currentColor">
        {/* Top-Left Finder */}
        <rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="13" y="13" width="14" height="14" rx="2" fill="currentColor" />

        {/* Top-Right Finder */}
        <rect x="84" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="93" y="13" width="14" height="14" rx="2" fill="currentColor" />

        {/* Bottom-Left Finder */}
        <rect x="4" y="84" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="13" y="93" width="14" height="14" rx="2" fill="currentColor" />

        {/* QR Data Pattern Grid */}
        <rect x="44" y="8" width="6" height="6" rx="1" />
        <rect x="56" y="8" width="6" height="6" rx="1" />
        <rect x="68" y="8" width="6" height="6" rx="1" />

        <rect x="44" y="20" width="6" height="6" rx="1" />
        <rect x="60" y="20" width="10" height="6" rx="1" />

        <rect x="8" y="44" width="6" height="6" rx="1" />
        <rect x="20" y="44" width="10" height="6" rx="1" />
        <rect x="44" y="44" width="6" height="6" rx="1" />
        <rect x="68" y="44" width="8" height="6" rx="1" />
        <rect x="84" y="44" width="6" height="6" rx="1" />
        <rect x="96" y="44" width="14" height="6" rx="1" />

        <rect x="8" y="56" width="14" height="6" rx="1" />
        <rect x="30" y="56" width="6" height="6" rx="1" />
        <rect x="84" y="56" width="10" height="6" rx="1" />
        <rect x="102" y="56" width="8" height="6" rx="1" />

        <rect x="8" y="68" width="8" height="6" rx="1" />
        <rect x="24" y="68" width="6" height="6" rx="1" />
        <rect x="44" y="68" width="8" height="6" rx="1" />
        <rect x="68" y="68" width="6" height="6" rx="1" />
        <rect x="84" y="68" width="6" height="6" rx="1" />
        <rect x="100" y="68" width="10" height="6" rx="1" />

        <rect x="44" y="84" width="6" height="8" rx="1" />
        <rect x="56" y="84" width="12" height="6" rx="1" />
        <rect x="84" y="84" width="8" height="8" rx="1" />
        <rect x="100" y="84" width="8" height="6" rx="1" />

        <rect x="44" y="98" width="10" height="6" rx="1" />
        <rect x="60" y="98" width="6" height="10" rx="1" />
        <rect x="74" y="98" width="10" height="6" rx="1" />
        <rect x="92" y="98" width="16" height="6" rx="1" />
      </svg>

      {/* Center UPI Badge */}
      <div className="absolute flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white p-0.5 shadow-xs">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M4 17L12 3L20 17H4Z" fill="#F59E0B" />
          <path d="M8 17L12 10L16 17H8Z" fill="#15803D" />
        </svg>
      </div>
    </div>
  );
}

export default function VehicleOwnershipTransferPayment() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("rajesh.sharma@okaxis");
  const [upiVerified, setUpiVerified] = useState(true);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState("4532 8765 1092 3456");
  const [expiry, setExpiry] = useState("08/29");
  const [cvv, setCvv] = useState("842");
  const [cardName, setCardName] = useState("Rajesh Kumar Sharma");

  // Net banking
  const [bank, setBank] = useState("State Bank of India");

  // Processing & Success State
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = useMemo(
    () => fees.reduce((sum, fee) => sum + fee.amount, 0),
    [],
  );

  function handleVerifyUpi() {
    if (!upiId.includes("@")) return;
    setIsVerifyingUpi(true);
    setUpiVerified(false);

    window.setTimeout(() => {
      setIsVerifyingUpi(false);
      setUpiVerified(true);
    }, 500);
  }

  function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1500);
  }

  function handleSaveForLater() {
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]">
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
              Payment
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
              Review your fees and complete the payment.
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
        <form
          onSubmit={handlePayment}
          className="grid items-start gap-6 lg:grid-cols-[1fr_320px]"
        >
          {/* =================================================
              LEFT COLUMN: REVIEW, PAYMENT METHODS & ACTION
          ================================================= */}
          <div className="space-y-6">
            {/* Card 1: 3. Review and pay */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <span className="text-base font-bold">₹</span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    3. Review and pay
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Your application is ready for payment. Review the charges below before continuing.
                  </p>
                </div>
              </div>

              {/* Fee Breakdown Table */}
              <div className="mt-6 divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0]">
                {fees.map((fee) => (
                  <div
                    key={fee.title}
                    className="flex items-center justify-between p-4 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#172554]">{fee.title}</p>
                      {fee.description && (
                        <p className="mt-0.5 text-[11px] text-[#64748B]">
                          {fee.description}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-[#172554]">
                      {formatCurrency(fee.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-dashed border-[#CBD5E1]" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#172554]">
                  Total amount
                </span>

                <span className="text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl">
                  {formatCurrency(total)}
                </span>
              </div>
            </section>

            {/* Card 2: Choose a payment method */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <h2 className="text-base font-bold text-[#172554]">
                Choose a payment method
              </h2>

              {/* 3 Selectable Rows */}
              <div
                className="mt-5 divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0]"
                role="radiogroup"
                aria-label="Payment method"
              >
                {/* 1. UPI */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === "upi"}
                  onClick={() => setPaymentMethod("upi")}
                  className={[
                    "flex min-h-[64px] w-full items-center justify-between p-4 text-left transition-colors",
                    paymentMethod === "upi"
                      ? "bg-[#F4F8FF]"
                      : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        paymentMethod === "upi"
                          ? "border-[#2563EB]"
                          : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {paymentMethod === "upi" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">UPI</p>
                      <p className="text-[11px] text-[#64748B]">Pay using any UPI app</p>
                    </div>
                  </div>

                  {/* UPI Badge */}
                  <div className="flex items-center gap-1 rounded bg-white px-2 py-1 shadow-2xs border border-[#E2E8F0]">
                    <span className="text-[11px] font-black italic tracking-tighter text-[#2563EB]">UPI</span>
                    <span className="h-3 w-1 bg-[#15803D] rounded-xs" />
                  </div>
                </button>

                {/* 2. Debit / Credit Card */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                  className={[
                    "flex min-h-[64px] w-full items-center justify-between p-4 text-left transition-colors",
                    paymentMethod === "card"
                      ? "bg-[#F4F8FF]"
                      : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        paymentMethod === "card"
                          ? "border-[#2563EB]"
                          : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {paymentMethod === "card" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">Debit / Credit Card</p>
                      <p className="text-[11px] text-[#64748B]">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>

                  {/* Card Brand Badges */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold italic text-[#1A56DB]">VISA</span>
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#EB001B] opacity-90" />
                      <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
                    </span>
                    <span className="rounded bg-[#0EA5E9]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#0284C7]">RuPay</span>
                  </div>
                </button>

                {/* 3. Net Banking */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === "netbanking"}
                  onClick={() => setPaymentMethod("netbanking")}
                  className={[
                    "flex min-h-[64px] w-full items-center justify-between p-4 text-left transition-colors",
                    paymentMethod === "netbanking"
                      ? "bg-[#F4F8FF]"
                      : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        paymentMethod === "netbanking"
                          ? "border-[#2563EB]"
                          : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {paymentMethod === "netbanking" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">Net Banking</p>
                      <p className="text-[11px] text-[#64748B]">Pay through your bank</p>
                    </div>
                  </div>

                  <Building2 size={18} className="text-[#64748B]" aria-hidden="true" />
                </button>
              </div>

              {/* UPI PAYMENT PANEL */}
              {paymentMethod === "upi" && (
                <div className="mt-5 rounded-xl border border-[#DCE7F7] bg-[#F5F9FE] p-5">
                  <h3 className="text-xs font-bold text-[#172554]">
                    Pay with UPI
                  </h3>

                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    Enter your UPI ID or scan the QR code to pay.
                  </p>

                  {/* UPI Field */}
                  <div className="mt-4">
                    <label htmlFor="upi-id-input" className="block text-[11px] font-bold text-[#172554]">
                      UPI ID
                    </label>

                    <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                      <input
                        id="upi-id-input"
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                        placeholder="example@upi"
                        className="min-h-[42px] flex-1 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                      />

                      <button
                        type="button"
                        onClick={handleVerifyUpi}
                        className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-[#2563EB] bg-white px-5 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                      >
                        {isVerifyingUpi ? "Verifying..." : "Verify UPI ID"}
                      </button>
                    </div>

                    {upiVerified && (
                      <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#15803D]">
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        Verified: Rajesh Kumar Sharma (OKAxis)
                      </p>
                    )}
                  </div>

                  {/* Divider: or */}
                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                    <span className="text-[11px] font-medium text-[#64748B]">or</span>
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                  </div>

                  {/* QR Section */}
                  <div>
                    <p className="text-xs font-semibold text-[#334155]">
                      Scan the QR code using your UPI app
                    </p>

                    <div className="mt-3.5 flex flex-col items-center gap-5 sm:flex-row">
                      <QrMockup />

                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#172554] shadow-2xs border border-[#E2E8F0]">
                            <Smartphone size={14} />
                          </div>
                          <span className="text-xs font-medium text-[#334155]">
                            Open any UPI app on your phone
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#172554] shadow-2xs border border-[#E2E8F0]">
                            <QrCode size={14} />
                          </div>
                          <span className="text-xs font-medium text-[#334155]">
                            Scan the QR code
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#172554] shadow-2xs border border-[#E2E8F0]">
                            <ShieldCheck size={14} />
                          </div>
                          <span className="text-xs font-medium text-[#334155]">
                            Approve the payment
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-[#64748B]">
                      QR code is valid for <span className="font-bold text-[#172554]">10:00 minutes</span>
                    </p>
                  </div>
                </div>
              )}

              {/* CARD PAYMENT PANEL */}
              {paymentMethod === "card" && (
                <div className="mt-5 rounded-xl border border-[#DCE7F7] bg-[#F5F9FE] p-5">
                  <h3 className="text-xs font-bold text-[#172554]">
                    Pay with Card
                  </h3>

                  <div className="mt-4 space-y-3.5">
                    <div>
                      <label htmlFor="card-number-input" className="block text-[11px] font-bold text-[#172554]">
                        Card Number
                      </label>
                      <input
                        id="card-number-input"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="expiry-input" className="block text-[11px] font-bold text-[#172554]">
                          Expiry
                        </label>
                        <input
                          id="expiry-input"
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="mt-1 min-h-[42px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv-input" className="block text-[11px] font-bold text-[#172554]">
                          CVV
                        </label>
                        <input
                          id="cvv-input"
                          type="password"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="•••"
                          className="mt-1 min-h-[42px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cardname-input" className="block text-[11px] font-bold text-[#172554]">
                        Name on Card
                      </label>
                      <input
                        id="cardname-input"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Enter name as on card"
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NET BANKING PANEL */}
              {paymentMethod === "netbanking" && (
                <div className="mt-5 rounded-xl border border-[#DCE7F7] bg-[#F5F9FE] p-5">
                  <h3 className="text-xs font-bold text-[#172554]">
                    Pay with Net Banking
                  </h3>

                  <div className="mt-4">
                    <label htmlFor="bank-select" className="block text-[11px] font-bold text-[#172554]">
                      Select your bank
                    </label>

                    <select
                      id="bank-select"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    >
                      {banks.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 rounded-lg border border-[#D6E6FF] bg-[#EFF6FF] p-3">
                    <p className="text-[11px] text-[#334155]">
                      You&apos;ll be securely redirected to your bank&apos;s verified portal to complete payment.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Bottom Action Bar */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href="/services/vehicle/ownership-transfer/documents"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    Back to Documents
                  </Link>

                  <p className="mt-2 text-[11px] text-[#64748B]">
                    You can go back and edit your documents.
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end">
                  <div className="mb-2 text-right">
                    <p className="text-[10px] text-[#64748B]">Total payable</p>
                    <p className="text-xl font-bold text-[#172554]">{formatCurrency(total)}</p>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#172554] px-8 text-sm font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                  >
                    <span className="text-white !text-white">Pay {formatCurrency(total)} securely</span>
                    <ArrowRight size={16} className="text-white !text-white" aria-hidden="true" />
                  </button>

                  <p className="mt-2 flex items-center gap-1 text-[11px] text-[#64748B]">
                    <Lock size={11} className="text-[#94A3B8]" aria-hidden="true" />
                    Secure government payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN: SIDEBAR
          ================================================= */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Card 1: Application summary */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Application summary
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

                <p className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                  <CheckCircle2 size={15} strokeWidth={2.5} aria-hidden="true" />
                  Documents verified
                </p>
              </div>
            </div>

            {/* Card 2: Your journey */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Your journey
              </h2>

              <ol className="mt-5 space-y-4">
                {/* Step 01 */}
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

                {/* Step 02 */}
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
                      <p className="text-xs font-bold text-[#172554]">Documents</p>
                      <p className="text-[11px] text-[#15803D]">Completed</p>
                    </div>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </div>
                </li>

                {/* Step 03 (Active) */}
                <li className="relative flex items-start gap-3">
                  <span
                    className="absolute left-3.5 top-7 h-[calc(100%+8px)] w-px bg-[#CBD5E1]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white shadow-xs">
                    03
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#172554]">Payment</p>
                    <p className="text-[11px] font-medium text-[#2563EB]">You are here</p>
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

            {/* Card 3: Before you pay */}
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5 shadow-2xs sm:p-6">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 shrink-0 text-[#B45309]" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-bold text-[#78350F]">
                    Before you pay
                  </h2>

                  <ul className="mt-4 space-y-2.5">
                    {[
                      "Review the total amount carefully.",
                      "Payment once initiated may not be reversible.",
                      "Keep your payment receipt for future reference.",
                      "You can track the application from My Applications.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[11px] leading-relaxed text-[#92400E]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B45309]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: Need help? */}
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
                  className="flex min-h-[40px] items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} aria-hidden="true" />
                    View User Guide
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
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

            {/* Card 5: Your data is safe with us */}
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
        </form>
      </div>

      {/* =====================================================
          5. PROCESSING / SUCCESS MODAL
      ===================================================== */}
      {(processing || success) && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-status-title"
        >
          <div className="w-full max-w-[440px] rounded-2xl bg-white p-7 text-center shadow-2xl">
            {processing ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#BFDBFE] border-t-[#2563EB]" />
                </div>

                <h2
                  id="payment-status-title"
                  className="mt-5 text-lg font-bold text-[#172554]"
                >
                  Processing your payment
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                  Please don&apos;t close or refresh this page.
                </p>

                <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <p className="text-[10px] text-[#64748B]">Payment reference</p>
                  <p className="mt-0.5 text-xs font-bold text-[#172554]">PAY-2026-483921</p>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                  <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>

                <h2
                  id="payment-status-title"
                  className="mt-4 text-xl font-bold text-[#172554]"
                >
                  Payment successful
                </h2>

                <p className="mt-2 text-3xl font-bold tracking-tight text-[#172554]">
                  {formatCurrency(total)}
                </p>

                <p className="mx-auto mt-3 max-w-[340px] text-xs leading-relaxed text-[#64748B]">
                  Your ownership-transfer application has been submitted for RTO verification.
                </p>

                <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">Payment reference</span>
                    <span className="text-xs font-bold text-[#172554]">PAY-2026-483921</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
                    <span className="text-[11px] text-[#64748B]">Application number</span>
                    <span className="text-xs font-bold text-[#172554]">VT-2026-001284</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <Link
                    href="/applications/VT-2026-001284"
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A]"
                  >
                    <span className="text-white !text-white">View Application Status</span>
                    <ArrowRight size={15} className="text-white !text-white" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] px-5 text-xs font-bold text-[#172554] transition hover:bg-[#F8F9FA]"
                  >
                    <Download size={14} />
                    Download Receipt
                  </button>
                </div>
              </>
            )}
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
