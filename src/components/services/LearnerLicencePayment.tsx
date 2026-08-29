"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  FileCheck2,
  Headphones,
  IndianRupee,
  Lock,
  LockKeyhole,
  Phone,
  QrCode,
  Receipt,
  ShieldCheck,
  Smartphone,
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

type PaymentMethod = "upi" | "card" | "netbanking" | "qr";

export default function LearnerLicencePayment() {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("rahulsharma@oksbi");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8841");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("•••");
  const [selectedBank, setSelectedBank] = useState("sbi");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handlePay(event: React.FormEvent) {
    event.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1000);
  }

  function handleDownloadReceipt() {
    window.print();
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827] print:bg-white print:p-0 print:m-0"
    >
      {/* Embedded print styles to isolate exactly the receipt card */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            header, footer, nav, #accessibility-bar, .print-exclude, aside, .hero-section {
              display: none !important;
            }
            #ll-printable-receipt {
              display: block !important;
              box-shadow: none !important;
              border: 1px solid #CBD5E1 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 8px !important;
              page-break-inside: avoid !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              margin: 8mm;
              size: auto;
            }
          }
        `,
        }}
      />

      <div className="mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 lg:px-[42px] print:p-0 print:m-0 print:max-w-none">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-[12px] print-exclude"
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
            Payment &amp; Confirmation
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="hero-section overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF] print-exclude">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <CreditCard
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <CreditCard size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Complete secure government fee payment to finalize your Learner Licence application and receive your test slot pass.
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
            Center: Step 7 Payment / Receipt Card (~55%)
            Right: Payment Security & Support (~25%)
        ===================================================== */}
        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[230px_minmax(0,1fr)_310px] print:block">
          {/* ===================================================
              LEFT: APPLICATION STEPS (VERTICAL STEPPER)
          =================================================== */}
          <aside className="space-y-3 print-exclude">
            <div className="rounded-[10px] border border-[#DCE5F1] bg-white p-4 shadow-[0_2px_10px_rgba(23,37,84,0.02)]">
              <h2 className="text-[13px] font-bold text-[#172554]">
                Application Steps
              </h2>

              <div className="mt-4 space-y-2">
                {steps.map((step, index) => {
                  const isCompleted = isSuccess ? true : index < 6;
                  const isActive = !isSuccess && index === 6;

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
              CENTER: MAIN CARD (PAYMENT OR SUCCESS RECEIPT)
          =================================================== */}
          {isSuccess ? (
            /* ===============================================
               SUCCESS STATE: ACKNOWLEDGEMENT & RECEIPT
            =============================================== */
            <div className="space-y-4">
              {/* Screen-only Success Notification Card */}
              <div className="rounded-[10px] border border-[#DCFCE7] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] print-exclude">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                    <CheckCircle2 size={28} strokeWidth={2.4} />
                  </div>
                  <div>
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[9px] font-bold text-[#15803D]">
                      Fee Payment Confirmed
                    </span>
                    <h2 className="mt-1 text-[18px] font-bold text-[#172554]">
                      Application Registered Successfully!
                    </h2>
                    <p className="text-[10px] text-[#475569]">
                      Your Learner Licence application number is <strong>LL-MH12-2026-894102</strong>. An SMS confirmation has been sent to +91 98765 43210.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F9] pt-3">
                  <button
                    type="button"
                    onClick={handleDownloadReceipt}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[7px] bg-[#2563EB] px-5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8] shadow-2xs"
                  >
                    <Download size={15} />
                    <span>Download / Print Receipt (PDF)</span>
                  </button>

                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[7px] border border-[#CBD5E1] bg-white px-5 text-[11px] font-bold text-[#172554] transition hover:bg-[#F8FAFC]"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* ===============================================
                  DEDICATED OFFICIAL PRINTABLE RECEIPT CARD
              =============================================== */}
              <article
                id="ll-printable-receipt"
                className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm"
              >
                {/* Official Govt Header */}
                <div className="border-b-2 border-[#1E40AF] bg-[#F8FAFF] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E40AF] text-white">
                        <Award size={22} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold tracking-widest text-[#64748B] uppercase">
                          Government of India • Ministry of Road Transport &amp; Highways
                        </p>
                        <h3 className="text-[14px] font-bold text-[#172554]">
                          PARIVAHAN SEWA — LEARNER LICENCE RECEIPT &amp; SLOT SLIP
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="rounded bg-[#DCFCE7] px-2 py-0.5 text-[8px] font-bold text-[#15803D]">
                        STATUS: REGISTERED &amp; PAID
                      </span>
                      <p className="mt-1 text-[8px] text-[#64748B]">Date: 29/08/2026</p>
                    </div>
                  </div>
                </div>

                {/* Receipt Key Metadata Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 border-b border-[#E2E8F0] pb-4 sm:grid-cols-4 text-[10px]">
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Application No.</span>
                      <p className="font-bold text-[#172554]">LL-MH12-2026-894102</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Transaction ID</span>
                      <p className="font-bold text-[#172554]">TXN-PVH-2026-059432</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Payment Mode</span>
                      <p className="font-bold text-[#172554]">UPI (Online)</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Amount Paid</span>
                      <p className="font-bold text-[#16A34A]">₹350.00</p>
                    </div>
                  </div>

                  {/* Applicant & Vehicle Class */}
                  <div className="mt-4 grid grid-cols-1 gap-4 border-b border-[#E2E8F0] pb-4 sm:grid-cols-3 text-[10px]">
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Applicant Name</span>
                      <p className="font-bold text-[#172554]">Rahul Sharma</p>
                      <p className="text-[8px] text-[#64748B]">DOB: 12/08/2000 (25 Yrs) • Male</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Vehicle Class</span>
                      <p className="font-bold text-[#172554]">Non-Transport (LMV - Car/Jeep)</p>
                      <p className="text-[8px] text-[#64748B]">Category: Individual</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase text-[#64748B]">Contact</span>
                      <p className="font-bold text-[#172554]">+91 98765 43210</p>
                      <p className="text-[8px] text-[#64748B]">rahul.sharma@example.com</p>
                    </div>
                  </div>

                  {/* Residential Address */}
                  <div className="mt-4 border-b border-[#E2E8F0] pb-4 text-[10px]">
                    <span className="text-[8px] font-bold uppercase text-[#64748B]">Registered Address</span>
                    <p className="font-medium text-[#172554]">
                      Flat 402, Sunshine Residency, FC Road, Shivaji Nagar, Pune, Maharashtra – 411005
                    </p>
                  </div>

                  {/* Test Appointment Schedule Box */}
                  <div className="mt-4 rounded-[8px] border border-[#C4B5FD] bg-[#FAF8FF] p-4 text-[10px]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="rounded bg-[#EDE9FE] px-2 py-0.5 text-[8px] font-bold text-[#6D28D9]">
                          SCHEDULED TEST APPOINTMENT
                        </span>
                        <p className="mt-2 text-[13px] font-bold text-[#172554]">
                          Tue 02 May 2026 • 10:45 AM – 11:45 AM
                        </p>
                        <p className="mt-0.5 text-[9px] text-[#475569]">
                          <strong>Mode:</strong> Online Proctored Test (From Home) • <strong>Language:</strong> English
                        </p>
                        <p className="mt-0.5 text-[9px] text-[#475569]">
                          <strong>Jurisdiction:</strong> RTO Pune — Sangam Bridge, Pune Central (MH12)
                        </p>
                      </div>

                      <div className="flex h-16 w-16 items-center justify-center rounded-[6px] border border-[#CBD5E1] bg-white text-[#6D28D9]">
                        <QrCode size={50} />
                      </div>
                    </div>
                  </div>

                  {/* Fee Itemization Table */}
                  <div className="mt-4">
                    <table className="w-full text-left text-[9px]">
                      <thead>
                        <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                          <th className="pb-1 font-bold">Fee Description</th>
                          <th className="pb-1 text-right font-bold">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9] text-[#172554]">
                        <tr>
                          <td className="py-1.5">Learner Licence Application Fee (Form 2)</td>
                          <td className="py-1.5 text-right font-medium">150.00</td>
                        </tr>
                        <tr>
                          <td className="py-1.5">Online / RTO Test Slot Booking Fee</td>
                          <td className="py-1.5 text-right font-medium">150.00</td>
                        </tr>
                        <tr>
                          <td className="py-1.5">Portal Processing / e-Governance Charge</td>
                          <td className="py-1.5 text-right font-medium">50.00</td>
                        </tr>
                        <tr className="border-t-2 border-[#1E40AF] font-bold text-[#172554]">
                          <td className="pt-2 text-[10px]">TOTAL AMOUNT PAID</td>
                          <td className="pt-2 text-right text-[10px] text-[#16A34A]">₹350.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Notice & Security Seal */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#CBD5E1] pt-3 text-[8px] text-[#64748B]">
                    <div>
                      <p>• Please login to Parivahan portal 10 minutes prior to your scheduled slot.</p>
                      <p>• Keep your original Aadhaar Card / Identity proof ready for facial verification.</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#172554]">Digitally Authorized by Parivahan 2.0</p>
                      <p>Government of India</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            /* ===============================================
               PAYMENT FORM VIEW
            =============================================== */
            <form
              onSubmit={handlePay}
              className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-[#6D28D9]">
                  Step 7 of 7
                </p>
                <span className="flex items-center gap-1 text-[9px] font-bold text-[#16A34A]">
                  <Lock size={11} /> 256-Bit SSL Encrypted
                </span>
              </div>

              <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
                Application Fee Payment
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-[#475569]">
                Choose your preferred payment method to pay the application and slot fee.
              </p>

              {/* Amount Banner */}
              <div className="mt-4 flex items-center justify-between rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] p-4">
                <div>
                  <span className="text-[9px] font-bold text-[#1E40AF]">
                    Total Amount Due
                  </span>
                  <p className="text-[20px] font-bold text-[#172554]">
                    ₹350.00
                  </p>
                </div>
                <div className="text-right text-[9px] text-[#475569]">
                  <p>Ref: <strong>LL-MH12-2026-894102</strong></p>
                  <p>Form 2 + LL Slot Booking</p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="mt-5">
                <label className="block text-[11px] font-bold text-[#172554]">
                  Select Payment Method
                </label>

                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <MethodTab
                    active={method === "upi"}
                    onClick={() => setMethod("upi")}
                    icon={Smartphone}
                    label="UPI / QR"
                  />
                  <MethodTab
                    active={method === "card"}
                    onClick={() => setMethod("card")}
                    icon={CreditCard}
                    label="Debit / Credit"
                  />
                  <MethodTab
                    active={method === "netbanking"}
                    onClick={() => setMethod("netbanking")}
                    icon={IndianRupee}
                    label="Net Banking"
                  />
                  <MethodTab
                    active={method === "qr"}
                    onClick={() => setMethod("qr")}
                    icon={QrCode}
                    label="Bharat QR"
                  />
                </div>
              </div>

              {/* Dynamic Payment Tab Fields */}
              <div className="mt-4 rounded-[8px] border border-[#E2E8F0] bg-[#FAFAFE] p-4">
                {method === "upi" && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-[#172554]">
                      Enter Virtual Payment Address (UPI ID)
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="h-[42px] flex-1 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[11px] outline-none focus:border-[#8B5CF6]"
                      />
                      <button
                        type="button"
                        className="rounded-[6px] border border-[#CBD5E1] bg-white px-4 text-[10px] font-bold text-[#172554] hover:bg-[#F8FAFC]"
                      >
                        Verify
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 text-[8px] text-[#64748B]">
                      <span>Supported apps:</span>
                      <span className="font-bold text-[#172554]">Google Pay</span>
                      <span>•</span>
                      <span className="font-bold text-[#172554]">PhonePe</span>
                      <span>•</span>
                      <span className="font-bold text-[#172554]">Paytm</span>
                      <span>•</span>
                      <span className="font-bold text-[#172554]">BHIM UPI</span>
                    </div>
                  </div>
                )}

                {method === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#172554]">
                        Card Number
                      </label>
                      <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16-digit card number"
                        className="mt-1 h-[42px] w-full rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[11px] outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#172554]">
                          Expiry (MM/YY)
                        </label>
                        <input
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="mt-1 h-[42px] w-full rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[11px] outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#172554]">
                          CVV
                        </label>
                        <input
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="3 digits"
                          className="mt-1 h-[42px] w-full rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[11px] outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {method === "netbanking" && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-[#172554]">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="h-[42px] w-full rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[11px] outline-none focus:border-[#8B5CF6]"
                    >
                      <option value="sbi">State Bank of India (SBI)</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="bob">Bank of Baroda</option>
                    </select>
                  </div>
                )}

                {method === "qr" && (
                  <div className="flex flex-col items-center p-3 text-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-[8px] border-2 border-dashed border-[#CBD5E1] bg-white text-[#6D28D9]">
                      <QrCode size={90} />
                    </div>
                    <p className="mt-2 text-[10px] font-bold text-[#172554]">
                      Scan with any UPI App to pay ₹350.00
                    </p>
                  </div>
                )}
              </div>

              {/* Actions: Back & Pay Now */}
              <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
                <Link
                  href="/services/driving-licence/learner-licence/apply/review"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] border border-[#8CB2FF] bg-white px-6 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
                >
                  <ArrowLeft size={17} />
                  <span>Back to Review</span>
                </Link>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] bg-[#16A34A] px-8 text-[12px] font-bold text-white transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 shadow-2xs"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Pay ₹350.00 Securely</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ==================================================
              RIGHT: PAYMENT GUARANTEE & SUPPORT
          ================================================== */}
          <aside className="space-y-3 print-exclude">
            {/* Card 1: Fee Breakdown */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <Receipt size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  Summary of Charges
                </h2>
              </div>

              <div className="mt-3.5 space-y-2 text-[10px]">
                <div className="flex items-center justify-between text-[#475569]">
                  <span>LL Application Fee</span>
                  <span className="font-semibold text-[#172554]">₹150.00</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>LL Test Slot Fee</span>
                  <span className="font-semibold text-[#172554]">₹150.00</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>e-Governance User Fee</span>
                  <span className="font-semibold text-[#172554]">₹50.00</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#EEF2F7] pt-2 text-[11px] font-bold text-[#172554]">
                  <span>Total Payable</span>
                  <span className="text-[#16A34A]">₹350.00</span>
                </div>
              </div>
            </article>

            {/* Card 2: 100% Safe Payment Guarantee */}
            <article className="rounded-[10px] border border-[#E2E8F0] bg-[#FAFAFE] p-4">
              <div className="flex items-center gap-2 text-[#16A34A]">
                <ShieldCheck size={16} />
                <h3 className="text-[12px] font-bold text-[#172554]">
                  Official Govt Gateway
                </h3>
              </div>
              <ul className="mt-2 space-y-1.5 text-[9px] text-[#64748B]">
                <li>• Authorized by Ministry of Road Transport &amp; Highways</li>
                <li>• Instant digitally signed receipt generated</li>
                <li>• 100% money-back guarantee in case of transaction failure</li>
              </ul>
            </article>

            {/* Card 3: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Payment Support
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    Call our 24/7 toll-free citizen helpline for any transaction queries.
                  </p>
                  <a
                    href="tel:18001800151"
                    className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>1800-1800-151</span>
                    <ArrowRight size={12} />
                  </a>
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
        <section className="mt-4 overflow-hidden rounded-[11px] border border-[#DCE5F1] bg-[#EEF5FF] print-exclude">
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
   METHOD TAB SUBCOMPONENT
============================================================ */

function MethodTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Smartphone;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center justify-center rounded-[8px] border p-2.5 text-center transition",
        active
          ? "border-[#6D28D9] bg-[#FAF8FF] ring-2 ring-[#EDE9FE] text-[#6D28D9]"
          : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]",
      ].join(" ")}
    >
      <Icon size={18} />
      <span className="mt-1 text-[10px] font-bold">{label}</span>
    </button>
  );
}

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
