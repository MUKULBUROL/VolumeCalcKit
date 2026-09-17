"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Box,
  ArrowRight,
  Calculator,
  Layers,
  HelpCircle,
  ArrowRightLeft,
  Sun,
  Moon,
} from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";

export const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);

  // Sync initial theme state on mount
  useEffect(() => {
    const checkDark = document.documentElement.classList.contains("dark");
    setIsDark(checkDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (_) {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (_) {}
    }
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setSelectedIndex(-1);
  }, [searchOpen]);

  // Keyboard shortcut Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCalculators =
    searchQuery.trim() === ""
      ? []
      : CALCULATORS_REGISTRY.filter((calc) => {
          const q = searchQuery.toLowerCase();
          return (
            calc.title.toLowerCase().includes(q) ||
            calc.slug.toLowerCase().includes(q) ||
            calc.category.toLowerCase().includes(q) ||
            calc.keywords.some((k) => k.toLowerCase().includes(q))
          );
        });

  // Handle keyboard navigation inside search modal
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCalculators.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCalculators.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? filteredCalculators.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredCalculators[selectedIndex]) {
        handleSelectResult(filteredCalculators[selectedIndex].slug);
      } else if (filteredCalculators.length > 0) {
        handleSelectResult(filteredCalculators[0].slug);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsListRef.current) {
      const activeEl = resultsListRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleSelectResult = (slug: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSelectedIndex(-1);
    setMobileMenuOpen(false);
    router.push(`/${slug}`);
  };

  const navLinks = [
    { href: "/calculators", label: "All Calculators", icon: Calculator },
    { href: "/volume-converter", label: "Converters", icon: ArrowRightLeft },
    { href: "/volume-formulas", label: "Formulas", icon: Layers },
    { href: "/how-to-calculate-volume", label: "Guides", icon: HelpCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors duration-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white tracking-tight hover:opacity-95 transition-opacity flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg p-0.5"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-slate-900 text-white flex items-center justify-center font-mono font-black text-sm shadow-sm border border-slate-800 dark:border-slate-700 group-hover:border-blue-500 transition-colors">
              <Box className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-base leading-tight font-black text-slate-950 dark:text-white tracking-tight">
                VolumeCalc<span className="text-blue-600 dark:text-blue-400">Kit</span>
              </span>
              <span className="text-[10px] leading-none text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                Volume & Capacity Calculators
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 text-xs font-bold tracking-tight">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls: Search + Dark Mode + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-lg transition-all shadow-2xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98]"
              aria-label="Search calculators"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
              <span className="hidden sm:inline">Search calculators…</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400 shadow-2xs">
                ⌘&nbsp;K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.95]"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 animate-in spin-in-180 duration-200" aria-hidden="true" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-xl">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-400 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calculator Quick Search"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2.5 flex-shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                name="quick-search"
                autoComplete="off"
                spellCheck={false}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search shape, formula, or keyword (e.g., cylinder, cbm, tank)…"
                className="w-full py-3.5 bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                aria-label="Close search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2" aria-live="polite">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-xs text-slate-500 dark:text-slate-400">
                  <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] mb-2.5">
                    Popular Fast Links:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Cylinder",
                      "CBM Calculator",
                      "Tank Volume",
                      "Cubic Feet",
                      "Pipe Volume",
                      "Sphere",
                      "Volumetric Weight",
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredCalculators.length > 0 ? (
                <div ref={resultsListRef} className="space-y-1">
                  {filteredCalculators.map((calc, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={calc.slug}
                        type="button"
                        onClick={() => handleSelectResult(calc.slug)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-100"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        <div>
                          <div className={`text-sm font-bold ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"}`}>
                            {calc.h1}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {calc.shortDescription}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md ml-2 flex-shrink-0 font-bold">
                          {calc.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                  No calculators found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

