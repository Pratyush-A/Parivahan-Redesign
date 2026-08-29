"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  Eye,
  FileCheck2,
  FileText,
  Headphones,
  Info,
  LockKeyhole,
  MapPin,
  ReceiptText,
  Search,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";

type CheckMode = "vehicle" | "challan" | "licence";

const checkModes = [
  {
    id: "vehicle" as const,
    label: "By Vehicle Number",
    icon: CarFront,
  },
  {
    id: "challan" as const,
    label: "By Challan Number",
    icon: ClipboardCheck,
  },
  {
    id: "licence" as const,
    label: "By Driving Licence",
    icon: FileCheck2,
  },
];

const recentActivity = [
  {
    status: "Payment Successful",
    number: "MH12AB1234",
    date: "05 May 2026",
    amount: "₹500",
    success: true,
  },
  {
    status: "Payment Pending",
    number: "MH12AB1234",
    date: "02 May 2026",
    amount: "₹1,000",
    success: false,
  },
  {
    status: "Payment Successful",
    number: "MH14CD5678",
    date: "28 Apr 2026",
    amount: "₹750",
    success: true,
  },
];

const paymentSteps = [
  {
    step: "01",
    icon: CreditCard,
    title: "Make Payment",
    text: "Pay securely using UPI, Card, Net Banking or Wallet.",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: "Payment Confirmation",
    text: "You will receive an instant payment confirmation.",
  },
  {
    step: "03",
    icon: ReceiptText,
    title: "Challan Updated",
    text: "The challan status will be updated in the system within a few hours.",
  },
  {
    step: "04",
    icon: Bell,
    title: "Get Notified",
    text: "We will send you an SMS and Email confirmation.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    text: "100% secure and trusted payment gateway.",
  },
  {
    icon: FileText,
    title: "Instant Receipt",
    text: "Download receipt immediately after successful payment.",
  },
  {
    icon: CalendarDays,
    title: "24x7 Availability",
    text: "Check and pay challans anytime, anywhere.",
  },
  {
    icon: Headphones,
    title: "Dispute a Challan",
    text: "Found a mistake? You can raise a dispute online.",
  },
];

const modeContent: Record<
  CheckMode,
  {
    label: string;
    placeholder: string;
    info: string;
  }
> = {
  vehicle: {
    label: "Vehicle Number",
    placeholder: "e.g. MH12AB1234",
    info: "Enter your vehicle number to see all related challans.",
  },
  challan: {
    label: "Challan Number",
    placeholder: "e.g. CHL123456789",
    info: "Enter your challan number to view its current status.",
  },
  licence: {
    label: "Driving Licence Number",
    placeholder: "e.g. MH1220200012345",
    info: "Enter your driving licence number to see related challans.",
  },
};

function OverviewRow({
  icon: Icon,
  iconClass,
  label,
  value,
  valueClass,
  href,
  last,
}: {
  icon: typeof FileText;
  iconClass: string;
  label: string;
  value: string;
  valueClass?: string;
  href?: string;
  last?: boolean;
}) {
  const content = (
    <>
      <div
        className={[
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          iconClass,
        ].join(" ")}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-[#475569]">{label}</p>

        <p
          className={[
            "mt-0.5 text-sm font-bold",
            valueClass ?? "text-[#172554]",
          ].join(" ")}
        >
          {value}
        </p>
      </div>

      {!last && (
        <ChevronRight
          size={17}
          className="shrink-0 text-[#94A3B8]"
        />
      )}
    </>
  );

  return (
    <div
      className={[
        "flex min-h-[68px] items-center gap-3",
        !last ? "border-b border-[#E2E8F0]" : "",
      ].join(" ")}
    >
      {href ? (
        <Link
          href={href}
          className="flex w-full items-center gap-3 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

export default function ChallanLandingPage() {
  const [mode, setMode] = useState<CheckMode>("vehicle");
  const [value, setValue] = useState("MH12AB1234");
  const [ownerName, setOwnerName] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [showResultsToast, setShowResultsToast] = useState(false);

  function handleModeChange(nextMode: CheckMode) {
    setMode(nextMode);
    setValue("");
    setError("");
  }

  function handleSearch() {
    if (!value.trim()) {
      setError(
        `Enter your ${modeContent[mode].label.toLowerCase()} to continue.`,
      );
      return;
    }

    setError("");
    setShowResultsToast(true);
    setTimeout(() => setShowResultsToast(false), 4000);
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]"
    >
      {/* Toast alert */}
      {showResultsToast && (
        <div
          className="fixed right-5 top-24 z-[90] flex max-w-[360px] items-start gap-3 rounded-xl border border-[#BBF7D0] bg-white px-4 py-3 shadow-xl"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#15803D]" />
          <div>
            <p className="text-xs font-bold text-[#172554]">
              Found 2 pending challans for {value}
            </p>
            <p className="mt-0.5 text-[11px] text-[#64748B]">
              Total amount due: ₹1,500. Pay before 25 May 2026.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          1. BREADCRUMB
      ===================================================== */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
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
              href="/services"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Services
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <span className="font-semibold text-[#172554]" aria-current="page">
              Challan
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
            Check Challan
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Check pending traffic challans, pay online and stay on the right side of the road.
          </p>
        </div>
      </section>

      {/* =====================================================
          3. MAIN CHECK CHALLAN AREA (2 COLUMNS)
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[1.85fr_1fr]">
          {/* LEFT CARD: SEARCH FORM */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
            <div className="p-5 sm:p-6 pb-4">
              <h2 className="text-base font-bold text-[#172554]">
                Choose how you want to check
              </h2>
            </div>

            {/* Tabs */}
            <div
              className="grid border-y border-[#E2E8F0] sm:grid-cols-3"
              role="tablist"
              aria-label="Choose challan search method"
            >
              {checkModes.map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleModeChange(item.id)}
                    className={[
                      "relative flex min-h-[64px] items-center justify-center gap-2.5 px-4 text-xs font-bold transition sm:border-r border-[#E2E8F0] last:border-r-0",
                      active
                        ? "bg-white text-[#2563EB]"
                        : "text-[#172554] hover:bg-[#F8FAFC]",
                    ].join(" ")}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className={active ? "text-[#2563EB]" : "text-[#172554]"}
                    />

                    {item.label}

                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-6">
              {/* Information Strip */}
              <div className="flex items-center gap-3 rounded-xl bg-[#EFF6FF] px-4 py-3 border border-[#DBEAFE]">
                <Info size={18} className="shrink-0 text-[#2563EB]" />
                <p className="text-xs text-[#334155]">
                  {modeContent[mode].info}
                </p>
              </div>

              {/* Vehicle Form */}
              <form
                className="mt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <label
                  htmlFor="challan-input"
                  className="block text-xs font-bold text-[#172554]"
                >
                  {modeContent[mode].label} <span className="text-[#B91C1C]">*</span>
                </label>

                <div className="mt-2 flex min-h-[46px] overflow-hidden rounded-xl border border-[#CBD5E1] bg-white transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                  {mode === "vehicle" && (
                    <button
                      type="button"
                      className="flex w-[88px] shrink-0 items-center justify-center gap-1.5 border-r border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#172554]"
                    >
                      IND
                      <ChevronDown size={13} className="text-[#64748B]" />
                    </button>
                  )}

                  <input
                    id="challan-input"
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value.toUpperCase());
                      if (error) setError("");
                    }}
                    placeholder={modeContent[mode].placeholder}
                    className="min-w-0 flex-1 bg-transparent px-4 text-xs font-medium text-[#172554] outline-none placeholder:text-[#94A3B8]"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "challan-error" : undefined}
                  />
                </div>

                {mode === "vehicle" && (
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A56DB] hover:underline"
                  >
                    Don&apos;t know your vehicle number?
                    <ChevronDown size={13} />
                  </button>
                )}

                {mode === "vehicle" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="owner-name"
                        className="block text-xs font-bold text-[#172554]"
                      >
                        Owner Name{" "}
                        <span className="font-normal text-[#64748B]">(Optional)</span>
                      </label>

                      <input
                        id="owner-name"
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Enter owner name"
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 placeholder:text-[#94A3B8]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="reg-state"
                        className="block text-xs font-bold text-[#172554]"
                      >
                        Registration State{" "}
                        <span className="font-normal text-[#64748B]">(Optional)</span>
                      </label>

                      <div className="relative mt-1.5">
                        <select
                          id="reg-state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="min-h-[44px] w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-3.5 pr-8 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                        >
                          <option value="">Select State</option>
                          <option value="MH">Maharashtra</option>
                          <option value="DL">Delhi</option>
                          <option value="KA">Karnataka</option>
                          <option value="GJ">Gujarat</option>
                          <option value="TN">Tamil Nadu</option>
                          <option value="UP">Uttar Pradesh</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <p
                    id="challan-error"
                    role="alert"
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C]"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </p>
                )}

                {/* Primary Search Button */}
                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  <Search size={15} className="text-white !text-white" />
                  <span className="text-white !text-white">Check Challan</span>
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-[#64748B]">
                  <LockKeyhole size={13} className="text-[#15803D]" />
                  <span>Your information is safe and secure with us.</span>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT CARD: CHALLAN OVERVIEW */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
            <div>
              <h2 className="text-base font-bold text-[#172554]">
                Challan Overview
              </h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                All your vehicle challans at a glance
              </p>

              <div className="mt-5">
                <OverviewRow
                  icon={FileText}
                  iconClass="bg-[#FEF2F2] text-[#EF4444]"
                  label="Pending Challans"
                  value="2"
                  valueClass="text-[#B91C1C]"
                  href="#recent-activity"
                />

                <OverviewRow
                  icon={WalletCards}
                  iconClass="bg-[#FFFBEB] text-[#F59E0B]"
                  label="Total Amount Due"
                  value="₹1,500"
                  valueClass="text-[#DC2626]"
                  href="#recent-activity"
                />

                <OverviewRow
                  icon={CalendarDays}
                  iconClass="bg-[#DCFCE7] text-[#15803D]"
                  label="Pay Before"
                  value="25 May 2026"
                  href="#recent-activity"
                />

                <OverviewRow
                  icon={ShieldCheck}
                  iconClass="bg-[#EFF6FF] text-[#2563EB]"
                  label="Last Updated"
                  value="12 May 2026, 10:30 AM"
                  last
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-6 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#2563EB] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
            >
              <Eye size={16} />
              View All Challans
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. RECENT CHALLAN ACTIVITY
      ===================================================== */}
      <section id="recent-activity" className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#172554]">
                Recent challan activity
              </h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Your recent transactions and payments
              </p>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="text-xs font-bold text-[#1A56DB] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="mt-4 grid divide-y divide-[#E2E8F0] md:grid-cols-3 md:divide-x md:divide-y-0">
            {recentActivity.map((item) => (
              <div
                key={`${item.number}-${item.date}`}
                className="flex min-h-[72px] items-center gap-3 py-3 first:pt-0 last:pb-0 md:px-5 md:py-1 first:md:pl-0 last:md:pr-0"
              >
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    item.success
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-[#FEF2F2] text-[#EF4444]",
                  ].join(" ")}
                >
                  {item.success ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={[
                      "text-xs font-bold",
                      item.success ? "text-[#172554]" : "text-[#B91C1C]",
                    ].join(" ")}
                  >
                    {item.status}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    {item.number}
                  </p>

                  <p className="text-[10px] text-[#64748B]">
                    {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "text-xs font-bold",
                      item.success ? "text-[#172554]" : "text-[#DC2626]",
                    ].join(" ")}
                  >
                    {item.amount}
                  </span>

                  <ChevronRight size={15} className="text-[#94A3B8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          5. WHAT HAPPENS AFTER PAYMENT
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-[#F3E8D4] bg-[#FFFDF8] p-6 shadow-2xs sm:p-8">
          <h2 className="text-center text-lg font-bold text-[#172554] sm:text-xl">
            What happens after you pay a challan?
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {paymentSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9DCFF] bg-[#EFF6FF] text-[#2563EB] shadow-xs">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-3.5 text-xs font-bold text-[#172554]">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 max-w-[200px] text-[11px] leading-relaxed text-[#64748B]">
                    {step.text}
                  </p>

                  {index < paymentSteps.length - 1 && (
                    <ArrowRight
                      size={20}
                      className="absolute -right-3 top-5 hidden text-[#94A3B8] lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Important notice inside payment section */}
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-[#F6D58A] bg-[#FFFBEB] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-[#F59E0B]"
              />

              <div>
                <p className="text-xs font-bold text-[#78350F]">
                  Important
                </p>
                <p className="mt-0.5 text-xs text-[#92400E]">
                  Please pay before the due date to avoid additional late fee and legal action.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowKnowMore(true)}
              className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#AFC8F5] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
            >
              Know More
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          6. FEATURE CARDS + OFFLINE ASSISTANCE
      ===================================================== */}
      <section className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-[1fr_300px]">
          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center shadow-2xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-3.5 text-xs font-bold text-[#172554]">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#64748B]">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Offline Assistance Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#C9DCFF] bg-[#EFF6FF] p-6 shadow-2xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-2xs border border-[#E2E8F0]">
                <MapPin size={20} />
              </div>

              <h2 className="mt-4 text-sm font-bold text-[#172554]">
                Need Offline Assistance?
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">
                Visit a nearby CSC centre for assisted challan check and payment.
              </p>
            </div>

            <Link
              href="/rto"
              className="mt-5 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#AFC8F5] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#F8FAFC]"
            >
              <MapPin size={14} />
              Find CSC Centre
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          7. HELP BANNER
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-4 rounded-2xl border border-[#F6D58A] bg-[#FFFBEB] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
              <Headphones size={21} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#78350F]">
                Need Help?
              </h2>

              <p className="mt-0.5 text-xs text-[#92400E]">
                Our support team is here to help you with your challan related queries.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Link
              href="/help"
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
            >
              <Headphones size={14} />
              Contact Support
            </Link>

            <Link
              href="/help"
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-[#AFC8F5] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
            >
              Help Center
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          8. OFFICIAL NOTE RIBBON
      ===================================================== */}
      <div className="mt-4 border-t border-[#E2E8F0] bg-white py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
          <LockKeyhole size={13} className="text-[#15803D]" />
          <span>This is an official website of the Ministry of Road Transport and Highways (MoRTH), Government of India.</span>
        </p>
      </div>

      {/* =====================================================
          KNOW MORE MODAL
      ===================================================== */}
      {showKnowMore && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="challan-info-title"
        >
          <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <Info size={20} />
                </div>

                <div>
                  <h2
                    id="challan-info-title"
                    className="text-base font-bold text-[#172554]"
                  >
                    About challan payments
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Important regulations and due date guidelines.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowKnowMore(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 space-y-3.5 text-xs leading-relaxed text-[#475569]">
              <p>
                Traffic e-Challans issued across India are subject to the Motor Vehicles (Amendment) Act. Unpaid challans beyond 60 days may be forwarded to the Virtual Court or Virtual RTO.
              </p>

              <p>
                Paying before the stipulated due date ensures smooth renewal of vehicle fitness, insurance, and ownership transfers without administrative holds.
              </p>

              <div className="rounded-xl border border-[#D6E6FF] bg-[#EFF6FF] p-3.5">
                <p className="font-bold text-[#172554]">
                  Need offline assistance or dispute support?
                </p>
                <p className="mt-1 text-[11px] text-[#334155]">
                  You can visit any authorized Common Service Centre (CSC) or raise a dispute online with supporting photographic proof.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowKnowMore(false)}
              className="mt-6 min-h-[44px] w-full rounded-xl bg-[#172554] text-xs font-bold text-white !text-white transition hover:bg-[#1E3A8A]"
            >
              <span className="text-white !text-white">Got it</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
