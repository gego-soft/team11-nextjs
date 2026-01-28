"use client";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import Button from "../Button";
import { LoginvalidationSchema } from "@/validations/Auth/RegistrationSchema";
import { LoginFormValues } from "@/types/auth/authTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { loginCall } from "@/services/auth/authService";
import Cookies from "js-cookie";
import FormInputField from "../Common/Forms/FormInputField";
import { mapServerErrors } from "@/utils/mapServerErrors";

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

type LoginTab = "email" | "mobile";

export default function Login({ onClose, onSwitchToRegister }: LoginProps) {
  const [activeTab, setActiveTab] = useState<LoginTab>("email");

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      mobile_no: "",
      email: "",
      password: "",
      device_name: "web",
      log_type: "email",
      login_type: "web",
    },
    validationSchema: LoginvalidationSchema,

    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const submitValues = {
          password: values.password,
          device_name: values.device_name,
          log_type: values.log_type,
          login_type: values.login_type,
          ...(values.log_type === "email" && { email: values.email }),
          ...(values.log_type === "mobile_no" && {
            mobile_no: values.mobile_no,
          }),
        } as LoginFormValues;
        const response = await loginCall(submitValues);

        if (response.status === 200) {
          toast.success(response.data.message || "Login Successfully");
          Cookies.set("token", response.data.data.token);
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
          <div className="flex-1 overflow-y-auto px-8 py-6">
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
                <FormInputField
                  name="mobile_no"
                  label="Mobile Number"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  required
                  maxLength={10}
                />
              )}

              {/* Password */}
              <div>
                <div className="flex justify-end items-center mb-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => {
                      // You can implement forgot password logic here
                      console.log("Forgot password clicked");
                    }}
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
          <div className="shrink-0 px-8 pt-4 pb-6 border-t border-gray-100">
            <div className="space-y-4">
              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base font-bold"
                onClick={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-semibold bg-none border-none cursor-pointer"
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
    </FormikProvider>
  );
}
