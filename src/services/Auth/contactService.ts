import { ContactUsValues } from "@/types/Auth/contactDetails";
import api from "@/utils/axiosIntance";

export const ContactService = {
  createContact: (payload: ContactUsValues) =>
    api.post("/api/contact-us", payload),
  getContactInfo: () => api.get("/api/contact-details"),
};