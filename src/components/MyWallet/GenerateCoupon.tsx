"use client";

import { ModalProps } from "@/types/modal";
import { AxiosError } from "axios";
import { mapServerErrors } from "@/utils/mapServerErrors";
import FormInputField from "@/components/Common/Forms/FormInputField";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { GenerateCouponSchema } from "@/validations/MyWallet/coupons";
import { GenerateCouponValues } from "@/types/MyWallet/coupons";
import { CouponService } from "@/services/MyWallet/coupons";
import Button from "../Button";

export default function GenerateCoupon({ onClose }: ModalProps) {
  const formik = useFormik<GenerateCouponValues>({
    initialValues: {
      coupon_amount: "",
      num_coupon: "",
    },
    validationSchema: GenerateCouponSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await CouponService.createCoupon(values);
        resetForm();
        toast.success(response.data.message || "Coupon generated Successfully");
        onClose();
      } catch (error) {
        const err = error as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;
        const mappedErrors = mapServerErrors<GenerateCouponValues>(
          err.response?.data?.errors,
        );

        setErrors(mappedErrors);
        toast.error(err.response?.data.message || "Coupon generation Failed");
      }
    },
  });
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content redeem-coupon-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>🎫 Generate Coupon</h2>
          <div style={{ padding: "1rem 0" }}>
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Generate a coupon code to share with friends
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <FormikProvider value={formik}>
                <div>
                  {/* <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Coupon Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  /> */}
                  <FormInputField
                    label="Coupon Amount (₹)"
                    name="coupon_amount"
                    type="number"
                    placeholder="Enter Coupon amount"
                  />
                  <FormInputField
                    label="Number of Coupons"
                    name="num_coupon"
                    type="number"
                    placeholder="Enter number of coupons to generate"
                  />
                </div>
                <Button
                  variant="btnprimary"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? "Generating..." : "Generate Coupon"}
                </Button>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
