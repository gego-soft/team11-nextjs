export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description: string;
  subtext?: string;
  date: string;
  time: string;
}


export type FilterType = "all" | "credit" | "debit";

export interface ApiTransaction {
  id: number;
  amount: string;
  trans_type: string;
  trans_id: string;
  transaction_action: string;
  comment: string;
  gateway: string;
  gateway_fee: string;
  created_at: string;
  status: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiTransaction[];
}