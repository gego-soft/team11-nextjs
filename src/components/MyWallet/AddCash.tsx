"use client";

import { useState, FormEvent } from "react";

interface AddCashProps {
  onClose: () => void;
}

const AddCash: React.FC<AddCashProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"redeem" | "bank">("redeem");
  const [couponCode, setCouponCode] = useState<string>("");
  const [redeeming, setRedeeming] = useState<boolean>(false);

  const handleRedeemCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRedeeming(true);

    console.log("Redeeming coupon:", couponCode);

    setTimeout(() => {
      setRedeeming(false);
      alert("Coupon redeemed successfully!");
      setCouponCode("");
    }, 1500);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi, I would like to add cash to my IPL Fantasy wallet",
      "_blank",
    );
  };

  const openTelegram = () => {
    window.open("https://t.me/iplfantasysupport", "_blank");
  };

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
          {activeTab === "redeem" && (
            <div className="redeem-section">
              <p className="section-description">
                Enter a coupon code from your friend or support team to add
                funds instantly
              </p>

              <form onSubmit={handleRedeemCoupon} className="redeem-form">
                <div className="form-group">
                  <label htmlFor="couponCode">Coupon Code</label>
                  <input
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    placeholder="Enter coupon code"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={redeeming}
                >
                  {redeeming ? "Redeeming..." : "Redeem Coupon"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="bank-transfer-section">
              <div className="bank-info">
                <h3>💰 Bank Transfer Instructions</h3>

                <p className="lead-text">
                  To add funds via bank transfer, please contact our support
                  team through WhatsApp or Telegram.
                </p>

                <div className="info-note">
                  <span className="note-icon">ℹ️</span>
                  <p>
                    Funds will be credited within 15–30 minutes after payment
                    confirmation.
                  </p>
                </div>
              </div>

              <div className="contact-buttons">
                <button className="btn btn-whatsapp" onClick={openWhatsApp}>
                  💬 Contact on WhatsApp
                </button>

                <button className="btn btn-telegram" onClick={openTelegram}>
                  ✈️ Contact on Telegram
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCash;
