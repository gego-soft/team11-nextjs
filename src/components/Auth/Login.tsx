"use client";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import Button from "../Button";
import { LoginvalidationSchema } from "@/validations/Auth/RegistrationSchema";
import { LoginFormValues } from "@/types/Auth/authTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import FormInputField from "../Common/Forms/FormInputField";
import { mapServerErrors } from "@/utils/mapServerErrors";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { LoginPayload } from "@/types/Redux/authTypes";
import { loginUser } from "@/store/slices/authThunks";
import CountrySelect from "../Common/CountrySelect";
import { CountryCode } from "libphonenumber-js";
import { formatPhone } from "@/utils/formatphone";

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
}

type LoginTab = "email" | "mobile";

export default function Login({
  onClose,
  onSwitchToRegister,
  onSwitchToForgot,
}: LoginProps) {
  const [activeTab, setActiveTab] = useState<LoginTab>("email");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      mobile_no: "",
      email: "",
      password: "",
      country: "IN",
      device_name: "web",
      log_type: "email",
      login_type: "web",
    },
    validationSchema: LoginvalidationSchema,

    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        let submitValues: LoginPayload;

        if (values.log_type === "email") {
          submitValues = {
            email: values.email!,
            password: values.password,
            device_name: values.device_name,
            log_type: "email",
            login_type: values.login_type,
          };
        } else {
          // ✅ FORMAT MOBILE NUMBER LIKE REGISTER
          const formattedMobile = formatPhone(values.country, values.mobile_no);
          submitValues = {
            mobile_no: formattedMobile,
            password: values.password,
            device_name: values.device_name,
            log_type: "mobile_no",
            login_type: values.login_type,
          };
        }

        const response = await dispatch(loginUser(submitValues)).unwrap();

        console.log("response : ", response);

        if (response.status === true) {
          toast.success(response.message || "Login Successfully");
          Cookies.set("userToken", response.data.token);
          router.push("/dashboard");
          onClose();
          resetForm();
        }
      } catch (error) {
        console.log("error : ", error);
        const err = error as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;

        const mappedErrors = mapServerErrors<LoginFormValues>(
          err.response?.data?.errors,
        );

        setErrors(mappedErrors);

        toast.error(err.response?.data.message || "Login Failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle tab change
  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    formik.setFieldValue("log_type", tab === "email" ? "email" : "mobile_no");

    // Clear the other field when switching tabs
    if (tab === "email") {
      formik.setFieldValue("mobile_no", "");
    } else {
      formik.setFieldValue("email", "");
    }
  };

  // Handle forgot password click
  const handleForgotPasswordClick = () => {
    onClose(); // Close login modal
    setShowForgotPassword(true); // Open forgot password modal
    onSwitchToForgot();
  };

  // Handle forgot password modal close
  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  return (
    <FormikProvider value={formik}>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl w-full max-w-md max-h-[90vh] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Static Header */}
          <div className="shrink-0 px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-900 text-2xl font-bold flex-1 text-center">
                Welcome Back
              </h2>
              <button
                className="bg-none border-none text-2xl text-gray-500 cursor-pointer p-1 hover:text-gray-800 transition-colors"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-8 pt-4 pb-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "email"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handleTabChange("email")}
              >
                Email
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "mobile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handleTabChange("mobile")}
              >
                Mobile Number
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field - Show only when email tab is active */}
              {activeTab === "email" && (
                <FormInputField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              )}

              {/* Mobile Field - Show only when mobile tab is active */}
              {activeTab === "mobile" && (
                // <FormInputField
                //   name="mobile_no"
                //   label="Mobile Number"
                //   type="tel"
                //   placeholder="Enter 10-digit mobile number"
                //   required
                //   maxLength={10}
                // />
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Mobile number:
                  </label>
                  <div className="flex items-center mt-2">
                    <CountrySelect
                      value={formik.values.country as CountryCode | undefined}
                      onChange={(code) =>
                        formik.setFieldValue("country", code, true)
                      }
                      className="relative"
                    />
                    <div className="relative w-full">
                      <input
                        id="mobile_no"
                        name="mobile_no"
                        type="tel"
                        inputMode="tel"
                        value={formik.values.mobile_no}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          formik.setFieldValue("mobile_no", value);
                        }}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your mobile number"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  {formik.touched.mobile_no && formik.errors.mobile_no && (
                    <div className="mt-1 text-xs text-red-500">
                      {formik.errors.mobile_no}
                    </div>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex justify-end items-center mb-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot Password?
                  </button>
                </div>
                <FormInputField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </form>
          </div>

          {/* Static Footer */}
          <div className="shrink-0 px-8 pb-6 border-t border-gray-100">
            <div>
              {/* Login Button */}
              <Button
                type="submit"
                variant="submitblue"
                onClick={() => formik.handleSubmit()}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      onClose();
                      onSwitchToRegister();
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={handleForgotPasswordClose}
          onSwitchToLogin={onSwitchToRegister}
        />
      )}
    </FormikProvider>
  );
}
