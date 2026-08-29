"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  ChevronRight,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  IdCard,
  IndianRupee,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import {
  categories,
  journeys,
  services,
  type Service,
} from "./serviceData";

const trendingSearches = [
  "DL Renewal",
  "RC Transfer",
  "Challan",
  "NOC",
  "Permit",
  "Fitness Certificate",
];

const categoryIcons = {
  "Driving Licence": IdCard,
  "Vehicle Registration": CarFront,
  "Challan & Payments": IndianRupee,
  "Permits & NOCs": FileCheck2,
  "Fitness & Insurance": ShieldCheck,
  "Transport Professionals": BriefcaseBusiness,
} as const;

const categoryStyles = {
  "Driving Licence": "bg-[#EFF6FF] text-[#2563EB]",
  "Vehicle Registration": "bg-[#F0FDF4] text-[#15803D]",
  "Challan & Payments": "bg-[#FFF7ED] text-[#EA580C]",
  "Permits & NOCs": "bg-[#FAF5FF] text-[#7C3AED]",
  "Fitness & Insurance": "bg-[#ECFEFF] text-[#0891B2]",
  "Transport Professionals": "bg-[#EFF6FF] text-[#1D4ED8]",
} as const;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function scoreService(service: Service, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(service.title);
  const category = normalize(service.category);
  const description = normalize(service.description);

  let score = 0;

  if (title === q) score += 100;
  if (title.startsWith(q)) score += 70;
  if (title.includes(q)) score += 45;

  if (category === q) score += 65;
  if (category.includes(q)) score += 35;

  if (description.includes(q)) score += 20;

  for (const keyword of service.keywords) {
    const normalizedKeyword = normalize(keyword);
    if (normalizedKeyword === q) score += 60;
    else if (normalizedKeyword.startsWith(q)) score += 35;
    else if (normalizedKeyword.includes(q)) score += 20;
  }

  for (const word of q.split(/\s+/)) {
    if (title.includes(word)) score += 8;
    if (category.includes(word)) score += 5;
  }

  return score;
}

function getJourneyIcon(title: string) {
  if (title.includes("Driving Licence")) return IdCard;
  if (title.includes("Ownership")) return CarFront;
  if (title.includes("Challan")) return IndianRupee;
  if (title.includes("Appointment")) return Clock3;
  if (title.includes("Learner")) return IdCard;
  return FileCheck2;
}

export default function ServicesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return services
      .map((service) => ({
        service,
        score: scoreService(service, query),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((item) => item.service);
  }, [query]);

  const showResults = focused && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }

    if (!showResults || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        current >= results.length - 1 ? 0 : current + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? results.length - 1 : current - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const selected = results[activeIndex];
      if (selected) {
        setFocused(false);
        router.push(selected.href);
      }
    }
  }

  function handleSelectService(service: Service) {
    setFocused(false);
    router.push(service.href);
  }

  function handleSearchSubmit() {
    if (activeIndex >= 0 && results[activeIndex]) {
      handleSelectService(results[activeIndex]);
    } else if (results.length > 0) {
      handleSelectService(results[0]);
    }
  }

  return (
    <main className="bg-[#F8F9FA]">
      {/* =====================================================
          1. BREADCRUMB
      ===================================================== */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-3.5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-[#64748B]"
          >
            <Link
              href="/"
              className="text-[#1A56DB] transition-colors hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              Home
            </Link>

            <ChevronRight size={13} aria-hidden="true" className="text-[#94A3B8]" />

            <span className="text-[#172554]" aria-current="page">
              Services
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. NAVY SERVICES HERO
      ===================================================== */}
      <section className="relative overflow-visible bg-[#172554] text-white">
        {/* Decorative background grid and road lines */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-25"
          aria-hidden="true"
        >
          <div className="absolute -right-20 top-10 h-72 w-[620px] rounded-[50%] border border-[#60A5FA]/30" />
          <div className="absolute -right-5 top-20 h-56 w-[520px] rounded-[50%] border border-[#60A5FA]/20" />
          <div className="absolute right-0 top-36 h-40 w-[400px] rounded-[50%] border border-[#F59E0B]/20" />
          <div
            className="absolute right-12 top-8 hidden h-64 w-64 opacity-20 lg:block"
            style={{
              backgroundImage: "radial-gradient(circle, #93C5FD 1.5px, transparent 1.6px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[64px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#93C5FD]">
                Parivahan services
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
                Services
              </h1>

              <p className="mt-3 max-w-[590px] text-base leading-relaxed text-slate-200 sm:text-lg">
                Find, understand and complete services with confidence.
              </p>

              {/* Search Container */}
              <div ref={searchContainerRef} className="relative z-40 mt-8 max-w-[700px]">
                <label htmlFor="services-search" className="sr-only">
                  Search Parivahan services
                </label>

                <div
                  className={[
                    "flex min-h-[58px] items-center rounded-xl border bg-white p-1.5 shadow-lg transition-all",
                    focused
                      ? "border-[#60A5FA] ring-4 ring-[#60A5FA]/25"
                      : "border-white/20 hover:border-white/40",
                  ].join(" ")}
                >
                  <Search
                    size={20}
                    className="ml-3.5 shrink-0 text-[#64748B]"
                    aria-hidden="true"
                  />

                  <input
                    ref={inputRef}
                    id="services-search"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => setFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you want to do today?"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={showResults}
                    aria-controls="service-results"
                    aria-autocomplete="list"
                    aria-activedescendant={
                      activeIndex >= 0
                        ? `service-result-${results[activeIndex]?.id}`
                        : undefined
                    }
                    className="min-w-0 flex-1 bg-transparent px-3 text-[15px] font-medium text-[#111827] outline-none placeholder:text-[#94A3B8] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  />

                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveIndex(-1);
                        inputRef.current?.focus();
                      }}
                      className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                      aria-label="Clear search"
                    >
                      <X size={15} aria-hidden="true" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#172554] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                  >
                    Search
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showResults && (
                  <div
                    id="service-results"
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white text-left shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)]"
                  >
                    {results.length > 0 ? (
                      <div className="max-h-[380px] overflow-y-auto p-2">
                        {results.map((service, index) => {
                          const isActive = activeIndex === index;
                          const Icon = categoryIcons[service.category] || Search;

                          return (
                            <button
                              key={service.id}
                              id={`service-result-${service.id}`}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => handleSelectService(service)}
                              className={[
                                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                isActive
                                  ? "bg-[#EFF6FF] text-[#172554]"
                                  : "hover:bg-[#F8F9FA] text-[#1E293B]",
                              ].join(" ")}
                            >
                              <div
                                className={[
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                  isActive
                                    ? "border-[#BFDBFE] bg-white text-[#2563EB]"
                                    : "border-[#E2E8F0] bg-[#F8F9FA] text-[#475569] group-hover:bg-white",
                                ].join(" ")}
                              >
                                <Icon size={17} aria-hidden="true" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-[#172554]">
                                  {service.title}
                                </p>

                                <p className="mt-0.5 truncate text-xs text-[#64748B]">
                                  {service.category} · {service.description}
                                </p>
                              </div>

                              <ArrowRight
                                size={15}
                                className={[
                                  "shrink-0 transition-transform",
                                  isActive
                                    ? "translate-x-0.5 text-[#2563EB]"
                                    : "text-[#94A3B8] group-hover:text-[#172554]",
                                ].join(" ")}
                                aria-hidden="true"
                              />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-5 py-6 text-center">
                        <p className="text-sm font-semibold text-[#172554]">
                          No matching service found for &ldquo;{query}&rdquo;
                        </p>
                        <p className="mt-1 text-xs text-[#64748B]">
                          Try searching for DL, RC, challan, renewal, or permit.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Trending searches */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-medium text-slate-300">
                    Trending right now:
                  </span>

                  {trendingSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        setFocused(true);
                        inputRef.current?.focus();
                      }}
                      className="min-h-8 rounded-full border border-white/15 bg-white/10 px-3 text-xs font-medium text-slate-100 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Civic Illustration / Badge Placeholder */}
            <div className="relative hidden h-[240px] items-center justify-center lg:flex">
              <div className="absolute inset-0 rounded-[50%] border border-blue-300/15" />
              <div className="absolute inset-[20px] rounded-[50%] border border-blue-300/10" />
              <div className="absolute bottom-6 left-1/2 h-24 w-[380px] -translate-x-1/2 rotate-[-8deg] rounded-[50%] border-t border-blue-300/25" />

              <div className="absolute right-6 top-8 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B] text-[#172554] shadow-xs">
                    <CarFront size={22} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">One place.</p>
                    <p className="mt-0.5 text-xs text-slate-300">
                      Every transport service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-8 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#15803D]" aria-hidden="true" />
                  <p className="text-xs font-semibold text-slate-200">
                    Simple · Secure · Accessible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. SERVICE CATEGORY CATALOG
      ===================================================== */}
      <section aria-labelledby="category-heading" className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                Explore
              </p>

              <h2
                id="category-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl lg:text-4xl"
              >
                Browse by category
              </h2>
            </div>

            <p className="text-sm font-medium text-[#64748B]">
              Everything in one place
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.title];

              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group flex min-h-[225px] flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_3px_15px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${categoryStyles[category.title]}`}
                  >
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#172554]">
                    {category.title}
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B]">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-md bg-[#F8F9FA] px-2.5 py-1 text-[11px] font-semibold text-[#475569]">
                      {category.count} services
                    </span>

                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] text-[#172554] transition-all group-hover:border-[#172554] group-hover:bg-[#172554] group-hover:text-white"
                      aria-hidden="true"
                    >
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. COMMON JOURNEYS + QUICK TOOLS
      ===================================================== */}
      <section
        aria-labelledby="journeys-heading"
        className="border-t border-[#E2E8F0] bg-[#F8F9FA]"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1fr_310px]">
            {/* Common Journeys List */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                    Guided services
                  </p>

                  <h2
                    id="journeys-heading"
                    className="mt-2 text-2xl font-bold tracking-tight text-[#172554] sm:text-3xl"
                  >
                    Common journeys
                  </h2>

                  <p className="mt-1.5 text-sm text-[#64748B]">
                    Step-by-step assistance for the most used services
                  </p>
                </div>

                <Link
                  href="/services/journeys"
                  className="hidden min-h-[44px] items-center gap-1 text-sm font-semibold text-[#1A56DB] hover:underline sm:inline-flex"
                >
                  View all journeys
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {journeys.map((journey) => {
                  const Icon = getJourneyIcon(journey.title);

                  return (
                    <Link
                      key={journey.id}
                      href={journey.href}
                      className="group relative flex min-h-[126px] items-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <div className="min-w-0 flex-1 pr-10">
                        <h3 className="text-sm font-bold text-[#172554]">
                          {journey.title}
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                          {journey.description}
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#2563EB]">
                          {journey.duration}
                        </span>
                      </div>

                      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] text-[#172554] transition-colors group-hover:bg-[#172554] group-hover:text-white">
                        <ArrowRight size={14} aria-hidden="true" />
                      </div>

                      {/* Subtle watermark background icon */}
                      <div
                        className="pointer-events-none absolute -bottom-5 -right-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF]/60 text-[#2563EB] opacity-40 transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <Icon size={34} strokeWidth={1.5} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Tools Panel */}
            <aside className="rounded-2xl border border-[#DCE7F7] bg-[#EEF5FF] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#172554] shadow-xs">
                  <Sparkles size={19} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#172554]">
                    Quick tools
                  </h2>
                  <p className="text-[11px] text-[#64748B]">
                    Everyday citizen utilities
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-[#D8E4F3]">
                {[
                  {
                    title: "Track Application",
                    description: "Check status instantly",
                    icon: Search,
                    href: "/applications",
                  },
                  {
                    title: "Application History",
                    description: "View all your requests",
                    icon: FileCheck2,
                    href: "/applications/history",
                  },
                  {
                    title: "Saved Drafts",
                    description: "Resume where you left",
                    icon: FileText,
                    href: "/applications/drafts",
                  },
                  {
                    title: "Downloads",
                    description: "Forms, guides, certificates",
                    icon: Download,
                    href: "/forms",
                  },
                  {
                    title: "Payments & Receipts",
                    description: "View and download receipts",
                    icon: IndianRupee,
                    href: "/applications/payments",
                  },
                ].map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      className="group flex min-h-[58px] items-center gap-3 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#2563EB] shadow-2xs">
                        <Icon size={16} aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#172554] group-hover:text-[#1E3A8A]">
                          {tool.title}
                        </p>

                        <p className="mt-0.5 text-[11px] text-[#64748B]">
                          {tool.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        className="text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#172554]"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/tools"
                className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-bold text-[#1A56DB] hover:underline"
              >
                All tools
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. TRUST / VALUE STRIP
      ===================================================== */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Simple",
              description: "Step-by-step guidance",
              icon: FileCheck2,
              style: "bg-[#EFF6FF] text-[#2563EB]",
            },
            {
              title: "Secure",
              description: "Your data is protected",
              icon: ShieldCheck,
              style: "bg-[#F0FDF4] text-[#15803D]",
            },
            {
              title: "Transparent",
              description: "Clear timelines & status",
              icon: Search,
              style: "bg-[#FAF5FF] text-[#7C3AED]",
            },
            {
              title: "Accessible",
              description: "Access across channels",
              icon: Sparkles,
              style: "bg-[#FFF7ED] text-[#EA580C]",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={[
                  "flex items-center gap-3.5 px-5 py-5",
                  index > 0 ? "border-t border-[#E2E8F0] lg:border-l lg:border-t-0" : "",
                ].join(" ")}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.style}`}
                >
                  <Icon size={19} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#172554]">
                    {item.title}
                  </p>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
