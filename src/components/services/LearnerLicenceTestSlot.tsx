"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarCheck2,
  Check,
  ChevronDown,
  Clock,
  Clock3,
  Computer,
  FileCheck2,
  Headphones,
  Home,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
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

const availableDates = [
  { day: "Tue", date: "02 May", slots: "18 slots", available: true },
  { day: "Wed", date: "03 May", slots: "12 slots", available: true },
  { day: "Thu", date: "04 May", slots: "8 slots", available: true },
  { day: "Fri", date: "05 May", slots: "Full", available: false },
  { day: "Sat", date: "06 May", slots: "24 slots", available: true },
  { day: "Mon", date: "08 May", slots: "30 slots", available: true },
];

const timeSlots = {
  morning: ["09:30 AM – 10:30 AM", "10:45 AM – 11:45 AM"],
  afternoon: ["12:30 PM – 01:30 PM", "02:00 PM – 03:00 PM"],
  evening: ["03:30 PM – 04:30 PM", "04:45 PM – 05:45 PM"],
};

export default function LearnerLicenceTestSlot() {
  const router = useRouter();

  const [testMode, setTestMode] = useState<"online" | "rto">("online");
  const [selectedRto, setSelectedRto] = useState("pune-sangam");
  const [selectedDate, setSelectedDate] = useState("02 May");
  const [selectedSlot, setSelectedSlot] = useState("10:45 AM – 11:45 AM");
  const [testLanguage, setTestLanguage] = useState("English");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push("/services/driving-licence/learner-licence/apply/review");
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
            Test Centre &amp; Slot
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[175px] items-center px-6 py-6 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <CalendarCheck2
                size={56}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Mobile Hero Icon */}
            <div className="mr-4 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs sm:hidden">
              <CalendarCheck2 size={28} className="text-[#6D28D9]" />
            </div>

            {/* Hero Center Text */}
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#172554] sm:text-[32px]">
                Apply for Learner Licence
              </h1>

              <p className="mt-2 max-w-[620px] text-[12px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Choose your test mode, select an RTO testing centre, and book a convenient date and time slot for your Learner Licence test.
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
            Center: Step 5 Test Slot Form Card (~55%)
            Right: Test Guidelines & Mock Prep (~25%)
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
                  const isCompleted = index < 4; // Steps 1, 2, 3, 4 completed
                  const isActive = index === 4; // Step 5 (Test Centre & Date) active

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
              CENTER: MAIN FORM CARD (STEP 5 OF 7)
          =================================================== */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[10px] border border-[#DCE5F1] bg-white p-5 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-6"
          >
            <p className="text-[10px] font-bold text-[#6D28D9]">
              Step 5 of 7
            </p>

            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
              Book LL Test Slot
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-[#475569]">
              Select your preferred test mode, RTO location, date and time slot.
            </p>

            {/* Section 1: Choose Test Mode */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <label className="block text-[11px] font-bold text-[#172554]">
                Select Test Mode <span className="text-[#DC2626]">*</span>
              </label>

              <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                {/* Mode 1: Online from Home */}
                <label
                  className={[
                    "relative flex cursor-pointer items-start gap-3 rounded-[9px] border p-3.5 transition",
                    testMode === "online"
                      ? "border-[#8B5CF6] bg-[#FAF8FF] ring-2 ring-[#EDE9FE]"
                      : "border-[#DCE5F1] bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="testMode"
                    value="online"
                    checked={testMode === "online"}
                    onChange={() => setTestMode("online")}
                    className="sr-only"
                  />
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#6D28D9]">
                    <Home size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-bold text-[#172554]">
                        Online Test (From Home)
                      </p>
                      <span className="rounded bg-[#DCFCE7] px-1.5 py-0.2 text-[8px] font-bold text-[#15803D]">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-1 text-[9px] leading-relaxed text-[#64748B]">
                      Take test anywhere using desktop webcam and Aadhaar facial authentication.
                    </p>
                  </div>
                </label>

                {/* Mode 2: In-Person RTO */}
                <label
                  className={[
                    "relative flex cursor-pointer items-start gap-3 rounded-[9px] border p-3.5 transition",
                    testMode === "rto"
                      ? "border-[#8B5CF6] bg-[#FAF8FF] ring-2 ring-[#EDE9FE]"
                      : "border-[#DCE5F1] bg-white hover:bg-[#F8FAFC]",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="testMode"
                    value="rto"
                    checked={testMode === "rto"}
                    onChange={() => setTestMode("rto")}
                    className="sr-only"
                  />
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0E7FF] text-[#3730A3]">
                    <Computer size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-[#172554]">
                      In-Person at RTO Track
                    </p>
                    <p className="mt-1 text-[9px] leading-relaxed text-[#64748B]">
                      Visit your selected RTO / ADTC test track on the appointed slot.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 2: Select RTO Testing Centre */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <label className="block text-[11px] font-bold text-[#172554]">
                Assigned RTO Jurisdiction &amp; Test Centre <span className="text-[#DC2626]">*</span>
              </label>

              <div className="relative mt-2">
                <select
                  value={selectedRto}
                  onChange={(e) => setSelectedRto(e.target.value)}
                  className="h-[44px] w-full appearance-none rounded-[7px] border border-[#DCE5F1] bg-white pl-3 pr-8 text-[11px] font-medium text-[#172554] outline-none transition focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]"
                >
                  <option value="pune-sangam">
                    RTO Pune — Sangam Bridge, Pune Central (MH12)
                  </option>
                  <option value="pune-adtc">
                    ADTC Automated Test Track — Phugewadi, Old Mumbai-Pune Hwy (MH12)
                  </option>
                  <option value="pimpri">
                    RTO Pimpri Chinchwad — Sector 24, Pradhikaran (MH14)
                  </option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
              </div>

              <div className="mt-2.5 flex items-start gap-2 rounded-[7px] bg-[#F8FAFC] p-2.5 text-[9px] text-[#64748B]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#2563EB]" />
                <span>
                  <strong>Sangam Bridge Centre:</strong> Near Pune Railway Station, Narveer Tanaji Wadi, Shivajinagar, Pune, Maharashtra 411005
                </span>
              </div>
            </div>

            {/* Section 3: Select Date */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-[#172554]">
                  Select Test Date <span className="text-[#DC2626]">*</span>
                </label>
                <span className="text-[9px] font-semibold text-[#6D28D9]">
                  May 2026
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.date;

                  return (
                    <button
                      key={item.date}
                      type="button"
                      disabled={!item.available}
                      onClick={() => setSelectedDate(item.date)}
                      className={[
                        "flex flex-col items-center rounded-[8px] border p-2.5 transition text-center",
                        isSelected
                          ? "border-[#6D28D9] bg-[#FAF8FF] ring-2 ring-[#EDE9FE]"
                          : item.available
                            ? "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                            : "border-[#F1F5F9] bg-[#F8FAFC] opacity-40 cursor-not-allowed",
                      ].join(" ")}
                    >
                      <span className="text-[8px] font-semibold text-[#64748B]">
                        {item.day}
                      </span>
                      <span
                        className={[
                          "mt-0.5 text-[12px] font-bold",
                          isSelected ? "text-[#6D28D9]" : "text-[#172554]",
                        ].join(" ")}
                      >
                        {item.date}
                      </span>
                      <span
                        className={[
                          "mt-1 text-[7px] font-bold",
                          item.available ? "text-[#16A34A]" : "text-[#EF4444]",
                        ].join(" ")}
                      >
                        {item.slots}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Select Time Slot */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <label className="block text-[11px] font-bold text-[#172554]">
                Select Time Slot for {selectedDate} <span className="text-[#DC2626]">*</span>
              </label>

              <div className="mt-3 space-y-3">
                {/* Morning Slots */}
                <div>
                  <p className="text-[9px] font-bold text-[#64748B]">
                    Morning Slots
                  </p>
                  <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                    {timeSlots.morning.map((slot) => (
                      <SlotButton
                        key={slot}
                        slot={slot}
                        selected={selectedSlot === slot}
                        onClick={() => setSelectedSlot(slot)}
                      />
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <p className="text-[9px] font-bold text-[#64748B]">
                    Afternoon Slots
                  </p>
                  <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                    {timeSlots.afternoon.map((slot) => (
                      <SlotButton
                        key={slot}
                        slot={slot}
                        selected={selectedSlot === slot}
                        onClick={() => setSelectedSlot(slot)}
                      />
                    ))}
                  </div>
                </div>

                {/* Evening Slots */}
                <div>
                  <p className="text-[9px] font-bold text-[#64748B]">
                    Evening Slots
                  </p>
                  <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                    {timeSlots.evening.map((slot) => (
                      <SlotButton
                        key={slot}
                        slot={slot}
                        selected={selectedSlot === slot}
                        onClick={() => setSelectedSlot(slot)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Test Language */}
            <div className="mt-5 border-t border-[#EEF2F7] pt-4">
              <label className="block text-[11px] font-bold text-[#172554]">
                Preferred Test Language <span className="text-[#DC2626]">*</span>
              </label>

              <div className="relative mt-2 max-w-[280px]">
                <select
                  value={testLanguage}
                  onChange={(e) => setTestLanguage(e.target.value)}
                  className="h-[40px] w-full appearance-none rounded-[7px] border border-[#DCE5F1] bg-white pl-3 pr-8 text-[11px] font-medium text-[#172554] outline-none transition focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
              </div>
            </div>

            {/* Actions: Back & Save & Continue */}
            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EEF2F7] pt-4 sm:flex-row sm:items-center">
              <Link
                href="/services/driving-licence/learner-licence/apply/documents"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] border border-[#8CB2FF] bg-white px-6 text-[11px] font-bold text-[#2563EB] transition hover:bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
              >
                <ArrowLeft size={17} />
                <span>Back to Documents</span>
              </Link>

              <button
                type="submit"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[7px] bg-[#2563EB] px-8 text-[12px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 shadow-2xs"
              >
                <span>Save &amp; Continue</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* ==================================================
              RIGHT: TEST GUIDELINES & MOCK PREP
          ================================================== */}
          <aside className="space-y-3">
            {/* Card 1: LL Test Pattern */}
            <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
                  <Award size={15} />
                </span>
                <h2 className="text-[13px] font-bold text-[#172554]">
                  LL Test Pattern
                </h2>
              </div>

              <div className="mt-3.5 space-y-2.5 text-[9px] text-[#475569]">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                  <span>Questions</span>
                  <strong className="text-[#172554]">20 Multiple Choice</strong>
                </div>
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                  <span>Time Allowed</span>
                  <strong className="text-[#172554]">20 Minutes</strong>
                </div>
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                  <span>Passing Mark</span>
                  <strong className="text-[#16A34A]">12 / 20 (60%)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Syllabus</span>
                  <strong className="text-[#172554]">Road Signs &amp; Rules</strong>
                </div>
              </div>
            </article>

            {/* Card 2: Free Mock Test */}
            <article className="rounded-[10px] border border-[#DDD6FE] bg-[#FAF5FF] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#6D28D9]" />
                    <h2 className="text-[13px] font-bold text-[#5B21B6]">
                      Free Mock Test
                    </h2>
                  </div>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    Practice sample official questions before your scheduled test slot.
                  </p>
                  <Link
                    href="/services/driving-licence"
                    className="mt-2.5 inline-flex min-h-[34px] items-center gap-1 rounded-[6px] bg-[#6D28D9] px-3 text-[9px] font-bold text-white transition hover:bg-[#5B21B6] shadow-2xs"
                  >
                    <span>Start Mock Test</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 3: Need Help? */}
            <article className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172554]">
                    Need Help?
                  </h2>
                  <p className="mt-1 max-w-[195px] text-[9px] leading-4 text-[#475569]">
                    For queries regarding test booking or rescheduling, visit our Help Center.
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

function SlotButton({
  slot,
  selected,
  onClick,
}: {
  slot: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center justify-between rounded-[7px] border px-3 py-2 text-left transition",
        selected
          ? "border-[#6D28D9] bg-[#FAF8FF] ring-2 ring-[#EDE9FE]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <Clock
          size={13}
          className={selected ? "text-[#6D28D9]" : "text-[#64748B]"}
        />
        <span
          className={[
            "text-[10px] font-bold",
            selected ? "text-[#6D28D9]" : "text-[#172554]",
          ].join(" ")}
        >
          {slot}
        </span>
      </div>

      <span
        className={[
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px]",
          selected
            ? "bg-[#6D28D9] text-white"
            : "border border-[#CBD5E1] bg-white",
        ].join(" ")}
      >
        {selected && <Check size={10} strokeWidth={3} />}
      </span>
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
