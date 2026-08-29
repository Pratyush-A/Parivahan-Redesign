"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "My Applications", href: "/applications" },
  { label: "Find an RTO", href: "/rto" },
  { label: "Help Center", href: "/help" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex min-h-[118px] max-w-[1536px] items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex min-h-14 items-center gap-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
          aria-label="Parivahan 2.0 home"
        >
          <div className="flex w-12 shrink-0 flex-col items-center justify-center text-[#111827]" aria-hidden="true">
            <div className="text-[31px] leading-7">♔</div>
            <div className="mt-1 h-1.5 w-7 rounded-full border border-current" />
            <div className="mt-0.5 text-[6px] font-bold uppercase leading-none tracking-normal">Govt</div>
          </div>

          <div className="leading-none">
            <div className="text-[25px] font-black uppercase tracking-normal text-[#071B55] sm:text-[32px]">
              PARIVAHAN
              <span className="ml-2 text-[#F59E0B]">2.0</span>
            </div>

            <div className="mt-2 text-base font-medium tracking-normal text-[#4B5563] sm:text-xl">
              Government of India
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-11 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-[22px] font-semibold tracking-normal text-[#071B55] transition-colors hover:text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 xl:text-[23px]"
              >
                {item.label}

                {item.hasDropdown && (
                  <ChevronDown size={18} strokeWidth={2.3} aria-hidden="true" />
                )}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-[#F59E0B]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/login"
            className="inline-flex min-h-16 items-center justify-center gap-3 rounded-xl border border-[#8BA0C6] bg-white px-7 text-xl font-semibold tracking-normal text-[#071B55] shadow-sm transition-colors hover:border-[#172554] hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
          >
            <UserRound size={28} strokeWidth={2.2} aria-hidden="true" />
            Login / Sign In
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#071B55] transition-colors hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-1 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X size={23} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Menu size={23} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-[#E2E8F0] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-4 py-3 sm:px-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-12 items-center justify-between rounded-lg px-3 text-[16px] font-semibold text-[#071B55] transition-colors hover:bg-[#F8F9FA] hover:text-[#172554] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <span>{item.label}</span>

                {item.hasDropdown && <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-200" />

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#8BA0C6] px-5 text-sm font-semibold text-[#071B55] transition-colors hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2"
            >
              <UserRound size={20} strokeWidth={2.2} aria-hidden="true" />
              Login / Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
