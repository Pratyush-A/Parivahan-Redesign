"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Circle,
  Clock3,
  FileCheck2,
  Info,
  Search,
} from "lucide-react";
import { type FormEvent, useState } from "react";

export type ApplicationStatus = "completed" | "current" | "pending";

export type TimelineStep = {
  label: string;
  status: ApplicationStatus;
};

export type Application = {
  service: string;
  applicationNumber: string;
  status: string;
  progress: number;
  lastUpdated: string;
  nextStep: string;
  description: string;
};

const featuredApplication: Application = {
  service: "RC Ownership Transfer",
  applicationNumber: "PB01-2026-004821",
  status: "RTO verification",
  progress: 75,
  lastUpdated: "Today, 10:42 AM",
  nextStep: "Wait for RTO verification",
  description:
    "Your documents have been verified. Your application is waiting for RTO verification.",
};

const timeline: TimelineStep[] = [
  {
    label: "Application submitted",
    status: "completed",
  },
  {
    label: "Documents verified",
    status: "completed",
  },
  {
    label: "RTO verification",
    status: "current",
  },
  {
    label: "RC updated",
    status: "pending",
  },
];

const secondaryApplications: Application[] = [
  {
    service: "Driving Licence Renewal",
    applicationNumber: "DL09-2026-002184",
    status: "Documents verified",
    progress: 40,
    lastUpdated: "Yesterday, 4:18 PM",
    nextStep: "Application review",
    description: "Your documents have been received and are being reviewed.",
  },
  {
    service: "Learner's Licence",
    applicationNumber: "LL09-2026-001097",
    status: "Appointment required",
    progress: 60,
    lastUpdated: "24 Aug 2026",
    nextStep: "Book appointment",
    description: "Choose an available slot to continue your application.",
  },
];

function TimelineIcon({ status }: { status: ApplicationStatus }) {
  if (status === "completed") {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs"
        aria-hidden="true"
      >
        <Check size={15} strokeWidth={2.5} />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-white ring-4 ring-[#F59E0B]/15"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
      </span>
    );
  }

  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#94A3B8]"
      aria-hidden="true"
    >
      <Circle size={13} strokeWidth={1.8} />
    </span>
  );
}

function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-[#64748B]">{label}</span>

        <span className="text-xs font-bold text-[#172554]">
          {value}% complete
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${value}% complete`}
      >
        <div
          className="h-full rounded-full bg-[#15803D] transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function SecondaryApplicationCard({
  application,
}: {
  application: Application;
}) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)] motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
              Application
            </p>

            <h3 className="mt-1.5 text-base font-bold text-[#172554]">
              {application.service}
            </h3>

            <p className="mt-1 text-xs font-medium text-[#64748B]">
              {application.applicationNumber}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-[11px] font-semibold text-[#475569]">
            <Clock3 size={12} aria-hidden="true" />
            <span>{application.status}</span>
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
          {application.description}
        </p>

        <div className="mt-5">
          <ProgressBar
            value={application.progress}
            label="Application progress"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#E2E8F0] pt-4">
        <div>
          <p className="text-[11px] text-[#94A3B8]">Last updated</p>
          <p className="mt-0.5 text-xs font-medium text-[#475569]">
            {application.lastUpdated}
          </p>
        </div>

        <Link
          href={`/applications/${application.applicationNumber}`}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-[#172554] transition-colors hover:bg-[#F8F9FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
        >
          View
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export default function ApplicationsSection() {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [trackMessage, setTrackMessage] = useState<string | null>(null);

  const handleTrackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = applicationNumber.trim();
    if (!trimmed) {
      setTrackMessage("Please enter a valid application number.");
      return;
    }
    setTrackMessage(`Searching record for ${trimmed}...`);
  };

  return (
    <section
      aria-labelledby="applications-heading"
      className="border-t border-[#E2E8F0] bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[650px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
              Your applications
            </p>

            <h2
              id="applications-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#172554] sm:text-4xl"
            >
              Keep track of what matters.
            </h2>

            <p className="mt-3 max-w-[600px] text-base leading-7 text-[#64748B]">
              See your applications, their progress, and what you need to do
              next.
            </p>
          </div>

          <Link
            href="/applications"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-[#172554] underline decoration-[#F59E0B] decoration-2 underline-offset-4 transition-colors hover:text-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 sm:self-auto"
          >
            View all applications
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Featured application */}
        <article className="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Application information */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                    Active application
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#172554]">
                    {featuredApplication.service}
                  </h3>

                  <p className="mt-1.5 text-sm font-medium text-[#64748B]">
                    {featuredApplication.applicationNumber}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3.5 py-1.5 text-xs font-bold text-[#92400E]">
                  <Clock3 size={14} aria-hidden="true" />
                  <span>{featuredApplication.status}</span>
                </span>
              </div>

              <div className="mt-8">
                <ProgressBar
                  value={featuredApplication.progress}
                  label="Application progress"
                />
              </div>

              {/* What's happening */}
              <div className="mt-7 rounded-xl border border-[#BAE6FD] bg-white p-5 shadow-xs">
                <div className="flex gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E0F2FE] text-[#0EA5E9]">
                    <Info size={18} aria-hidden="true" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#172554]">
                      What&apos;s happening now?
                    </h4>

                    <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                      {featuredApplication.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next step */}
              <div className="mt-7 flex flex-col gap-4 border-t border-[#E2E8F0] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#94A3B8]">
                    Next step
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#172554]">
                    {featuredApplication.nextStep}
                  </p>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    You don&apos;t need to do anything right now.
                  </p>
                </div>

                <Link
                  href={`/applications/${featuredApplication.applicationNumber}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#172554] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  View application
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-5 text-xs text-[#94A3B8]">
                Last updated {featuredApplication.lastUpdated}
              </p>
            </div>

            {/* Timeline */}
            <div className="border-t border-[#E2E8F0] bg-white p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#0EA5E9]">
                  <FileCheck2 size={18} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#94A3B8]">
                    Your journey
                  </p>

                  <h4 className="mt-0.5 text-base font-bold text-[#172554]">
                    Application progress
                  </h4>
                </div>
              </div>

              <ol className="relative mt-8 space-y-0" aria-label="Application timeline">
                {timeline.map((step, index) => {
                  const isLast = index === timeline.length - 1;

                  return (
                    <li key={step.label} className="relative flex gap-4">
                      {!isLast && (
                        <span
                          className={[
                            "absolute left-[15px] top-8 h-[calc(100%-8px)] w-px",
                            step.status === "completed"
                              ? "bg-[#15803D]"
                              : "bg-[#E2E8F0]",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      )}

                      <TimelineIcon status={step.status} />

                      <div className="min-w-0 pb-8">
                        <p
                          className={[
                            "pt-1.5 text-sm",
                            step.status === "current"
                              ? "font-bold text-[#172554]"
                              : step.status === "completed"
                                ? "font-semibold text-[#334155]"
                                : "font-medium text-[#94A3B8]",
                          ].join(" ")}
                        >
                          {step.label}
                          <span className="sr-only">
                            {step.status === "completed"
                              ? " (Completed)"
                              : step.status === "current"
                                ? " (Current step)"
                                : " (Pending)"}
                          </span>
                        </p>

                        {step.status === "current" && (
                          <p className="mt-1 text-xs leading-5 text-[#64748B]">
                            Currently in progress
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </article>

        {/* Secondary applications */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {secondaryApplications.map((application) => (
            <SecondaryApplicationCard
              key={application.applicationNumber}
              application={application}
            />
          ))}
        </div>

        {/* Logged-out tracker */}
        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[650px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#64748B]">
                Checking without signing in?
              </p>

              <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#172554]">
                Already applied?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Enter your application number to check your progress. You
                don&apos;t need to sign in just to see a basic application
                status.
              </p>
            </div>

            <form
              className="w-full lg:w-[440px]"
              onSubmit={handleTrackSubmit}
            >
              <label
                htmlFor="application-number"
                className="mb-2 block text-xs font-semibold text-[#475569]"
              >
                Application number
              </label>

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    aria-hidden="true"
                  />

                  <input
                    id="application-number"
                    type="text"
                    value={applicationNumber}
                    onChange={(event) => {
                      setApplicationNumber(event.target.value);
                      if (trackMessage) setTrackMessage(null);
                    }}
                    placeholder="e.g. PB01-2026-004821"
                    className="min-h-[44px] w-full rounded-lg border border-[#CBD5E1] bg-white pl-10 pr-3 text-sm text-[#111827] outline-none placeholder:text-[#94A3B8] focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#172554] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  Track application
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              {trackMessage && (
                <p
                  className="mt-2 text-xs font-medium text-[#15803D]"
                  role="status"
                  aria-live="polite"
                >
                  {trackMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
