"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X } from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";

export const HomeHeroSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.trim() === ""
      ? []
      : CALCULATORS_REGISTRY.filter((calc) => {
          const q = query.toLowerCase();
          return (
            calc.title.toLowerCase().includes(q) ||
            calc.slug.toLowerCase().includes(q) ||
            calc.category.toLowerCase().includes(q) ||
            calc.keywords.some((k) => k.toLowerCase().includes(q))
          );
        }).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        navigateTo(filtered[selectedIndex].slug);
      } else if (filtered.length > 0) {
        navigateTo(filtered[0].slug);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const navigateTo = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/${slug}`);
  };

  const shortcuts = [
    { label: "Volume Calculator", slug: "volume-calculator" },
    { label: "CBM Calculator", slug: "cbm-calculator" },
    { label: "Pipe Volume", slug: "pipe-volume-calculator" },
    { label: "Cylinder Volume", slug: "cylinder-volume-calculator" },
    { label: "Cubic Meter (m³)", slug: "cubic-meter-calculator" },
    { label: "Tank Volume", slug: "tank-volume-calculator" },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative z-20 space-y-3">
      {/* Search Bar Input Container */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 pointer-events-none" />
        <div className="relative flex items-center bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700/80 rounded-2xl shadow-xl px-4 py-3 sm:py-3.5 transition-all">
          <Search className="w-5 h-5 text-blue-500 dark:text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search calculators... e.g. CBM, cylinder, tank, pipe, ft³ to m³"
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            aria-label="Search all volume calculators"
          />
          {query.trim() ? (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-md">
              Ctrl K
            </kbd>
          )}
        </div>

        {/* Live Suggestions Dropdown */}
        {isOpen && query.trim() !== "" && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-navy-800 z-50">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                No calculators match &ldquo;{query}&rdquo;. Browse our{" "}
                <Link href="/calculators" className="text-blue-500 underline font-semibold">
                  all calculators hub
                </Link>.
              </div>
            ) : (
              filtered.map((calc, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={calc.slug}
                    onClick={() => navigateTo(calc.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-50 dark:bg-navy-800 text-blue-900 dark:text-white"
                        : "hover:bg-slate-50 dark:hover:bg-navy-850 text-slate-900 dark:text-slate-200"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        <span>{calc.h1}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-750 text-slate-500 dark:text-slate-400">
                          {calc.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {calc.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 ml-3" />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Popular Shortcuts Pills matching Image 1 */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
          Popular:
        </span>
        {shortcuts.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="px-3 py-1 bg-white dark:bg-navy-900 hover:bg-blue-50 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-750 hover:border-blue-300 dark:hover:border-blue-600 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs active:scale-95"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
