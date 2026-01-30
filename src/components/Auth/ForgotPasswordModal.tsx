"use client";

import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Button from "../Button";
import FormInputField from "../Common/Forms/FormInputField";

import { mapServerErrors } from "@/utils/mapServerErrors";
import { IoClose } from "react-icons/io5";
import { ForgotPasswordSchema } from "@/validations/Auth/ForgotPasswordSchema";
import { forgotPasswordType } from "@/types/Auth/password";
import { PasswordService } from "@/services/Auth/passwordService";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

interface ServerResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export default function ForgotPasswordModal({
  onClose,
  onSwitchToLogin,
}: ForgotPasswordModalProps) {
  const formik = useFormik<forgotPasswordType>({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await PasswordService.forgotPassword(values);

        toast.success(
          response.data.message ||
            "Password reset link sent to your email. Please check your inbox.",
        );

        // Close modal after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);

        resetForm();
      } catch (error) {
        const err = error as AxiosError<ServerResponse>;

        // Map server errors to form fields
        const mappedErrors = mapServerErrors<forgotPasswordType>(
          err.response?.data?.errors,
        );

        if (mappedErrors && Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        } else {
          // If no specific field errors, show general error
          toast.error(
            err.response?.data?.message ||
              "Failed to send reset link. Please try again.",
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-100">
            <h2 className="text-gray-900 text-xl font-bold text-center">
              Forgot Password
            </h2>
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 transition-colors"
              onClick={onClose}
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="mb-4 text-center">
              <p className="text-gray-600 text-sm">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <FormInputField
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your registered email"
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-12 text-base font-bold"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-semibold bg-none border-none cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                >
                  Back to Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}
