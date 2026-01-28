import { FormValues, LoginFormValues } from "@/types/auth/authTypes"
import api from "@/utils/axiosIntance"

export const registrationCall = async (payload: FormValues) => {
    return api.post("/api/users", payload,
        {
            headers:{
                "X-API-Key": process.env.NEXT_PUBLIC_API_KEY
            }
        }
    )
}

export const loginCall = async (payload: LoginFormValues) => {
    return api.post("/api/auth/login", payload)
}