import { CountryCode } from "libphonenumber-js";

export interface CountryOption {
    iso2: CountryCode;
    name: string;
    dial: string;
    label: string;
}
export interface CountryListResponse {
    success: boolean;
    message: string;
    data: [];
}
export interface LoadingSpinnerProps {
    size?: number;
    className?: string;
};