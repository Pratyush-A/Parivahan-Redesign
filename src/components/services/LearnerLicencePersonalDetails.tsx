"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  FileCheck2,
  FileEdit,
  Headphones,
  LockKeyhole,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

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

type FormData = {
  fullName: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  mobile: string;
  email: string;
  bloodGroup: string;
};

const initialForm: FormData = {
  fullName: "",
  gender: "Male",
  dob: "2000-08-12",
  fatherName: "",
  motherName: "",
  maritalStatus: "",
  mobile: "",
  email: "",
  bloodGroup: "",
};

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

export default function LearnerLicencePersonalDetails() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const age = useMemo(() => calculateAge(form.dob), [form.dob]);

  const errors = useMemo(() => {
    const result: Record<string, string> = {};

    if (!form.fullName.trim()) {
      result.fullName = "This field is required.";
    }

    if (!form.dob) {
      result.dob = "This field is required.";
    } else {
      const selectedDate = new Date(`${form.dob}T00:00:00`);
      if (selectedDate > new Date()) {
        result.dob = "Date of birth cannot be in the future.";
      }
    }

    if (!form.fatherName.trim()) {
      result.fatherName = "This field is required.";
    }

    if (!form.motherName.trim()) {
      result.motherName = "This field is required.";
    }

    if (!form.maritalStatus) {
      result.maritalStatus = "Please select marital status.";
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      result.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      result.email = "Enter a valid email address.";
    }

    return result;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    router.push(
      "/services/driving-licence/learner-licence/apply/address-details",
    );
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
            Personal Details
          </span>
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
                Fill in your personal details carefully as per your identity proof. Ensure all information is accurate before proceeding.
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
            Center: Step 2 Form Card (~55%)
            Right: Overview & Help Cards (~25%)
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
                  const isCompleted = index === 0;
                  const isActive = index === 1;

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
              CENTER: MAIN FORM CARD (STEP 2 OF 7)
          =================================================== */}
          <form
            onSubmit={handleContinue}
            noValidate
            className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
          >
            <p className="text-[10px] font-bold text-[#6D28D9]">
              Step 2 of 7
            </p>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Personal Details
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Enter your personal information as per your identity proof.
            </p>

            {/* =================================================
                ROW 1: Full Name, Gender, DOB, Age
            ================================================= */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.25fr_0.85fr_0.95fr_0.8fr]">
              <Field
                label="Full Name (As per ID Proof)"
                required
                error={submitted ? errors.fullName : undefined}
              >
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="Enter full name"
                  aria-invalid={submitted && !!errors.fullName}
                  className={inputClass(submitted && !!errors.fullName)}
                />
              </Field>

              <fieldset>
                <legend className="text-[11px] font-bold text-[#172554]">
                  Gender <span className="text-[#DC2626]">*</span>
                </legend>

                <div className="mt-[21px] flex h-[46px] items-center gap-4">
                  {(["Male", "Female", "Other"] as const).map((gender) => (
                    <label
                      key={gender}
                      className="flex min-h-[44px] cursor-pointer items-center gap-2 text-[10px] text-[#334155]"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={form.gender === gender}
                        onChange={() => updateField("gender", gender)}
                        className="h-[16px] w-[16px] accent-[#6D28D9]"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field
                label="Date of Birth"
                required
                error={submitted ? errors.dob : undefined}
              >
                <div className="relative">
                  <CalendarDays
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    id="dob"
                    type="date"
                    value={form.dob}
                    onChange={(event) =>
                      updateField("dob", event.target.value)
                    }
                    aria-invalid={submitted && !!errors.dob}
                    className={`${inputClass(submitted && !!errors.dob)} pl-9`}
                  />
                </div>
              </Field>

              <Field label="Age (as on today)">
                <input
                  id="age"
                  value={age !== null && age >= 0 ? `${age} Years` : "--"}
                  readOnly
                  tabIndex={-1}
                  aria-label="Calculated age"
                  className={`${inputClass(false)} bg-[#F8FAFC] text-[#64748B]`}
                />
              </Field>
            </div>

            {/* =================================================
                ROW 2: Father Name, Mother Name, Marital Status
            ================================================= */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_1.05fr]">
              <Field
                label="Father's / Guardian's Name"
                required
                error={submitted ? errors.fatherName : undefined}
              >
                <input
                  id="fatherName"
                  value={form.fatherName}
                  onChange={(event) =>
                    updateField("fatherName", event.target.value)
                  }
                  placeholder="Enter father's / guardian's name"
                  aria-invalid={submitted && !!errors.fatherName}
                  className={inputClass(submitted && !!errors.fatherName)}
                />
              </Field>

              <Field
                label="Mother's Name"
                required
                error={submitted ? errors.motherName : undefined}
              >
                <input
                  id="motherName"
                  value={form.motherName}
                  onChange={(event) =>
                    updateField("motherName", event.target.value)
                  }
                  placeholder="Enter mother's name"
                  aria-invalid={submitted && !!errors.motherName}
                  className={inputClass(submitted && !!errors.motherName)}
                />
              </Field>

              <Field
                label="Marital Status"
                required
                error={submitted ? errors.maritalStatus : undefined}
              >
                <select
                  id="maritalStatus"
                  value={form.maritalStatus}
                  onChange={(event) =>
                    updateField("maritalStatus", event.target.value)
                  }
                  aria-invalid={submitted && !!errors.maritalStatus}
                  className={inputClass(submitted && !!errors.maritalStatus)}
                >
                  <option value="">Select marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </Field>
            </div>

            {/* =================================================
                ROW 3: Mobile, Email, Blood Group
            ================================================= */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.25fr_1.2fr_1.05fr]">
              <Field
                label="Mobile Number"
                required
                helper="An OTP will be sent to this number"
                error={submitted ? errors.mobile : undefined}
              >
                <div className="flex h-[46px] overflow-hidden rounded-[7px] border border-[#DCE5F1] focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#EDE9FE]">
                  <div className="flex w-[57px] shrink-0 items-center justify-center border-r border-[#DCE5F1] bg-[#F8FAFC] text-[10px] font-semibold text-[#334155]">
                    +91
                  </div>

                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(event) =>
                      updateField(
                        "mobile",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="98765 43210"
                    aria-invalid={submitted && !!errors.mobile}
                    className="min-w-0 flex-1 border-0 bg-white px-3 text-[11px] text-[#172554] outline-none placeholder:text-[#94A3B8]"
                  />
                </div>
              </Field>

              <Field
                label="Email Address (Optional)"
                error={submitted ? errors.email : undefined}
              >
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Enter email address"
                  aria-invalid={submitted && !!errors.email}
                  className={inputClass(submitted && !!errors.email)}
                />
              </Field>

              <Field label="Blood Group (Optional)">
                <select
                  id="bloodGroup"
                  value={form.bloodGroup}
                  onChange={(event) =>
                    updateField("bloodGroup", event.target.value)
                  }
                  className={inputClass(false)}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </Field>
            </div>

            {/* =================================================
                ACTIONS: Back & Save & Continue
            ================================================= */}
            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
              <Link
                href="/services/driving-licence/learner-licence/apply"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] border border-[#8CB2FF] bg-white px-6 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
              >
                <ArrowLeft size={17} />
                <span>Back</span>
              </Link>

              <button
                type="submit"
                className={[
                  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] px-8 text-[12px] font-bold text-white transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 shadow-2xs",
                  isValid
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                    : "bg-[#CBD5E1]",
                ].join(" ")}
              >
                <span>Save &amp; Continue</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* ==================================================
              RIGHT: APPLICATION OVERVIEW, BEFORE YOU PROCEED, NEED HELP
          ================================================== */}
          <aside className="space-y-3">
            {/* Card 1: Application Overview */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <h2 className="text-[13px] font-bold text-[#172554]">
                Application Overview
              </h2>

              <div className="mt-3.5 space-y-3 text-[10px]">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                    <FileCheck2 size={14} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold text-[#172554]">Service</p>
                    <p className="text-[8px] text-[#64748B]">Apply for Learner Licence</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                    <CarFront size={14} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold text-[#172554]">Purpose</p>
                    <p className="text-[8px] text-[#64748B]">To learn to drive on public roads</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                    <CalendarDays size={14} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold text-[#172554]">Validity</p>
                    <p className="text-[8px] text-[#64748B]">6 months from date of issue</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                    <ShieldCheck size={14} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold text-[#172554]">Issued By</p>
                    <p className="text-[8px] text-[#64748B]">Regional Transport Office (RTO)</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2: Before You Proceed */}
            <article className="rounded-[10px] border border-[#F4D9B3] bg-[#FFF9F0] p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[13px] font-bold text-[#A85300]">
                  Before You Proceed
                </h2>
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FFF0CF] text-[#F59E0B]">
                  <Bell size={20} />
                </span>
              </div>

              <ul className="mt-2 space-y-2 text-[9px] text-[#475569]">
                <li className="flex items-start gap-1.5">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Keep all required documents ready.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Ensure your mobile number is active.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Have a recent passport size photograph.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Ensure stable internet connection.</span>
                </li>
              </ul>
            </article>

            {/* Card 3: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Help?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    For assistance, visit your nearest CSC or check our Help Center.
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
   SUB-COMPONENTS & HELPERS
============================================================ */

function Field({
  label,
  required,
  helper,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className="block text-[11px] font-bold text-[#172554]">
        {label}
        {required && <span className="ml-1 text-[#DC2626]">*</span>}
      </label>

      <div className="mt-2">{children}</div>

      {helper && !error && (
        <p className="mt-1 text-[9px] text-[#64748B]">{helper}</p>
      )}

      {error && (
        <p role="alert" className="mt-1 text-[9px] text-[#DC2626]">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "h-[46px] w-full rounded-[7px] border bg-white px-3 text-[11px] text-[#172554] outline-none transition",
    "placeholder:text-[#94A3B8]",
    hasError
      ? "border-[#DC2626] focus:ring-2 focus:ring-[#FCA5A5]"
      : "border-[#DCE5F1] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]",
  ].join(" ");
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
