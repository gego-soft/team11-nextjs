// validations/profileSchema.ts
import * as Yup from "yup";

export const UpdateProfileSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Please select a valid gender"),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  address: Yup.object().shape({
    address_1: Yup.string()
      .required("Address line 1 is required")
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address cannot exceed 100 characters"),
    address_2: Yup.string()
      .max(100, "Address cannot exceed 100 characters"),
    locality: Yup.string()
      .required("Locality is required")
      .min(2, "Locality must be at least 2 characters")
      .max(50, "Locality cannot exceed 50 characters"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City cannot exceed 50 characters"),
    state: Yup.string()
      .required("State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State cannot exceed 50 characters"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
    country: Yup.string()
      .required("Country is required")
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country cannot exceed 50 characters"),
  }),
});