"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  ChevronRight,
  Headphones,
  Phone,
  Store,
} from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
  arrow?: boolean;
};

const serviceLinks: FooterLink[] = [
  { label: "Driving Licence", href: "/services/driving-licence", arrow: true },
  { label: "My Vehicle", href: "/services/vehicle", arrow: true },
  { label: "Challan", href: "/services/challan", arrow: true },
  { label: "Permits", href: "/services/permits", arrow: true },
  {
    label: "Transport Professionals",
    href: "/services/transport-professionals",
    arrow: true,
  },
  { label: "Online Payment", href: "/payment", arrow: true },
  {
    label: "Check Application Status",
    href: "/applications",
    arrow: false,
  },
  { label: "Download Forms", href: "/forms", arrow: true },
];

const applicationLinks: FooterLink[] = [
  { label: "Track Application", href: "/applications" },
  { label: "Application History", href: "/applications/history" },
  { label: "Saved Drafts", href: "/applications/drafts" },
  { label: "Payments & Receipts", href: "/applications/payments" },
  { label: "Appointments", href: "/applications/appointments" },
];

const rtoLinks: FooterLink[] = [
  { label: "Find RTO Near You", href: "/rto" },
  { label: "RTO List", href: "/rto/list" },
  { label: "RTO Services", href: "/rto/services" },
  { label: "Book Appointment", href: "/rto/appointments" },
  { label: "RTO Timings & Holidays", href: "/rto/timings" },
];

const helpLinks: FooterLink[] = [
  { label: "Help Center", href: "/help" },
  { label: "FAQs", href: "/help/faqs" },
  { label: "User Guides", href: "/help/guides" },
  { label: "Video Tutorials", href: "/help/videos" },
  { label: "Grievance Redressal", href: "/help/grievance" },
  { label: "Contact Us", href: "/help/contact" },
  { label: "Feedback", href: "/help/feedback" },
];

const importantLinks: FooterLink[] = [
  {
    label: "Ministry of Road Transport and Highways",
    href: "/government/ministry",
  },
  { label: "VAHAN 4.0", href: "/government/vahan" },
  { label: "SARATHI", href: "/government/sarathi" },
  { label: "eChallan", href: "/government/echallan" },
  { label: "Bharat Series (BH-)", href: "/government/bharat-series" },
  { label: "National Permit System", href: "/government/national-permit" },
  { label: "MoRTH Dashboard", href: "/government/dashboard" },
];

const legalLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "RTI", href: "/rti" },
];

/* ==========================================================================
   STATE EMBLEM OF INDIA (Ashoka Lion Capital + Satyameva Jayate)
   ========================================================================== */
function LionCapitalEmblem({
  className = "h-14 w-auto",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const strokeColor = dark ? "#FFFFFF" : "#111827";
  const fillColor = dark ? "#FFFFFF" : "#111827";

  return (
    <svg
      viewBox="0 0 100 135"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="State Emblem of India"
      role="img"
    >
      {/* Central Lion Head & Body */}
      <path
        d="M50 6C43 6 39 11 39 18C39 23 42 27 44 30C42 34 40 39 40 45C40 53 44 59 50 62C56 59 60 53 60 45C60 39 58 34 56 30C58 27 61 23 61 18C61 11 57 6 50 6Z"
        fill={fillColor}
      />
      {/* Left Lion */}
      <path
        d="M25 12C19 12 16 17 17 23C18 28 21 32 24 34C23 39 23 44 25 49C27 55 32 59 37 61C35 55 34 48 34 42C34 36 36 30 39 26C35 23 32 18 32 14C30 12 27 12 25 12Z"
        fill={fillColor}
        opacity={0.88}
      />
      {/* Right Lion */}
      <path
        d="M75 12C81 12 84 17 83 23C82 28 79 32 76 34C77 39 77 44 75 49C73 55 68 59 63 61C65 55 66 48 66 42C66 36 64 30 61 26C65 23 68 18 68 14C70 12 73 12 75 12Z"
        fill={fillColor}
        opacity={0.88}
      />

      {/* Eyes & Mane Accents */}
      <circle cx="46.5" cy="18" r="1.3" fill={dark ? "#06173D" : "#FFFFFF"} />
      <circle cx="53.5" cy="18" r="1.3" fill={dark ? "#06173D" : "#FFFFFF"} />
      <path
        d="M48 23C49 25 51 25 52 23L50 26Z"
        fill={dark ? "#06173D" : "#FFFFFF"}
      />
      <circle cx="24.5" cy="23" r="1.1" fill={dark ? "#06173D" : "#FFFFFF"} />
      <circle cx="75.5" cy="23" r="1.1" fill={dark ? "#06173D" : "#FFFFFF"} />

      {/* Middle Support Paws */}
      <path
        d="M35 62H65C64 69 59 73 50 73C41 73 36 69 35 62Z"
        fill={fillColor}
      />

      {/* Abacus Platform */}
      <rect x="18" y="75" width="64" height="15" rx="3" fill={fillColor} />

      {/* Ashoka Chakra in Center */}
      <circle
        cx="50"
        cy="82.5"
        r="5.5"
        fill={dark ? "#06173D" : "#FFFFFF"}
        stroke={strokeColor}
        strokeWidth="0.8"
      />
      <circle cx="50" cy="82.5" r="1.4" fill={fillColor} />
      {/* 24-spoke impression lines */}
      <path
        d="M50 77V88M44.5 82.5H55.5M46.1 78.6L53.9 86.4M46.1 86.4L53.9 78.6M48 77.2L52 87.8M48 87.8L52 77.2M44.7 80.5L55.3 84.5M44.7 84.5L55.3 80.5"
        stroke={fillColor}
        strokeWidth="0.5"
      />

      {/* Galloping Horse on Left */}
      <path
        d="M25 85C27 83 30 83 32 85C31 87 29 88 27 87C25 88 24 86 25 85Z"
        fill={dark ? "#06173D" : "#FFFFFF"}
      />

      {/* Bull on Right */}
      <path
        d="M68 85C70 83 73 83 75 85C74 87 72 88 70 87C68 88 67 86 68 85Z"
        fill={dark ? "#06173D" : "#FFFFFF"}
      />

      {/* Bell-shaped Lotus Base */}
      <path
        d="M22 93C29 99 39 102 50 102C61 102 71 99 78 93H22Z"
        fill={fillColor}
        opacity={0.9}
      />
      <path
        d="M30 103C36 106 43 107 50 107C57 107 64 106 70 103L68 105C62 108 56 109 50 109C44 109 38 108 32 105L30 103Z"
        fill={fillColor}
      />

      {/* Inscription: Satyamev Jayate in Devanagari */}
      <text
        x="50"
        y="126"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill={fillColor}
        letterSpacing="0.06em"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

/* ==========================================================================
   INDIA.GOV.IN BADGE
   ========================================================================== */
function IndiaGovBadge() {
  return (
    <div className="flex items-center gap-3">
      {/* 9-dot grid icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/5">
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="4" cy="4" r="2" />
          <circle cx="10" cy="4" r="2" />
          <circle cx="16" cy="4" r="2" />
          <circle cx="4" cy="10" r="2" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="16" cy="10" r="2" />
          <circle cx="4" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      </div>

      <div>
        <p className="text-[15px] font-bold tracking-tight text-white">
          india.gov.in
        </p>
        <p className="text-[10px] leading-tight text-slate-300">
          The national portal
          <br />
          of India
        </p>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[15px] font-bold tracking-tight text-[#0A1B44]">
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex min-h-[30px] items-center justify-between text-[13.5px] leading-snug text-[#334155] transition-colors hover:text-[#0A1B44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
            >
              <span className="truncate pr-2">{link.label}</span>

              {link.arrow && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0A1B44] motion-reduce:transform-none"
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HelpItem({
  icon,
  title,
  children,
  linkLabel,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  linkLabel?: string;
  href?: string;
}) {
  return (
    <div className="flex min-w-0 gap-3.5 px-4 py-2 sm:px-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2EEFC] text-[#0A1B44]">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-[15px] font-bold tracking-tight text-[#0A1B44]">
          {title}
        </h3>

        <div className="mt-1 text-[12.5px] leading-snug text-[#64748B]">
          {children}
        </div>

        {linkLabel && href && (
          <Link
            href={href}
            className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#1A56DB] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
          >
            {linkLabel}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06173D] motion-reduce:transition-none"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* =========================================================
          SECTION 1 — HELP / SUPPORT STRIP
      ========================================================= */}
      <section
        aria-labelledby="footer-help-heading"
        className="px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pb-8 lg:pt-12"
      >
        <div className="mx-auto max-w-[1470px] overflow-hidden rounded-[18px] border border-[#E2EAF2] bg-[#F1F6FB] p-2 shadow-2xs">
          <div className="grid grid-cols-1 divide-y divide-[#DCE4EE] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-[1.25fr_repeat(4,1fr)] lg:divide-x lg:divide-y-0">
            {/* Column 1: Need help? */}
            <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2EEFC] text-[#0A1B44]">
                <Headphones size={22} strokeWidth={2} aria-hidden="true" />
              </div>

              <div>
                <h2
                  id="footer-help-heading"
                  className="text-[20px] font-bold tracking-tight text-[#0A1B44]"
                >
                  Need help?
                </h2>

                <p className="mt-1 max-w-[190px] text-[13px] leading-snug text-[#475569]">
                  We&apos;re here to help you, every step of the way.
                </p>
              </div>
            </div>

            {/* Column 2: Call us */}
            <div className="py-3">
              <HelpItem
                icon={<Phone size={20} strokeWidth={2} aria-hidden="true" />}
                title="Call us"
              >
                <p>Toll-free</p>
                <p className="font-bold text-[#0A1B44]">1800 123 6789</p>
                <p className="text-[11.5px] text-[#64748B]">
                  08:00 AM – 08:00 PM
                </p>
              </HelpItem>
            </div>

            {/* Column 3: Find a CSC */}
            <div className="py-3">
              <HelpItem
                icon={<Store size={20} strokeWidth={2} aria-hidden="true" />}
                title="Find a CSC"
                linkLabel="Locate CSC"
                href="/rto/csc"
              >
                Get assisted service
                <br /> at your nearest CSC
              </HelpItem>
            </div>

            {/* Column 4: Help Center */}
            <div className="py-3">
              <HelpItem
                icon={
                  <span className="text-[20px] font-bold leading-none text-[#0A1B44]">
                    ?
                  </span>
                }
                title="Help Center"
                linkLabel="Visit Help Center"
                href="/help"
              >
                Guides, FAQs and
                <br /> self-help articles
              </HelpItem>
            </div>

            {/* Column 5: Accessibility */}
            <div className="py-3">
              <HelpItem
                icon={
                  <Accessibility
                    size={20}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                }
                title="Accessibility"
                linkLabel="Learn More"
                href="/accessibility"
              >
                We are committed to
                <br /> an inclusive experience
              </HelpItem>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — MAIN FOOTER
      ========================================================= */}
      <section className="bg-white pb-12 pt-6">
        <div className="mx-auto max-w-[1470px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)] lg:gap-5">
            {/* Brand Column */}
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-3.5">
                <LionCapitalEmblem className="h-16 w-12 shrink-0" />

                <div>
                  <h2 className="text-[24px] font-extrabold tracking-tight text-[#0A1B44]">
                    Parivahan 2.0
                  </h2>

                  <p className="text-[14px] font-semibold text-[#64748B]">
                    Government of India
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-[270px] text-[13.5px] leading-relaxed text-[#475569]">
                One platform for all your transport related services. Simple.
                Accessible. Transparent.
              </p>

              {/* Subtle Tricolour Line */}
              <div
                className="mt-4 flex h-[3px] w-[240px] max-w-full overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <span className="w-[33%] bg-[#E78B11]" />
                <span className="w-[34%] bg-[#E2E8F0]" />
                <span className="w-[33%] bg-[#15803D]" />
              </div>

              {/* Privacy Card */}
              <div className="mt-5 max-w-[260px] rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-2xs">
                <div className="flex gap-2.5">
                  {/* Blue shield with white checkmark */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1A56DB] text-white shadow-2xs">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM13.707 8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[12.5px] font-bold text-[#0A1B44]">
                      Secure. Private. Trusted.
                    </p>

                    <p className="text-[11px] text-[#64748B]">
                      Your data is safe with us.
                    </p>

                    <Link
                      href="/privacy"
                      className="mt-1.5 inline-block text-[11px] font-semibold text-[#1A56DB] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                    >
                      Know more about data privacy →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Exact Government Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Image
                  src="/images/digital-india.svg"
                  alt="Digital India - Power To Empower"
                  width={110}
                  height={38}
                  className="h-9 w-auto object-contain"
                />

                <span
                  className="h-6 w-px bg-[#CBD5E1]"
                  aria-hidden="true"
                />

                <Image
                  src="/images/digilocker.svg"
                  alt="DigiLocker Verified"
                  width={120}
                  height={38}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="border-t border-[#E2E8F0] pt-6 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <FooterColumn title="Services" links={serviceLinks} />
            </div>

            {/* Column 3: My Applications */}
            <div className="border-t border-[#E2E8F0] pt-6 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <FooterColumn
                title="My Applications"
                links={applicationLinks}
              />
            </div>

            {/* Column 4: Find an RTO */}
            <div className="border-t border-[#E2E8F0] pt-6 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <FooterColumn title="Find an RTO" links={rtoLinks} />
            </div>

            {/* Column 5: Help */}
            <div className="border-t border-[#E2E8F0] pt-6 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <FooterColumn title="Help" links={helpLinks} />
            </div>

            {/* Column 6: Important Links */}
            <div className="border-t border-[#E2E8F0] pt-6 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <FooterColumn title="Important Links" links={importantLinks} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — DARK GOVERNMENT BAR
      ========================================================= */}
      <section className="bg-[#06173D] text-white">
        <div className="mx-auto max-w-[1470px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[280px_1fr_310px]">
            {/* Government identity */}
            <div className="flex items-center gap-3.5">
              <LionCapitalEmblem dark className="h-14 w-11 shrink-0" />

              <div>
                <p className="text-[14px] font-bold text-white">
                  Government of India
                </p>

                <p className="mt-0.5 max-w-[190px] text-[12px] leading-snug text-slate-300">
                  Ministry of Road Transport and Highways
                </p>
              </div>
            </div>

            {/* Legal links and copyright */}
            <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <nav
                aria-label="Legal and government information"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[12.5px] font-medium text-white transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-3">
                <p className="text-[11.5px] leading-relaxed text-slate-400">
                  © 2024 Parivahan 2.0, Ministry of Road Transport and
                  Highways, Government of India.
                  <br />
                  All rights reserved.
                </p>
              </div>
            </div>

            {/* Social icons and india.gov.in */}
            <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-[11.5px] font-medium text-slate-300">
                Follow us on
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <SocialButton label="Follow us on X">
                  <span className="text-[13px] font-bold">𝕏</span>
                </SocialButton>

                <SocialButton label="Follow us on Facebook">
                  <span className="text-[14px] font-bold">f</span>
                </SocialButton>

                <SocialButton label="Follow us on YouTube">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M10 15l5.19-3L10 9v6z" />
                  </svg>
                </SocialButton>

                <SocialButton label="Follow us on Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 stroke-current"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </SocialButton>

                {/* Community / Network Share icon */}
                <SocialButton label="Community network">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line
                      x1="8.59"
                      y1="13.51"
                      x2="15.42"
                      y2="17.49"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="15.41"
                      y1="6.51"
                      x2="8.59"
                      y2="10.49"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </SocialButton>
              </div>

              <div className="mt-4">
                <IndiaGovBadge />
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
