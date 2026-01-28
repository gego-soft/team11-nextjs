import { AxiosError } from "axios";
import { FaqResponse } from "@/types/Auth/faq";
import api from "@/utils/axiosIntance";

export async function faq(): Promise<FaqResponse> {
  try {
    const external = await api.get("/api/faq/list");
    const { success, message: backendMsg, data } = external.data || {};
    const message = backendMsg || "Faq fetched successfully";
    return { message, success: success, data };
  } catch (e) {
    const err = e as AxiosError<FaqResponse>;
    const success = err.response?.data.success || false;
    const message =
      err.response?.data.message || err.message || "Failed to fetch faq";
    return { message, success: success, data: [] };
  }
}
