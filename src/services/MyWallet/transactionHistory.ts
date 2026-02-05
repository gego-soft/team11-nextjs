import api from "@/utils/axiosIntance";

export const TransactionHistoryService = {
    getUserTransactions: () =>
        api.get("/api/user/transaction"),
};