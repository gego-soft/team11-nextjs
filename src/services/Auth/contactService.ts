import {
  ContactUsServiceResponse,
  ContactUsValues,
} from "@/types/Auth/contactDetails";
import api from "@/utils/axiosIntance";
import { AxiosError } from "axios";

export async function contactus(
  values: ContactUsValues,
): Promise<ContactUsServiceResponse> {
  try {
    const external = await api.post("/api/contact-us", values); // expects { token, user, message? }
    const { message: backendMsg, status } = external.data || {};
    const message = backendMsg || "Contact submitted successfully";
    return { message };
  } catch (e) {
    const err = e as AxiosError<any>;
    const status = err.response?.status;
    const data = err.response?.data;
    const errors = data?.errors;
    const message =
      err.message || `Request failed${status ? ` with status ${status}` : ""}`;

    return { errors, message };
  }
}
