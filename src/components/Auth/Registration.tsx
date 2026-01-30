"use client";
import { FormikProvider, useFormik } from "formik";
import Button from "../Button";
import { RegistrationSchema } from "@/validations/Auth/RegistrationSchema";
import { FormValues, LoginFormValues } from "@/types/Auth/authTypes";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import FormInputField from "../Common/Forms/FormInputField";
import CountrySelect from "../Common/CountrySelect";
import { CountryCode } from "libphonenumber-js";
import { formatPhone } from "@/utils/formatphone";
import { mapServerErrors } from "@/utils/mapServerErrors";
import Cookies from "js-cookie";
import SponsorField from "./SponsorField";
import { AuthService } from "@/services/Auth/authService";

interface RegistrationProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function Registration({
  onClose,
  onSwitchToLogin,
}: RegistrationProps) {
  const sponsorValue = Cookies.get("sponsor");
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      country: "IN",
      mobile_number: "",
      password: "",
      password_confirmation: "",
      referral_name: "",
      terms: false,
      gaming_rules: false,
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        // Format the mobile number before sending
        const formattedValues = {
          ...values,
          mobile_number: formatPhone(values.country, values.mobile_number),
        };

        const response = await AuthService.register(formattedValues);
        onClose();
        resetForm();
        toast.success(response.data.message || "Registered Successfully");
      } catch (error) {
        const err = error as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;

        const mappedErrors = mapServerErrors<LoginFormValues>(
          err.response?.data?.errors,
        );

        setErrors(mappedErrors);
        toast.error(err.response?.data.message || "Registration Failed");
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl w-full max-w-md flex flex-col max-h-[90vh] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Static Header */}
          <div className="shrink-0 px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-900 text-2xl font-bold flex-1 text-center">
                Create Account
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
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <FormInputField
                name="name"
                label="Username"
                type="text"
                placeholder="Choose a unique username"
                required
              />
              <FormInputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email address"
                required
              />

              {/* mobile_number Number */}
              {/* <div>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-28 px-1 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+971">+971</option>
                  </select>

                  <FormInputField
                    name="mobile_number"
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter your mobile number"
                    required
                    maxLength={10}
                  />
                </div>
              </div> */}

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
                      id="mobile_number"
                      name="mobile_number"
                      type="tel"
                      inputMode="tel"
                      value={formik.values.mobile_number}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        formik.setFieldValue("mobile_number", value);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your mobile number"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                      maxLength={10}
                    />
                  </div>
                </div>
                {formik.touched.mobile_number &&
                  formik.errors.mobile_number && (
                    <div className="mt-1 text-xs text-red-500">
                      {formik.errors.mobile_number}
                    </div>
                  )}
              </div>

              <FormInputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
              />

              <FormInputField
                type="password"
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Enter your confirm password"
                required
              />

              <SponsorField refSponsor={sponsorValue!} />

              {/* Terms of Service */}
              {/* <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-4 h-4"
                />
                <label
                  htmlFor="terms"
                  className="text-gray-600 text-sm cursor-pointer"
                >
                  I agree to the Terms of Service{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.terms}
                </div>
              )} */}

              <FormInputField
                name="terms"
                label="I agree to the Terms of Service"
                type="checkbox"
                required
              />

              <FormInputField
                name="gaming_rules"
                label=" I agree to the Gambling/Gaming Rules"
                type="checkbox"
                required
              />
              {/* Gaming Rules */}
              {/* <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="gaming_rules"
                  name="gaming_rules"
                  checked={formik.values.gaming_rules}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-4 h-4"
                />
                <label
                  htmlFor="gaming_rules"
                  className="text-gray-600 text-sm cursor-pointer"
                >
                  I agree to the Gambling/Gaming Rules{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {formik.touched.gaming_rules && formik.errors.gaming_rules && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.gaming_rules}
                </div>
              )} */}
            </form>
          </div>

          {/* Static Footer */}
          <div className="shrink-0 px-8 pt-4 pb-6 border-t border-gray-100">
            <Button
              type="submit"
              variant="submitblue"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Creating..." : "Register"}
            </Button>
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}
