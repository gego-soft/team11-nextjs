"use client";

import { useEffect, useState } from "react";
import { ModalProps } from "@/types/modal";
import { FilterType, GetCouponListValues } from "@/types/MyWallet/coupons";
import { CouponService } from "@/services/MyWallet/coupons";
import BallLoader from "../Common/BallLoader";
import { toast } from "react-toastify";

export default function MyCoupons({ onClose }: ModalProps) {
  const [coupons, setCoupons] = useState<GetCouponListValues[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await CouponService.getCouponList();
        if (!res.data.success) {
          console.error(res.data.message);
        }
        setCoupons(res.data.data);
      } catch (err) {
        console.error("Failed to fetch coupons", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCoupons = coupons.filter((coupon) =>
    filter === "all" ? true : coupon.status === filter,
  );

  const copyCouponCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied!`);
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
              className={`filter-btn ${filter === "new" ? "active" : ""}`}
              onClick={() => setFilter("new")}
            >
              Unused ({coupons.filter((c) => c.status === "new").length})
            </button>
            <button
              className={`filter-btn ${filter === "redeemed" ? "active" : ""}`}
              onClick={() => setFilter("redeemed")}
            >
              Used ({coupons.filter((c) => c.status === "redeemed").length})
            </button>
          </div>

          <div className="coupons-list">
            {filteredCoupons.length === 0 ? (
              <div className="empty-state">
                <p>{loading ? "Loading..." : "No coupons found"}</p>
              </div>
            ) : (
              filteredCoupons.map((coupon, index) => (
                <div key={index} className={`coupon-card ${coupon.status}`}>
                  <div className="coupon-header">
                    <div className="coupon-code-section">
                      <span className="coupon-code">{coupon.coupon_code}</span>
                      <button
                        className="copy-code-btn"
                        onClick={() => copyCouponCode(coupon.coupon_code)}
                      >
                        📋
                      </button>
                    </div>
                    <span className={`status-badge ${coupon.status}`}>
                      {coupon.status === "redeemed" ? "✓ Used" : "● Unused"}
                    </span>
                  </div>

                  <div className="coupon-details">
                    <div className="detail-item">
                      <span className="detail-label">Amount:</span>
                      <span className="detail-value">
                        ₹{coupon.coupon_value}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{coupon.created_at}</span>
                    </div>
                    {coupon.status === "redeemed" && (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Used by:</span>
                          <span className="detail-value">
                            {coupon.redeemed_by_name}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Used on:</span>
                          <span className="detail-value">
                            {coupon.redeemed_at}
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
