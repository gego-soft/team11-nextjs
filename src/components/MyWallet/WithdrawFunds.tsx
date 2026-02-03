"use client";

import { useState } from "react";
import { ModalProps } from "@/types/modal";

interface WithdrawalLimits {
  minAmount: number;
  maxDailyCount: number;
  maxDailyAmount: number;
}

interface WithdrawFundsProps extends ModalProps {
  walletBalance: number;
}

export default function WithdrawFunds({
  onClose,
  walletBalance,
}: WithdrawFundsProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<number | "">("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdrawalLimits: WithdrawalLimits = {
    minAmount: 100,
    maxDailyCount: 3,
    maxDailyAmount: 10000,
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount < withdrawalLimits.minAmount) {
      alert(`Minimum withdrawal amount is ₹${withdrawalLimits.minAmount}`);
      return;
    }

    if (withdrawAmount > walletBalance) {
      alert("Insufficient balance");
      return;
    }

    setIsWithdrawing(true);

    setTimeout(() => {
      alert(`Withdrawal request of ₹${withdrawAmount} submitted successfully!`);
      setIsWithdrawing(false);
      setWithdrawAmount("");
      onClose();
    }, 1000);
  };

  return (
    <>
      {" "}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>🏦 Withdraw Funds</h2>
          <div style={{ padding: "1rem 0" }}>
            <div className="withdrawal-info">
              <div className="info-item">
                <span className="info-label">Minimum Withdrawal Amount:</span>
                <span className="info-value">
                  ₹{withdrawalLimits.minAmount}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Daily Withdrawals:</span>
                <span className="info-value">
                  {withdrawalLimits.maxDailyCount} times
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Daily Withdrawal Amount:</span>
                <span className="info-value">
                  ₹{withdrawalLimits.maxDailyAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Withdrawal Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder={`Min ₹${withdrawalLimits.minAmount}`}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: "0.5rem",
                  }}
                >
                  Available balance: ₹{walletBalance.toLocaleString()}
                </p>
              </div>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.875rem",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (
                    !withdrawAmount ||
                    withdrawAmount < withdrawalLimits.minAmount
                  ) {
                    alert(
                      `Minimum withdrawal amount is ₹${withdrawalLimits.minAmount}`,
                    );
                    return;
                  }
                  if (withdrawAmount > walletBalance) {
                    alert("Insufficient balance");
                    return;
                  }
                  setIsWithdrawing(true);
                  setTimeout(() => {
                    alert(
                      `Withdrawal request of ₹${withdrawAmount} submitted successfully!`,
                    );
                    setIsWithdrawing(false);
                    setWithdrawAmount("");
                    onClose();
                  }, 1000);
                }}
                disabled={isWithdrawing}
              >
                {isWithdrawing ? "Processing..." : "Withdraw Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
