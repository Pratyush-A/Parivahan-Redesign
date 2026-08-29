"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileEdit,
  FileSearch,
  Headphones,
  LockKeyhole,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type ApplicantCategory = "individual" | "others";

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
    title: "Documents",
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

function calculateAge(dateValue: string) {
  if (!dateValue) return null;

  const birthDate = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

export default function LearnerLicenceApply() {
  const [applicantType, setApplicantType] =
    useState<ApplicantCategory>("individual");
  const [vehicleClass, setVehicleClass] = useState("non-transport-car");
  const [dob, setDob] = useState("");

  const age = useMemo(() => calculateAge(dob), [dob]);

  const isTransport = vehicleClass.startsWith("transport");
  const minimumAge = isTransport ? 18 : 16;
  const vehicleClassName = isTransport ? "Transport" : "Non-Transport";

  const hasValidAge = age !== null && age >= minimumAge;
  const isUnderAge = dob !== "" && age !== null && age < minimumAge && age >= 0;
  const isReady = dob !== "" && hasValidAge;

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
          <span className="font-semibold text-[#172554]">Apply</span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <FileEdit
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <FileEdit size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Fill in your details, upload documents and book your LL Test. It only takes a few simple steps.
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
              aria-label="Learner licence vehicle and application illustration"
              className="relative ml-5 hidden h-[150px] w-[430px] shrink-0 lg:block"
            >
              {/* Skyline background */}
              <div className="absolute bottom-0 right-0 h-[70px] w-[315px] opacity-20">
                <div className="absolute bottom-0 left-0 h-[54px] w-[48px] rounded-t-full border border-[#8B75C8]" />
                <div className="absolute bottom-0 left-[60px] h-[68px] w-[50px] rounded-t-[30px] border border-[#8B75C8]" />
                <div className="absolute bottom-0 right-[55px] h-[58px] w-[52px] rounded-t-full border border-[#8B75C8]" />
                <div className="absolute bottom-0 right-0 h-[45px] w-[45px] rounded-t-full border border-[#8B75C8]" />
              </div>

              {/* White car mockup */}
              <div className="absolute bottom-[20px] left-[8px] h-[74px] w-[160px] rounded-[30px_30px_12px_12px] border-[2.5px] border-[#CBD5E1] bg-white shadow-sm">
                <div className="absolute -bottom-[12px] left-[18px] h-[24px] w-[24px] rounded-full border-[3px] border-[#64748B] bg-white" />
                <div className="absolute -bottom-[12px] right-[18px] h-[24px] w-[24px] rounded-full border-[3px] border-[#64748B] bg-white" />
                <div className="absolute left-[24px] top-[9px] h-[24px] w-[48px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
                <div className="absolute right-[20px] top-[11px] h-[20px] w-[34px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
              </div>

              {/* Floating Learner Licence Card */}
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

              {/* Purple folder */}
              <div className="absolute bottom-[10px] right-[0px] z-20 h-[60px] w-[87px] rounded-[4px_4px_8px_8px] bg-[#9B6DE2] shadow-[0_6px_14px_rgba(109,40,217,0.15)]">
                <div className="absolute left-[7px] top-[-8px] h-[11px] w-[38px] rounded-t-[4px] bg-[#A77BE6]" />
                <div className="absolute left-[8px] top-[12px] h-[37px] w-[71px] rounded border border-[#BDA4ED] bg-[#A77BE6]" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            3-COLUMN APPLICATION LAYOUT
            Left: Application Steps (~20%)
            Center: Step 1 Form Card (~55%)
            Right: Eligibility & Support (~25%)
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
                  const isActive = index === 0;

                  return (
                    <div
                      key={step.number}
                      className={[
                        "flex items-start gap-3 rounded-[8px] p-2.5 transition",
                        isActive
                          ? "border border-[#C4B5FD] bg-[#FAF8FF]"
                          : "border border-transparent hover:bg-[#F8FAFC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          isActive
                            ? "bg-[#6D28D9] text-white shadow-2xs"
                            : "border border-[#CBD5E1] bg-white text-[#64748B]",
                        ].join(" ")}
                      >
                        {step.number}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={[
                            "text-[10px] font-bold leading-tight",
                            isActive ? "text-[#6D28D9]" : "text-[#334155]",
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
              CENTER: MAIN FORM CARD (STEP 1 OF 7)
          =================================================== */}
          <section className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6">
            <p className="text-[10px] font-bold text-[#6D28D9]">
              Step 1 of 7
            </p>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Eligibility &amp; Applicant Type
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Please select the applicant type and verify your eligibility for Learner Licence.
            </p>

            {/* Applicant Type Selection */}
            <fieldset className="mt-5">
              <legend className="text-[12px] font-bold text-[#172554]">
                Applicant Type
              </legend>

              <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                {/* Option 1: Individual */}
                <label
                  className={[
                    "flex min-h-[64px] cursor-pointer items-center justify-between gap-3 rounded-[8px] border p-3 transition focus-within:ring-2 focus-within:ring-[#8B5CF6]",
                    applicantType === "individual"
                      ? "border-[#8B5CF6] bg-[#FAF8FF] shadow-2xs"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                      <User size={18} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-[#172554]">
                        Individual
                      </p>
                      <p className="text-[9px] text-[#64748B]">
                        Apply as an individual for myself
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="applicant-type"
                    value="individual"
                    checked={applicantType === "individual"}
                    onChange={() => setApplicantType("individual")}
                    className="peer sr-only"
                  />
                  <span
                    className={[
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition",
                      applicantType === "individual"
                        ? "border-[#6D28D9] bg-white"
                        : "border-[#CBD5E1]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {applicantType === "individual" && (
                      <span className="h-[9px] w-[9px] rounded-full bg-[#6D28D9]" />
                    )}
                  </span>
                </label>

                {/* Option 2: Others */}
                <label
                  className={[
                    "flex min-h-[64px] cursor-pointer items-center justify-between gap-3 rounded-[8px] border p-3 transition focus-within:ring-2 focus-within:ring-[#8B5CF6]",
                    applicantType === "others"
                      ? "border-[#8B5CF6] bg-[#FAF8FF] shadow-2xs"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                      <Users size={18} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-[#172554]">
                        Others
                      </p>
                      <p className="text-[9px] text-[#64748B]">
                        Apply on behalf of someone else
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="applicant-type"
                    value="others"
                    checked={applicantType === "others"}
                    onChange={() => setApplicantType("others")}
                    className="peer sr-only"
                  />
                  <span
                    className={[
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition",
                      applicantType === "others"
                        ? "border-[#6D28D9] bg-white"
                        : "border-[#CBD5E1]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {applicantType === "others" && (
                      <span className="h-[9px] w-[9px] rounded-full bg-[#6D28D9]" />
                    )}
                  </span>
                </label>
              </div>
            </fieldset>

            {/* Vehicle Class Selection */}
            <div className="mt-5">
              <label
                htmlFor="vehicle-class"
                className="text-[12px] font-bold text-[#172554]"
              >
                Select Vehicle Class
              </label>
              <p className="mt-0.5 text-[9px] text-[#64748B]">
                Select the type of vehicle you want to learn
              </p>

              <div className="relative mt-2">
                <CarFront
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  aria-hidden="true"
                />

                <select
                  id="vehicle-class"
                  value={vehicleClass}
                  onChange={(event) => setVehicleClass(event.target.value)}
                  className="h-[46px] w-full appearance-none rounded-[7px] border border-[#CBD5E1] bg-white pl-10 pr-10 text-[11px] font-medium text-[#172554] outline-none transition focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]"
                >
                  <option value="non-transport-car">
                    Non-Transport (Car/Jeep/Van)
                  </option>
                  <option value="non-transport-bike-gear">
                    Non-Transport (Motorcycle with Gear)
                  </option>
                  <option value="non-transport-bike-nogear">
                    Non-Transport (Motorcycle without Gear / Scooter &lt; 50cc)
                  </option>
                  <option value="transport-commercial">
                    Transport (Taxi, Truck, Bus, Goods Carrier)
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Date of Birth and Age Fields */}
            <div className="mt-5 grid gap-4 sm:grid-cols-[1.3fr_0.7fr]">
              {/* DOB */}
              <div>
                <label
                  htmlFor="dob"
                  className="text-[12px] font-bold text-[#172554]"
                >
                  Date of Birth
                </label>
                <p id="dob-help" className="mt-0.5 text-[9px] text-[#64748B]">
                  Your age must be at least {minimumAge} years for {vehicleClassName} vehicles
                </p>

                <div className="relative mt-2">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    aria-hidden="true"
                  />
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    aria-describedby="dob-help"
                    aria-invalid={isUnderAge}
                    className={[
                      "h-[46px] w-full rounded-[7px] border bg-white pl-10 pr-3 text-[11px] text-[#172554] outline-none transition",
                      isUnderAge
                        ? "border-[#DC2626] focus:ring-2 focus:ring-[#FCA5A5]"
                        : "border-[#CBD5E1] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* Calculated Age */}
              <div>
                <label
                  htmlFor="age"
                  className="text-[12px] font-bold text-[#172554]"
                >
                  Age (as on today)
                </label>

                <div className="mt-[20px]">
                  <input
                    id="age"
                    value={age !== null && age >= 0 ? `${age} years` : "--"}
                    readOnly
                    tabIndex={-1}
                    aria-label="Calculated age"
                    className="h-[46px] w-full rounded-[7px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-[11px] text-[#64748B] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Eligibility Feedback Banner */}
            <div
              className={[
                "mt-5 rounded-[8px] border p-3.5 transition",
                hasValidAge
                  ? "border-[#D3EFD9] bg-[#F0FAF3]"
                  : isUnderAge
                    ? "border-[#FCA5A5] bg-[#FEF2F2]"
                    : "border-[#E2E8F0] bg-[#F8FAFC]",
              ].join(" ")}
              role="status"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={[
                    "flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full",
                    hasValidAge
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : isUnderAge
                        ? "bg-[#FEE2E2] text-[#DC2626]"
                        : "bg-[#E2E8F0] text-[#64748B]",
                  ].join(" ")}
                >
                  {hasValidAge ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <ShieldCheck size={12} />
                  )}
                </span>

                <div>
                  <p
                    className={[
                      "text-[10px] font-bold",
                      hasValidAge
                        ? "text-[#166534]"
                        : isUnderAge
                          ? "text-[#991B1B]"
                          : "text-[#475569]",
                    ].join(" ")}
                  >
                    {hasValidAge
                      ? `You are eligible to apply for Learner Licence for ${vehicleClassName} vehicles.`
                      : isUnderAge
                        ? `You must be at least ${minimumAge} years old for ${vehicleClassName} vehicles.`
                        : `Please enter your Date of Birth to verify eligibility.`}
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#64748B]">
                    Minimum age required: {minimumAge} years
                  </p>
                </div>
              </div>
            </div>

            {/* Form Save & Continue Action */}
            <div className="mt-6 flex justify-end">
              <Link
                href={
                  isReady
                    ? "/services/driving-licence/learner-licence/apply/personal-details"
                    : "#"
                }
                aria-disabled={!isReady}
                onClick={(event) => {
                  if (!isReady) {
                    event.preventDefault();
                  }
                }}
                className={[
                  "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[7px] px-8 text-[12px] font-bold transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 sm:w-auto shadow-2xs",
                  isReady
                    ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                    : "pointer-events-none bg-[#CBD5E1] text-white",
                ].join(" ")}
              >
                <span>Save &amp; Continue</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          {/* ===================================================
              RIGHT: ELIGIBILITY CRITERIA & SUPPORT CARDS
          =================================================== */}
          <aside className="space-y-3">
            {/* Card 1: Eligibility Criteria */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <User size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  Eligibility Criteria
                </h2>
              </div>

              <div className="mt-3.5 space-y-3 text-[10px]">
                <div>
                  <h3 className="font-bold text-[#6D28D9]">
                    Non-Transport Vehicles
                  </h3>
                  <ul className="mt-1.5 space-y-1 text-[9px] leading-4 text-[#475569]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#15803D]">✓</span>
                      <span>Minimum age: 16 years</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#15803D]">✓</span>
                      <span>
                        For vehicles like Car, Jeep, Van, Motorcycle with Gear &lt; 50cc
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#E2E8F0] pt-2.5">
                  <h3 className="font-bold text-[#6D28D9]">
                    Transport Vehicles
                  </h3>
                  <ul className="mt-1.5 space-y-1 text-[9px] leading-4 text-[#475569]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#15803D]">✓</span>
                      <span>Minimum age: 18 years</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#15803D]">✓</span>
                      <span>
                        For Transport Vehicles like Taxi, Truck, Bus, etc.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/services/driving-licence/learner-licence/eligibility"
                className="mt-3 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
              >
                <span>View all eligibility details</span>
                <ArrowRight size={12} />
              </Link>
            </article>

            {/* Card 2: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Help?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    Get assistance from our support team or visit your nearest CSC.
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

            {/* Card 3: Track Your Application */}
            <article className="rounded-[10px] border border-[#D7EFE3] bg-[#F1FCF5] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#047857]">
                    Track Your Application
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    You can track the status of your Learner Licence application at every step.
                  </p>
                  <Link
                    href="/applications"
                    className="mt-2 inline-flex min-h-[34px] items-center gap-1 text-[10px] font-bold text-[#15803D] hover:underline"
                  >
                    <span>Track Now</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[#15803D] shadow-2xs">
                  <FileSearch size={22} />
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
   SUB-COMPONENTS
============================================================ */

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
