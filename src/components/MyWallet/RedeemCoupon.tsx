import { ModalProps } from "@/types/modal";
import RedeemCouponForm from "./RedeemCouponForm";

export default function RedeemCouponModal({ onClose }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content redeem-coupon-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>✨ Redeem Coupon</h2>

        <RedeemCouponForm onSuccess={onClose} />
      </div>
    </div>
  );
}
