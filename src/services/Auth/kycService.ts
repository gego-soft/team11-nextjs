
import api from "@/utils/axiosIntance"

export const kycService = {
    postKycService: (payload: FormData) =>
        api.post("/api/user/kyc", payload),
};
