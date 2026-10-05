"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Box,
  Scale,
  Droplet,
  Cylinder,
  ArrowRightLeft,
  BookOpen,
  ArrowRight,
  Flame,
  Star,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { CalculatorMeta } from "@/types/calculator";

interface Props {
  calculators: CalculatorMeta[];
}

const UNITS_MAP: Record<string, string[]> = {
  "cbm-calculator": ["m³", "ft³", "L", "kg"],
  "cft-to-cbm-calculator": ["ft³", "m³"],
  "container-cbm-calculator": ["20ft", "40ft", "40HC", "m³"],
  "volumetric-weight-calculator": ["kg", "lb", "m³"],
  "cubic-feet-calculator": ["ft³", "m³", "yd³"],
  "cubic-meter-calculator": ["m³", "ft³", "L"],
  "cubic-yard-calculator": ["yd³", "ft³", "m³"],
  "volume-calculator": ["m³", "cm³", "ft³", "in³"],
  "cylinder-volume-calculator": ["m³", "ft³", "in³", "L"],
  "rectangular-prism-volume-calculator": ["m³", "ft³", "in³", "cm³"],
  "cube-volume-calculator": ["m³", "ft³", "in³", "cm³"],
  "sphere-volume-calculator": ["m³", "ft³", "in³", "cm³"],
  "cone-volume-calculator": ["m³", "ft³", "in³", "L"],
  "tank-volume-calculator": ["L", "gal", "m³", "ft³"],
  "pipe-volume-calculator": ["L", "gal", "m³", "ft³"],
  "aquarium-volume-calculator": ["L", "gal", "kg", "lbs"],
  "volume-converter": ["m³", "ft³", "yd³", "L"],
};

export const CalculatorsDirectoryClient: React.FC<Props> = ({ calculators }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    {
      id: "all",
      label: "All Calculators",
      sub: "Complete directory",
      icon: Box,
    },
    {
      id: "shipping",
      label: "Shipping & CBM",
      sub: "Boxes, pallets, freight",
      icon: Scale,
    },
    {
      id: "capacity",
      label: "Tanks & Liquids",
      sub: "Fuel, water, chemicals",
      icon: Droplet,
    },
    {
      id: "pipe-cylinder",
      label: "Pipe & Cylinder",
      sub: "Pipes, tubes, round shapes",
      icon: Cylinder,
    },
    {
      id: "geometry",
      label: "Geometry",
      sub: "2D & 3D shapes",
      icon: Box,
    },
    {
      id: "conversion",
      label: "Converters",
      sub: "Units & measurements",
      icon: ArrowRightLeft,
    },
  ];

  const filterPills = [
    { id: "all", label: "All" },
    { id: "shipping", label: "Shipping" },
    { id: "cbm", label: "CBM" },
    { id: "tanks", label: "Tanks" },
    { id: "pipes", label: "Pipes" },
    { id: "capacity", label: "Capacity" },
    { id: "geometry", label: "Geometry" },
  ];

  const filtered = useMemo(() => {
    return calculators.filter((calc) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          calc.title.toLowerCase().includes(q) ||
          calc.slug.toLowerCase().includes(q) ||
          calc.shortDescription.toLowerCase().includes(q) ||
          calc.keywords.some((k) => k.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Category Tab
      if (activeCategory !== "all") {
        if (activeCategory === "pipe-cylinder") {
          const isPipeOrCyl =
            calc.slug.includes("pipe") ||
            calc.slug.includes("cylinder");
          if (!isPipeOrCyl) return false;
        } else if (calc.category !== activeCategory) {
          return false;
        }
      }

      // 3. Filter Pill
      if (activeFilter !== "all") {
        if (activeFilter === "cbm" && !calc.slug.includes("cbm")) return false;
        if (activeFilter === "tanks" && !calc.slug.includes("tank")) return false;
        if (activeFilter === "pipes" && !calc.slug.includes("pipe")) return false;
        if (activeFilter === "shipping" && calc.category !== "shipping") return false;
        if (activeFilter === "capacity" && calc.category !== "capacity") return false;
        if (activeFilter === "geometry" && calc.category !== "geometry") return false;
      }

      return true;
    });
  }, [calculators, searchQuery, activeCategory, activeFilter]);

  return (
    <div className="space-y-8">
      {/* 1. Large Search Bar matching Image 2 */}
      <div className="relative max-w-3xl">
        <div className="relative flex items-center bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-2xl shadow-lg px-4 py-3.5 transition-all focus-within:border-blue-500 dark:focus-within:border-blue-500">
          <Search className="w-5 h-5 text-blue-500 dark:text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators... e.g. cubic yards, fuel tank, CBM, cylinder volume..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            aria-label="Filter calculators by keyword"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* 2. Category Tabs Cards matching Image 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveFilter("all");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-blue-600/10 dark:bg-navy-800 border-blue-500 dark:border-blue-500 text-blue-900 dark:text-white shadow-md shadow-blue-950/20"
                  : "bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-navy-850 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-2">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{cat.label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {cat.sub}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Filter Pills Row matching Image 2 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200 dark:border-navy-800">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter:</span>
          </span>
          {filterPills.map((pill) => {
            const isSelected = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-750 hover:bg-slate-100 dark:hover:bg-navy-800"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> tools
        </div>
      </div>

      {/* 4. Calculator Cards Grid matching Image 2 */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No calculators found matching your current filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setActiveFilter("all");
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((calc) => {
            const units = UNITS_MAP[calc.slug] || ["m³", "ft³"];
            const isPopular = calc.popular;
            const isCbm = calc.slug === "cbm-calculator";

            return (
              <div
                key={calc.slug}
                className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-blue-500/50 dark:hover:border-blue-600/50 rounded-2xl p-5 transition-all shadow-2xs hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with Icon & Optional Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-navy-800 border border-blue-100 dark:border-navy-700 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                      {calc.category === "shipping" ? (
                        <Scale className="w-5 h-5" />
                      ) : calc.category === "capacity" ? (
                        <Droplet className="w-5 h-5" />
                      ) : (
                        <Box className="w-5 h-5" />
                      )}
                    </div>

                    {isCbm ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Most Used</span>
                      </span>
                    ) : isPopular ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300">
                        <Flame className="w-2.5 h-2.5 fill-current" />
                        <span>Popular</span>
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {calc.h1}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {calc.shortDescription}
                  </p>

                  {/* Supported Units Badges */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {units.map((u) => (
                      <span
                        key={u}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-navy-750"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-navy-800">
                  <Link
                    href={`/${calc.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-blue-50 hover:bg-blue-600 dark:bg-navy-800 dark:hover:bg-blue-600 text-blue-700 hover:text-white dark:text-slate-200 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-2xs group-hover:shadow"
                  >
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
