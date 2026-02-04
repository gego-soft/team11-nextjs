"use client";

import { useState, FormEvent } from "react";
import RedeemCouponForm from "./RedeemCouponForm";
import BankTransfer from "./BankTransfer";

interface AddCashProps {
  onClose: () => void;
}

const AddCash: React.FC<AddCashProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"redeem" | "bank">("redeem");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content add-cash-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Add Cash to Wallet</h2>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "redeem" ? "active" : ""}`}
            onClick={() => setActiveTab("redeem")}
          >
            Redeem Coupon
          </button>

          <button
            className={`tab ${activeTab === "bank" ? "active" : ""}`}
            onClick={() => setActiveTab("bank")}
          >
            Bank Transfer
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "redeem" && <RedeemCouponForm onSuccess={onClose} />}

          {activeTab === "bank" && <BankTransfer />}
        </div>
      </div>
    </div>
  );
};

export default AddCash;
