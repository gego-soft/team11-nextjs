"use client";

import { ModalProps } from "@/types/modal";
import { RedeemCouponValues } from "@/types/MyWallet/coupons";
import { mapServerErrors } from "@/utils/mapServerErrors";
import { AxiosError } from "axios";
import { CouponService } from "@/services/MyWallet/coupons";
import { toast } from "react-toastify";
import { RedeemCouponSchema } from "@/validations/MyWallet/coupons";
import { FormikProvider, useFormik } from "formik";
import FormInputField from "../Common/Forms/FormInputField";
import Button from "../Button";

export default function RedeemCoupon({ onClose }: ModalProps) {
  const formik = useFormik<RedeemCouponValues>({
    initialValues: {
      code: "",
    },
    validationSchema: RedeemCouponSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await CouponService.redeemCoupon(values);
        resetForm();
        toast.success(response.data.message || "Coupon redeemed Successfully");
        onClose();
      } catch (error) {
        const err = error as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;
        const mappedErrors = mapServerErrors<RedeemCouponValues>(
          err.response?.data?.errors,
        );

        setErrors(mappedErrors);
        toast.error(err.response?.data.message || "Coupon redemption Failed");
      }
    },
  });
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

        <div className="redeem-content">
          <p className="section-description">
            Enter a coupon code from your friend or support team to add funds
            instantly to your wallet
          </p>

          <div className="redeem-form">
            {/*      <div className="form-group">
              <label htmlFor="couponCode">Coupon Code</label>
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="ENTER-COUPON-CODE"
                required
              />
            </div> */}
            <FormikProvider value={formik}>
              <FormInputField
                label="Coupon Code"
                name="code"
                type="text"
                placeholder="ENTER COUPON CODE"
              />
            </FormikProvider>
            <Button
              variant="btnprimary"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Redeeming..." : "Redeem Coupon"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
