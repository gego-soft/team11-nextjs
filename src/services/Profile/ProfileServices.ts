import { UpdateProfileType } from "@/types/ProfileTypes/ProfileType";
import api from "@/utils/axiosIntance";

export const ProfileService = {
  getProfile: () => api.get("/api/auth/user"),
  updateProfile: (payload: UpdateProfileType) =>
    api.put("/api/profile", payload),
  updateProfileImage: (payload: File) => {
    const formData = new FormData();
    formData.append("profile_image", payload);
    return api.post("/api/profile/image", formData);
  }
};
