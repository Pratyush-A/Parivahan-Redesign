"use client";

import { ChevronDown, Globe2, Phone, Signal, Volume2 } from "lucide-react";

export default function AccessibilityUtilityBar() {
  return (
    <div className="w-full bg-[#061D49] text-white shadow-sm">
      <div className="mx-auto flex min-h-[54px] max-w-[1536px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] sm:text-base"
            aria-label="Select English language"
            aria-current="true"
          >
            <Globe2 size={20} strokeWidth={2.2} aria-hidden="true" />
            English
            <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>

          <span className="hidden h-6 w-px bg-white/30 sm:block" aria-hidden="true" />

          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md px-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] sm:text-base"
            aria-label="Select Hindi language"
          >
            हिंदी
          </button>

          <span className="hidden h-6 w-px bg-white/30 md:block" aria-hidden="true" />

          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] md:inline-flex"
            aria-label="Decrease text size"
          >
            A
          </button>

          <span className="hidden h-6 w-px bg-white/20 md:block" aria-hidden="true" />

          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] md:inline-flex"
            aria-label="Normal text size"
          >
            A+
          </button>

          <span className="hidden h-6 w-px bg-white/20 md:block" aria-hidden="true" />

          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-base font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] md:inline-flex"
            aria-label="Increase text size"
            aria-current="true"
          >
            A++
          </button>

          <span className="hidden h-6 w-px bg-white/30 lg:block" aria-hidden="true" />

          <button
            type="button"
            className="hidden min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] lg:inline-flex sm:text-base"
            aria-label="Read page aloud"
          >
            <Volume2 size={21} strokeWidth={2.2} aria-hidden="true" />
            <span>Read Aloud</span>
          </button>

          <span className="hidden h-6 w-px bg-white/30 lg:block" aria-hidden="true" />

          <button
            type="button"
            className="hidden min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49] xl:inline-flex sm:text-base"
            aria-label="Enable low data mode"
          >
            <Signal size={20} strokeWidth={2.2} aria-hidden="true" />
            <span>Low Data Mode</span>
          </button>
        </div>

        <div className="hidden items-center gap-5 text-sm font-semibold text-white/90 lg:flex xl:text-base">
          <a
            href="tel:18001234567"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49]"
          >
            <Phone size={19} strokeWidth={2.4} aria-hidden="true" />
            <span>1800 123 4567</span>
          </a>

          <span className="h-6 w-px bg-white/30" aria-hidden="true" />

          <a
            href="#main-content"
            className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061D49]"
          >
            Screen Reader Access
          </a>
        </div>
      </div>
    </div>
  );
}
