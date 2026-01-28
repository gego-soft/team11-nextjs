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
    mobile_no?: string;
    email?: string;
    password: string;
    device_name: string,
    log_type: string,
    login_type:string
}
