export type CouponStatus = "redeemed" | "new";

export type FilterType = "all" | "redeemed" | "new";
export interface GenerateCouponValues {
  coupon_amount: string;
  num_coupon: string;
}
export interface RedeemCouponValues {
  code: string;
}
export interface GetCouponListValues {
  coupon_code: string;
  coupon_value: string;
  created_by: string;
  redeemed_by: string;
  create_trx_id: string;
  redeem_tx_id: string;
  redeemed_at: string;
  created_at: string;
  created_by_name: string;
  redeemed_by_name: string;
  status: CouponStatus;
}
