
export interface ProfileFormValues {
    avatar: File | null;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    accountName: string;
    accountNumber: string;
    confirmAccountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
}

export interface ServerResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export interface ChangePasswordType {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string
}

export interface AddressType {
    address_1: string;
    address_2?: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface UpdateProfileType {
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    address: AddressType;
}