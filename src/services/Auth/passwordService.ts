import { forgotPasswordType } from "@/types/Auth/password";
import api from "@/utils/axiosIntance";

export const PasswordService = {
  forgotPassword: (payload: forgotPasswordType) =>
    api.post("/api/forgot-password", payload),
};
