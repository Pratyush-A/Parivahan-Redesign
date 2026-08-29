"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  Eye,
  FileText,
  Headphones,
  Info,
  LockKeyhole,
  MapPin,
  Pencil,
  Receipt,
  Search,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import PaymentGatewayDialog from "@/components/payment/PaymentGatewayDialog";

type Tab = "pending" | "paid";

type PendingChallan = {
  id: string;
  number: string;
  amount: number;
  date: string;
  time: string;
  location: string;
  violation: string;
  violationDetail: string;
  dueDate: string;
  daysLeft: number;
  section: string;
  officerId: string;
};

const pendingChallans: PendingChallan[] = [
  {
    id: "MH12052600012345",
    number: "MH12052600012345",
    amount: 1000,
    date: "05 May 2026",
    time: "11:15 AM",
    location: "Pune - Hinjewadi Phase 1",
    violation: "Over Speeding",
    violationDetail: "Exceeding 80 km/h in 60 km/h zone",
    dueDate: "25 May 2026",
    daysLeft: 20,
    section: "183(1) MV Act",
    officerId: "MH1205",
  },
  {
    id: "MH12052600067890",
    number: "MH12052600067890",
    amount: 500,
    date: "02 May 2026",
    time: "09:45 AM",
    location: "Pune - Katraj Bypass Road",
    violation: "No Parking",
    violationDetail: "Prohibited Area",
    dueDate: "22 May 2026",
    daysLeft: 17,
    section: "119/177 MV Act",
    officerId: "MH1202",
  },
];

const paidChallan = {
  id: "MH10042600033445",
  number: "MH10042600033445",
  amount: 500,
  date: "10 Apr 2026",
  time: "04:20 PM",
  location: "Pune - Baner Road",
  violation: "Red Light Jump",
  violationDetail: "Signal Violation",
  paidOn: "12 Apr 2026",
  paymentId: "PAY120426556677",
  section: "119 MV Act",
  officerId: "MH1010",
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({
  children,
  success = false,
}: {
  children: React.ReactNode;
  success?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-md px-2.5 py-0.5 text-[10px] font-bold",
        success
          ? "bg-[#DCFCE7] text-[#15803D]"
          : "bg-[#FEF2F2] text-[#B91C1C]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function DetailCell({
  icon: Icon,
  label,
  children,
  danger,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-[#64748B]">{label}</p>

      <div className="mt-1.5 flex items-start gap-1.5">
        <Icon
          size={14}
          className={[
            "mt-0.5 shrink-0",
            danger ? "text-[#B91C1C]" : "text-[#2563EB]",
          ].join(" ")}
        />

        <div
          className={[
            "text-xs font-semibold leading-relaxed",
            danger ? "text-[#B91C1C]" : "text-[#172554]",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  onClick,
}: {
  icon: typeof Eye;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[42px] flex-1 items-center justify-center gap-2 text-xs font-bold text-[#1A56DB] transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
    >
      <Icon size={15} />
      {children}
    </button>
  );
}

function PendingCard({
  challan,
  selected,
  expanded,
  onSelect,
  onToggle,
  onAction,
}: {
  challan: PendingChallan;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onAction: (msg: string) => void;
}) {
  return (
    <article
      className={[
        "overflow-hidden rounded-2xl border bg-white shadow-2xs transition",
        selected ? "border-[#93BDFD] ring-1 ring-[#2563EB]/20" : "border-[#E2E8F0]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          aria-label={`Select challan ${challan.number}`}
          className="h-5 w-5 shrink-0 rounded accent-[#2563EB] cursor-pointer"
        />

        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          aria-expanded={expanded}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#64748B]">Challan No.</p>
            <p className="mt-0.5 truncate text-xs font-bold text-[#172554] sm:text-sm">
              {challan.number}
            </p>
          </div>

          <StatusBadge>Pending</StatusBadge>

          <span className="text-sm font-bold text-[#DC2626] sm:text-base">
            {formatCurrency(challan.amount)}
          </span>

          <ChevronDown
            size={18}
            className={[
              "shrink-0 text-[#172554] transition-transform",
              expanded ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {expanded && (
        <>
          <div className="grid border-t border-[#E2E8F0] px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            <div className="border-b border-[#E2E8F0] pb-3 sm:border-r sm:pr-4 lg:border-b-0 lg:pb-0">
              <DetailCell icon={CalendarDays} label="Date & Time">
                <span>{challan.date}</span>
                <br />
                <span className="text-[11px] text-[#64748B]">{challan.time}</span>
              </DetailCell>
            </div>

            <div className="border-b border-[#E2E8F0] py-3 sm:border-b-0 sm:pl-4 sm:pr-4 lg:border-r lg:py-0">
              <DetailCell icon={MapPin} label="Location">
                {challan.location}
              </DetailCell>
            </div>

            <div className="border-b border-[#E2E8F0] py-3 sm:border-b-0 sm:pr-4 lg:border-r lg:py-0 lg:pl-4">
              <DetailCell icon={CircleHelp} label="Violation">
                <span>{challan.violation}</span>
                <br />
                <span className="text-[11px] font-normal text-[#64748B]">
                  ({challan.violationDetail})
                </span>
              </DetailCell>
            </div>

            <div className="pt-3 sm:pl-4 lg:pt-0">
              <DetailCell icon={CalendarDays} label="Due Date" danger>
                <span className="text-[#172554]">{challan.dueDate}</span>
                <br />
                <span className="text-[11px] text-[#DC2626]">{challan.daysLeft} days left</span>
              </DetailCell>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-[11px] text-[#475569] sm:px-6">
            <span>
              Vehicle Class:
              <strong className="ml-1 font-semibold text-[#172554]">LMV</strong>
            </span>

            <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

            <span>
              Offence Section:
              <strong className="ml-1 font-semibold text-[#172554]">
                {challan.section}
              </strong>
            </span>

            <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

            <span>
              Officer ID:
              <strong className="ml-1 font-semibold text-[#172554]">
                {challan.officerId}
              </strong>
            </span>
          </div>

          <div className="flex divide-x divide-[#E2E8F0] border-t border-[#E2E8F0]">
            <Link
              href={`/challan/${challan.id}`}
              className="flex min-h-[42px] flex-1 items-center justify-center gap-2 text-xs font-bold text-[#1A56DB] transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              <Eye size={15} />
              View Details
            </Link>

            <ActionButton
              icon={ShieldCheck}
              onClick={() => onAction(`Initiating dispute process for ${challan.number}`)}
            >
              Dispute Challan
            </ActionButton>

            <ActionButton
              icon={Download}
              onClick={() => onAction(`Challan details prepared for download.`)}
            >
              Download
            </ActionButton>
          </div>
        </>
      )}
    </article>
  );
}

function PaidCard({ onAction }: { onAction: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
          <Check size={13} strokeWidth={3} />
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          aria-expanded={expanded}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#64748B]">Challan No.</p>
            <p className="mt-0.5 truncate text-xs font-bold text-[#172554] sm:text-sm">
              {paidChallan.number}
            </p>
          </div>

          <StatusBadge success>Paid</StatusBadge>

          <span className="text-sm font-bold text-[#15803D] sm:text-base">
            {formatCurrency(paidChallan.amount)}
          </span>

          <ChevronDown
            size={18}
            className={[
              "shrink-0 text-[#172554] transition-transform",
              expanded ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {expanded && (
        <>
          <div className="grid border-t border-[#E2E8F0] px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            <div className="border-b border-[#E2E8F0] pb-3 sm:border-r sm:pr-4 lg:border-b-0 lg:pb-0">
              <DetailCell icon={CalendarDays} label="Date & Time">
                <span>{paidChallan.date}</span>
                <br />
                <span className="text-[11px] text-[#64748B]">{paidChallan.time}</span>
              </DetailCell>
            </div>

            <div className="border-b border-[#E2E8F0] py-3 sm:border-b-0 sm:pl-4 sm:pr-4 lg:border-r lg:py-0">
              <DetailCell icon={MapPin} label="Location">
                {paidChallan.location}
              </DetailCell>
            </div>

            <div className="border-b border-[#E2E8F0] py-3 sm:border-b-0 sm:pr-4 lg:border-r lg:py-0 lg:pl-4">
              <DetailCell icon={CircleHelp} label="Violation">
                <span>{paidChallan.violation}</span>
                <br />
                <span className="text-[11px] font-normal text-[#64748B]">
                  ({paidChallan.violationDetail})
                </span>
              </DetailCell>
            </div>

            <div className="pt-3 sm:pl-4 lg:pt-0">
              <DetailCell icon={CheckCircle2} label="Paid On">
                <span className="text-[#15803D]">{paidChallan.paidOn}</span>
                <br />
                <span className="text-[10px] font-normal text-[#64748B]">
                  ID: {paidChallan.paymentId}
                </span>
              </DetailCell>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-[11px] text-[#475569] sm:px-6">
            <span>
              Vehicle Class:
              <strong className="ml-1 text-[#172554]">LMV</strong>
            </span>

            <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

            <span>
              Offence Section:
              <strong className="ml-1 text-[#172554]">
                {paidChallan.section}
              </strong>
            </span>

            <span className="hidden h-3 w-px bg-[#CBD5E1] sm:block" />

            <span>
              Officer ID:
              <strong className="ml-1 text-[#172554]">
                {paidChallan.officerId}
              </strong>
            </span>
          </div>

          <div className="flex divide-x divide-[#E2E8F0] border-t border-[#E2E8F0]">
            <ActionButton
              icon={Receipt}
              onClick={() => onAction(`Receipt downloaded for ${paidChallan.paymentId}`)}
            >
              View Receipt
            </ActionButton>

            <ActionButton
              icon={Download}
              onClick={() => onAction(`Receipt prepared for download.`)}
            >
              Download
            </ActionButton>
          </div>
        </>
      )}
    </article>
  );
}

function SummaryRow({
  icon: Icon,
  iconClass,
  label,
  value,
  valueClass,
}: {
  icon: typeof FileText;
  iconClass: string;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex min-h-[64px] items-center gap-3 border-b border-[#E2E8F0] last:border-b-0">
      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          iconClass,
        ].join(" ")}
      >
        <Icon size={19} />
      </div>

      <p className="flex-1 text-xs font-medium text-[#475569]">{label}</p>

      <span
        className={[
          "text-xs font-bold sm:text-sm",
          valueClass ?? "text-[#172554]",
        ].join(" ")}
      >
        {value}
      </span>

      <ChevronRight size={15} className="text-[#94A3B8]" />
    </div>
  );
}

function TrustItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof LockKeyhole;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-[#2563EB]" />

      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="text-[9px] text-[#64748B]">{text}</p>
      </div>
    </div>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 17h14l-1-6H6l-1 6Z" />
      <path d="M7 11 8.5 7h7l1.5 4" />
      <path d="M7 17v2M17 17v2M5 14h14" />
      <circle cx="8" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
    </svg>
  );
}

function LandmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 9h18" />
      <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
      <path d="M3 18h18M2 21h20" />
      <path d="m4 7 8-4 8 4" />
    </svg>
  );
}

export default function ChallanResultsPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [toast, setToast] = useState<string | null>(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selected, setSelected] = useState<string[]>(
    pendingChallans.map((item) => item.id),
  );

  const [expanded, setExpanded] = useState<string[]>(
    pendingChallans.map((item) => item.id),
  );

  const totalSelected = useMemo(
    () =>
      pendingChallans
        .filter((item) => selected.includes(item.id))
        .reduce((total, item) => total + item.amount, 0),
    [selected],
  );

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function toggleSelected(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleSelectAll() {
    if (selected.length === pendingChallans.length) {
      setSelected([]);
    } else {
      setSelected(pendingChallans.map((item) => item.id));
    }
  }

  function toggleExpanded(id: string) {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function handlePayment() {
    if (!selected.length) return;
    setShowPaymentModal(true);
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F9FA] pb-36 text-[#111827]"
    >
      {/* Toast */}
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
              Results
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="bg-white py-6 border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
            Challan Results
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Review your challans below. Select and pay to clear them online.
          </p>
        </div>
      </section>

      {/* =====================================================
          3. MAIN CONTENT GRID (66% / 34%)
      ===================================================== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* Search Summary Card */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                <h2 className="text-sm font-bold text-[#172554]">
                  Search Summary
                </h2>

                <Link
                  href="/services/challan"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-bold text-[#1A56DB] hover:underline"
                >
                  Edit Search
                  <Pencil size={13} />
                </Link>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:divide-x sm:divide-[#E2E8F0]">
                <div className="flex items-center gap-3 sm:pr-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    <CarIcon />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#64748B]">Searched By</p>
                    <p className="text-xs font-bold text-[#172554]">
                      Vehicle Number
                    </p>
                  </div>
                </div>

                <div className="sm:px-6">
                  <p className="text-[10px] text-[#64748B]">Vehicle Number</p>
                  <p className="text-sm font-bold text-[#172554]">MH12AB1234</p>
                  <p className="text-[10px] text-[#64748B]">Maharashtra (IND)</p>
                </div>

                <div className="sm:pl-6">
                  <p className="text-[10px] text-[#64748B]">Searched On</p>
                  <p className="text-xs font-bold text-[#172554]">
                    12 May 2026, 10:30 AM
                  </p>
                </div>
              </div>
            </section>

            {/* Results card with Tabs */}
            <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
              {/* Tabs */}
              <div
                className="flex border-b border-[#E2E8F0]"
                role="tablist"
                aria-label="Challan results filter"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "pending"}
                  onClick={() => setTab("pending")}
                  className={[
                    "relative min-h-[52px] flex-1 px-5 text-xs font-bold transition",
                    tab === "pending"
                      ? "text-[#2563EB]"
                      : "text-[#172554] hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  Pending (2)
                  {tab === "pending" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                  )}
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "paid"}
                  onClick={() => setTab("paid")}
                  className={[
                    "relative min-h-[52px] flex-1 px-5 text-xs font-bold transition",
                    tab === "paid"
                      ? "text-[#15803D]"
                      : "text-[#172554] hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  Paid (1)
                  {tab === "paid" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#15803D]" />
                  )}
                </button>
              </div>

              {tab === "pending" ? (
                <div className="space-y-4 p-4 sm:p-5">
                  {/* Warning Strip */}
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#F6D58A] bg-[#FFFBEB] px-4 py-3">
                    <AlertCircle size={17} className="shrink-0 text-[#F59E0B]" />
                    <p className="text-xs font-medium text-[#78350F]">
                      Select one or more challans to pay online.
                    </p>
                  </div>

                  {pendingChallans.map((challan) => (
                    <PendingCard
                      key={challan.id}
                      challan={challan}
                      selected={selected.includes(challan.id)}
                      expanded={expanded.includes(challan.id)}
                      onSelect={() => toggleSelected(challan.id)}
                      onToggle={() => toggleExpanded(challan.id)}
                      onAction={notify}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
                    <CheckCircle2 size={16} />
                    Paid (1)
                  </div>

                  <PaidCard onAction={notify} />
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5 lg:sticky lg:top-5">
            {/* Challan Summary Card */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-sm font-bold text-[#172554]">
                Challan Summary
              </h2>

              <div className="mt-4">
                <SummaryRow
                  icon={FileText}
                  iconClass="bg-[#FEF2F2] text-[#EF4444]"
                  label="Pending Challans"
                  value="2"
                  valueClass="text-[#DC2626]"
                />

                <SummaryRow
                  icon={WalletCards}
                  iconClass="bg-[#FFFBEB] text-[#F59E0B]"
                  label="Total Amount Due"
                  value="₹1,500"
                  valueClass="text-[#DC2626]"
                />

                <SummaryRow
                  icon={CheckCircle2}
                  iconClass="bg-[#DCFCE7] text-[#15803D]"
                  label="Paid Challans"
                  value="1"
                  valueClass="text-[#15803D]"
                />

                <SummaryRow
                  icon={CalendarDays}
                  iconClass="bg-[#EFF6FF] text-[#2563EB]"
                  label="Last Updated"
                  value="12 May 2026, 10:30 AM"
                />
              </div>

              <Link
                href="/services/challan"
                className="mt-5 flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#2563EB] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
              >
                <Search size={15} />
                Search Again
              </Link>
            </section>

            {/* 100% Secure Payments Card */}
            <section className="rounded-2xl border border-[#C9DCFF] bg-[#EFF6FF] p-5 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs border border-[#BFDBFE]">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-[#172554]">
                    100% Secure Payments
                  </h2>

                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    Your transactions are protected with 256-bit SSL encryption.
                  </p>
                </div>
              </div>
            </section>

            {/* Dispute Card */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="text-xs font-bold text-[#172554]">
                Need to dispute a challan?
              </h2>

              <p className="mt-1.5 text-[11px] leading-relaxed text-[#64748B]">
                If you believe this challan was issued in error, you can raise a dispute online before making the payment.
              </p>

              <button
                type="button"
                onClick={() => setShowDisputeModal(true)}
                className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[#AFC8F5] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#EFF6FF]"
              >
                How to Dispute
                <ArrowRight size={14} />
              </button>
            </section>

            {/* Offline Payment Card */}
            <section className="rounded-2xl border border-[#F6D58A] bg-[#FFFBEB] p-5 shadow-2xs sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
                <LandmarkIcon />
              </div>

              <h2 className="mt-3.5 text-xs font-bold text-[#78350F]">
                Paying offline?
              </h2>

              <p className="mt-1 text-[11px] leading-relaxed text-[#92400E]">
                You can also pay this challan at any nearby CSC centre.
              </p>

              <Link
                href="/rto"
                className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[#D6B96B] bg-white px-4 text-xs font-bold text-[#78350F] shadow-2xs transition hover:bg-[#FFFDF5]"
              >
                <MapPin size={14} />
                Find CSC Centre
                <ArrowRight size={14} />
              </Link>
            </section>
          </aside>
        </div>
      </div>

      {/* =====================================================
          4. STICKY PAYMENT BAR
      ===================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#BFD4FF] bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.length === pendingChallans.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all pending challans"
                  className="h-5 w-5 rounded accent-[#2563EB] cursor-pointer"
                />

                <div className="whitespace-nowrap">
                  <p
                    className="text-xs font-bold text-[#172554]"
                    aria-live="polite"
                  >
                    {selected.length}{" "}
                    {selected.length === 1 ? "challan" : "challans"} selected
                  </p>

                  <p className="text-[11px] text-[#64748B]">
                    Total Amount:{" "}
                    <strong className="text-sm font-bold text-[#DC2626]">
                      {formatCurrency(totalSelected)}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="hidden h-9 w-px bg-[#DCE4EF] lg:block" />

              <div className="hidden items-center gap-5 xl:flex">
                <TrustItem
                  icon={LockKeyhole}
                  title="Secure"
                  text="SSL Encrypted"
                />

                <TrustItem
                  icon={ShieldCheck}
                  title="Trusted"
                  text="Government of India"
                />

                <TrustItem
                  icon={CheckCircle2}
                  title="Instant"
                  text="Payment Confirmation"
                />
              </div>
            </div>

            <button
              type="button"
              disabled={selected.length === 0}
              onClick={handlePayment}
              className={[
                "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl px-7 text-xs font-bold shadow-sm transition sm:w-auto",
                selected.length > 0
                  ? "bg-[#2563EB] text-white !text-white hover:bg-[#1D4ED8] focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  : "cursor-not-allowed bg-[#CBD5E1] text-[#64748B]",
              ].join(" ")}
            >
              <span className={selected.length > 0 ? "text-white !text-white" : ""}>
                {selected.length > 0
                  ? "Pay Selected Challans"
                  : "Select Challans to Pay"}
              </span>
              <ArrowRight
                size={16}
                className={selected.length > 0 ? "text-white !text-white" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          5. HELP BANNER
      ===================================================== */}
      <section className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#F6D58A] bg-[#FFFBEB] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 shadow-2xs">
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
          6. OFFICIAL NOTE RIBBON
      ===================================================== */}
      <div className="mt-8 border-t border-[#E2E8F0] bg-white py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
          <LockKeyhole size={13} className="text-[#15803D]" />
          <span>This is an official website of the Ministry of Road Transport and Highways (MoRTH), Government of India.</span>
        </p>
      </div>

      {/* =====================================================
          DISPUTE MODAL
      ===================================================== */}
      {showDisputeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dispute-dialog-title"
        >
          <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <Info size={20} />
                </div>
                <div>
                  <h2
                    id="dispute-dialog-title"
                    className="text-base font-bold text-[#172554]"
                  >
                    How to Dispute a Challan
                  </h2>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Guidelines for online traffic violation grievance.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDisputeModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#475569]">
              <p>
                If your vehicle was not at the location or the violation photo is incorrect, you can raise an online grievance with the respective traffic police branch.
              </p>
              <p>
                Prepare evidence such as dashcam footage, GPS trip logs, or vehicle sale receipts before submitting.
              </p>
              <div className="rounded-xl border border-[#D6E6FF] bg-[#EFF6FF] p-3.5">
                <p className="font-bold text-[#172554]">Grievance Portal</p>
                <p className="mt-0.5 text-[11px] text-[#334155]">
                  Complaints are reviewed by traffic authorities within 7-10 working days.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDisputeModal(false)}
              className="mt-6 min-h-[44px] w-full rounded-xl bg-[#172554] text-xs font-bold text-white !text-white hover:bg-[#1E3A8A]"
            >
              <span className="text-white !text-white">Understood</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          PAYMENT GATEWAY DIALOG (Reused Modal Flow)
      ===================================================== */}
      <PaymentGatewayDialog
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Pay Challan"
        subtitle="Review your payment details before proceeding."
        paymentFor="Traffic Challan"
        itemCount={selected.length}
        itemLabel="Selected Challans"
        amount={totalSelected}
        convenienceFee={0}
        referenceId={selected.join(",")}
        receiptUrlPrefix="/challan/receipt"
      />
    </main>
  );
}
