
import { UpdateProfileType } from "@/types/ProfileTypes/ProfileType"
import api from "@/utils/axiosIntance"

export const getCurrentUserCall = async () => {
    return api.get("/api/auth/user")
}

export const updataProfileCall = async (payload: UpdateProfileType) => {
    return api.put("/api/profile", payload)
}