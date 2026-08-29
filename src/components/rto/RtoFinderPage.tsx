"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Headphones,
  List,
  LocateFixed,
  LockKeyhole,
  MapPin,
  Navigation,
  UserRoundCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type SearchTab = "city" | "name" | "location";
type ViewMode = "list" | "map";

type Rto = {
  id: string;
  rank: number;
  name: string;
  address: string;
  distance: string;
  open: boolean;
  closest?: boolean;
  mapCoords: { left: string; top: string };
};

const RTO_RESULTS: Rto[] = [
  {
    id: "pune-haveli",
    rank: 1,
    name: "RTO, Pune (Haveli), Maharashtra",
    address:
      "SR No. 103, Mundhwa, Near Magarpatta City, Pune – 411036, Maharashtra",
    distance: "8.2 km away",
    open: true,
    closest: true,
    mapCoords: { left: "78%", top: "54%" },
  },
  {
    id: "pune-city",
    rank: 2,
    name: "RTO, Pune (City), Maharashtra",
    address: "Shivajinagar, Pune – 411005, Maharashtra",
    distance: "10.4 km away",
    open: true,
    mapCoords: { left: "73%", top: "48%" },
  },
  {
    id: "pimpri",
    rank: 3,
    name: "RTO, Pimpri Chinchwad, Maharashtra",
    address: "Pimpri, Pune – 411018, Maharashtra",
    distance: "12.6 km away",
    open: true,
    mapCoords: { left: "60%", top: "44%" },
  },
  {
    id: "talegaon",
    rank: 4,
    name: "RTO, Talegaon Dabhade, Maharashtra",
    address: "Talegaon Dabhade, Pune – 410507, Maharashtra",
    distance: "16.1 km away",
    open: true,
    mapCoords: { left: "54%", top: "49%" },
  },
  {
    id: "chakan",
    rank: 5,
    name: "RTO, Chakan, Maharashtra",
    address: "Chakan, Pune – 410501, Maharashtra",
    distance: "21.3 km away",
    open: true,
    mapCoords: { left: "70%", top: "37%" },
  },
];

const popularSearches = ["Pune", "Mumbai", "Thane", "Nagpur", "Nashik"];

/* ==========================================================================
   RTO RESULT CARD COMPONENT
   ========================================================================== */
function RtoCard({
  rto,
  selected,
  onSelect,
}: {
  rto: Rto;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={[
        "group relative cursor-pointer rounded-xl border bg-white p-4 transition-all duration-150",
        selected
          ? "border-[#2563EB] bg-[#F8FBFF] shadow-[0_3px_12px_rgba(37,99,235,0.08)]"
          : "border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-2xs",
      ].join(" ")}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Select ${rto.name}`}
    >
      <div className="flex items-start gap-3.5">
        {/* Rank Circle */}
        <div
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
            selected
              ? "bg-[#2563EB] text-white"
              : "bg-[#94A3B8] text-white",
          ].join(" ")}
        >
          {rto.rank}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pr-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs font-bold text-[#172554]">
              {rto.name}
            </h3>

            {rto.closest && (
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[9px] font-bold text-[#15803D]">
                Closest
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-[#475569]">
            <MapPin size={13} className="mt-0.5 shrink-0 text-[#64748B]" />
            <p className="leading-relaxed">{rto.address}</p>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-[#64748B]">
              <Navigation size={11} className="text-[#2563EB]" />
              {rto.distance}
            </span>

            <span className="h-1 w-1 rounded-full bg-[#CBD5E1]" />

            <span className="flex items-center gap-1 font-semibold text-[#15803D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              {rto.open ? "Open now" : "Closed"}
            </span>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[9px] font-bold text-[#475569]">
              All Services
            </span>
            <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[9px] font-bold text-[#15803D]">
              Appointment Available
            </span>
            <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
              CSC Available
            </span>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight
          size={18}
          className={[
            "absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors",
            selected ? "text-[#2563EB]" : "text-[#94A3B8] group-hover:text-[#172554]",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   STATIC CSS MAP COMPONENT
   ========================================================================== */
function StaticMap({
  selectedRto,
  onSelectMarker,
  onLocation,
}: {
  selectedRto: number;
  onSelectMarker: (rank: number) => void;
  onLocation: () => void;
}) {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="relative min-h-[580px] w-full overflow-hidden rounded-2xl border border-[#DCE7F7] bg-[#EDF3E8] shadow-2xs">
      {/* Topographic Background Texture */}
      <div
        className="absolute inset-0 bg-[#E8F0E3] transition-transform duration-200 origin-center"
        style={{
          transform: `scale(${zoomLevel})`,
          backgroundImage: `
            radial-gradient(ellipse at 70% 50%, rgba(220, 235, 215, 0.9) 0%, rgba(232, 240, 227, 0.7) 45%, rgba(225, 235, 218, 0.9) 100%),
            linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)
          `,
        }}
      />

      {/* River / Water Body */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 600 580"
        preserveAspectRatio="none"
      >
        <path
          d="M 600 120 C 500 160 450 220 380 270 C 310 320 280 340 220 370 C 150 400 80 430 0 450 L 0 480 C 80 460 150 430 220 400 C 280 370 310 350 380 300 C 450 250 500 190 600 150 Z"
          fill="#D4EAF5"
        />
        <path
          d="M 420 0 C 400 80 380 180 380 270 L 390 270 C 390 180 410 80 430 0 Z"
          fill="#D4EAF5"
        />
      </svg>

      {/* Roads Network */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 600 580"
        preserveAspectRatio="none"
      >
        {/* National Highways (Golden Orange) */}
        <path d="M 0 160 Q 250 280 600 240" stroke="#F6D779" strokeWidth="4.5" fill="none" />
        <path d="M 120 580 Q 280 360 450 0" stroke="#F6D779" strokeWidth="4.5" fill="none" />
        <path d="M 300 580 Q 420 320 600 180" stroke="#F6D779" strokeWidth="4" fill="none" />
        <path d="M 0 380 Q 320 360 600 480" stroke="#F6D779" strokeWidth="3.5" fill="none" />

        {/* Secondary Roads (White Arterials) */}
        <path d="M 0 80 Q 300 220 600 120" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M 220 580 Q 340 300 400 0" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M 0 480 Q 280 420 600 380" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M 380 580 Q 440 280 560 0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 0 280 Q 300 320 600 280" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.8" />
      </svg>

      {/* 25 km Search Radius Circle */}
      <div className="pointer-events-none absolute left-[42%] top-[49%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#60A5FA]/45 bg-[#93C5FD]/15 shadow-inner" />

      {/* Highway Badges */}
      <span className="absolute left-[81%] top-[37%] flex h-5 w-6 items-center justify-center rounded-xs bg-[#F59E0B] text-[9px] font-black text-white shadow-xs">
        65
      </span>
      <span className="absolute left-[85%] top-[56%] flex h-5 w-6 items-center justify-center rounded-xs bg-[#F59E0B] text-[9px] font-black text-white shadow-xs">
        48
      </span>
      <span className="absolute left-[75%] top-[68%] flex h-5 w-6 items-center justify-center rounded-xs bg-[#F59E0B] text-[9px] font-black text-white shadow-xs">
        65
      </span>
      <span className="absolute left-[52%] top-[59%] flex h-4 w-7 items-center justify-center rounded-xs bg-[#F59E0B] text-[8px] font-black text-white shadow-xs">
        753F
      </span>

      {/* City & Landmark Labels */}
      <span className="absolute left-[72%] top-[52%] -translate-x-1/2 -translate-y-1/2 text-base font-extrabold tracking-tight text-[#111827]">
        Pune
      </span>
      <span className="absolute left-[61%] top-[47%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#475569]">
        Pimpri Chinchwad
      </span>
      <span className="absolute left-[60%] top-[39%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Dehu Road
      </span>
      <span className="absolute left-[81%] top-[46%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Lohegaon
      </span>
      <span className="absolute left-[85%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Wagholi
      </span>
      <span className="absolute left-[68%] top-[59%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Katraj
      </span>
      <span className="absolute left-[78%] top-[58%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Kondhwa
      </span>
      <span className="absolute left-[56%] top-[64%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Lonavala
      </span>
      <span className="absolute left-[71%] top-[70%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B]">
        Lavasa
      </span>

      {/* Top Left: "Use my location" button */}
      <button
        type="button"
        onClick={onLocation}
        className="absolute left-4 top-4 z-20 inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-xs font-bold text-[#172554] shadow-xs transition hover:bg-[#F8F9FA]"
      >
        <LocateFixed size={14} className="text-[#2563EB]" />
        Use my location
      </button>

      {/* Top Right: Zoom controls */}
      <div className="absolute right-4 top-4 z-20 flex flex-col overflow-hidden rounded-xl border border-[#CBD5E1] bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
          className="flex h-9 w-9 items-center justify-center border-b border-[#E2E8F0] text-sm font-bold text-[#172554] hover:bg-[#F8F9FA]"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[#172554] hover:bg-[#F8F9FA]"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>

      {/* RTO Markers */}
      {RTO_RESULTS.map((rto) => {
        const isSelected = rto.rank === selectedRto;

        return (
          <button
            key={rto.id}
            type="button"
            onClick={() => onSelectMarker(rto.rank)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
            style={{
              left: rto.mapCoords.left,
              top: rto.mapCoords.top,
            }}
            aria-label={`RTO ${rto.rank}: ${rto.name}`}
          >
            <div
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-md transition-all",
                isSelected
                  ? "bg-[#2563EB] ring-8 ring-[#2563EB]/25"
                  : "bg-[#2563EB] border-2 border-white",
              ].join(" ")}
            >
              {rto.rank}
            </div>
          </button>
        );
      })}

      {/* Bottom Right: Map Legend */}
      <div className="absolute bottom-4 right-4 z-20 rounded-xl border border-[#E2E8F0] bg-white/95 p-3 text-[11px] shadow-sm backdrop-blur-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#2563EB]" />
            <span className="font-semibold text-[#475569]">RTO Office</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#60A5FA] bg-[#93C5FD]/40" />
            <span className="font-semibold text-[#475569]">Search radius</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#15803D]" />
            <span className="font-semibold text-[#475569]">Your location</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN RTO FINDER PAGE
   ========================================================================== */
export default function RtoFinderPage() {
  const [searchTab, setSearchTab] = useState<SearchTab>("city");
  const [locationInput, setLocationInput] = useState("Pune, Maharashtra");
  const [searchedCity, setSearchedCity] = useState("Pune, Maharashtra");
  const [radius, setRadius] = useState("25 km");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [cscFilter, setCscFilter] = useState("All");
  const [selectedRtoId, setSelectedRtoId] = useState(RTO_RESULTS[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [locationModal, setLocationModal] = useState(false);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const selectedRank = useMemo(() => {
    return RTO_RESULTS.find((r) => r.id === selectedRtoId)?.rank ?? 1;
  }, [selectedRtoId]);

  function handleSearch() {
    setSearchedCity(locationInput || "Pune, Maharashtra");
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-16 text-[#111827]">
      {/* =====================================================
          1. BREADCRUMB
      ===================================================== */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[#64748B]"
          >
            <Link
              href="/"
              className="text-[#1A56DB] transition-colors hover:text-[#172554]"
            >
              Home
            </Link>

            <span className="text-[#94A3B8]" aria-hidden="true">
              ›
            </span>

            <span className="font-semibold text-[#172554]" aria-current="page">
              Find an RTO
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          2. PAGE HEADER
      ===================================================== */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0A1B44] sm:text-3xl">
            Find an RTO
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Search, compare and find the right RTO office for your needs.
          </p>
        </div>
      </section>

      {/* =====================================================
          3. SEARCH PANEL
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
          {/* Search Tabs */}
          <div
            className="flex border-b border-[#E2E8F0] px-4 sm:px-6"
            role="tablist"
            aria-label="Search by"
          >
            <span className="hidden items-center text-xs font-bold text-[#64748B] sm:flex sm:pr-4">
              Search by
            </span>

            <button
              type="button"
              role="tab"
              aria-selected={searchTab === "city"}
              onClick={() => setSearchTab("city")}
              className={[
                "relative min-h-[46px] px-4 text-xs font-bold transition-colors",
                searchTab === "city"
                  ? "text-[#2563EB]"
                  : "text-[#475569] hover:text-[#172554]",
              ].join(" ")}
            >
              City / PIN Code
              {searchTab === "city" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={searchTab === "name"}
              onClick={() => setSearchTab("name")}
              className={[
                "relative min-h-[46px] px-4 text-xs font-bold transition-colors",
                searchTab === "name"
                  ? "text-[#2563EB]"
                  : "text-[#475569] hover:text-[#172554]",
              ].join(" ")}
            >
              RTO Name
              {searchTab === "name" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={searchTab === "location"}
              onClick={() => {
                setSearchTab("location");
                setLocationModal(true);
              }}
              className={[
                "relative min-h-[46px] px-4 text-xs font-bold transition-colors",
                searchTab === "location"
                  ? "text-[#2563EB]"
                  : "text-[#475569] hover:text-[#172554]",
              ].join(" ")}
            >
              <span className="flex items-center gap-1.5">
                Use my location
                <LocateFixed size={13} />
              </span>
              {searchTab === "location" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
          </div>

          {/* Form Fields Row */}
          <div className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_1.1fr_0.8fr_auto] lg:items-end">
              {/* City / PIN Code Input */}
              <div>
                <label
                  htmlFor="location-input"
                  className="block text-xs font-bold text-[#172554]"
                >
                  Enter city or PIN code <span className="text-[#B91C1C]">*</span>
                </label>

                <div className="mt-1.5 relative flex min-h-[44px] items-center rounded-xl border border-[#CBD5E1] bg-white px-3.5 transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                  <MapPin size={16} className="text-[#2563EB]" />
                  <input
                    id="location-input"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Enter city or PIN"
                    className="ml-2.5 w-full bg-transparent text-xs text-[#172554] outline-none placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              {/* Radius Select */}
              <div>
                <label
                  htmlFor="radius-select"
                  className="block text-xs font-bold text-[#172554]"
                >
                  Select radius
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="radius-select"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="min-h-[44px] w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-3.5 pr-8 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    <option value="5 km">5 km</option>
                    <option value="10 km">10 km</option>
                    <option value="25 km">25 km</option>
                    <option value="50 km">50 km</option>
                    <option value="100 km">100 km</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
              </div>

              {/* Services Offered Select */}
              <div>
                <label
                  htmlFor="service-select"
                  className="block text-xs font-bold text-[#172554]"
                >
                  Services offered
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="service-select"
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="min-h-[44px] w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-3.5 pr-8 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    <option value="All Services">All Services</option>
                    <option value="Driving Licence">Driving Licence</option>
                    <option value="Vehicle Registration">Vehicle Registration</option>
                    <option value="Ownership Transfer">Ownership Transfer</option>
                    <option value="Challan">Challan</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
              </div>

              {/* CSC Assisted Select */}
              <div>
                <label
                  htmlFor="csc-select"
                  className="block text-xs font-bold text-[#172554]"
                >
                  CSC assisted
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="csc-select"
                    value={cscFilter}
                    onChange={(e) => setCscFilter(e.target.value)}
                    className="min-h-[44px] w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-3.5 pr-8 text-xs text-[#172554] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
              </div>

              {/* Primary Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#2563EB] px-8 text-xs font-bold text-white !text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
              >
                <span className="text-white !text-white">Search</span>
              </button>
            </div>

            {/* Popular Searches Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2 pt-1 border-t border-[#F1F5F9]">
              <span className="text-xs font-semibold text-[#64748B]">
                Popular searches:
              </span>

              {popularSearches.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setLocationInput(city);
                    setSearchedCity(city);
                  }}
                  className="min-h-[30px] rounded-full border border-[#DCE7F7] bg-[#F8FAFC] px-3.5 text-xs font-semibold text-[#172554] transition hover:bg-[#EFF6FF] hover:border-[#BFDBFE]"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. RESULTS HEADER & RESULT + MAP LAYOUT
      ===================================================== */}
      <section className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs sm:p-6">
          {/* Header Bar */}
          <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#172554]" aria-live="polite">
                12 RTO offices found near {searchedCity}
              </h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Showing results within {radius} radius
              </p>
            </div>

            {/* List / Map View Switcher */}
            <div className="flex rounded-xl border border-[#CBD5E1] bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={[
                  "flex min-h-[36px] items-center gap-1.5 rounded-lg px-3.5 text-xs font-bold transition",
                  viewMode === "list"
                    ? "bg-[#EFF6FF] text-[#2563EB] shadow-2xs"
                    : "text-[#64748B] hover:bg-[#F8F9FA]",
                ].join(" ")}
              >
                <List size={14} />
                List view
              </button>

              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={[
                  "flex min-h-[36px] items-center gap-1.5 rounded-lg px-3.5 text-xs font-bold transition",
                  viewMode === "map"
                    ? "bg-[#EFF6FF] text-[#2563EB] shadow-2xs"
                    : "text-[#64748B] hover:bg-[#F8F9FA]",
                ].join(" ")}
              >
                <MapPin size={14} />
                Map view
              </button>
            </div>
          </div>

          {/* 48% Left / 52% Right Layout */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Left: Scrollable RTO Cards */}
            <div
              className={[
                "space-y-3",
                viewMode === "map" ? "hidden lg:block" : "block",
              ].join(" ")}
            >
              {RTO_RESULTS.map((rto) => (
                <RtoCard
                  key={rto.id}
                  rto={rto}
                  selected={selectedRtoId === rto.id}
                  onSelect={() => setSelectedRtoId(rto.id)}
                />
              ))}

              {/* Load More Results Action */}
              <button
                type="button"
                onClick={() => setMoreLoaded(true)}
                className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#2563EB] bg-white text-xs font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
              >
                {moreLoaded
                  ? "All 12 nearby RTOs displayed"
                  : "Load more results"}
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Right: Map */}
            <div
              className={[
                viewMode === "list" ? "block" : "block lg:block",
              ].join(" ")}
            >
              <StaticMap
                selectedRto={selectedRank}
                onSelectMarker={(rank) => {
                  const target = RTO_RESULTS.find((r) => r.rank === rank);
                  if (target) setSelectedRtoId(target.id);
                }}
                onLocation={() => setLocationModal(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. WHY PLAN YOUR VISIT & ONLINE SERVICES
      ===================================================== */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] grid gap-5 lg:grid-cols-[1fr_300px]">
          {/* Left: 4 Columns */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-7">
            <h2 className="text-sm font-bold text-[#172554]">
              Why plan your visit?
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* 1 */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172554]">Save time</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    Check appointment availability before you visit.
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172554]">Know services</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    See what services are available at each RTO office.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <UserRoundCheck size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172554]">CSC assisted</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    Many services can be done at nearby CSC centres.
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <ClipboardCheck size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172554]">Be prepared</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                    Know required documents and fees before you visit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Online Services Callout */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#BFD4FF] bg-[#EFF6FF] p-6 shadow-2xs">
            <div>
              <h2 className="text-sm font-bold text-[#172554]">
                Don&apos;t want to visit an RTO?
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                Many services can be done online from the comfort of your home.
              </p>
            </div>

            <Link
              href="/services"
              className="mt-5 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8FAFC]"
            >
              Explore Online Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          6. HELP BANNER
      ===================================================== */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-4 rounded-2xl border border-[#FCD34D] bg-[#FFFBEB] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
              <Headphones size={20} />
            </div>

            <div>
              <h2 className="text-xs font-bold text-[#78350F]">
                Need help finding the right office?
              </h2>

              <p className="mt-0.5 text-[11px] text-[#92400E]">
                Our support team can help you choose the right RTO or CSC centre.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Link
              href="/help"
              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#172554] shadow-2xs transition hover:bg-[#F8F9FA]"
            >
              <Headphones size={13} />
              Contact Support
            </Link>

            <Link
              href="/help"
              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#2563EB] shadow-2xs transition hover:bg-[#EFF6FF]"
            >
              Help Center
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          7. BOTTOM OFFICIAL MORTH NOTICE RIBBON
      ===================================================== */}
      <div className="mt-6 border-t border-[#E2E8F0] bg-white py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
          <LockKeyhole size={13} className="text-[#15803D]" aria-hidden="true" />
          <span>This is an official website of the Ministry of Road Transport and Highways (MoRTH), Government of India.</span>
        </p>
      </div>

      {/* =====================================================
          LOCATION PERMISSION MODAL
      ===================================================== */}
      {locationModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-dialog-title"
        >
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  <LocateFixed size={20} />
                </div>
                <div>
                  <h2
                    id="location-dialog-title"
                    className="text-base font-bold text-[#172554]"
                  >
                    Use your location
                  </h2>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Location access helps us find nearby RTO offices.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLocationModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8F9FA]"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#D6E6FF] bg-[#EFF6FF] p-3.5">
              <p className="text-[11px] leading-relaxed text-[#334155]">
                Location access is required to find RTOs near you. You can also search manually using a city or PIN code.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setLocationModal(false)}
                className="min-h-[42px] rounded-xl border border-[#CBD5E1] px-4 text-xs font-bold text-[#172554] hover:bg-[#F8F9FA]"
              >
                Search manually
              </button>

              <button
                type="button"
                onClick={() => {
                  setLocationModal(false);
                  setLocationInput("Pune (Haveli), Maharashtra");
                  setSearchedCity("your current location");
                }}
                className="min-h-[42px] rounded-xl bg-[#172554] px-5 text-xs font-bold text-white !text-white hover:bg-[#1E3A8A]"
              >
                <span className="text-white !text-white">Allow location</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
