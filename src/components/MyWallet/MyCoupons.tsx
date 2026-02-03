"use client";

import { useState } from "react";
import { ModalProps } from "@/types/modal";

type CouponStatus = "used" | "unused";

interface Coupon {
  id: number;
  code: string;
  amount: number;
  createdDate: string;
  usedBy: string | null;
  usedDate: string | null;
  status: CouponStatus;
}

type FilterType = "all" | "used" | "unused";

export default function MyCoupons({ onClose }: ModalProps) {
  const [coupons] = useState<Coupon[]>([
    {
      id: 1,
      code: "IPL2025ABC",
      amount: 500,
      createdDate: "2025-12-04",
      usedBy: "Rahul Kumar",
      usedDate: "2025-12-04",
      status: "used",
    },
    {
      id: 2,
      code: "IPL2025XYZ",
      amount: 1000,
      createdDate: "2025-12-03",
      usedBy: null,
      usedDate: null,
      status: "unused",
    },
    {
      id: 3,
      code: "IPL2025DEF",
      amount: 500,
      createdDate: "2025-12-02",
      usedBy: "Priya Sharma",
      usedDate: "2025-12-03",
      status: "used",
    },
    {
      id: 4,
      code: "IPL2025GHI",
      amount: 750,
      createdDate: "2025-12-01",
      usedBy: null,
      usedDate: null,
      status: "unused",
    },
  ]);

  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCoupons = coupons.filter((coupon) =>
    filter === "all" ? true : coupon.status === filter,
  );

  const copyCouponCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied!`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content my-coupons-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>🎫 My Coupons</h2>

        <div className="coupons-content">
          <div className="coupon-filters">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({coupons.length})
            </button>
            <button
              className={`filter-btn ${filter === "unused" ? "active" : ""}`}
              onClick={() => setFilter("unused")}
            >
              Unused ({coupons.filter((c) => c.status === "unused").length})
            </button>
            <button
              className={`filter-btn ${filter === "used" ? "active" : ""}`}
              onClick={() => setFilter("used")}
            >
              Used ({coupons.filter((c) => c.status === "used").length})
            </button>
          </div>

          <div className="coupons-list">
            {filteredCoupons.length === 0 ? (
              <div className="empty-state">
                <p>No coupons found</p>
              </div>
            ) : (
              filteredCoupons.map((coupon) => (
                <div key={coupon.id} className={`coupon-card ${coupon.status}`}>
                  <div className="coupon-header">
                    <div className="coupon-code-section">
                      <span className="coupon-code">{coupon.code}</span>
                      <button
                        className="copy-code-btn"
                        onClick={() => copyCouponCode(coupon.code)}
                      >
                        📋
                      </button>
                    </div>
                    <span className={`status-badge ${coupon.status}`}>
                      {coupon.status === "used" ? "✓ Used" : "● Unused"}
                    </span>
                  </div>

                  <div className="coupon-details">
                    <div className="detail-item">
                      <span className="detail-label">Amount:</span>
                      <span className="detail-value">₹{coupon.amount}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{coupon.createdDate}</span>
                    </div>
                    {coupon.status === "used" && (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Used by:</span>
                          <span className="detail-value">{coupon.usedBy}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Used on:</span>
                          <span className="detail-value">
                            {coupon.usedDate}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
