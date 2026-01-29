import api from "@/utils/axiosIntance"

export interface forgotPasswordType {
    email: string;
}
export const forgotPasswordCall = async (payload: forgotPasswordType) => {
    return api.post("/api/forgot-password", payload,

    )
}