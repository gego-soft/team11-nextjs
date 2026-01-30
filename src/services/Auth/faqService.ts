import api from "@/utils/axiosIntance";

export const FaqService = {
  getFaq: () => api.get("/api/faq/list"),
};
