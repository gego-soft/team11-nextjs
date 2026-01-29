import { ChangePasswordType } from "@/types/ProfileTypes/ProfileType"
import api from "@/utils/axiosIntance"

export const updatePasswordCall = async (payload: ChangePasswordType) => {
    return api.post("/api/change-password", payload)
}