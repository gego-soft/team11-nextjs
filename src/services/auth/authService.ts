import { FormValues, LoginFormValues } from "@/types/Auth/authTypes"
import api from "@/utils/axiosIntance"

export const AuthService = {
  login: (payload: Partial<LoginFormValues>) =>
    api.post("/api/auth/login", payload),
  register: (payload: FormValues) => api.post("/api/users", payload),
  logout: () => api.post("/api/auth/logout"),
};
