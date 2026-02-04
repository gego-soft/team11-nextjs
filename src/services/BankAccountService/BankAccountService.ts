import { BankAccountPayload } from "@/types/Auth/bankAccountType";
import api from "@/utils/axiosIntance"

export const BankAccountService = {
    postBankAccountDetails: (payload: BankAccountPayload) =>
        api.post('/api/user/bank-accounts', payload),
};
