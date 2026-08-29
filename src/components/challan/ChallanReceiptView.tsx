"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  LockKeyhole,
  Printer,
} from "lucide-react";
import { Suspense, useMemo } from "react";

const allViolations: Record<
  string,
  { number: string; violation: string; section: string; amount: number }
> = {
  MH12052600012345: {
    number: "MH12052600012345",
    violation: "Over Speeding",
    section: "183(1) MV Act",
    amount: 1000,
  },
  MH12052600067890: {
    number: "MH12052600067890",
    violation: "No Parking",
    section: "119/177 MV Act",
    amount: 500,
  },
  MH10042600033445: {
    number: "MH10042600033445",
    violation: "Red Light Jump",
    section: "119 MV Act",
    amount: 500,
  },
};

function ReceiptContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const refParam = searchParams.get("reference") || searchParams.get("challans");

  const { items, totalAmount } = useMemo(() => {
    // 1. If explicit reference/challan IDs are provided in query
    if (refParam) {
      const ids = refParam.split(",").map((s) => s.trim());
      const selected = ids
        .map((i) => allViolations[i])
        .filter((v): v is typeof allViolations[string] => Boolean(v));

      if (selected.length > 0) {
        const total = selected.reduce((sum, item) => sum + item.amount, 0);
        return { items: selected, totalAmount: total };
      }
    }

    // 2. If explicit amount param is passed
    if (amountParam) {
      const parsedAmount = parseInt(amountParam, 10);
      if (parsedAmount === 1000) {
        return {
          items: [allViolations.MH12052600012345],
          totalAmount: 1000,
        };
      }
      if (parsedAmount === 500) {
        return {
          items: [allViolations.MH12052600067890],
          totalAmount: 500,
        };
      }
      if (parsedAmount === 1500) {
        return {
          items: [
            allViolations.MH12052600012345,
            allViolations.MH12052600067890,
          ],
          totalAmount: 1500,
        };
      }
    }

    // 3. If ID itself matches a known challan
    if (id.includes("67890")) {
      return {
        items: [allViolations.MH12052600067890],
        totalAmount: 500,
      };
    }
    if (id.includes("33445")) {
      return {
        items: [allViolations.MH10042600033445],
        totalAmount: 500,
      };
    }
    if (id.includes("12345")) {
      return {
        items: [allViolations.MH12052600012345],
        totalAmount: 1000,
      };
    }

    // Default prototype view (both pending challans)
    return {
      items: [
        allViolations.MH12052600012345,
        allViolations.MH12052600067890,
      ],
      totalAmount: 1500,
    };
  }, [id, amountParam, refParam]);

  function handleDownloadPDF() {
    window.print();
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F9FA] pb-24 text-[#111827] print:bg-white print:p-0 print:m-0"
    >
      {/* Embedded print styles to isolate exactly the receipt card */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            header, footer, nav, #accessibility-bar, .print-exclude {
              display: none !important;
            }
            #challan-printable-receipt {
              box-shadow: none !important;
              border: 1px solid #CBD5E1 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 12px !important;
              page-break-inside: avoid !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              margin: 10mm;
              size: auto;
            }
          }
        `,
      }} />

      {/* Breadcrumb (Hidden during print/download) */}
      <div className="border-b border-[#E2E8F0] bg-white print:hidden">
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
            <Link
              href="/services/challan/results"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Results
            </Link>
            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>
            <span className="font-semibold text-[#172554]" aria-current="page">
              Receipt
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-4 pt-8 sm:px-6 lg:px-8 print:max-w-full print:p-0">
        <Link
          href="/services/challan/results"
          className="inline-flex min-h-[40px] items-center gap-2 text-xs font-bold text-[#1A56DB] hover:underline print:hidden"
        >
          <ArrowLeft size={14} />
          Back to Challan Results
        </Link>

        {/* =================================================================
            EXACT DOWNLOADABLE / PRINTABLE RECEIPT CARD
        ================================================================= */}
        <div
          id="challan-printable-receipt"
          className="mt-4 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-lg print:mt-0 print:border print:border-[#CBD5E1]"
        >
          {/* Header */}
          <div className="border-b border-[#E2E8F0] bg-[#172554] p-6 text-white sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight">PARIVAHAN 2.0</span>
                  <span className="rounded bg-[#F59E0B] px-1.5 py-0.5 text-[10px] font-extrabold text-[#172554]">
                    OFFICIAL
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Ministry of Road Transport and Highways, Government of India
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-left sm:text-right backdrop-blur-xs">
                <p className="text-[10px] text-slate-300">Receipt / Transaction ID</p>
                <p className="font-mono text-xs font-bold text-white">{id}</p>
              </div>
            </div>
          </div>

          {/* Success strip */}
          <div className="flex items-center gap-3 border-b border-[#DCFCE7] bg-[#F0FDF4] px-6 py-4 sm:px-8">
            <CheckCircle2 size={22} className="shrink-0 text-[#15803D]" />
            <div>
              <p className="text-xs font-bold text-[#15803D]">
                Payment Completed Successfully
              </p>
              <p className="text-[11px] text-[#166534]">
                This electronic receipt is valid proof of traffic challan settlement under the Motor Vehicles Act.
              </p>
            </div>
          </div>

          {/* Receipt Content */}
          <div className="p-6 sm:p-8">
            {/* Grid details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Vehicle & Citizen Details
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Vehicle Number:</span>
                    <span className="font-bold text-[#172554]">MH12AB1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">State / RTO:</span>
                    <span className="font-semibold text-[#172554]">Maharashtra (MH-12 Pune)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Vehicle Class:</span>
                    <span className="font-semibold text-[#172554]">LMV (Motor Car)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Payment Information
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Payment Mode:</span>
                    <span className="font-bold text-[#172554]">Online Gateway (UPI/Card)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Date & Time:</span>
                    <span className="font-semibold text-[#172554]">
                      {new Date().toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {new Date().toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Gateway Reference:</span>
                    <span className="font-mono text-[11px] font-semibold text-[#172554]">
                      PG-MORTH-883921
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid Violations Table */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#172554]">
                  Paid Violations ({items.length})
                </p>
                <span className="rounded bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#15803D]">
                  Cleared
                </span>
              </div>

              <div className="mt-2 overflow-hidden rounded-xl border border-[#E2E8F0]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B]">
                    <tr>
                      <th className="p-3">Challan No.</th>
                      <th className="p-3">Violation</th>
                      <th className="p-3">Section</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-[#172554]">
                    {items.map((violation) => (
                      <tr key={violation.number}>
                        <td className="p-3 font-mono font-bold">{violation.number}</td>
                        <td className="p-3">{violation.violation}</td>
                        <td className="p-3 text-[#64748B]">{violation.section}</td>
                        <td className="p-3 text-right font-bold">
                          ₹{violation.amount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-[#E2E8F0] bg-[#F8FAFC] font-bold">
                    <tr>
                      <td colSpan={3} className="p-3 text-right text-xs text-[#172554]">
                        Total Amount Paid:
                      </td>
                      <td className="p-3 text-right text-sm text-[#15803D]">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Actions (Hidden when printing/downloading) */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1E3A8A]"
              >
                <Printer size={15} className="text-white !text-white" />
                <span className="text-white !text-white">Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8FAFC]"
              >
                <Download size={15} />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Security badge (Hidden when printing/downloading) */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#64748B] print:hidden">
          <LockKeyhole size={13} className="text-[#15803D]" />
          <span>Digitally signed and certified by Ministry of Road Transport and Highways (MoRTH).</span>
        </div>
      </div>
    </main>
  );
}

export default function ChallanReceiptView({ id }: { id: string }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <ReceiptContent id={id} />
    </Suspense>
  );
}
