"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Lock,
  LockKeyhole,
  QrCode,
  Receipt,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type PaymentMethod = "upi" | "card" | "netbanking";

export interface PaymentGatewayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  paymentFor?: string;
  itemCount?: number;
  itemLabel?: string;
  amount: number;
  convenienceFee?: number;
  referenceId?: string;
  receiptUrlPrefix?: string;
  onSuccess?: (txnId: string) => void;
}

const popularBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
];

const allBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Bank of India",
  "Central Bank of India",
  "Federal Bank",
];

function formatCurrency(val: number) {
  return `₹${val.toLocaleString("en-IN")}`;
}

export default function PaymentGatewayDialog({
  isOpen,
  onClose,
  title = "Pay Challan",
  subtitle = "Review your payment details before proceeding.",
  paymentFor = "Traffic Challan",
  itemCount = 2,
  itemLabel = "Selected Challans",
  amount,
  convenienceFee = 0,
  referenceId = "PAY-CHL-2026-981240",
  receiptUrlPrefix = "/challan/receipt",
  onSuccess,
}: PaymentGatewayDialogProps) {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [selectedBank, setSelectedBank] = useState("State Bank of India");

  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [txnId, setTxnId] = useState("TXN-CHL-20260512-001");

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && status === "idle") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const total = amount + convenienceFee;

  function handleVerifyUpi() {
    if (!upiId.trim()) return;
    setIsVerifyingUpi(true);
    setTimeout(() => {
      setIsVerifyingUpi(false);
      setUpiVerified(true);
    }, 800);
  }

  function handleProceedToPay() {
    setStatus("processing");
    setTimeout(() => {
      const generatedTxn = `TXN-CHL-${Date.now().toString().slice(-8)}`;
      setTxnId(generatedTxn);
      setStatus("success");
      onSuccess?.(generatedTxn);
    }, 2000);
  }

  function handleClose() {
    setStatus("idle");
    setUpiVerified(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0F172A]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-gateway-dialog-title"
    >
      <div
        ref={modalRef}
        className="relative my-8 w-full max-w-[620px] rounded-2xl bg-white shadow-2xl transition-all"
      >
        {/* =================================================================
            1. PROCESSING STATE
        ================================================================= */}
        {status === "processing" && (
          <div className="p-8 text-center sm:p-10" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
              <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#BFDBFE] border-t-[#2563EB]" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#172554]">
              Processing your payment...
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              Securely connecting to payment gateway. Please do not close or refresh this window.
            </p>

            <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
              <p className="text-[10px] uppercase tracking-wider text-[#64748B]">
                Payment Reference
              </p>
              <p className="mt-0.5 text-xs font-bold text-[#172554]">{referenceId}</p>
              <p className="mt-2 text-sm font-bold text-[#2563EB]">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        )}

        {/* =================================================================
            2. SUCCESS STATE
        ================================================================= */}
        {status === "success" && (
          <div className="p-8 text-center sm:p-10" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
              <CheckCircle2 size={38} strokeWidth={2.5} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#172554]">
              Payment Successful
            </h2>

            <p className="mt-2 text-3xl font-bold tracking-tight text-[#172554]">
              {formatCurrency(total)}
            </p>

            <p className="mx-auto mt-2 max-w-[380px] text-xs leading-relaxed text-[#64748B]">
              Your challan payment has been completed successfully and cleared with the RTO database.
            </p>

            <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">Transaction ID</span>
                <span className="text-xs font-bold text-[#172554] font-mono">{txnId}</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
                <span className="text-[11px] text-[#64748B]">Payment For</span>
                <span className="text-xs font-bold text-[#172554]">{paymentFor}</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
                <span className="text-[11px] text-[#64748B]">Date & Time</span>
                <span className="text-xs font-medium text-[#172554]">
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
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href={`${receiptUrlPrefix}/${txnId}?amount=${total}&reference=${encodeURIComponent(referenceId)}`}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                <Receipt size={15} className="text-white !text-white" />
                <span className="text-white !text-white">View Receipt</span>
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#172554] transition hover:bg-[#F8FAFC]"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            3. MAIN PAYMENT FORM (IDLE STATE)
        ================================================================= */}
        {status === "idle" && (
          <div className="p-6 sm:p-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <h2
                  id="payment-gateway-dialog-title"
                  className="text-lg font-bold text-[#172554]"
                >
                  {title}
                </h2>
                <p className="mt-0.5 text-xs text-[#64748B]">{subtitle}</p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                aria-label="Close payment dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Payment Summary Box */}
            <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
              <div className="flex items-center justify-between text-[#475569]">
                <span>Payment For</span>
                <span className="font-semibold text-[#172554]">{paymentFor}</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[#475569]">
                <span>{itemLabel}</span>
                <span className="font-semibold text-[#172554]">{itemCount}</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[#475569]">
                <span>Amount</span>
                <span className="font-semibold text-[#172554]">{formatCurrency(amount)}</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[#475569]">
                <span>Convenience Fee</span>
                <span className="font-semibold text-[#15803D]">
                  {convenienceFee === 0 ? "₹0 (Free)" : formatCurrency(convenienceFee)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-sm font-bold">
                <span className="text-[#172554]">Total Payable</span>
                <span className="text-[#DC2626] sm:text-base">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Payment Methods Selection */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-[#172554]">
                Select Payment Method
              </label>

              <div
                role="radiogroup"
                aria-label="Payment methods"
                className="mt-2.5 divide-y divide-[#E2E8F0] overflow-hidden rounded-xl border border-[#CBD5E1]"
              >
                {/* 1. UPI */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={method === "upi"}
                  onClick={() => setMethod("upi")}
                  className={[
                    "flex min-h-[56px] w-full items-center justify-between p-3.5 text-left transition-colors",
                    method === "upi" ? "bg-[#EFF6FF]" : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        method === "upi" ? "border-[#2563EB]" : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {method === "upi" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">UPI</p>
                      <p className="text-[11px] text-[#64748B]">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[10px] font-black italic tracking-tighter text-[#2563EB] shadow-2xs border border-[#E2E8F0]">
                    UPI
                  </div>
                </button>

                {/* 2. Debit / Credit Card */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={method === "card"}
                  onClick={() => setMethod("card")}
                  className={[
                    "flex min-h-[56px] w-full items-center justify-between p-3.5 text-left transition-colors",
                    method === "card" ? "bg-[#EFF6FF]" : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        method === "card" ? "border-[#2563EB]" : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {method === "card" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">Debit / Credit Card</p>
                      <p className="text-[11px] text-[#64748B]">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold italic text-[#1A56DB]">VISA</span>
                    <span className="rounded bg-[#0EA5E9]/10 px-1 py-0.5 text-[8px] font-bold text-[#0284C7]">RuPay</span>
                  </div>
                </button>

                {/* 3. Net Banking */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={method === "netbanking"}
                  onClick={() => setMethod("netbanking")}
                  className={[
                    "flex min-h-[56px] w-full items-center justify-between p-3.5 text-left transition-colors",
                    method === "netbanking" ? "bg-[#EFF6FF]" : "bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                        method === "netbanking" ? "border-[#2563EB]" : "border-[#94A3B8]",
                      ].join(" ")}
                    >
                      {method === "netbanking" && (
                        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      )}
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#172554]">Net Banking</p>
                      <p className="text-[11px] text-[#64748B]">All major Indian banks</p>
                    </div>
                  </div>

                  <Building2 size={16} className="text-[#64748B]" />
                </button>
              </div>
            </div>

            {/* Method Content Panel */}
            <div className="mt-4 rounded-xl border border-[#DCE7F7] bg-[#F5F9FE] p-4">
              {/* UPI PANEL */}
              {method === "upi" && (
                <div>
                  <label htmlFor="modal-upi-id" className="block text-[11px] font-bold text-[#172554]">
                    Enter UPI ID / VPA
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      id="modal-upi-id"
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setUpiVerified(false);
                      }}
                      placeholder="mobile@upi or id@okhdfcbank"
                      className="min-h-[40px] flex-1 rounded-xl border border-[#CBD5E1] bg-white px-3 text-xs text-[#172554] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyUpi}
                      className="inline-flex min-h-[40px] items-center rounded-xl border border-[#2563EB] bg-white px-4 text-xs font-bold text-[#2563EB] hover:bg-[#EFF6FF]"
                    >
                      {isVerifyingUpi ? "Verifying..." : "Verify"}
                    </button>
                  </div>

                  {upiVerified && (
                    <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
                      <CheckCircle2 size={13} strokeWidth={2.5} />
                      Verified: citizen@okaxis
                    </p>
                  )}

                  <div className="my-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                    <span className="text-[10px] text-[#64748B]">OR SCAN QR</span>
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white p-1">
                      <QrCode size={48} className="text-[#172554]" />
                    </div>
                    <div className="text-[11px] text-[#475569]">
                      <p className="font-semibold text-[#172554]">Scan with any UPI app</p>
                      <p className="text-[10px] text-[#64748B]">QR code valid for 10 minutes</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD PANEL */}
              {method === "card" && (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="modal-card-num" className="block text-[11px] font-bold text-[#172554]">
                      Card Number
                    </label>
                    <input
                      id="modal-card-num"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3 text-xs text-[#172554] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-card-exp" className="block text-[11px] font-bold text-[#172554]">
                        Expiry (MM/YY)
                      </label>
                      <input
                        id="modal-card-exp"
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="mt-1 min-h-[40px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3 text-xs text-[#172554] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-card-cvv" className="block text-[11px] font-bold text-[#172554]">
                        CVV
                      </label>
                      <input
                        id="modal-card-cvv"
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        className="mt-1 min-h-[40px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3 text-xs text-[#172554] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NET BANKING PANEL */}
              {method === "netbanking" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#172554]">
                    Popular Banks
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {popularBanks.map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={[
                          "rounded-lg border px-2.5 py-2 text-left text-[11px] font-semibold transition",
                          selectedBank === bank
                            ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                            : "border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]",
                        ].join(" ")}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3">
                    <label htmlFor="modal-all-banks" className="block text-[11px] font-bold text-[#172554]">
                      Or select other bank
                    </label>
                    <select
                      id="modal-all-banks"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="mt-1 min-h-[40px] w-full rounded-xl border border-[#CBD5E1] bg-white px-3 text-xs text-[#172554] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    >
                      {allBanks.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Security Indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#64748B]">
              <LockKeyhole size={13} className="text-[#15803D]" />
              <span>256-bit SSL encrypted. 100% secure government gateway.</span>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleProceedToPay}
                className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
              >
                <Lock size={14} className="text-white !text-white" />
                <span className="text-white !text-white">Proceed to Pay {formatCurrency(total)}</span>
                <ArrowRight size={14} className="text-white !text-white" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex min-h-[46px] items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-bold text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
