import * as Yup from "yup";

export const PasswordChangeSchema = Yup.object().shape({
    currentpassword: Yup.string()
        .required("Current password is required")
        .min(6, "Password must be at least 6 characters"),
    newpassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .notOneOf([Yup.ref("currentPassword")], "New password must be different from current password"),
    confirmpassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newpassword")], "Passwords must match"),
});

export const BankDetailsSchema = Yup.object().shape({
    account_holder_name: Yup.string()
        .required("Account holder name is required")
        .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),
    account_number: Yup.string()
        .required("Account number is required")
        .matches(/^\d+$/, "Account number must contain only digits")
        .min(9, "Account number must be at least 9 digits")
        .max(18, "Account number cannot exceed 18 digits"),
    // confirmAccountNumber: Yup.string()
    //     .required("Confirm account number is required")
    //     .oneOf([Yup.ref("account_number")], "Account numbers must match"),
    ifsc_code: Yup.string()
        .required("IFSC code is required")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
    bank_name: Yup.string()
        .required("Bank name is required")
        .min(2, "Bank name is too short"),
    branch: Yup.string()
        .required("Branch name is required")
        .min(2, "Branch name is too short"),
});
