import { UpdateProfileType } from "@/types/ProfileTypes/ProfileType";
import api from "@/utils/axiosIntance";

export const ProfileService = {
  getProfile: () => api.get("/api/auth/user"),
  updateProfile: (payload: UpdateProfileType) =>
    api.put("/api/profile", payload),
};
