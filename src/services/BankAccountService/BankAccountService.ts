import api from "@/utils/axiosIntance"

export interface BankAccountPayload {
    account_holder_name: string;
    account_number: string;
    bank_name: string;
    branch: string;
    ifsc_code: string;
    is_primary: string;
}

export const postBankAccountDetails = async (payload: BankAccountPayload) => {
    return api.post('/api/user/bank-accounts', payload)
}