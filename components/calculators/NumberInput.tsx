import React from "react";
import { UnitOption } from "@/types/units";
import { AlertCircle } from "lucide-react";

interface NumberInputProps<T extends string = string> {
  id: string;
  name?: string;
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  unit?: T;
  onUnitChange?: (unit: T) => void;
  unitOptions?: UnitOption<T>[];
  placeholder?: string;
  step?: string;
  min?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  prefix?: string;
}

export function NumberInput<T extends string = string>({
  id,
  name,
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions,
  placeholder = "0.00",
  step = "any",
  min = 0,
  error,
  helperText,
  disabled = false,
  prefix,
}: NumberInputProps<T>) {
  const inputName = name || id;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 select-none cursor-pointer"
        >
          {label}
        </label>
        {helperText && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{helperText}</span>
        )}
      </div>

      <div
        className={`flex min-h-[44px] rounded-xl shadow-2xs overflow-hidden border transition-all bg-white dark:bg-slate-900 ${
          error
            ? "border-rose-400 dark:border-rose-500 focus-within:border-rose-500 dark:focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 dark:focus-within:ring-rose-950/50"
            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40"
        } ${disabled ? "bg-slate-100 dark:bg-slate-800/60 opacity-70" : ""}`}
      >
        {prefix && (
          <span className="inline-flex items-center px-3 bg-slate-50 dark:bg-slate-800/80 border-r border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 select-none">
            {prefix}
          </span>
        )}

        <input
          id={id}
          name={inputName}
          type="number"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          step={step}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3.5 py-2.5 text-sm sm:text-base font-mono font-medium text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 tabular-nums disabled:cursor-not-allowed"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {unitOptions && onUnitChange && unit && (
          <div className="relative border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0">
            <select
              id={`${id}-unit`}
              name={`${inputName}-unit`}
              value={unit}
              onChange={(e) => onUnitChange(e.target.value as T)}
              disabled={disabled}
              aria-label={`${label} measurement unit`}
              className="h-full px-3 py-2.5 text-xs font-bold font-mono text-slate-700 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer appearance-none pr-7 disabled:cursor-not-allowed"
            >
              {unitOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {opt.symbol} ({opt.label.split("(")[0].trim()})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500 dark:text-slate-400" aria-hidden="true">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium animate-in fade-in-50 duration-150">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
