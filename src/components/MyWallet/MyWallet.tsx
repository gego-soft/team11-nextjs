"use client";

import { useState } from "react";
import AddCash from "./AddCash";
import RedeemCoupon from "./RedeemCoupon";
import MyCoupons from "./MyCoupons";
import WithdrawFunds from "./WithdrawFunds";
import GenerateCoupon from "./GenerateCoupon";
import TransactionHistory from "./TransactionHistory";

export default function MyWallet() {
  const [showAddCash, setShowAddCash] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showGenerateCoupon, setShowGenerateCoupon] = useState(false);
  const [showRedeemCoupon, setShowRedeemCoupon] = useState(false);
  const [showMyCoupons, setShowMyCoupons] = useState(false);

  const walletBalance: number = 5000;

  return (
    <div className="dashboard">
      <div className="my-wallet">
        <div className="wallet-container">
          <div className="wallet-header">
            <h1>My Wallet</h1>
          </div>

          <div className="wallet-actions">
            <button
              className="action-btn add-funds"
              onClick={() => setShowAddCash(true)}
            >
              <span className="action-icon">💰</span>
              <span>Add Funds</span>
            </button>
            <button
              className="action-btn withdraw-funds"
              onClick={() => setShowWithdraw(true)}
            >
              <span className="action-icon">🏦</span>
              <span>Withdraw Funds</span>
            </button>
            <button
              className="action-btn generate-coupon"
              onClick={() => setShowGenerateCoupon(true)}
            >
              <span className="action-icon">🎫</span>
              <span>Generate Coupon</span>
            </button>
            <button
              className="action-btn redeem-coupon"
              onClick={() => setShowRedeemCoupon(true)}
            >
              <span className="action-icon">✨</span>
              <span>Redeem Coupon</span>
            </button>
            <button
              className="action-btn my-coupons"
              onClick={() => setShowMyCoupons(true)}
            >
              <span className="action-icon">📋</span>
              <span>My Coupons</span>
            </button>
          </div>
        </div>
        <TransactionHistory />
      </div>
      {showAddCash && <AddCash onClose={() => setShowAddCash(false)} />}

      {showRedeemCoupon && (
        <RedeemCoupon onClose={() => setShowRedeemCoupon(false)} />
      )}

      {showMyCoupons && <MyCoupons onClose={() => setShowMyCoupons(false)} />}

      {showWithdraw && (
        <WithdrawFunds
          onClose={() => setShowWithdraw(false)}
          walletBalance={walletBalance}
        />
      )}

      {showGenerateCoupon && (
        <GenerateCoupon onClose={() => setShowGenerateCoupon(false)} />
      )}
    </div>
  );
}
