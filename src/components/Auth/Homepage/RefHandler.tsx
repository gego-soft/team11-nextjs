"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function RefHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawRef = searchParams.get("ref");

    if (rawRef !== null) {
      const cleaned = rawRef.trim();
      const invalid = ["", "null", "undefined", '""', "''"];

      if (cleaned && !invalid.includes(cleaned.toLowerCase())) {
        Cookies.set("sponsor", cleaned, { expires: 365 });
      }
    }
  }, [searchParams]);

  return null;
}
