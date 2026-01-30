import * as Yup from "yup";
import { businessEmailRegex } from "../config";

export const RegistrationSchema = Yup.object().shape({
  //  name: Yup.string()
  //         .min(2, 'Name must be at least 2 characters')
  //         .max(50, 'Name must be less than 50 characters')
  //         .required('Full name is required'),
  name: Yup.string()
    .min(3, "Username must be at least 6 characters")
    .max(20, "Username must be less than 12 characters")
    .matches(
      /^[a-z0-9]+$/,
      "Username can only contain lowercase and alphanumeric",
    )
    .required("Username is required"),

  email: Yup.string()
    .matches(businessEmailRegex, "Invalid email address")
    .email("Invalid email address")
    .required("Email is required"),

  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  referral_name: Yup.string().optional(),

  terms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms of Service")
    .required("You must agree to the Terms of Service"),

  gaming_rules: Yup.boolean()
    .oneOf([true], "You must agree to the Gambling/Gaming Rules")
    .required("You must agree to the Gambling/Gaming Rules"),
});

export const LoginvalidationSchema = Yup.object({
  email: Yup.string().when(["log_type"], {
    is: "email",
    then: (schema) =>
      schema
        .required("Email is required")
        .matches(businessEmailRegex, "Invalid email address")
        .email("Please enter a valid email address"),
    otherwise: (schema) => schema.notRequired(),
  }),
  mobile_no: Yup.string().when(["log_type"], {
    is: "mobile_no",
    then: (schema) =>
      schema
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  log_type: Yup.string()
    .required("Login type is required")
    .oneOf(["email", "mobile_no"], "Invalid login type"),
});
