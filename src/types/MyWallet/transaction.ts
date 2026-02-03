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
