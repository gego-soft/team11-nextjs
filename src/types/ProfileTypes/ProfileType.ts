
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