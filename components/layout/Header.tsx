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
  Mail,
  Sun,
  Moon,
  Sparkles,
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
      if (selectedIndex >= 0 && selectedIndex < filteredCalculators.length) {
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
    { href: "/calculators", label: "Calculators", icon: Calculator },
    { href: "/volume-converter", label: "Converters", icon: ArrowRightLeft },
    { href: "/volume-formulas", label: "Formulas", icon: Layers },
    { href: "/how-to-calculate-volume", label: "Guides", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-navy-950/90 backdrop-blur-md border-b border-slate-200 dark:border-navy-750 transition-colors duration-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white tracking-tight hover:opacity-95 transition-opacity flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg p-0.5"
          >
            <div className="w-8 h-8 rounded-lg bg-navy-900 border border-blue-500/50 flex items-center justify-center font-mono font-black text-sm shadow-sm group-hover:border-cyan-400 transition-colors">
              <Box className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-base leading-tight font-black text-slate-950 dark:text-white tracking-tight">
                VolumeCalc<span className="text-blue-500">Kit</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                    isActive
                      ? "bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-cyan-400 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-850"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls: Search + Custom Calculator CTA + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98]"
              aria-label="Search calculators"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" aria-hidden="true" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded text-slate-500 dark:text-slate-400">
                Ctrl K
              </kbd>
            </button>

            {/* Primary CTA: Custom Calculator */}
            <Link
              href="/custom-calculator"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Custom Calculator</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.95]"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 animate-in spin-in-180 duration-200" aria-hidden="true" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-850 rounded-lg lg:hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-navy-750 bg-white dark:bg-navy-950 px-4 pt-3 pb-5 space-y-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-slate-50 dark:bg-navy-900 hover:bg-blue-50 dark:hover:bg-navy-850 hover:text-blue-600 dark:hover:text-cyan-400 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between border border-slate-200/80 dark:border-navy-800 transition-colors"
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

            <div className="pt-2">
              <Link
                href="/custom-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Custom Calculator Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search all calculators"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-navy-750 bg-slate-50/50 dark:bg-navy-950/50">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search calculators... e.g. CBM, cylinder, tank, pipe, ft³ to m³"
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                aria-autocomplete="list"
                aria-controls="search-results-list"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-navy-800 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div
              id="search-results-list"
              ref={resultsListRef}
              role="listbox"
              className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-navy-800"
            >
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Popular shortcuts
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {[
                      { label: "CBM Calculator", slug: "cbm-calculator" },
                      { label: "CFT to CBM", slug: "cft-to-cbm-calculator" },
                      { label: "Tank Volume", slug: "tank-volume-calculator" },
                      { label: "Cylinder", slug: "cylinder-volume-calculator" },
                      { label: "Pipe Volume", slug: "pipe-volume-calculator" },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleSelectResult(item.slug)}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-blue-50 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-navy-700 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredCalculators.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No calculators found matching &ldquo;<span className="font-semibold text-slate-800 dark:text-slate-200">{searchQuery}</span>&rdquo;
                </div>
              ) : (
                filteredCalculators.map((calc, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={calc.slug}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectResult(calc.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-navy-800 text-blue-900 dark:text-white"
                          : "hover:bg-slate-50 dark:hover:bg-navy-850 text-slate-900 dark:text-slate-200"
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{calc.h1}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-750 text-slate-500 dark:text-slate-400">
                            {calc.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {calc.shortDescription}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Hint */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <kbd className="px-1 py-0.5 rounded bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700">↑</kbd>
                <kbd className="px-1 py-0.5 rounded bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700">↓</kbd>
                <span>to navigate</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 ml-1">↵</kbd>
                <span>to select</span>
              </span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
