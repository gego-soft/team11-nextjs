import { ApiErrorBody, AxiosUIError } from "@/types/reduxError";
import axios from "axios";

export function getAxiosErrorMessage(err: unknown): AxiosUIError {
  if (axios.isAxiosError<ApiErrorBody>(err)) {
    const data = err.response?.data;

    return {
      errors: data?.errors ?? data?.error,
      message: data?.message || err.message || "Something went wrong.",
      statusCode: data?.statusCode ?? err.response?.status,
    };
  }
  if (err instanceof Error) {
    return {
      message: err.message,
    };
  }

  // Unknown error (string / number / object etc.)
  return {
    message: "Unexpected error occurred.",
  };
}
