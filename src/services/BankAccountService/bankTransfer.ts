import api from "@/utils/axiosIntance";

export const BankContactService = {
  bankTransferContact: () => api.get("/api/faq/list"),
};
