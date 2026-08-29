"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FileCheck2,
  Headphones,
  House,
  LockKeyhole,
  MapPin,
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

type AddressForm = {
  state: string;
  district: string;
  houseNo: string;
  street: string;
  city: string;
  pincode: string;
  stayYears: string;
  stayMonths: string;
  sameAsPresent: boolean;
  permState: string;
  permDistrict: string;
  permHouseNo: string;
  permStreet: string;
  permCity: string;
  permPincode: string;
};

const initialAddress: AddressForm = {
  state: "Maharashtra",
  district: "Pune (MH12)",
  houseNo: "Flat 402, Sunshine Residency",
  street: "FC Road, Shivaji Nagar",
  city: "Pune",
  pincode: "411005",
  stayYears: "4",
  stayMonths: "6",
  sameAsPresent: true,
  permState: "Maharashtra",
  permDistrict: "Pune (MH12)",
  permHouseNo: "Flat 402, Sunshine Residency",
  permStreet: "FC Road, Shivaji Nagar",
  permCity: "Pune",
  permPincode: "411005",
};

export default function LearnerLicenceAddressDetails() {
  const router = useRouter();
  const [form, setForm] = useState<AddressForm>(initialAddress);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const result: Record<string, string> = {};

    if (!form.state) result.state = "Please select state.";
    if (!form.district) result.district = "Please select district.";
    if (!form.houseNo.trim()) result.houseNo = "This field is required.";
    if (!form.street.trim()) result.street = "This field is required.";
    if (!form.city.trim()) result.city = "This field is required.";
    if (!/^\d{6}$/.test(form.pincode)) {
      result.pincode = "Enter a valid 6-digit PIN code.";
    }

    if (!form.sameAsPresent) {
      if (!form.permState) result.permState = "Please select permanent state.";
      if (!form.permDistrict) result.permDistrict = "Please select permanent district.";
      if (!form.permHouseNo.trim()) result.permHouseNo = "This field is required.";
      if (!form.permStreet.trim()) result.permStreet = "This field is required.";
      if (!form.permCity.trim()) result.permCity = "This field is required.";
      if (!/^\d{6}$/.test(form.permPincode)) {
        result.permPincode = "Enter a valid 6-digit PIN code.";
      }
    }

    return result;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function updateField<K extends keyof AddressForm>(field: K, value: AddressForm[K]) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "sameAsPresent" && value === true) {
        next.permState = next.state;
        next.permDistrict = next.district;
        next.permHouseNo = next.houseNo;
        next.permStreet = next.street;
        next.permCity = next.city;
        next.permPincode = next.pincode;
      }
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    router.push("/services/driving-licence/learner-licence/apply/documents");
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
            Address Details
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <House
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <House size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Enter your current residential address and permanent address details for official records and dispatch.
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
            Center: Step 3 Address Form Card (~55%)
            Right: Address Guidelines & Support (~25%)
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
                  const isCompleted = index < 2; // Steps 1, 2 completed
                  const isActive = index === 2; // Step 3 (Address) active

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
              CENTER: MAIN FORM CARD (STEP 3 OF 7)
          =================================================== */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
          >
            <p className="text-[10px] font-bold text-[#6D28D9]">
              Step 3 of 7
            </p>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Address Details
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Enter your present residential address and permanent address details.
            </p>

            {/* Section 1: Present Address */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <h3 className="text-[13px] font-bold text-[#172554]">
                Present Residential Address
              </h3>

              <div className="mt-3.5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="State / Union Territory"
                  required
                  error={submitted ? errors.state : undefined}
                >
                  <select
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={inputClass(submitted && !!errors.state)}
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </Field>

                <Field
                  label="District / RTO Zone"
                  required
                  error={submitted ? errors.district : undefined}
                >
                  <select
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    className={inputClass(submitted && !!errors.district)}
                  >
                    <option value="Pune (MH12)">Pune (MH12)</option>
                    <option value="Mumbai South (MH01)">Mumbai South (MH01)</option>
                    <option value="Mumbai West (MH02)">Mumbai West (MH02)</option>
                    <option value="Thane (MH04)">Thane (MH04)</option>
                    <option value="Nagpur (MH31)">Nagpur (MH31)</option>
                  </select>
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="House / Flat / Door / Block No."
                  required
                  error={submitted ? errors.houseNo : undefined}
                >
                  <input
                    value={form.houseNo}
                    onChange={(e) => updateField("houseNo", e.target.value)}
                    placeholder="e.g. Flat 402, Sunshine Residency"
                    className={inputClass(submitted && !!errors.houseNo)}
                  />
                </Field>

                <Field
                  label="Street / Road / Locality"
                  required
                  error={submitted ? errors.street : undefined}
                >
                  <input
                    value={form.street}
                    onChange={(e) => updateField("street", e.target.value)}
                    placeholder="e.g. FC Road, Shivaji Nagar"
                    className={inputClass(submitted && !!errors.street)}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="City / Town / Village"
                  required
                  error={submitted ? errors.city : undefined}
                >
                  <input
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="e.g. Pune"
                    className={inputClass(submitted && !!errors.city)}
                  />
                </Field>

                <Field
                  label="PIN Code"
                  required
                  error={submitted ? errors.pincode : undefined}
                >
                  <input
                    type="tel"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      updateField("pincode", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="e.g. 411005"
                    className={inputClass(submitted && !!errors.pincode)}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Duration of Stay at Present Address">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={form.stayYears}
                        onChange={(e) => updateField("stayYears", e.target.value)}
                        placeholder="Years"
                        className={inputClass(false)}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={form.stayMonths}
                        onChange={(e) => updateField("stayMonths", e.target.value)}
                        placeholder="Months"
                        className={inputClass(false)}
                      />
                    </div>
                  </div>
                </Field>
              </div>
            </div>

            {/* Same as Present Address Toggle */}
            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
              <input
                type="checkbox"
                checked={form.sameAsPresent}
                onChange={(e) => updateField("sameAsPresent", e.target.checked)}
                className="peer sr-only"
              />
              <span
                className={[
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition",
                  form.sameAsPresent
                    ? "border-[#6D28D9] bg-[#6D28D9] text-white"
                    : "border-[#CBD5E1] bg-white",
                ].join(" ")}
                aria-hidden="true"
              >
                {form.sameAsPresent && <Check size={13} strokeWidth={3} />}
              </span>

              <span className="text-[11px] font-bold text-[#172554]">
                Permanent address is the same as present residential address
              </span>
            </label>

            {/* Permanent Address Fields (if not same) */}
            {!form.sameAsPresent && (
              <div className="mt-5 border-t border-[#EEF2F7] pt-4">
                <h3 className="text-[13px] font-bold text-[#172554]">
                  Permanent Address
                </h3>

                <div className="mt-3.5 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="State / Union Territory"
                    required
                    error={submitted ? errors.permState : undefined}
                  >
                    <select
                      value={form.permState}
                      onChange={(e) => updateField("permState", e.target.value)}
                      className={inputClass(submitted && !!errors.permState)}
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </Field>

                  <Field
                    label="District / RTO Zone"
                    required
                    error={submitted ? errors.permDistrict : undefined}
                  >
                    <select
                      value={form.permDistrict}
                      onChange={(e) => updateField("permDistrict", e.target.value)}
                      className={inputClass(submitted && !!errors.permDistrict)}
                    >
                      <option value="Pune (MH12)">Pune (MH12)</option>
                      <option value="Mumbai South (MH01)">Mumbai South (MH01)</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="House / Flat / Door / Block No."
                    required
                    error={submitted ? errors.permHouseNo : undefined}
                  >
                    <input
                      value={form.permHouseNo}
                      onChange={(e) => updateField("permHouseNo", e.target.value)}
                      className={inputClass(submitted && !!errors.permHouseNo)}
                    />
                  </Field>

                  <Field
                    label="Street / Road / Locality"
                    required
                    error={submitted ? errors.permStreet : undefined}
                  >
                    <input
                      value={form.permStreet}
                      onChange={(e) => updateField("permStreet", e.target.value)}
                      className={inputClass(submitted && !!errors.permStreet)}
                    />
                  </Field>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="City / Town / Village"
                    required
                    error={submitted ? errors.permCity : undefined}
                  >
                    <input
                      value={form.permCity}
                      onChange={(e) => updateField("permCity", e.target.value)}
                      className={inputClass(submitted && !!errors.permCity)}
                    />
                  </Field>

                  <Field
                    label="PIN Code"
                    required
                    error={submitted ? errors.permPincode : undefined}
                  >
                    <input
                      type="tel"
                      maxLength={6}
                      value={form.permPincode}
                      onChange={(e) =>
                        updateField("permPincode", e.target.value.replace(/\D/g, ""))
                      }
                      className={inputClass(submitted && !!errors.permPincode)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* Actions: Back and Save & Continue */}
            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
              <Link
                href="/services/driving-licence/learner-licence/apply/personal-details"
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
              RIGHT: ADDRESS GUIDELINES & SUPPORT
          ================================================== */}
          <aside className="space-y-3">
            {/* Card 1: Address Guidelines */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <MapPin size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  Address Guidelines
                </h2>
              </div>

              <ul className="mt-3 space-y-2 text-[9px] text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Must match your uploaded Address Proof document.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Your RTO jurisdiction is determined based on this PIN code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Provide accurate PIN code for official postal dispatch.</span>
                </li>
              </ul>
            </article>

            {/* Card 2: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Help?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    For assistance with address verification, visit your nearest CSC or check our Help Center.
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

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className="block text-[11px] font-bold text-[#172554]">
        {label}
        {required && <span className="ml-1 text-[#DC2626]">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
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
    "h-[44px] w-full rounded-[7px] border bg-white px-3 text-[11px] text-[#172554] outline-none transition",
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
