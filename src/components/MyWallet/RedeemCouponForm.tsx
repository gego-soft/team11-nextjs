"use client";

import { RedeemCouponValues } from "@/types/MyWallet/coupons";
import { mapServerErrors } from "@/utils/mapServerErrors";
import { AxiosError } from "axios";
import { CouponService } from "@/services/MyWallet/coupons";
import { toast } from "react-toastify";
import { RedeemCouponSchema } from "@/validations/MyWallet/coupons";
import { FormikProvider, useFormik } from "formik";
import FormInputField from "../Common/Forms/FormInputField";
import Button from "../Button";

interface Props {
  onSuccess?: () => void;
}

export default function RedeemCouponForm({ onSuccess }: Props) {
  const formik = useFormik<RedeemCouponValues>({
    initialValues: { code: "" },
    validationSchema: RedeemCouponSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const res = await CouponService.redeemCoupon(values);
        toast.success(res.data.message);
        window.dispatchEvent(new CustomEvent("refreshBalance"));
        resetForm();
        onSuccess?.();
      } catch (error) {
        const err = error as AxiosError<any>;
        setErrors(mapServerErrors(err.response?.data?.errors));
        toast.error(err.response?.data.message);
      }
    },
  });

  return (
    <>
      <p className="section-description">
        Enter a coupon code from your friend or support team to add funds
        instantly
      </p>

      <FormikProvider value={formik}>
        <FormInputField
          label="Coupon Code"
          name="code"
          placeholder="ENTER COUPON CODE"
        />
      </FormikProvider>

      <Button
        variant="btnprimary"
        onClick={() => formik.handleSubmit()}
        disabled={!formik.isValid || formik.isSubmitting}
      >
        {formik.isSubmitting ? "Redeeming..." : "Redeem Coupon"}
      </Button>
    </>
  );
}
