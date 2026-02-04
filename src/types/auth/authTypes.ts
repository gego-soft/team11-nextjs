export interface FormValues {
    name: string
    email: string
    country: string
    mobile_number: string
    password: string
    password_confirmation: string
    referral_name: string
    terms: boolean
    gaming_rules: boolean
}


export interface LoginFormValues {
    mobile_no: string;
    email: string;
    password: string;
    device_name: string,
    log_type: string,
    login_type: string,
    country: string,
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    referral_id: string | null;
    firstname: string | null;
    lastname: string | null;
    gender: string | null;
    dob: string | null;
    address:
    | string
    | {
        address_1?: string;
        address_2?: string;
        locality?: string;
        city?: string;
        state?: string;
        pincode?: string;
        country?: string;
    }
    | null;
    profile_img: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    referral_name: string | null;
    referral_link: string;
    profile_img_url: string;
    is_bank: boolean,
    balance: number,
    bank_accounts: {
        id: number,
        user_id: number,
        account_number: string,
        account_holder_name: string,
        bank_name: string,
        branch: string,
        ifsc_code: string,
        is_primary: boolean,
        status: boolean,
        created_at: string,
        updated_at: string
    },
    currency_code: string,
    currency_symbol: string,

}