"use client";
import { useState, useMemo, useEffect } from "react";
import type {
  ApiResponse,
  FilterType,
  Transaction,
} from "@/types/MyWallet/transaction";
import { TransactionHistoryService } from "@/services/MyWallet/transactionHistory";
import BallLoader from "../Common/BallLoader";

export default function TransactionHistory() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionsPerPage = 5;

  // Fetch transactions from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await TransactionHistoryService.getUserTransactions();
      const apiData = response.data as ApiResponse;

      if (apiData.success && apiData.data) {
        // Transform API data to match Transaction type
        const transformedTransactions: Transaction[] = apiData.data.map(
          (item) => {
            // Parse the date string (format: "05-02-2026 05:31:52")
            const [datePart, timePart] = item.created_at.split(" ");
            const [day, month, year] = datePart.split("-");

            // Format date to "2026-02-05" for consistency
            const formattedDate = `${year}-${month}-${day}`;

            // Format time to "05:31 AM"
            const [hours, minutes] = timePart.split(":");
            const hourNum = parseInt(hours);
            const ampm = hourNum >= 12 ? "PM" : "AM";
            const formattedHour = hourNum % 12 || 12;
            const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

            return {
              id: item.id,
              type: item.trans_type as "credit" | "debit",
              amount: parseFloat(item.amount),
              description: item.comment,
              subtext:
                item.transaction_action === "bonus"
                  ? "Welcome bonus for joining"
                  : item.gateway && item.gateway !== "wallet"
                    ? `${item.gateway} • ${item.trans_id.slice(-4)}`
                    : `Transaction ID: ${item.trans_id}`,
              date: formattedDate,
              time: formattedTime,
            };
          },
        );

        setTransactions(transformedTransactions);
      } else {
        setError("Failed to fetch transactions");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("An error occurred while fetching transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions;
    return transactions.filter((t) => t.type === filterType);
  }, [transactions, filterType]);

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

  // Count transactions by type
  const creditCount = transactions.filter((t) => t.type === "credit").length;
  const debitCount = transactions.filter((t) => t.type === "debit").length;

  if (isLoading) {
    return (
      <div className="transactions-section flex justify-center items-center">
        <BallLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="transactions-section">
        <div className="transactions-header">
          <h2>Transaction History</h2>
        </div>
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchTransactions} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="transactions-section">
        <div className="transactions-header">
          <h2>Transaction History</h2>
        </div>
        <div className="empty-state">No transactions found</div>
      </div>
    );
  }

  return (
    <div className="transactions-section">
      <div className="transactions-header">
        <h2>Transaction History</h2>
        <div className="transaction-filters">
          <button
            className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All ({transactions.length})
          </button>
          <button
            className={`filter-btn ${filterType === "credit" ? "active" : ""}`}
            onClick={() => handleFilterChange("credit")}
          >
            Credit ({creditCount})
          </button>
          <button
            className={`filter-btn ${filterType === "debit" ? "active" : ""}`}
            onClick={() => handleFilterChange("debit")}
          >
            Debit ({debitCount})
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
