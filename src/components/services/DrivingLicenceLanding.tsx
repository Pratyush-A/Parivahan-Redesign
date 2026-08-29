"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CarFront,
  Check,
  Clock3,
  Contact,
  Download,
  FileSearch,
  FileText,
  Headphones,
  LockKeyhole,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserPlus,
  WalletCards,
} from "lucide-react";

const services = [
  {
    title: "Get a Learner Licence",
    description: "Apply for a learner licence to start learning to drive.",
    href: "/services/driving-licence/learner-licence",
    icon: UserPlus,
    iconClass: "bg-[#F1E9FF] text-[#6D28D9]",
  },
  {
    title: "View / Download Learner Licence",
    description: "View your learner licence details and download Form 3.",
    href: "/services/driving-licence/learner-licence/view",
    icon: Download,
    iconClass: "bg-[#F3E8FF] text-[#7E22CE]",
  },
  {
    title: "Get a Driving Licence",
    description: "Apply for a driving licence after your learner licence.",
    href: "/services/driving-licence/apply",
    icon: CarFront,
    iconClass: "bg-[#E7F7EA] text-[#15803D]",
  },
  {
    title: "View / Download DL",
    description: "View your driving licence details and download digital DL.",
    href: "/services/driving-licence/view",
    icon: Contact,
    iconClass: "bg-[#FFEAF4] text-[#DB2777]",
  },
  {
    title: "Book Test / Appointment",
    description: "Book slot for learner licence test or driving skill test.",
    href: "/services/driving-licence/slot-booking",
    icon: CalendarCheck,
    iconClass: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    title: "Renew my Licence",
    description: "Renew your expiring driving licence online.",
    href: "/services/driving-licence/renew",
    icon: RefreshCw,
    iconClass: "bg-[#EAF2FF] text-[#2563EB]",
  },
  {
    title: "Replace my Licence",
    description: "Replace lost, stolen or damaged driving licence.",
    href: "/services/driving-licence/replace",
    icon: FileText,
    iconClass: "bg-[#FFF1E7] text-[#F97316]",
  },
  {
    title: "Check Application Status",
    description: "Track the status of your driving licence application.",
    href: "/applications",
    icon: FileSearch,
    iconClass: "bg-[#E5F8FA] text-[#0891B2]",
  },
];

export default function DrivingLicenceLanding() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827]"
    >
      <div className="mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 lg:px-[42px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 text-[12px] text-[#64748B]"
        >
          <Link href="/" className="text-[#2563EB] hover:underline">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/services" className="text-[#2563EB] hover:underline">
            Services
          </Link>
          <span aria-hidden="true">›</span>
          <span className="font-semibold text-[#172554]">Driving Licence</span>
        </nav>

        {/* Hero Section */}
        <section className="overflow-hidden rounded-[12px] border border-[#E0EAF7] bg-[#EEF5FF]">
          <div className="flex min-h-[185px] items-center px-6 py-7 sm:px-10 lg:px-[54px]">
            {/* Hero Icon Badge */}
            <div className="mr-7 hidden h-[128px] w-[128px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_5px_18px_rgba(37,99,235,0.08)] sm:flex">
              <Contact
                size={62}
                strokeWidth={1.5}
                className="text-[#2563EB]"
              />
            </div>

            {/* Hero Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4 sm:hidden">
                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs">
                  <Contact size={29} className="text-[#2563EB]" />
                </div>
                <h1 className="text-[27px] font-bold tracking-[-0.035em] text-[#172554]">
                  Driving Licence
                </h1>
              </div>

              <h1 className="hidden text-[32px] font-bold tracking-[-0.035em] text-[#172554] sm:block">
                Driving Licence
              </h1>

              <p className="mt-2.5 max-w-[670px] text-[13px] leading-[1.7] text-[#334155] sm:text-[15px]">
                Apply for learner licence, driving licence, renew your licence, replace lost or damaged licence and more.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <TrustItem
                  icon={ShieldCheck}
                  text="Secure & Trusted"
                  iconClass="text-[#15803D]"
                />
                <TrustItem
                  icon={Clock3}
                  text="Quick & Easy"
                  iconClass="text-[#2563EB]"
                />
                <TrustItem
                  icon={ShieldCheck}
                  text="100% Government"
                  iconClass="text-[#F59E0B]"
                />
              </div>
            </div>

            {/* Hero Illustration Mockup */}
            <div
              aria-label="Driving licence and vehicle illustration"
              className="relative ml-6 hidden h-[165px] w-[410px] shrink-0 items-center justify-center lg:flex"
            >
              {/* Subtle background skyline hint */}
              <div className="absolute bottom-1 left-0 h-[45px] w-[280px] rounded-full border-b-[2px] border-[#BFDBFE] opacity-60" />

              {/* Car representation */}
              <div className="absolute bottom-[24px] left-[40px] h-[82px] w-[155px] rounded-[30px_30px_12px_12px] border-[2.5px] border-[#CBD5E1] bg-white shadow-sm">
                <div className="absolute -bottom-[13px] left-[18px] h-[26px] w-[26px] rounded-full border-[3.5px] border-[#64748B] bg-white" />
                <div className="absolute -bottom-[13px] right-[18px] h-[26px] w-[26px] rounded-full border-[3.5px] border-[#64748B] bg-white" />
                <div className="absolute left-[24px] top-[10px] h-[28px] w-[48px] rounded-md bg-[#EAF2FF] border border-[#CBD5E1]" />
                <div className="absolute right-[20px] top-[12px] h-[24px] w-[35px] rounded-md bg-[#EAF2FF] border border-[#CBD5E1]" />
                <div className="absolute left-[8px] top-[48px] h-[10px] w-[14px] rounded-sm bg-[#F59E0B]/30" />
              </div>

              {/* Floating DL Card */}
              <div className="absolute bottom-[22px] right-[12px] z-10 h-[125px] w-[190px] rotate-[-2deg] rounded-[9px] border border-[#B9CCE8] bg-white shadow-[0_8px_20px_rgba(23,37,84,0.12)]">
                <div className="h-[28px] rounded-t-[9px] bg-[#1747A6] px-3.5 py-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-bold tracking-wider text-white">
                    DRIVING LICENCE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                </div>

                <div className="flex gap-2.5 p-2.5">
                  <div className="flex h-[48px] w-[38px] shrink-0 items-center justify-center rounded-md bg-[#EAF2FF] text-[#2563EB]">
                    <Contact size={20} />
                  </div>

                  <div className="flex-1 space-y-1.5 pt-1">
                    <div className="h-2 w-full rounded bg-[#E2E8F0]" />
                    <div className="h-1.5 w-[80%] rounded bg-[#CBD5E1]" />
                    <div className="h-1.5 w-[60%] rounded bg-[#CBD5E1]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Services Grid ("What would you like to do?") */}
        <section className="mt-4 rounded-[12px] border border-[#E1E8F2] bg-white p-4 shadow-[0_3px_16px_rgba(23,37,84,0.035)] sm:p-5">
          <h2 className="text-[19px] font-bold tracking-[-0.02em] text-[#172554]">
            What would you like to do?
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex min-h-[188px] flex-col rounded-[10px] border border-[#DCE5F1] bg-white p-4 transition hover:-translate-y-[1px] hover:border-[#9BBBF2] hover:shadow-[0_7px_20px_rgba(37,99,235,0.07)] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
                >
                  <div
                    className={`flex h-[48px] w-[48px] items-center justify-center rounded-full ${service.iconClass}`}
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-4 text-[13px] font-bold leading-[1.35] text-[#172554]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-[1.55] text-[#475569]">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-4 text-[#2563EB] transition-transform group-hover:translate-x-1">
                    <ArrowRight size={19} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Information Grid (4 cards in a row) */}
        <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Eligibility Overview */}
          <InfoCard title="Eligibility Overview" icon={<ShieldCheck size={20} />}>
            <CheckItem>
              Minimum age 16 years for Learner Licence (Non-Transport)
            </CheckItem>
            <CheckItem>
              Minimum age 18 years for Driving Licence (Non-Transport)
            </CheckItem>
            <CheckItem>
              Must pass the required tests as per Motor Vehicles Act
            </CheckItem>
            <CardLink>View all eligibility details</CardLink>
          </InfoCard>

          {/* Card 2: Required Documents */}
          <InfoCard title="Required Documents" icon={<FileText size={20} />}>
            <DetailItem
              title="Identity Proof"
              description="Aadhaar Card, Passport, etc."
            />
            <DetailItem
              title="Address Proof"
              description="Aadhaar Card, Utility Bill, etc."
            />
            <DetailItem
              title="Date of Birth Proof"
              description="Birth Certificate, Aadhaar, etc."
            />
            <CardLink>View all documents</CardLink>
          </InfoCard>

          {/* Card 3: Fees & Time */}
          <InfoCard title="Fees & Time" icon={<WalletCards size={20} />}>
            <DetailItem
              title="Fees"
              description="Learner Licence: ₹150"
            />
            <p className="ml-[40px] mt-[-10px] text-[10px] leading-4 text-[#64748B]">
              Driving Licence: ₹200 - ₹1000
              <br />
              (Depends on vehicle class)
            </p>
            <DetailItem
              title="Time"
              description="Usually completed within 7 - 30 working days"
            />
            <CardLink>View fee details</CardLink>
          </InfoCard>

          {/* Card 4: Application Process */}
          <InfoCard title="Application Process" icon={<Clock3 size={20} />}>
            <ProcessItem
              number="1"
              title="Apply Online"
              description="Fill application and upload documents"
            />
            <ProcessItem
              number="2"
              title="Pay Fees"
              description="Secure online payment"
            />
            <ProcessItem
              number="3"
              title="Verification & Tests"
              description="Document verification and driving test"
            />
            <ProcessItem
              number="4"
              title="Licence Issued"
              description="Receive your driving licence"
            />
            <CardLink>Learn more about the process</CardLink>
          </InfoCard>
        </section>

        {/* Help / Service Selector Grid */}
        <section className="mt-3 grid gap-3 lg:grid-cols-[1fr_300px]">
          {/* Left Warm Card: Not Sure Which Service You Need? */}
          <div className="rounded-[10px] border border-[#F4D9B3] bg-[#FFF9F0] px-5 py-4">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h2 className="text-[14px] font-bold text-[#A85300]">
                  Not Sure Which Service You Need?
                </h2>
                <p className="mt-1 text-[11px] leading-5 text-[#475569]">
                  Answer a few questions and we&apos;ll help you choose the right service.
                </p>
              </div>

              <button
                type="button"
                className="hidden min-h-[42px] shrink-0 rounded-[7px] border border-[#F59E0B] bg-white px-5 text-[11px] font-bold text-[#A85300] transition hover:bg-[#FFF7E8] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 sm:block"
              >
                Help Me Choose
              </button>
            </div>

            <button
              type="button"
              className="mt-3 min-h-[42px] w-full rounded-[7px] border border-[#F59E0B] bg-white px-5 text-[11px] font-bold text-[#A85300] sm:hidden"
            >
              Help Me Choose
            </button>
          </div>

          {/* Right Pale Cyan Card: Need Help? */}
          <div className="rounded-[10px] border border-[#CDECEF] bg-[#F1FCFD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#0891B2]">
                <Headphones size={21} />
              </div>

              <div>
                <h2 className="text-[14px] font-bold text-[#0F6F78]">
                  Need Help?
                </h2>
                <p className="mt-0.5 text-[10px] leading-4 text-[#475569]">
                  Get assistance from our support team or visit your nearest CSC.
                </p>

                <Link
                  href="/help"
                  className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#0891B2] hover:underline"
                >
                  Visit Help Center
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="mt-4 rounded-[12px] border border-[#DCE5F1] bg-[#EEF5FF] px-4 py-4 sm:px-6">
          <div className="grid divide-y divide-[#BFD0E6] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            <TrustBlock
              icon={ShieldCheck}
              title="100% Secure"
              description="Your data is safe with us"
            />
            <TrustBlock
              icon={LockKeyhole}
              title="Government Approved"
              description="Official platform of Government of India"
            />
            <TrustBlock
              icon={Headphones}
              title="24/7 Support"
              description="We're here to help you anytime"
            />
            <TrustBlock
              icon={Phone}
              title="Multiple Channels"
              description="Also available via SMS, IVR, WhatsApp & CSC"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   HELPER SUB-COMPONENTS
============================================================ */

function TrustItem({
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

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4 shadow-[0_3px_14px_rgba(23,37,84,0.025)]">
      <div className="flex items-center gap-2 text-[#172554]">
        <div className="text-[#2563EB]">{icon}</div>
        <h2 className="text-[14px] font-bold">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
        <Check size={11} strokeWidth={3} />
      </span>
      <p className="text-[10px] leading-[1.55] text-[#334155]">{children}</p>
    </div>
  );
}

function DetailItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569]">
        <FileText size={14} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#64748B]">{description}</p>
      </div>
    </div>
  );
}

function ProcessItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3 flex gap-2.5">
      <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[#2563EB] text-[9px] font-bold text-[#2563EB]">
        {number}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#64748B]">{description}</p>
      </div>
    </div>
  );
}

function CardLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="mt-1 inline-flex min-h-[36px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
    >
      <span>{children}</span>
      <ArrowRight size={13} />
    </button>
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
    <div className="flex items-center gap-3 px-2 py-3 sm:px-5">
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB]">
        <Icon size={21} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">{description}</p>
      </div>
    </div>
  );
}
