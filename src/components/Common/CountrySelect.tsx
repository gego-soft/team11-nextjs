"use client";

import { CountryOption } from "@/types/country";
import { CountryCode } from "libphonenumber-js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CountryFlag from "react-country-flag";
import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
} from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en";

function useCountryOptions(): CountryOption[] {
  return useMemo(() => {
    const list = getCountries();
    return list
      .map((iso2) => {
        const name = enLabels[iso2] || iso2;
        const dial = `+${getCountryCallingCode(iso2)}`;
        return { iso2, name, dial, label: `${name} (${dial})` };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);
}

export type CountrySelectProps = {
  value?: CountryCode;
  onChange: (code: CountryCode | undefined) => void;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  inputClassName?: string;
  placeholder?: string;
};

export default function CountrySelect({
  value,
  onChange,
  className,
  buttonClassName,
  listClassName,
  inputClassName,
  placeholder = "Search country or code",
}: CountrySelectProps) {
  const options = useCountryOptions();
  const selected = options.find((o) => o.iso2 === value) ?? options[0];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.iso2.toLowerCase().includes(q) ||
        o.dial.includes(q.replace("+", "")),
    );
  }, [query, options]);

  return (
    <div className={className} ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className={
          buttonClassName ??
          "flex items-center gap-2 py-2.5 px-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        }
      >
        <CountryFlag
          svg
          countryCode={selected.iso2}
          aria-label={selected.name}
          style={{ width: "1.1rem", height: "1.1rem" }}
        />
        <span>{selected.dial}</span>
        <svg className="w-3 h-3 opacity-70" viewBox="0 0 10 6" fill="none">
          <path
            d="m1 1 4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={
                inputClassName ??
                "w-full rounded border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              }
            />
          </div>
          <ul
            role="listbox"
            className={listClassName ?? "max-h-64 overflow-auto py-1"}
          >
            {filtered.map((opt) => (
              <li key={opt.iso2}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt.iso2}
                  onClick={() => {
                    onChange(
                      isSupportedCountry(opt.iso2) ? opt.iso2 : undefined,
                    );
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
                >
                  <CountryFlag
                    svg
                    countryCode={opt.iso2}
                    aria-label={opt.name}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                  <span className="flex-1 text-left">{opt.name}</span>
                  <span className="opacity-70">{opt.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No results
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
