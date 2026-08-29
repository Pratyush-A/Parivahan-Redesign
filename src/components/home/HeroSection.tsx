"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeIndianRupee,
  CarFront,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  IdCard,
  MapPin,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type ServiceCategory = "Driving Licence" | "Vehicle" | "Challan" | "RTO" | "Applications";

type Service = {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  keywords: string[];
};

type PopularService = {
  title: string;
  icon: typeof FileText;
  href: string;
  tone: string;
};

const services: Service[] = [
  {
    id: "learner-licence",
    title: "Apply for Learner's Licence",
    description: "Start your learner's licence application.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "driving licence", "driving license", "learner", "ll", "apply", "new licence"],
  },
  {
    id: "driving-licence",
    title: "Apply for Driving Licence",
    description: "Apply for a permanent driving licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "driving licence", "driving license", "permanent", "apply", "new licence"],
  },
  {
    id: "renew-driving-licence",
    title: "Renew Driving Licence",
    description: "Renew an existing driving licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "driving licence", "renew", "renewal", "expire", "expiry"],
  },
  {
    id: "replace-driving-licence",
    title: "Replace Driving Licence",
    description: "Request a replacement for a lost or damaged licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "replace", "replacement", "lost", "damaged", "duplicate"],
  },
  {
    id: "licence-address",
    title: "Change Address on Driving Licence",
    description: "Update the address linked to your licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "address", "change address", "update address"],
  },
  {
    id: "licence-status",
    title: "Check Driving Licence Status",
    description: "Track the status of your driving licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "status", "track", "tracking", "check"],
  },
  {
    id: "vehicle-registration",
    title: "Vehicle Registration",
    description: "Register a new vehicle.",
    category: "Vehicle",
    keywords: ["vehicle", "registration", "register", "car", "bike", "scooter", "new vehicle", "apply"],
  },
  {
    id: "ownership-transfer",
    title: "Transfer Vehicle Ownership",
    description: "Transfer a vehicle to a new owner.",
    category: "Vehicle",
    keywords: ["vehicle", "ownership", "transfer", "rc", "second hand", "used car", "used bike", "car", "bike"],
  },
  {
    id: "duplicate-rc",
    title: "Duplicate Registration Certificate",
    description: "Request a replacement RC.",
    category: "Vehicle",
    keywords: ["rc", "registration certificate", "duplicate", "lost rc", "damaged rc", "vehicle"],
  },
  {
    id: "rc-address",
    title: "Change Address on RC",
    description: "Update the address on your vehicle registration.",
    category: "Vehicle",
    keywords: ["rc", "registration certificate", "address", "change address", "vehicle"],
  },
  {
    id: "rc-status",
    title: "Check RC Status",
    description: "Check the status of your registration certificate.",
    category: "Vehicle",
    keywords: ["rc", "registration certificate", "status", "track", "vehicle"],
  },
  {
    id: "challan-check",
    title: "Check Challan",
    description: "View outstanding traffic challans.",
    category: "Challan",
    keywords: ["challan", "fine", "traffic fine", "check", "pending challan"],
  },
  {
    id: "challan-pay",
    title: "Pay Challan",
    description: "Pay an outstanding traffic challan.",
    category: "Challan",
    keywords: ["challan", "pay", "payment", "fine", "traffic fine"],
  },
  {
    id: "challan-history",
    title: "Challan History",
    description: "View your previous challan records.",
    category: "Challan",
    keywords: ["challan", "history", "past challan", "records"],
  },
  {
    id: "challan-dispute",
    title: "Dispute Challan",
    description: "Get help with a challan you want to dispute.",
    category: "Challan",
    keywords: ["challan", "dispute", "wrong challan", "contest", "fine"],
  },
  {
    id: "application-status",
    title: "Check Application Status",
    description: "Track your submitted transport service application.",
    category: "Applications",
    keywords: ["application", "status", "track", "submitted", "check", "receipt"],
  },
  {
    id: "find-rto",
    title: "Find an RTO",
    description: "Find an RTO near you and explore its services.",
    category: "RTO",
    keywords: ["rto", "find", "near me", "nearby", "location", "office"],
  },
  {
    id: "rto-services",
    title: "RTO Services",
    description: "Explore services available at your RTO.",
    category: "RTO",
    keywords: ["rto", "services", "office", "available services"],
  },
  {
    id: "rto-appointment",
    title: "RTO Appointment",
    description: "Find appointment information for your RTO.",
    category: "RTO",
    keywords: ["rto", "appointment", "book", "slot", "visit"],
  },
];

const popularServices: PopularService[] = [
  {
    title: "Renew Driving Licence",
    icon: IdCard,
    href: "/services/driving-licence/renew",
    tone: "bg-[#E8F3FF] text-[#0B66B3]",
  },
  {
    title: "Transfer Vehicle Ownership",
    icon: CarFront,
    href: "/services/vehicle/ownership-transfer",
    tone: "bg-[#E4F7EC] text-[#15803D]",
  },
  {
    title: "Check & Pay Challan",
    icon: BadgeIndianRupee,
    href: "/services/challan",
    tone: "bg-[#FFF1D9] text-[#EA8A10]",
  },
  {
    title: "Check Application Status",
    icon: ClipboardCheck,
    href: "/applications",
    tone: "bg-[#F0E7FF] text-[#6D42C2]",
  },
  {
    title: "Find RTO Near You",
    icon: MapPin,
    href: "/rto",
    tone: "bg-[#E7F3FF] text-[#0B66B3]",
  },
];

const categoryOrder: ServiceCategory[] = ["Driving Licence", "Vehicle", "Challan", "Applications", "RTO"];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getSearchScore(service: Service, query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return 0;
  }

  const title = normalize(service.title);
  const category = normalize(service.category);
  const keywords = service.keywords.map(normalize);
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

  let score = 0;

  if (title === normalizedQuery) score += 100;
  if (title.startsWith(normalizedQuery)) score += 70;
  if (category === normalizedQuery) score += 60;
  if (category.startsWith(normalizedQuery)) score += 45;
  if (title.includes(normalizedQuery)) score += 40;
  if (category.includes(normalizedQuery)) score += 30;

  keywords.forEach((keyword) => {
    if (keyword === normalizedQuery) {
      score += 55;
    } else if (keyword.startsWith(normalizedQuery)) {
      score += 35;
    } else if (keyword.includes(normalizedQuery)) {
      score += 20;
    }
  });

  queryWords.forEach((word) => {
    if (title.includes(word)) score += 10;
    if (keywords.some((keyword) => keyword.includes(word))) score += 8;
  });

  return score;
}

function getCategoryIcon(category: ServiceCategory) {
  if (category === "Driving Licence") return FileText;
  if (category === "Vehicle") return CarFront;
  if (category === "Challan") return CreditCard;
  if (category === "Applications") return ClipboardCheck;
  return MapPin;
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchResults = useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return [];
    }

    return services
      .map((service) => ({
        service,
        score: getSearchScore(service, normalizedQuery),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.service);
  }, [query]);

  const showResults = isFocused && query.trim().length > 0;

  function navigateToService(service: Service) {
    setIsFocused(false);
    router.push(`/services/${service.id}`);
  }

  function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
      searchRef.current?.blur();
      return;
    }

    if (!showResults || searchResults.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current < searchResults.length - 1 ? current + 1 : 0));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current > 0 ? current - 1 : searchResults.length - 1));
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const selectedService = searchResults[activeIndex];

      if (selectedService) {
        navigateToService(selectedService);
      }
    }
  }

  function updateSearchQuery(value: string) {
    setQuery(value);
    setActiveIndex(-1);
  }

  function clearSearch() {
    setQuery("");
    setActiveIndex(-1);
    searchRef.current?.focus();
  }

  return (
    <main id="main-content" className="relative bg-[#F8F9FA]">
      <section
        aria-labelledby="hero-heading"
        className="relative z-20 min-h-[850px] px-4 pb-16 pt-9 text-center sm:px-8 lg:min-h-[880px] lg:px-12"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            src="/images/parivahan-hero-road.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-white/20" />

          <div
            className="absolute left-0 top-0 hidden h-full w-48 opacity-30 lg:block"
            style={{
              backgroundImage: "radial-gradient(circle, #94A3B8 1.6px, transparent 1.7px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-[1360px] flex-col items-center">
          <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C9D5E8] bg-white/80 px-5 text-sm font-semibold text-[#1263AF] shadow-sm backdrop-blur-sm">
            <ShieldCheck size={18} strokeWidth={2.1} aria-hidden="true" />
            <span>Secure</span>
            <span aria-hidden="true">·</span>
            <span>Verified</span>
            <span aria-hidden="true">·</span>
            <span>Citizen First</span>
          </div>

          <h1
            id="hero-heading"
            className="mt-7 max-w-[820px] text-balance text-[48px] font-black leading-[1.08] tracking-normal text-[#071B55] drop-shadow-[0_2px_4px_rgba(7,27,85,0.12)] sm:text-[64px] lg:text-[78px]"
          >
            Move through India
            <br />
            with <span className="text-[#F59E0B]">ease.</span>
          </h1>

          <div className="mt-4 h-1.5 w-14 rounded-full bg-[#F59E0B]" aria-hidden="true" />

          <p className="mt-7 max-w-[690px] text-balance text-lg font-medium leading-8 tracking-normal text-[#4B5563] sm:text-[22px]">
            Access driving licence, vehicle, challan and RTO services simply, securely and in just a few steps.
          </p>

          <div ref={searchContainerRef} className="relative z-30 mt-12 w-full max-w-[980px]">
            <label htmlFor="service-search" className="sr-only">
              Search for a Parivahan service
            </label>

            <div
              className={[
                "relative flex min-h-[76px] items-center rounded-2xl border bg-white/95 px-4 shadow-[0_16px_45px_rgba(7,27,85,0.12)] backdrop-blur-sm transition-all duration-200 sm:min-h-[86px] sm:rounded-[22px] sm:px-6",
                isFocused ? "border-[#0EA5E9] ring-4 ring-[#0EA5E9]/15 shadow-[0_20px_50px_rgba(14,165,233,0.14)]" : "border-[#D6DFEB] hover:border-[#CBD5E1]",
              ].join(" ")}
            >
              <Search className="mr-3.5 shrink-0 text-[#071B55] sm:mr-4" size={28} strokeWidth={2.2} aria-hidden="true" />

              <div className="flex min-w-0 flex-1 flex-col justify-center py-2 text-left">
                <input
                  ref={searchRef}
                  id="service-search"
                  type="text"
                  value={query}
                  onChange={(event) => updateSearchQuery(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for a service..."
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={showResults}
                  aria-controls="service-search-results"
                  aria-autocomplete="list"
                  aria-activedescendant={activeIndex >= 0 ? `service-result-${searchResults[activeIndex]?.id}` : undefined}
                  className="block w-full border-0 bg-transparent p-0 text-xl font-medium tracking-normal text-[#111827] outline-none ring-0 placeholder:text-[#94A3B8] focus:border-0 focus:outline-none focus:ring-0 focus-visible:!outline-none focus-visible:!ring-0 sm:text-2xl [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
                <p className="mt-0.5 hidden text-xs font-normal tracking-normal text-[#64748B] sm:block">
                  e.g. Driving Licence, DL, Apply, RC, Challan, Renewal
                </p>
              </div>

              {query ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0] hover:text-[#071B55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                  aria-label="Clear service search"
                >
                  <X size={18} strokeWidth={2.2} aria-hidden="true" />
                </button>
              ) : null}

              <div className="mx-3 hidden h-10 w-px bg-[#E2E8F0] sm:block" aria-hidden="true" />

              <button
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#071B55] text-white shadow-[0_8px_20px_rgba(7,27,85,0.2)] transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 sm:h-14 sm:w-14 sm:rounded-[18px]"
                aria-label="Search services"
              >
                <Search size={24} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>

            {showResults && (
              <div
                id="service-search-results"
                role="listbox"
                className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-[#DCE4EF] bg-white text-left shadow-[0_25px_60px_-15px_rgba(7,27,85,0.22),0_0_1px_1px_rgba(7,27,85,0.05)]"
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="max-h-[380px] space-y-3 overflow-y-auto p-2.5 sm:max-h-[420px]">
                      {categoryOrder.map((category) => {
                        const categoryResults = searchResults.filter((service) => service.category === category);

                        if (categoryResults.length === 0) {
                          return null;
                        }

                        return (
                          <div key={category} className="space-y-1">
                            <div className="flex items-center justify-between px-3 py-1">
                              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                                {category}
                              </span>
                              <span className="text-[11px] font-medium text-[#94A3B8]">
                                {categoryResults.length} {categoryResults.length === 1 ? "result" : "results"}
                              </span>
                            </div>

                            <div className="space-y-1">
                              {categoryResults.map((service) => {
                                const resultIndex = searchResults.findIndex((item) => item.id === service.id);
                                const isActive = activeIndex === resultIndex;
                                const Icon = getCategoryIcon(service.category);

                                return (
                                  <button
                                    key={service.id}
                                    id={`service-result-${service.id}`}
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onMouseEnter={() => setActiveIndex(resultIndex)}
                                    onClick={() => navigateToService(service)}
                                    className={[
                                      "group flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-all",
                                      isActive
                                        ? "bg-[#EFF6FF] text-[#071B55]"
                                        : "hover:bg-[#F8F9FA] text-[#1E293B]",
                                    ].join(" ")}
                                  >
                                    <div
                                      className={[
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                        isActive
                                          ? "border-[#BFDBFE] bg-white text-[#0B66B3] shadow-xs"
                                          : "border-[#E2E8F0] bg-[#F8F9FA] text-[#071B55] group-hover:border-[#CBD5E1] group-hover:bg-white",
                                      ].join(" ")}
                                    >
                                      <Icon size={17} aria-hidden="true" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-sm font-semibold text-[#071B55] group-hover:text-[#1E3A8A]">
                                        {service.title}
                                      </div>
                                      <div className="truncate text-xs text-[#64748B]">
                                        {service.description}
                                      </div>
                                    </div>

                                    <ChevronRight
                                      size={16}
                                      className={[
                                        "shrink-0 transition-transform",
                                        isActive
                                          ? "translate-x-0.5 text-[#0B66B3]"
                                          : "text-[#94A3B8] group-hover:translate-x-0.5 group-hover:text-[#071B55]",
                                      ].join(" ")}
                                      aria-hidden="true"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8F9FA] px-4 py-2.5 text-xs text-[#64748B]">
                      <div className="hidden items-center gap-3 sm:flex">
                        <span>
                          Use <kbd className="rounded border border-[#CBD5E1] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">↑</kbd> <kbd className="rounded border border-[#CBD5E1] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">↓</kbd> to navigate
                        </span>
                        <span>
                          <kbd className="rounded border border-[#CBD5E1] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">↵</kbd> to select
                        </span>
                        <span>
                          <kbd className="rounded border border-[#CBD5E1] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">ESC</kbd> to close
                        </span>
                      </div>
                      <Link
                        href="/services"
                        className="ml-auto inline-flex items-center gap-1 font-semibold text-[#0B66B3] hover:underline"
                      >
                        Browse all services
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm font-semibold text-[#071B55]">No matching service found for &ldquo;{query}&rdquo;</p>
                    <p className="mt-1 text-xs text-[#64748B]">Try searching for Driving Licence, RC, Challan or RTO</p>
                    <Link
                      href="/services"
                      className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#071B55] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#1E3A8A]"
                    >
                      Browse all services
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 flex w-full max-w-[650px] items-center justify-center gap-7">
            <span className="h-px flex-1 bg-[#9BAAC0]" aria-hidden="true" />
            <h2 className="text-[23px] font-bold tracking-normal text-[#071B55] sm:text-[25px]">Popular Services</h2>
            <span className="h-px flex-1 bg-[#9BAAC0]" aria-hidden="true" />
          </div>

          <div className="mt-7 grid w-full max-w-[1360px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {popularServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex min-h-[116px] items-center gap-4 rounded-xl border border-[#DCE4EF] bg-white/95 px-5 text-left shadow-[0_12px_35px_rgba(7,27,85,0.12)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B8C6DA] hover:shadow-[0_16px_42px_rgba(7,27,85,0.16)] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
                >
                  <div className={`flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full ${service.tone}`}>
                    <Icon size={36} strokeWidth={2.1} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1 text-[17px] font-bold leading-7 tracking-normal text-[#071B55]">
                    {service.title}
                  </div>

                  <ChevronRight
                    size={28}
                    strokeWidth={2.1}
                    className="shrink-0 text-[#071B55] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="mt-10 inline-flex min-h-[54px] min-w-[54px] items-center justify-center rounded-full border border-[#D7E0EF] bg-white/80 text-[#071B55] shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
            aria-label="Scroll to next section"
          >
            <ChevronDown size={30} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}
