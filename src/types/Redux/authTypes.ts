
export interface User {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null,
    referral_id: number | null;
    firstname: string | null;
    lastname: string | null;
    gender: string | null;
    dob: string | null;
    address: string | null;
    profile_img: string | null;
    profile_img_url: string;
    referral_name: string;
    referral_link: string;
    is_bank: boolean,
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
    }


}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}


export type LoginPayload =
    | {
        email: string;
        password: string;
        device_name: string;
        log_type: "email";
        login_type: string;
    }
    | {
        mobile_no: string;
        password: string;
        device_name: string;
        log_type: "mobile_no";
        login_type: string;
    };
