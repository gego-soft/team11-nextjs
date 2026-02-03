"use client";

import { useState, useMemo } from "react";
import type { Transaction } from "@/types/MyWallet/transaction";

const allTransactions: Transaction[] = [
  {
    id: 1,
    type: "credit",
    amount: 5000,
    description: "Invitation Bonus",
    subtext: "Welcome bonus for joining",
    date: "2025-12-04",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "credit",
    amount: 500,
    description: "Referral Bonus",
    subtext: "User: @rahul_cricket",
    date: "2025-12-04",
    time: "09:15 AM",
  },
  {
    id: 3,
    type: "debit",
    amount: 500,
    description: "Contest Entry Fee",
    subtext: "Team: My Champions XI",
    date: "2025-12-04",
    time: "07:20 AM",
  },
  {
    id: 4,
    type: "credit",
    amount: 2000,
    description: "Contest Winnings",
    date: "2025-12-03",
    time: "11:30 PM",
  },
  {
    id: 5,
    type: "debit",
    amount: 1000,
    description: "Withdrawal to Bank",
    subtext: "HDFC • ****5678",
    date: "2025-12-02",
    time: "05:30 PM",
  },
  {
    id: 6,
    type: "credit",
    amount: 3000,
    description: "Bank Deposit",
    date: "2025-12-02",
    time: "09:30 AM",
  },
  {
    id: 7,
    type: "debit",
    amount: 300,
    description: "Contest Entry Fee",
    date: "2025-12-01",
    time: "10:15 PM",
  },
  {
    id: 8,
    type: "credit",
    amount: 750,
    description: "Contest Winnings",
    date: "2025-12-01",
    time: "08:45 PM",
  },
];

type FilterType = "all" | "credit" | "debit";

export default function TransactionHistory() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return allTransactions;
    return allTransactions.filter((t) => t.type === filterType);
  }, [filterType]);

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage,
  );

  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage,
  );

  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  return (
    <div className="transactions-section">
      <div className="transactions-header">
        <h2>Transaction History</h2>
        <div className="transaction-filters">
          <button
            className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All ({allTransactions.length})
          </button>
          <button
            className={`filter-btn ${filterType === "credit" ? "active" : ""}`}
            onClick={() => handleFilterChange("credit")}
          >
            Credit ({allTransactions.filter((t) => t.type === "credit").length})
          </button>
          <button
            className={`filter-btn ${filterType === "debit" ? "active" : ""}`}
            onClick={() => handleFilterChange("debit")}
          >
            Debit ({allTransactions.filter((t) => t.type === "debit").length})
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {currentTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {transaction.type === "credit" ? "💚" : "💸"}
            </div>
            <div className="transaction-details">
              <h3>{transaction.description}</h3>
              {transaction.subtext && (
                <p className="transaction-subtext">{transaction.subtext}</p>
              )}
              <p className="transaction-date">
                {transaction.date} • {transaction.time}
              </p>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === "credit" ? "+" : "-"}₹
              {transaction.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
