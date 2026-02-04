import api from "@/utils/axiosIntance";

export interface BalanceResponse {
  message: string;
  data: {
    balance: string;
    currency_code: string;
    currency_symbol: string;
  };
}
export const balanceService = {
   getBalance: async (): Promise<BalanceResponse> => {
    const response = await api.get<BalanceResponse>("/api/user/balance");
    return response.data;
}
}