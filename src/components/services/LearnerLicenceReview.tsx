"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  FileCheck2,
  Headphones,
  LockKeyhole,
  Phone,
  Receipt,
  ShieldCheck,
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

export default function LearnerLicenceReview() {
  const router = useRouter();
  const [declaration, setDeclaration] = useState(true);

  function handleProceed(event: React.FormEvent) {
    event.preventDefault();
    if (!declaration) return;

    router.push("/services/driving-licence/learner-licence/apply/payment");
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
            Review &amp; Confirm
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <CheckCircle2
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <CheckCircle2 size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Review all application details, uploaded documents, and booked slot carefully before making payment.
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
            Center: Step 6 Review Card (~55%)
            Right: Fee Summary & Instructions (~25%)
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
                  const isCompleted = index < 5; // Steps 1 to 5 completed
                  const isActive = index === 5; // Step 6 (Review & Confirm) active

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
              CENTER: MAIN FORM CARD (STEP 6 OF 7)
          =================================================== */}
          <form
            onSubmit={handleProceed}
            className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
          >
            <p className="text-[10px] font-bold text-[#6D28D9]">
              Step 6 of 7
            </p>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Review Your Application
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Please verify all the details entered before proceeding to fee payment.
            </p>

            <div className="mt-5 space-y-4">
              {/* Section 1: Eligibility & Vehicle Class */}
              <ReviewSection
                title="1. Applicant Type & Vehicle Class"
                editHref="/services/driving-licence/learner-licence/apply"
              >
                <div className="grid gap-3 sm:grid-cols-2 text-[10px]">
                  <div>
                    <span className="text-[#64748B]">Applicant Category:</span>
                    <p className="font-bold text-[#172554]">Individual (Self)</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Selected Vehicle Class:</span>
                    <p className="font-bold text-[#172554]">Non-Transport (Car/Jeep/Van)</p>
                  </div>
                </div>
              </ReviewSection>

              {/* Section 2: Personal Details */}
              <ReviewSection
                title="2. Personal Details"
                editHref="/services/driving-licence/learner-licence/apply/personal-details"
              >
                <div className="grid gap-3 sm:grid-cols-3 text-[10px]">
                  <div>
                    <span className="text-[#64748B]">Full Name:</span>
                    <p className="font-bold text-[#172554]">Rahul Sharma</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Gender:</span>
                    <p className="font-bold text-[#172554]">Male</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Date of Birth (Age):</span>
                    <p className="font-bold text-[#172554]">12 Aug 2000 (25 Years)</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Father&apos;s Name:</span>
                    <p className="font-bold text-[#172554]">Rajesh Sharma</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Mother&apos;s Name:</span>
                    <p className="font-bold text-[#172554]">Sunita Sharma</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Marital Status:</span>
                    <p className="font-bold text-[#172554]">Single</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Mobile Number:</span>
                    <p className="font-bold text-[#172554]">+91 98765 43210</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Email Address:</span>
                    <p className="font-bold text-[#172554]">rahul.sharma@example.com</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Blood Group:</span>
                    <p className="font-bold text-[#172554]">O+</p>
                  </div>
                </div>
              </ReviewSection>

              {/* Section 3: Address Details */}
              <ReviewSection
                title="3. Address Details"
                editHref="/services/driving-licence/learner-licence/apply/address-details"
              >
                <div className="space-y-2 text-[10px]">
                  <div>
                    <span className="text-[#64748B]">Present Residential Address:</span>
                    <p className="font-bold text-[#172554]">
                      Flat 402, Sunshine Residency, FC Road, Shivaji Nagar, Pune, Maharashtra – 411005
                    </p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Permanent Address:</span>
                    <p className="font-bold text-[#172554]">Same as Present Residential Address</p>
                  </div>
                </div>
              </ReviewSection>

              {/* Section 4: Documents Uploaded */}
              <ReviewSection
                title="4. Uploaded Documents"
                editHref="/services/driving-licence/learner-licence/apply/documents"
              >
                <div className="grid gap-2 sm:grid-cols-2 text-[10px]">
                  <div className="flex items-center gap-2 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] p-2">
                    <Check size={12} className="text-[#16A34A]" strokeWidth={3} />
                    <span className="font-semibold text-[#166534]">Identity: Aadhaar Card (DigiLocker)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] p-2">
                    <Check size={12} className="text-[#16A34A]" strokeWidth={3} />
                    <span className="font-semibold text-[#166534]">Address: Electricity Bill</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] p-2">
                    <Check size={12} className="text-[#16A34A]" strokeWidth={3} />
                    <span className="font-semibold text-[#166534]">DOB Proof: Birth Certificate</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-[6px] border border-[#DCFCE7] bg-[#F0FDF4] p-2">
                    <Check size={12} className="text-[#16A34A]" strokeWidth={3} />
                    <span className="font-semibold text-[#166534]">Photo: Passport_Photo_WhiteBg.jpg</span>
                  </div>
                </div>
              </ReviewSection>

              {/* Section 5: LL Test Slot Booking */}
              <ReviewSection
                title="5. Test Slot & Mode"
                editHref="/services/driving-licence/learner-licence/apply/test-slot"
              >
                <div className="grid gap-3 sm:grid-cols-2 text-[10px]">
                  <div>
                    <span className="text-[#64748B]">Test Mode:</span>
                    <p className="font-bold text-[#172554]">Online Proctored (From Home)</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Assigned Centre:</span>
                    <p className="font-bold text-[#172554]">RTO Pune — Sangam Bridge (MH12)</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Date &amp; Slot:</span>
                    <p className="font-bold text-[#172554]">Tue 02 May 2026, 10:45 AM – 11:45 AM</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Test Language:</span>
                    <p className="font-bold text-[#172554]">English</p>
                  </div>
                </div>
              </ReviewSection>
            </div>

            {/* Declaration Checkbox */}
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
              <input
                type="checkbox"
                checked={declaration}
                onChange={(e) => setDeclaration(e.target.checked)}
                className="peer sr-only"
              />
              <span
                className={[
                  "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition",
                  declaration
                    ? "border-[#6D28D9] bg-[#6D28D9] text-white"
                    : "border-[#CBD5E1] bg-white",
                ].join(" ")}
                aria-hidden="true"
              >
                {declaration && <Check size={13} strokeWidth={3} />}
              </span>

              <span className="text-[10px] leading-relaxed text-[#172554]">
                I solemnly confirm that all information filled in this Learner Licence application is accurate and matches my legal identification. I am ready to proceed to fee payment.
              </span>
            </label>

            {/* Actions: Back & Proceed to Payment */}
            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
              <Link
                href="/services/driving-licence/learner-licence/apply/test-slot"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] border border-[#8CB2FF] bg-white px-6 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
              >
                <ArrowLeft size={17} />
                <span>Back to Slot Booking</span>
              </Link>

              <button
                type="submit"
                disabled={!declaration}
                className={[
                  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] px-8 text-[12px] font-bold text-white transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 shadow-2xs",
                  declaration
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                    : "bg-[#CBD5E1] cursor-not-allowed",
                ].join(" ")}
              >
                <span>Proceed to Payment (₹350)</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* ==================================================
              RIGHT: FEE SUMMARY & PROCESS DETAILS
          ================================================== */}
          <aside className="space-y-3">
            {/* Card 1: Fee Breakdown */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <Receipt size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  Fee Breakdown
                </h2>
              </div>

              <div className="mt-3.5 space-y-2 text-[10px]">
                <div className="flex items-center justify-between text-[#475569]">
                  <span>LL Application Fee (Form 2)</span>
                  <span className="font-semibold text-[#172554]">₹150</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>Online / RTO Test Slot Fee</span>
                  <span className="font-semibold text-[#172554]">₹150</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>User Charges / Portal Cess</span>
                  <span className="font-semibold text-[#172554]">₹50</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#EEF2F7] pt-2 text-[11px] font-bold text-[#172554]">
                  <span>Total Amount Payable</span>
                  <span className="text-[#2563EB]">₹350</span>
                </div>
              </div>
            </article>

            {/* Card 2: What Happens Next */}
            <article className="rounded-[10px] border border-[#DCFCE7] bg-[#F0FDF4] p-4">
              <h2 className="text-[13px] font-bold text-[#166534]">
                What Happens Next?
              </h2>

              <ol className="mt-2.5 space-y-2 text-[9px] text-[#334155]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] font-bold text-[#166534]">
                    1
                  </span>
                  <span>Complete secure ₹350 payment online via UPI/Card.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] font-bold text-[#166534]">
                    2
                  </span>
                  <span>Instant Application Number &amp; Slot Slip generated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] font-bold text-[#166534]">
                    3
                  </span>
                  <span>Appear for LL Test on 02 May 2026, 10:45 AM.</span>
                </li>
              </ol>
            </article>

            {/* Card 3: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Help?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    If you notice any error in your application, edit before proceeding.
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
   SUBCOMPONENTS & HELPERS
============================================================ */

function ReviewSection({
  title,
  editHref,
  children,
}: {
  title: string;
  editHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-[#E2E8F0] bg-[#FAFAFE] p-3.5">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
        <h3 className="text-[11px] font-bold text-[#172554]">{title}</h3>
        <Link
          href={editHref}
          className="inline-flex items-center gap-1 text-[9px] font-bold text-[#2563EB] hover:underline"
        >
          <Edit3 size={11} />
          <span>Edit</span>
        </Link>
      </div>
      <div className="pt-2.5">{children}</div>
    </div>
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
