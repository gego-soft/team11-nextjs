import { getCountryCallingCode, isSupportedCountry } from "libphonenumber-js";
import { CountryCode } from "libphonenumber-js";
import React from "react";

export const formatPhone = (country: string, mobile_no: string): string => {
    if (
        country &&
        isSupportedCountry(country) &&
        mobile_no &&
        !mobile_no.startsWith("+")
    ) {
        const dial = `${getCountryCallingCode(country as CountryCode)}`;
        const digits = mobile_no.replace(/\D/g, "");
        return `${dial}${digits}`;
    }
    return mobile_no || ""; // Handle empty case
};
// handlePaste function
// Reusable function to get onPaste handler (pass setFieldValue from Formik)
export const getPhonePasteHandler =
    (setFieldValue: (field: string, value: string) => void, fieldName: string) =>
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData("text");
            const digits = pastedText.replace(/\D/g, "");
            setFieldValue(fieldName, digits);
        };
