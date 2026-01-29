import { ContactUsValues } from "@/types/Auth/contactDetails";
import api from "@/utils/axiosIntance";

export const contactus = async (payload: ContactUsValues) => {
  return api.post("/api/contact-us", payload);
};
