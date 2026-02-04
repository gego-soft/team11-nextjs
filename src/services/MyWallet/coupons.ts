import {
  GenerateCouponValues,
  RedeemCouponValues,
} from "@/types/MyWallet/coupons";
import api from "@/utils/axiosIntance";

export const CouponService = {
  createCoupon: (payload: GenerateCouponValues) =>
    api.post("/api/user/coupon/create", payload),
  redeemCoupon: (payload: RedeemCouponValues) =>
    api.post("/api/user/coupon/redeem", payload),
  getCouponList: () => api.get("/api/user/coupons"),
};
