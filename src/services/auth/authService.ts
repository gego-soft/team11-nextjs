import { FormValues, LoginFormValues } from "@/types/Auth/authTypes"
import api from "@/utils/axiosIntance"

export const registrationCall = async (payload: FormValues) => {
    return api.post("/api/users", payload,
        
    )
}

export const loginCall = async (payload: LoginFormValues) => {
    return api.post("/api/auth/login", payload)
}