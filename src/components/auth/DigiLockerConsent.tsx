"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  Check,
  Clock3,
  Contact,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

type DigiLockerConsentProps = {
  onBack?: () => void;
  onSuccess?: () => void;
  onSkip?: () => void;
};

const documents = [
  {
    icon: Contact,
    title: "Driving Licence",
    description: "To access your driving licence services",
  },
  {
    icon: CarFront,
    title: "Vehicle Registration Certificate (RC)",
    description: "To access your vehicle related services",
  },
  {
    icon: UserRound,
    title: "Identity Details",
    description: "Name, Date of Birth, Gender",
    secondary: "To verify your identity",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Faster verification",
    description:
      "Get instant access to your verified documents without uploading physical copies.",
  },
  {
    icon: LockKeyhole,
    title: "Secure & reliable",
    description:
      "DigiLocker is a secure government platform for your digital documents.",
  },
  {
    icon: Clock3,
    title: "One-time authentication",
    description:
      "Verify once and access multiple Parivahan services seamlessly.",
  },
  {
    icon: FileCheck2,
    title: "Official & trusted",
    description:
      "Documents fetched directly from official government sources.",
  },
];

export default function DigiLockerConsent({
  onBack,
  onSuccess,
  onSkip,
}: DigiLockerConsentProps) {
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleContinue() {
    if (!consent || loading) return;

    setLoading(true);

    await new Promise((resolve) => window.setTimeout(resolve, 1000));

    setLoading(false);
    setVerified(true);
  }

  function handleSuccess() {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/dashboard");
    }
  }

  function handleSkip() {
    if (onSkip) {
      onSkip();
    } else {
      router.push("/dashboard");
    }
  }

  if (verified) {
    return (
      <main className="min-h-screen bg-[#F8FAFF] text-[#111827]">
        <section
          className="relative flex min-h-[680px] items-center justify-center px-4 py-12"
          aria-live="polite"
        >
          <div className="w-full max-w-[550px] rounded-[12px] border border-[#DCE5F1] bg-white p-8 text-center shadow-[0_8px_30px_rgba(23,37,84,0.06)] sm:p-12">
            <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
              <Check size={38} strokeWidth={2.5} />
            </div>

            <h1 className="mt-6 text-[28px] font-bold tracking-[-0.035em] text-[#172554]">
              Identity verified
            </h1>

            <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-6 text-[#475569]">
              Your verified documents are now securely linked to your Parivahan account.
            </p>

            <button
              type="button"
              onClick={handleSuccess}
              className="mt-8 flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[7px] bg-[#2563EB] text-[14px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
            >
              <span>Continue to Parivahan</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827]"
    >
      <section className="relative overflow-hidden">
        {/* Subtle civic background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[210px] opacity-[0.035]"
        >
          <div className="absolute bottom-0 left-[2%] h-[125px] w-[130px] rounded-t-full border-[7px] border-[#2563EB]" />
          <div className="absolute bottom-0 left-[13%] h-[85px] w-[150px] rounded-t-[80px] border-[5px] border-[#2563EB]" />
          <div className="absolute bottom-0 right-[14%] h-[110px] w-[130px] rounded-t-full border-[7px] border-[#2563EB]" />
          <div className="absolute bottom-0 right-[3%] h-[140px] w-[100px] rounded-t-[60px] border-[7px] border-[#2563EB]" />
        </div>

        <div className="relative mx-auto flex max-w-[1090px] flex-col gap-6 px-4 py-8 sm:px-6 lg:min-h-[710px] lg:flex-row lg:items-start lg:gap-6 lg:px-0">
          {/* =====================================================
              LEFT — CONSENT CARD (~58%)
          ===================================================== */}
          <section className="w-full lg:w-[58%]">
            <div className="rounded-[12px] border border-[#DCE5F1] bg-white p-6 shadow-[0_8px_30px_rgba(23,37,84,0.06)] sm:p-7">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex min-h-[36px] items-center gap-2 text-[13px] font-semibold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[13px] bg-[#EEF0FF]">
                  <DigiLockerIcon size={32} />
                </div>

                <div>
                  <h1 className="text-[27px] font-bold leading-tight tracking-[-0.035em] text-[#172554]">
                    Verify your identity
                  </h1>

                  <p className="mt-1.5 max-w-[440px] text-[12px] leading-[1.65] text-[#475569] sm:text-[13px]">
                    Parivahan uses DigiLocker to securely fetch your verified government documents.
                  </p>
                </div>
              </div>

              {/* Documents & data we will access card */}
              <div className="mt-5 overflow-hidden rounded-[10px] border border-[#D7E5FA] bg-[#F3F8FF]">
                <div className="px-4 pb-3 pt-3.5">
                  <h2 className="text-[14px] font-bold text-[#172554]">
                    Documents &amp; data we will access
                  </h2>

                  <p className="mt-0.5 text-[10px] leading-4 text-[#475569]">
                    These documents will be fetched from your DigiLocker with your consent.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[9px] border border-[#DCE5F1] bg-white">
                  {documents.map((document) => {
                    const Icon = document.icon;

                    return (
                      <div
                        key={document.title}
                        className="flex min-h-[60px] items-center gap-3 border-b border-[#E2E8F0] px-3.5 py-2.5 last:border-b-0"
                      >
                        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold leading-4 text-[#172554] sm:text-[12px]">
                            {document.title}
                          </p>

                          <p className="mt-0.5 text-[9px] leading-4 text-[#64748B] sm:text-[10px]">
                            {document.description}
                          </p>

                          {document.secondary && (
                            <p className="text-[9px] leading-4 text-[#64748B] sm:text-[10px]">
                              {document.secondary}
                            </p>
                          )}
                        </div>

                        <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#65B96A] text-white">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consent Checkbox */}
              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="peer sr-only"
                />

                <span
                  aria-hidden="true"
                  className={[
                    "mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] border transition",
                    consent
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-[#2563EB] bg-white",
                  ].join(" ")}
                >
                  {consent && <Check size={14} strokeWidth={3} />}
                </span>

                <span className="text-[10px] leading-[1.65] text-[#172554] sm:text-[11px]">
                  I provide my consent to Parivahan to access and use my above documents and data from DigiLocker for the purpose of delivering transport services.
                </span>
              </label>

              {/* Consent Withdrawal Note */}
              <div className="mt-3 flex items-start gap-2 text-[9px] leading-4 text-[#475569] sm:text-[10px]">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-[#15803D]"
                />

                <span>
                  You can withdraw this consent at any time from your account settings.
                </span>
              </div>

              {/* Continue with DigiLocker CTA */}
              <button
                type="button"
                disabled={!consent || loading}
                onClick={handleContinue}
                className="mt-5 flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[7px] bg-[#2563EB] px-5 text-[14px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 shadow-2xs"
              >
                {loading ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                    <span>Connecting to DigiLocker...</span>
                  </>
                ) : (
                  <>
                    <DigiLockerIcon size={22} light />
                    <span>Continue with DigiLocker</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Skip for now */}
              <button
                type="button"
                onClick={handleSkip}
                disabled={loading}
                className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-[7px] border border-[#2563EB] bg-white text-[12px] font-bold text-[#2563EB] transition hover:bg-[#F5F9FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Skip for now
              </button>

              {/* Security note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-center text-[9px] leading-4 text-[#475569] sm:text-[10px]">
                <LockKeyhole size={14} className="shrink-0 text-[#2563EB]" />
                <span>
                  Your documents are shared only with your consent and encrypted end-to-end.
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT — WHY DIGILOCKER (~42%)
          ===================================================== */}
          <aside className="w-full lg:w-[42%]">
            <div className="overflow-hidden rounded-[12px] border border-[#DCE5F1] bg-white shadow-[0_8px_30px_rgba(23,37,84,0.045)]">
              <div className="p-7">
                <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
                  Why we need your DigiLocker access?
                </h2>

                <div className="mt-4 space-y-4">
                  {reasons.map((reason, index) => {
                    const Icon = reason.icon;

                    return (
                      <div
                        key={reason.title}
                        className={[
                          "flex gap-4",
                          index !== 0 ? "border-t border-[#E2E8F0] pt-4" : "",
                        ].join(" ")}
                      >
                        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                          <Icon size={22} strokeWidth={1.8} />
                        </div>

                        <div>
                          <h3 className="text-[12px] font-bold text-[#172554] sm:text-[13px]">
                            {reason.title}
                          </h3>

                          <p className="mt-1 text-[10px] leading-[1.65] text-[#475569] sm:text-[11px]">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Security banner */}
              <div className="border-t border-[#DCE5F1] bg-[#EEF5FF] px-7 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white text-[#172554]">
                    <LockKeyhole size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[12px] font-bold text-[#172554]">
                      100% Secure
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
                      Parivahan uses secure and encrypted channels to protect your data.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded border border-[#CBD5E1] bg-white px-2 py-1">
                    <span className="text-[13px] font-black tracking-wider text-[#172554]">
                      NeGD
                    </span>
                    <span className="text-[7px] font-bold tracking-tight text-[#64748B]">
                      Digital India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   DIGILOCKER ICON
============================================================ */

function DigiLockerIcon({
  size = 30,
  light = false,
}: {
  size?: number;
  light?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 5.5h10.2L24 11.3V26H8V5.5Z"
        fill={light ? "white" : "#5B35D5"}
      />
      <path
        d="M18 5.5v6h6"
        stroke={light ? "#D9D0FF" : "#9B85FF"}
        strokeWidth="1.8"
      />
      <path
        d="M11 16h10M11 20h7"
        stroke={light ? "#D9D0FF" : "white"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="23"
        r="2"
        fill={light ? "#D9D0FF" : "#9B85FF"}
      />
    </svg>
  );
}
