"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  Clock3,
  Contact,
  FileSearch,
  Headphones,
  Home,
  IdCard,
  LockKeyhole,
  Phone,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    text: "100% Secure Application",
    className: "text-[#15803D]",
  },
  {
    icon: Clock3,
    title: "Quick & Easy",
    text: "Apply Online in Just a Few Steps",
    className: "text-[#2563EB]",
  },
  {
    icon: ShieldCheck,
    title: "100% Government",
    text: "Official Platform of Government of India",
    className: "text-[#F59E0B]",
  },
  {
    icon: FileSearch,
    title: "Track Application",
    text: "Track your LL application at every step",
    className: "text-[#6D28D9]",
  },
];

const documents = [
  {
    icon: IdCard,
    title: "Identity Proof (Any one)",
    text: "Aadhaar Card, Passport, Voter ID, PAN Card, etc.",
  },
  {
    icon: Home,
    title: "Address Proof (Any one)",
    text: "Aadhaar Card, Utility Bill, Bank Passbook, Ration Card, etc.",
  },
  {
    icon: CalendarDays,
    title: "Date of Birth Proof (Any one)",
    text: "Birth Certificate, Aadhaar Card, Passport, School Certificate, etc.",
  },
  {
    icon: Camera,
    title: "Passport Size Photograph",
    text: "Recent colour photograph as per the guidelines.",
  },
];

const process = [
  {
    number: "1",
    title: "Apply Online",
    text: "Fill application and upload documents",
  },
  {
    number: "2",
    title: "Pay Fee",
    text: "Make secure online payment",
  },
  {
    number: "3",
    title: "Slot Booking (if required)",
    text: "Book slot for LL Test at your RTO (if applicable)",
  },
  {
    number: "4",
    title: "LL Test",
    text: "Appear for Learner Licence Test (if required)",
  },
  {
    number: "5",
    title: "Learner Licence Issued",
    text: "Receive your LL (digital)",
  },
];

export default function LearnerLicenceLanding() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8FAFF] text-[#111827]"
    >
      <div className="mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 lg:px-[42px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-[12px]"
        >
          <Link
            href="/"
            className="text-[#64748B] hover:text-[#2563EB] hover:underline"
          >
            Home
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services"
            className="text-[#64748B] hover:text-[#2563EB] hover:underline"
          >
            Services
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <Link
            href="/services/driving-licence"
            className="text-[#64748B] hover:text-[#2563EB] hover:underline"
          >
            Driving Licence
          </Link>
          <span className="text-[#94A3B8]" aria-hidden="true">
            ›
          </span>
          <span className="font-semibold text-[#172554]">
            Get a Learner Licence
          </span>
        </nav>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}
        <section className="overflow-hidden rounded-[12px] border border-[#E2DEFA] bg-[#F2F0FF]">
          <div className="flex min-h-[198px] items-center px-6 py-7 sm:px-9 lg:px-[54px]">
            {/* Hero Left Icon Badge */}
            <div className="mr-7 hidden h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(109,40,217,0.08)] sm:flex">
              <UserPlus
                size={58}
                strokeWidth={1.55}
                className="text-[#6D28D9]"
              />
            </div>

            {/* Hero Center Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4 sm:hidden">
                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-2xs">
                  <UserPlus
                    size={29}
                    strokeWidth={1.7}
                    className="text-[#6D28D9]"
                  />
                </div>
                <h1 className="text-[27px] font-bold tracking-[-0.035em] text-[#172554]">
                  Get a Learner Licence
                </h1>
              </div>

              <h1 className="hidden text-[32px] font-bold tracking-[-0.04em] text-[#172554] sm:block">
                Get a Learner Licence
              </h1>

              <p className="mt-2.5 max-w-[620px] text-[13px] leading-[1.65] text-[#334155] sm:text-[14px]">
                Apply for a learner licence (LL) to start learning to drive. It is the first step towards getting your driving licence.
              </p>

              {/* 4 Compact Trust Indicators */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-2">
                      <Icon
                        size={19}
                        strokeWidth={2}
                        className={`mt-0.5 shrink-0 ${item.className}`}
                      />
                      <div>
                        <p className="text-[10px] font-bold text-[#172554]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 max-w-[145px] text-[8px] leading-3.5 text-[#475569]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Artwork Frame */}
            <div
              aria-label="Learner licence and vehicle illustration"
              className="relative ml-6 hidden h-[170px] w-[420px] shrink-0 lg:block"
            >
              {/* Subtle background skyline hint */}
              <div className="absolute bottom-4 right-0 h-[92px] w-[275px] opacity-25">
                <div className="absolute bottom-0 left-0 h-[65px] w-[72px] rounded-t-full border border-[#B8A9E7]" />
                <div className="absolute bottom-0 left-[82px] h-[85px] w-[65px] rounded-t-[40px] border border-[#B8A9E7]" />
                <div className="absolute bottom-0 right-0 h-[70px] w-[80px] rounded-t-full border border-[#B8A9E7]" />
              </div>

              {/* White vehicle mockup */}
              <div className="absolute bottom-[24px] left-[15px] h-[78px] w-[160px] rounded-[30px_30px_12px_12px] border-[2.5px] border-[#CBD5E1] bg-white shadow-sm">
                <div className="absolute -bottom-[13px] left-[18px] h-[26px] w-[26px] rounded-full border-[3.5px] border-[#64748B] bg-white" />
                <div className="absolute -bottom-[13px] right-[18px] h-[26px] w-[26px] rounded-full border-[3.5px] border-[#64748B] bg-white" />
                <div className="absolute left-[24px] top-[10px] h-[26px] w-[50px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
                <div className="absolute right-[20px] top-[12px] h-[22px] w-[36px] rounded-md bg-[#EEF2FF] border border-[#CBD5E1]" />
                <div className="absolute left-[8px] top-[46px] h-[9px] w-[14px] rounded-sm bg-[#F59E0B]/30" />
              </div>

              {/* Floating Learner Licence Card */}
              <div className="absolute bottom-[22px] right-[4px] z-10 h-[122px] w-[190px] rotate-[-2deg] rounded-[9px] border border-[#B9CCE8] bg-white shadow-[0_8px_20px_rgba(23,37,84,0.12)]">
                <div className="flex h-[28px] items-center justify-between rounded-t-[9px] bg-[#6135B8] px-3.5">
                  <span className="text-[8px] font-bold tracking-wider text-white">
                    LEARNER LICENCE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                </div>

                <div className="flex gap-2.5 p-2.5">
                  <div className="flex h-[46px] w-[38px] shrink-0 items-center justify-center rounded-md bg-[#EEF2FF] text-[#6D28D9]">
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

        {/* =====================================================
            WHY LEARNER LICENCE + WHO CAN APPLY
        ===================================================== */}
        <section className="mt-4 grid gap-3 lg:grid-cols-[1fr_435px]">
          {/* Left: Why do you need a Learner Licence? */}
          <div className="rounded-[11px] border border-[#E1E8F2] bg-white p-4 shadow-[0_3px_16px_rgba(23,37,84,0.025)] sm:p-5">
            <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#172554]">
              Why do you need a Learner Licence?
            </h2>

            <div className="mt-4 grid overflow-hidden rounded-[9px] border border-[#E1E8F2] sm:grid-cols-3">
              <WhyItem
                icon={CarFront}
                title="Learn to Drive Legally"
                text="A Learner Licence allows you to learn driving on Indian roads as per the law."
              />

              <WhyItem
                icon={User}
                title="First Step to Driving Licence"
                text="You must hold a valid Learner Licence before applying for a Driving Licence."
              />

              <WhyItem
                icon={ShieldCheck}
                title="Valid for 6 Months"
                text="Your Learner Licence is valid for 6 months from the date of issue."
              />
            </div>
          </div>

          {/* Right: Who can apply? */}
          <aside className="rounded-[11px] border border-[#F4D9B3] bg-[#FFF9F0] p-5">
            <h2 className="text-[15px] font-bold text-[#A85300]">
              Who can apply?
            </h2>

            <div className="mt-3 space-y-2.5">
              <EligibilityItem>
                Minimum age 16 years for Non-Transport vehicles
              </EligibilityItem>
              <EligibilityItem>
                Minimum age 18 years for Transport vehicles
              </EligibilityItem>
              <EligibilityItem>
                Resident of India
              </EligibilityItem>
              <EligibilityItem>
                Medically fit as per the Motor Vehicles Act
              </EligibilityItem>
            </div>

            <Link
              href="/services/driving-licence/learner-licence/eligibility"
              className="mt-3 inline-flex min-h-[38px] items-center gap-1 text-[10px] font-bold text-[#A85300] hover:underline"
            >
              <span>View eligibility details</span>
              <ArrowRight size={13} />
            </Link>
          </aside>
        </section>

        {/* =====================================================
            LOWER 4-COLUMN ROW:
            DOCUMENTS / FEES / PROCESS / SIDEBAR CARDS
        ===================================================== */}
        <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Documents Required */}
          <InfoCard title="Documents Required">
            <div className="space-y-3.5">
              {documents.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#F2ECFF] text-[#6D28D9]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#172554]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-4 text-[#64748B]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/services/driving-licence/learner-licence/documents"
              className="mt-4 inline-flex min-h-[36px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              <span>View all document guidelines</span>
              <ArrowRight size={13} />
            </Link>
          </InfoCard>

          {/* Card 2: Fees & Validity */}
          <InfoCard title="Fees & Validity">
            <div className="flex items-start gap-2.5">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#F2ECFF] text-[#6D28D9]">
                <span className="text-[16px] font-bold">₹</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-[#172554]">Fee</p>
                <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
                  ₹150 for Non-Transport vehicles
                  <br />
                  ₹300 for Transport vehicles
                </p>
              </div>
              <p className="max-w-[85px] text-[8px] leading-3.5 text-[#64748B]">
                Fee may vary slightly by State / RTO
              </p>
            </div>

            <div className="my-4 h-px bg-[#E2E8F0]" />

            <div className="flex items-start gap-2.5">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#F2ECFF] text-[#6D28D9]">
                <CalendarDays size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-[#172554]">Validity</p>
                <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
                  Learner Licence is valid for 6 months from the date of issue.
                </p>
              </div>
              <p className="max-w-[85px] text-[8px] leading-3.5 text-[#64748B]">
                You can apply for a Driving Licence within the validity period.
              </p>
            </div>

            <Link
              href="/services/driving-licence/learner-licence/fees"
              className="mt-4 inline-flex min-h-[36px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              <span>View fee details by state</span>
              <ArrowRight size={13} />
            </Link>
          </InfoCard>

          {/* Card 3: Application Process */}
          <InfoCard title="Application Process">
            <div className="relative ml-1">
              <div className="absolute bottom-[16px] left-[11px] top-[11px] border-l border-dashed border-[#C4B5FD]" />

              <div className="relative space-y-2.5">
                {process.map((item) => (
                  <div key={item.number} className="flex gap-2.5">
                    <div className="z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[#6D28D9] bg-white text-[9px] font-bold text-[#6D28D9]">
                      {item.number}
                    </div>

                    <div className="pb-0.5">
                      <p className="text-[10px] font-bold text-[#172554]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-3.5 text-[#64748B]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/services/driving-licence/learner-licence/process"
              className="mt-3 inline-flex min-h-[36px] items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              <span>Learn more about the process</span>
              <ArrowRight size={13} />
            </Link>
          </InfoCard>

          {/* Card 4: Right Sidebar Stacked 3 Cards */}
          <div className="flex flex-col gap-3">
            {/* Card A: Already have Learner Licence? */}
            <aside className="rounded-[10px] border border-[#E4D8F7] bg-[#F7F1FF] p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold text-[#172554]">
                    Already have Learner Licence?
                  </h3>
                  <p className="mt-0.5 text-[9px] leading-3.5 text-[#475569]">
                    Apply for a Driving Licence after your LL.
                  </p>
                  <Link
                    href="/services/driving-licence/apply"
                    className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Apply for DL</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-2xs">
                  <CarFront size={20} />
                </div>
              </div>
            </aside>

            {/* Card B: Track Your Application */}
            <aside className="rounded-[10px] border border-[#D7EFE3] bg-[#F1FCF5] p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold text-[#172554]">
                    Track Your Application
                  </h3>
                  <p className="mt-0.5 text-[9px] leading-3.5 text-[#475569]">
                    Track the status of your Learner Licence application.
                  </p>
                  <Link
                    href="/applications"
                    className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Track Now</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#15803D] shadow-2xs">
                  <FileSearch size={20} />
                </div>
              </div>
            </aside>

            {/* Card C: Need Help? */}
            <aside className="rounded-[10px] border border-[#D7E7F7] bg-[#F1F7FF] p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold text-[#172554]">
                    Need Help?
                  </h3>
                  <p className="mt-0.5 text-[9px] leading-3.5 text-[#475569]">
                    Get assistance from our support team or visit your nearest CSC.
                  </p>
                  <Link
                    href="/help"
                    className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Visit Help Center</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-2xs">
                  <Headphones size={20} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* =====================================================
            PRIMARY CTA SECTION
        ===================================================== */}
        <section className="mt-4 rounded-[11px] border border-[#D9E4F6] bg-white p-4 shadow-[0_3px_15px_rgba(23,37,84,0.025)] sm:p-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-[16px] font-bold text-[#172554]">
                Ready to get your Learner Licence?
              </h2>
              <p className="mt-1 text-[11px] leading-4 text-[#64748B]">
                Start your application online and complete the process in a few guided steps.
              </p>
            </div>

            <Link
              href="/services/driving-licence/learner-licence/apply"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#2563EB] px-8 text-[13px] font-bold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 sm:w-auto shadow-2xs"
            >
              <span>Apply for Learner Licence</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

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

function WhyItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CarFront;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-b border-[#E1E8F2] p-4 last:border-b-0 sm:min-h-[105px] sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0">
      <div className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full bg-[#F1E9FF] text-[#6D28D9]">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="text-[11px] font-bold text-[#172554]">{title}</h3>
        <p className="mt-1 text-[9px] leading-4 text-[#475569]">{text}</p>
      </div>
    </div>
  );
}

function EligibilityItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#FDE7B2] text-[#A85300]">
        <Check size={9} strokeWidth={3} />
      </span>
      <span className="text-[10px] leading-4 text-[#334155]">{children}</span>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-[10px] border border-[#DCE5F1] bg-white p-4 shadow-[0_3px_14px_rgba(23,37,84,0.025)] sm:p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-[14px] font-bold tracking-[-0.02em] text-[#172554]">
          {title}
        </h2>
        <div className="mt-3.5">{children}</div>
      </div>
    </article>
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
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB]">
        <Icon size={21} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172554]">{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-[#475569]">
          {description}
        </p>
      </div>
    </div>
  );
}
