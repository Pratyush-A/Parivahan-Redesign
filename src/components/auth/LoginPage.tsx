"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Headphones,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import DigiLockerConsent from "@/components/auth/DigiLockerConsent";

type LoginView = "mobile" | "otp" | "digilocker";

const benefits = [
  {
    icon: FileText,
    title: "Access all your services",
    description:
      "Manage driving licences, vehicles, applications, payments and documents in one place.",
  },
  {
    icon: Clock3,
    title: "Track your applications",
    description:
      "Track the status of your applications and get real-time updates.",
  },
  {
    icon: WalletCards,
    title: "Secure payments",
    description:
      "Make payments safely and view all your receipts in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is protected",
    description:
      "Your information is encrypted and used only for official service delivery.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [view, setView] = useState<LoginView>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const validMobile = mobile.length === 10;
  const otpValue = otp.join("");
  const validOtp = otpValue.length === 6;

  useEffect(() => {
    if (view !== "otp" || countdown <= 0) return;

    const timer = window.setInterval(() => {
      setCountdown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [view, countdown]);

  function handleMobileChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  }

  function continueWithMobile() {
    if (!validMobile) return;

    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setCountdown(30);
    setView("otp");

    window.setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 50);
  }

  function changeMobile() {
    setView("mobile");
    setOtpError("");
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...otp];
    next[index] = digit;

    setOtp(next);
    setOtpError("");

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const next = pasted
      .split("")
      .concat(["", "", "", "", "", ""])
      .slice(0, 6);

    setOtp(next);
    setOtpError("");

    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  }

  function verifyOtp() {
    if (!validOtp) return;

    if (otpValue !== "123456") {
      setOtpError("The OTP you entered is incorrect. Please try again.");
      return;
    }

    setOtpError("");
    setView("digilocker");
  }

  function resendOtp() {
    if (countdown > 0) return;

    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setCountdown(30);

    window.setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 50);
  }

  // Render DigiLocker Consent State
  if (view === "digilocker") {
    return (
      <DigiLockerConsent
        onBack={() => setView("otp")}
        onSuccess={() => {
          router.push("/dashboard");
        }}
        onSkip={() => {
          router.push("/dashboard");
        }}
      />
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827]"
    >
      {/* Main authentication area */}
      <section className="relative overflow-hidden">
        {/* Very subtle civic architectural line-art treatment */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] opacity-[0.04]"
        >
          {/* Subtle civic arches and pillars */}
          <div className="absolute bottom-0 left-[3%] h-[150px] w-[140px] rounded-t-full border-[6px] border-[#2563EB]" />
          <div className="absolute bottom-0 left-[16%] h-[110px] w-[170px] rounded-t-[90px] border-[5px] border-[#2563EB]" />
          <div className="absolute bottom-0 left-[34%] h-[180px] w-[200px] rounded-t-full border-[6px] border-[#2563EB]" />
          <div className="absolute bottom-0 right-[25%] h-[140px] w-[160px] rounded-t-full border-[5px] border-[#2563EB]" />
          <div className="absolute bottom-0 right-[8%] h-[170px] w-[130px] rounded-t-[70px] border-[6px] border-[#2563EB]" />
        </div>

        <div className="relative mx-auto flex max-w-[1035px] flex-col gap-10 px-4 py-12 sm:px-6 lg:min-h-[720px] lg:flex-row lg:items-start lg:gap-[64px] lg:px-0">
          {/* Left Login / OTP Card (approx 55%) */}
          <section className="w-full lg:w-[55%]">
            <div className="rounded-[12px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(23,37,84,0.06)] sm:p-8 lg:p-10">
              {view === "mobile" && (
                <MobileLogin
                  mobile={mobile}
                  validMobile={validMobile}
                  onMobileChange={handleMobileChange}
                  onContinue={continueWithMobile}
                />
              )}

              {view === "otp" && (
                <OtpLogin
                  mobile={mobile}
                  otp={otp}
                  validOtp={validOtp}
                  error={otpError}
                  countdown={countdown}
                  refs={otpRefs}
                  onOtpChange={handleOtpChange}
                  onOtpKeyDown={handleOtpKeyDown}
                  onOtpPaste={handleOtpPaste}
                  onVerify={verifyOtp}
                  onChangeMobile={changeMobile}
                  onResend={resendOtp}
                />
              )}
            </div>
          </section>

          {/* Right Benefits Card (approx 45%) */}
          <aside className="w-full lg:w-[45%]">
            <div className="overflow-hidden rounded-[12px] border border-[#DCE5F1] bg-white shadow-[0_8px_30px_rgba(23,37,84,0.045)]">
              <div className="p-7">
                <h2 className="text-[20px] font-bold tracking-[-0.025em] text-[#172554]">
                  Why sign in to Parivahan?
                </h2>

                <div className="mt-5 space-y-5">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;

                    return (
                      <div
                        key={benefit.title}
                        className={[
                          "flex gap-4",
                          index !== 0 ? "border-t border-[#E2E8F0] pt-5" : "",
                        ].join(" ")}
                      >
                        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#2563EB]">
                          <Icon size={22} strokeWidth={1.9} />
                        </div>

                        <div>
                          <h3 className="text-[14px] font-bold text-[#172554]">
                            {benefit.title}
                          </h3>

                          <p className="mt-1 text-[12px] leading-[1.65] text-[#475569]">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Security Banner */}
              <div className="border-t border-[#DCE5F1] bg-[#EEF5FF] px-7 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white text-[#172554] shadow-2xs">
                    <LockKeyhole size={22} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[12px] font-bold text-[#172554]">
                      100% Secure
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-[#475569]">
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
   MOBILE LOGIN VIEW
============================================================ */

function MobileLogin({
  mobile,
  validMobile,
  onMobileChange,
  onContinue,
}: {
  mobile: string;
  validMobile: boolean;
  onMobileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <h1 className="text-[32px] font-bold tracking-[-0.035em] text-[#172554]">
        Welcome back!
      </h1>

      <p className="mt-2 max-w-[420px] text-[15px] leading-[1.6] text-[#475569]">
        Sign in to access your applications, vehicles, driving licence services and more.
      </p>

      <div className="mt-7">
        <label
          htmlFor="mobile-number"
          className="block text-[15px] font-bold text-[#172554]"
        >
          Mobile number
        </label>

        <div className="mt-2 flex h-[54px] overflow-hidden rounded-[8px] border border-[#CBD5E1] bg-white transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#DBEAFE]">
          <button
            type="button"
            className="flex w-[95px] shrink-0 items-center justify-center gap-1.5 border-r border-[#CBD5E1] text-[15px] font-semibold text-[#172554]"
            aria-label="Country code India +91"
          >
            +91
            <ChevronDown size={15} className="text-[#64748B]" />
          </button>

          <input
            id="mobile-number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            value={mobile}
            onChange={onMobileChange}
            placeholder="Enter mobile number"
            className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#172554] outline-none placeholder:text-[#64748B]"
          />
        </div>

        <p className="mt-2 text-[13px] leading-[1.6] text-[#475569]">
          We will send a 6-digit One Time Password (OTP) to verify your mobile number
        </p>
      </div>

      <button
        type="button"
        disabled={!validMobile}
        onClick={onContinue}
        className="mt-6 flex min-h-[50px] w-full items-center justify-center rounded-[7px] bg-[#2563EB] px-5 text-[16px] font-semibold text-white !text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 shadow-2xs"
      >
        Continue
      </button>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DCE5F1]" />
        <span className="text-[12px] font-bold text-[#64748B]">OR</span>
        <div className="h-px flex-1 bg-[#DCE5F1]" />
      </div>

      <button
        type="button"
        onClick={() => undefined}
        className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[7px] border border-[#2563EB] bg-white px-5 text-[15px] font-bold text-[#2563EB] transition hover:bg-[#F5F9FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
      >
        <DigiLockerIcon />
        <span>Continue with DigiLocker</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#475569]">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
          <Check size={12} strokeWidth={3} />
        </span>
        <span>Secure government identity verification</span>
      </div>

      <div className="my-6 h-px bg-[#E2E8F0]" />

      <div className="flex items-center gap-3.5">
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#2563EB]">
          <Headphones size={20} />
        </div>

        <div>
          <p className="text-[13px] font-bold text-[#172554]">
            Need help signing in?
          </p>

          <Link
            href="/help"
            className="mt-0.5 inline-flex items-center gap-1 text-[13px] font-bold text-[#2563EB] hover:underline"
          >
            Get help without the app
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   OTP VERIFICATION VIEW
============================================================ */

function OtpLogin({
  mobile,
  otp,
  validOtp,
  error,
  countdown,
  refs,
  onOtpChange,
  onOtpKeyDown,
  onOtpPaste,
  onVerify,
  onChangeMobile,
  onResend,
}: {
  mobile: string;
  otp: string[];
  validOtp: boolean;
  error: string;
  countdown: number;
  refs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onOtpPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onChangeMobile: () => void;
  onResend: () => void;
}) {
  const displayMobile = mobile || "9876543210";
  const formattedMobile =
    displayMobile.length === 10
      ? `${displayMobile.slice(0, 5)} ${displayMobile.slice(5)}`
      : displayMobile;

  return (
    <>
      <button
        type="button"
        onClick={onChangeMobile}
        className="inline-flex min-h-[36px] items-center gap-2 text-[13px] font-semibold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="mt-4 text-[31px] font-bold tracking-[-0.035em] text-[#172554]">
        Verify your mobile number
      </h1>

      <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
        Enter the 6-digit OTP sent to
        <br />
        <strong className="text-[15px] font-bold text-[#172554]">
          +91 {formattedMobile}
        </strong>
      </p>

      <div className="mt-7">
        <label className="block text-[14px] font-bold text-[#172554]">
          Enter 6-digit OTP
        </label>

        <div
          className="mt-3 flex gap-2 sm:gap-4"
          role="group"
          aria-label="Enter 6-digit OTP"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="tel"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) => onOtpChange(index, event.target.value)}
              onKeyDown={(event) => onOtpKeyDown(index, event)}
              onPaste={onOtpPaste}
              aria-label={`OTP digit ${index + 1}`}
              className={[
                "h-[58px] min-w-0 flex-1 rounded-[8px] border bg-white text-center text-[24px] font-bold text-[#172554] outline-none transition sm:h-[64px]",
                error ? "border-[#B91C1C]" : "border-[#CBD5E1]",
                "focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]",
              ].join(" ")}
            />
          ))}
        </div>

        {error ? (
          <p
            role="alert"
            aria-live="polite"
            className="mt-3 rounded-lg bg-[#FEF2F2] px-3 py-2 text-[11px] font-semibold text-[#B91C1C]"
          >
            {error}
          </p>
        ) : (
          <div className="mt-3.5 flex items-center gap-2 text-[12px] text-[#475569]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
              <Check size={11} strokeWidth={3.5} />
            </span>
            <span>OTP is valid for 10 minutes</span>
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!validOtp}
        onClick={onVerify}
        className="mt-6 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#2563EB] px-5 text-[16px] font-semibold text-white !text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 shadow-2xs"
      >
        <span className="text-white !text-white">Verify &amp; Continue</span>
        <ArrowRight size={17} className="text-white !text-white" />
      </button>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DCE5F1]" />
        <span className="text-[12px] font-bold text-[#64748B]">OR</span>
        <div className="h-px flex-1 bg-[#DCE5F1]" />
      </div>

      <button
        type="button"
        onClick={onChangeMobile}
        className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-[7px] border border-[#2563EB] bg-white px-5 text-[15px] font-bold text-[#2563EB] transition hover:bg-[#F5F9FF] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
      >
        <PencilIcon />
        <span>Change mobile number</span>
      </button>

      <div className="mt-6 border-t border-[#E2E8F0] pt-6">
        <p className="text-[13px] font-bold text-[#172554]">
          Didn&apos;t receive the OTP?
        </p>

        <div className="mt-1 text-[13px] text-[#64748B]" aria-live="polite">
          {countdown > 0 ? (
            <>
              Resend OTP in{" "}
              <strong className="font-bold text-[#2563EB]">
                00:{String(countdown).padStart(2, "0")}
              </strong>
            </>
          ) : (
            <button
              type="button"
              onClick={onResend}
              className="font-bold text-[#2563EB] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

/* ============================================================
   DIGILOCKER ICON
============================================================ */

function DigiLockerIcon({
  size = 26,
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
