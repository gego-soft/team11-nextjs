import * as Yup from "yup";
import { businessEmailRegex } from "../config";

export const ContactUsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Name can only contain letters, numbers and underscores",
    )
    .required("Name is required"),

  email: Yup.string()
    .matches(businessEmailRegex, "Invalid email address")
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .optional(),

  subject: Yup.string().optional(),
  message: Yup.string()
    .min(5, "Message must be at least 5 characters")
    .max(255, "Message must be at most 255 characters")
    .required("Message is required"),
});
