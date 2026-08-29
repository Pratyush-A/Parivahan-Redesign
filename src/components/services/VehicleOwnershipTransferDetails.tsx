"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  CarFront,
  Check,
  ChevronDown,
  FileText,
  Headphones,
  Info,
  Lock,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

type Role = "seller" | "buyer";

type FormValues = {
  vehicleNumber: string;
  sellerName: string;
  sellerMobile: string;
  sellerEmail: string;
  buyerName: string;
  buyerMobile: string;
  buyerEmail: string;
  buyerAddress: string;
};

const initialValues: FormValues = {
  vehicleNumber: "MH 12 AB 1234",
  sellerName: "Rajesh Kumar Sharma",
  sellerMobile: "9876543210",
  sellerEmail: "rajesh.sharma@gmail.com",
  buyerName: "Pratyush Acharya",
  buyerMobile: "9823456789",
  buyerEmail: "pratyushacharya34@gmail.com",
  buyerAddress: "Narmada Niwas, Niladri Vihar",
};

const stepperSteps = [
  {
    number: "01",
    title: "Details",
    description: "Enter vehicle and owner details",
    status: "current",
  },
  {
    number: "02",
    title: "Documents",
    description: "Upload and verify documents",
    status: "upcoming",
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

const beforeYouStart = [
  "Ensure the vehicle is not under loan or hypothecation.",
  "All challans should be cleared.",
  "Seller and buyer details must match the documents.",
  "The vehicle should be registered in the same state.",
];

function formatVehicleNumber(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 13);
}

/* ==========================================================================
   CAR PREVIEW GRAPHIC (Modern White Hatchback matching reference UI)
   ========================================================================== */
function CarGraphic() {
  return (
    <div className="relative flex h-24 w-40 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 200 110"
        className="h-full w-full object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="100" cy="98" rx="80" ry="8" fill="#CBD5E1" opacity="0.6" />

        {/* Car Lower Body Base */}
        <path
          d="M 15 78 Q 20 62 48 58 L 65 34 Q 74 26 108 26 L 140 26 Q 158 26 168 42 L 184 62 Q 192 70 192 84 L 188 92 Q 186 94 176 94 L 24 94 Q 15 94 15 84 Z"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Car Roof & Pillars */}
        <path
          d="M 52 58 L 68 35 Q 74 28 104 28 L 138 28 Q 154 28 164 42 L 176 58 Z"
          fill="#E2E8F0"
        />

        {/* Windows */}
        <path
          d="M 72 36 L 105 36 L 105 56 L 56 56 Z"
          fill="#38BDF8"
          opacity="0.8"
        />
        <path
          d="M 110 36 L 138 36 Q 146 36 154 44 L 168 56 L 110 56 Z"
          fill="#38BDF8"
          opacity="0.8"
        />

        {/* Windshield divider pillar */}
        <rect x="105" y="34" width="5" height="24" fill="#64748B" />

        {/* Headlight (Left / Front facing angle) */}
        <path
          d="M 18 68 Q 24 64 32 66 L 30 76 Q 20 78 18 68 Z"
          fill="#FEF08A"
          stroke="#FACC15"
          strokeWidth="1"
        />

        {/* Front Grille */}
        <path
          d="M 15 76 Q 22 76 26 84 L 16 86 Z"
          fill="#1E293B"
        />

        {/* Side Character Line / Crease */}
        <path
          d="M 32 68 Q 100 66 182 66"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Door Handle */}
        <rect x="88" y="62" width="12" height="3" rx="1.5" fill="#94A3B8" />
        <rect x="132" y="62" width="12" height="3" rx="1.5" fill="#94A3B8" />

        {/* Wheels */}
        {/* Front Wheel */}
        <g transform="translate(48, 88)">
          <circle cx="0" cy="0" r="17" fill="#1E293B" />
          <circle cx="0" cy="0" r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
        </g>

        {/* Rear Wheel */}
        <g transform="translate(154, 88)">
          <circle cx="0" cy="0" r="17" fill="#1E293B" />
          <circle cx="0" cy="0" r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
        </g>
      </svg>
    </div>
  );
}

export default function VehicleOwnershipTransferDetails() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [role, setRole] = useState<Role>("seller");
  const [vehicleVerified, setVehicleVerified] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateValue(field: keyof FormValues, value: string) {
    setSaved(false);
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleVerifyVehicle() {
    if (values.vehicleNumber.trim().length < 4) return;

    setIsVerifying(true);
    setVehicleVerified(false);
    setSaved(false);

    window.setTimeout(() => {
      setIsVerifying(false);
      setVehicleVerified(true);
    }, 500);
  }

  function handleSaveForLater() {
    setSaved(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/services/vehicle/ownership-transfer/documents");
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

            <span className="font-semibold text-[#172554]" aria-current="page">
              Transfer Vehicle Ownership
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
              Complete the details below to start the ownership transfer.
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
              const isCurrent = step.status === "current";

              return (
                <li
                  key={step.number}
                  className="relative flex items-center gap-3.5 pr-2"
                >
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      isCurrent
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "bg-[#94A3B8] text-white",
                    ].join(" ")}
                  >
                    {step.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        "text-xs font-bold",
                        isCurrent ? "text-[#172554]" : "text-[#334155]",
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
          4. MAIN CONTENT (FORM + GUIDANCE SIDEBAR)
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-2 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-6 lg:grid-cols-[1fr_320px]"
        >
          {/* =================================================
              LEFT FORM AREA
          ================================================= */}
          <div className="space-y-6">
            {/* -----------------------------------------------
                SECTION 1: VEHICLE
            ----------------------------------------------- */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              {/* Header with blue circle icon */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <CarFront size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    1. Tell us about the vehicle
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Enter the vehicle registration number to fetch details.
                  </p>
                </div>
              </div>

              {/* Registration Input Field */}
              <div className="mt-6">
                <div className="flex items-center gap-1.5">
                  <label
                    htmlFor="vehicle-number-input"
                    className="text-xs font-bold text-[#172554]"
                  >
                    Vehicle Registration Number
                  </label>
                  <span
                    className="inline-flex cursor-help text-[#94A3B8] hover:text-[#64748B]"
                    title="As printed on your Vehicle Registration Certificate (RC)"
                  >
                    <Info size={13} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <div className="flex min-h-[46px] flex-1 items-center overflow-hidden rounded-xl border border-[#CBD5E1] bg-white transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                    <span className="flex h-full w-14 shrink-0 items-center justify-center border-r border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#172554]">
                      IND
                    </span>

                    <input
                      id="vehicle-number-input"
                      type="text"
                      value={values.vehicleNumber}
                      onChange={(event) => {
                        updateValue(
                          "vehicleNumber",
                          formatVehicleNumber(event.target.value),
                        );
                      }}
                      placeholder="MH 12 AB 1234"
                      className="min-w-0 flex-1 bg-transparent px-3.5 text-sm font-semibold tracking-wider text-[#172554] outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-[#94A3B8]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyVehicle}
                    disabled={isVerifying || !values.vehicleNumber.trim()}
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-[#172554] px-6 text-xs font-bold text-white shadow-2xs transition hover:bg-[#1E3A8A] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    {isVerifying ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Verifying...
                      </span>
                    ) : (
                      "Verify Vehicle"
                    )}
                  </button>
                </div>
              </div>

              {/* Verified Vehicle Result Card */}
              {vehicleVerified && (
                <div
                  className="mt-6 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] p-5 shadow-2xs"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#15803D]">
                        Vehicle found
                      </p>
                      <p className="text-[11px] text-[#15803D]/80">
                        Details fetched from VAHAN database
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-6 border-t border-[#BBF7D0] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Car Graphic + Model Info */}
                    <div className="flex items-center gap-4">
                      <CarGraphic />

                      <div>
                        <h3 className="text-sm font-bold text-[#172554]">
                          Maruti Suzuki Swift VXi
                        </h3>

                        <p className="mt-0.5 text-xs text-[#475569]">
                          2021 • Petrol • Manual
                        </p>

                        <p className="mt-1 text-xs font-bold text-[#172554]">
                          {values.vehicleNumber || "MH 12 AB 1234"}
                        </p>
                      </div>
                    </div>

                    {/* Metadata column */}
                    <div className="space-y-3 sm:border-l sm:border-[#BBF7D0] sm:pl-6">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">
                          Registration Date
                        </p>
                        <p className="text-xs font-bold text-[#172554]">
                          15 Jun 2021
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">
                          Vehicle Class
                        </p>
                        <p className="text-xs font-bold text-[#172554]">
                          Motor Car (LMV)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* -----------------------------------------------
                SECTION 2: USER ROLE
            ----------------------------------------------- */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <UserRound size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    2. Who are you in this transfer?
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Select your role to continue.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Current owner / Seller */}
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  className={[
                    "flex min-h-[96px] items-start gap-3.5 rounded-xl border p-4 text-left transition-all",
                    role === "seller"
                      ? "border-[#2563EB] bg-[#F4F8FF] ring-2 ring-[#2563EB]/15 shadow-2xs"
                      : "border-[#CBD5E1] bg-white hover:border-[#94A3B8]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      role === "seller"
                        ? "border-[#2563EB] bg-white"
                        : "border-[#94A3B8] bg-white",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {role === "seller" && (
                      <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                    )}
                  </span>

                  <div>
                    <p className="text-xs font-bold text-[#172554]">
                      Current owner / Seller
                    </p>

                    <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                      I am the current registered owner transferring this vehicle.
                    </p>
                  </div>
                </button>

                {/* New owner / Buyer */}
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={[
                    "flex min-h-[96px] items-start gap-3.5 rounded-xl border p-4 text-left transition-all",
                    role === "buyer"
                      ? "border-[#2563EB] bg-[#F4F8FF] ring-2 ring-[#2563EB]/15 shadow-2xs"
                      : "border-[#CBD5E1] bg-white hover:border-[#94A3B8]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      role === "buyer"
                        ? "border-[#2563EB] bg-white"
                        : "border-[#94A3B8] bg-white",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {role === "buyer" && (
                      <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                    )}
                  </span>

                  <div>
                    <p className="text-xs font-bold text-[#172554]">
                      New owner / Buyer
                    </p>

                    <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                      I am the new owner accepting this vehicle.
                    </p>
                  </div>
                </button>
              </div>
            </section>

            {/* -----------------------------------------------
                SECTION 3: CURRENT OWNER DETAILS
            ----------------------------------------------- */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <UserRound size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    3. Current owner details
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Enter the details of the current registered owner (Seller).
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="seller-name-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Full Name (as per RC)
                  </label>

                  <input
                    id="seller-name-input"
                    type="text"
                    value={values.sellerName}
                    onChange={(event) =>
                      updateValue("sellerName", event.target.value)
                    }
                    placeholder="Enter full name"
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="seller-mobile-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Mobile Number
                  </label>

                  <div className="mt-2 flex min-h-[44px] items-center overflow-hidden rounded-xl border border-[#CBD5E1] bg-white transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                    <div className="flex h-full items-center gap-1 border-r border-[#CBD5E1] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#475569]">
                      <span>+91</span>
                      <ChevronDown size={12} className="text-[#94A3B8]" />
                    </div>

                    <input
                      id="seller-mobile-input"
                      type="tel"
                      inputMode="numeric"
                      value={values.sellerMobile}
                      onChange={(event) =>
                        updateValue(
                          "sellerMobile",
                          event.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="Enter mobile number"
                      className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#172554] outline-none placeholder:text-[#94A3B8]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="seller-email-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Email (optional)
                  </label>

                  <input
                    id="seller-email-input"
                    type="email"
                    value={values.sellerEmail}
                    onChange={(event) =>
                      updateValue("sellerEmail", event.target.value)
                    }
                    placeholder="Enter email address"
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>
            </section>

            {/* -----------------------------------------------
                SECTION 4: NEW OWNER DETAILS
            ----------------------------------------------- */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <UserRound size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    4. New owner details
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Enter the details of the new owner (Buyer).
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="buyer-name-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Full Name (as per ID proof)
                  </label>

                  <input
                    id="buyer-name-input"
                    type="text"
                    value={values.buyerName}
                    onChange={(event) =>
                      updateValue("buyerName", event.target.value)
                    }
                    placeholder="Enter full name"
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="buyer-mobile-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Mobile Number
                  </label>

                  <div className="mt-2 flex min-h-[44px] items-center overflow-hidden rounded-xl border border-[#CBD5E1] bg-white transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                    <div className="flex h-full items-center gap-1 border-r border-[#CBD5E1] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#475569]">
                      <span>+91</span>
                      <ChevronDown size={12} className="text-[#94A3B8]" />
                    </div>

                    <input
                      id="buyer-mobile-input"
                      type="tel"
                      inputMode="numeric"
                      value={values.buyerMobile}
                      onChange={(event) =>
                        updateValue(
                          "buyerMobile",
                          event.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="Enter mobile number"
                      className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#172554] outline-none placeholder:text-[#94A3B8]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="buyer-email-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Email (optional)
                  </label>

                  <input
                    id="buyer-email-input"
                    type="email"
                    value={values.buyerEmail}
                    onChange={(event) =>
                      updateValue("buyerEmail", event.target.value)
                    }
                    placeholder="Enter email address"
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                  />
                </div>

                {/* Address (Full width) */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="buyer-address-input"
                    className="block text-xs font-bold text-[#172554]"
                  >
                    Address
                  </label>

                  <textarea
                    id="buyer-address-input"
                    rows={3}
                    value={values.buyerAddress}
                    onChange={(event) =>
                      updateValue("buyerAddress", event.target.value)
                    }
                    placeholder="Enter complete address"
                    className="mt-2 w-full resize-none rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                  />

                  <p className="mt-1.5 text-[11px] text-[#64748B]">
                    Address should match the address proof document.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------
                BOTTOM ACTION BAR
            ----------------------------------------------- */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <button
                    type="button"
                    onClick={handleSaveForLater}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    <Bookmark size={15} aria-hidden="true" />
                    Save & Exit
                  </button>

                  <p className="mt-2 text-[11px] text-[#64748B]">
                    You can resume later from &apos;My Applications&apos;
                  </p>

                  {saved && (
                    <p
                      className="mt-1 text-xs font-semibold text-[#15803D]"
                      role="status"
                      aria-live="polite"
                    >
                      ✓ Your progress has been saved.
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center sm:items-end">
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#172554] px-8 text-sm font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                  >
                    <span className="text-white !text-white">Continue</span>
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
              RIGHT SIDEBAR (GUIDANCE & TRUST)
          ================================================= */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Card 1: Your journey */}
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

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white shadow-xs">
                    01
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#172554]">
                      Details
                    </p>
                    <p className="text-[11px] font-medium text-[#2563EB]">
                      You are here
                    </p>
                  </div>
                </li>

                {/* Step 02 */}
                <li className="relative flex items-start gap-3">
                  <span
                    className="absolute left-3.5 top-7 h-[calc(100%+8px)] w-px bg-[#CBD5E1]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#94A3B8] text-[11px] font-bold text-white">
                    02
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#334155]">
                      Documents
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Upload and verify documents
                    </p>
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
                    <p className="text-xs font-bold text-[#334155]">
                      Payment
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Pay transfer fees online
                    </p>
                  </div>
                </li>

                {/* Step 04 */}
                <li className="relative flex items-start gap-3">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#94A3B8] text-[11px] font-bold text-white">
                    04
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#334155]">
                      Verification
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      RTO verifies and updates ownership
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Card 2: Before you start */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Before you start
              </h2>

              <ul className="mt-4 space-y-3.5">
                {beforeYouStart.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF7EF] text-[#15803D]">
                      <Check size={10} strokeWidth={3} aria-hidden="true" />
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
                  className="flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  Visit Help Center
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

              <div className="mt-5 flex items-center justify-center gap-4 rounded-xl bg-[#F8FAFC] p-3 border border-[#E2E8F0]">
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
          5. BOTTOM OFFICIAL MORTH NOTICE RIBBON
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
