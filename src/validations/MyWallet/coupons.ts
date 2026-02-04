import * as Yup from "yup";

export const GenerateCouponSchema = Yup.object().shape({
  coupon_amount: Yup.number()
    .min(100, "Coupon amount must be at least 100")
    .max(10000, "Coupon amount must be less than 10000")
    .required("Coupon amount is required"),

  num_coupon: Yup.number()
    .min(1, "Number of coupons must be at least 1")
    .positive("Number of coupons must be greater than 0.")
    .required("Number of coupons is required"),
});
export const RedeemCouponSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});
