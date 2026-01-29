"use client";
import { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import FormInputField from "../Common/Forms/FormInputField";
import { mapServerErrors } from "@/utils/mapServerErrors";
import {
  BankDetailsSchema,
  PasswordChangeSchema,
} from "@/validations/Profile/ProfileValidationSchema";
import { ServerResponse } from "@/types/ProfileTypes/ProfileType";
import Button from "../Button";
import Image from "next/image";
import { updatePasswordCall } from "@/services/Auth/profileService";

const updateBankDetailsCall = async (data: {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
}) => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: "Bank details updated successfully" } });
    }, 1000);
  });
};

const uploadAvatarCall = async (avatar: File) => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: "Avatar updated successfully" } });
    }, 1000);
  });
};

export default function Profile() {
  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Formik for Password Change
  const passwordFormik = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: PasswordChangeSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await updatePasswordCall({
          currentpassword: values.currentpassword,
          newpassword: values.newpassword,
          confirmpassword: values.confirmpassword,
        });
        if (response.status === 200) {
          resetForm();
          toast.success(
            response.data.message || "Password updated successfully",
          );
        }
      } catch (error) {
        const err = error as AxiosError<ServerResponse>;
        const mappedErrors = mapServerErrors<typeof values>(
          err.response?.data?.errors,
        );
        setErrors(mappedErrors);
        toast.error(err.response?.data?.message || "Failed to update password");
      }
    },
  });

  // Formik for Bank Details
  const bankFormik = useFormik({
    initialValues: {
      accountName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
    },
    validationSchema: BankDetailsSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await updateBankDetailsCall({
          accountName: values.accountName,
          accountNumber: values.accountNumber,
          ifscCode: values.ifscCode,
          bankName: values.bankName,
          branchName: values.branchName,
        });

        // if (response.status === 200) {
        //   resetForm();
        //   toast.success(
        //     response.data.message || "Bank details updated successfully",
        //   );
        // }
      } catch (error) {
        const err = error as AxiosError<ServerResponse>;
        const mappedErrors = mapServerErrors<typeof values>(
          err.response?.data?.errors,
        );
        setErrors(mappedErrors);
        toast.error(
          err.response?.data?.message || "Failed to update bank details",
        );
      }
    },
  });

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
      toast.error("Only JPG, PNG, or GIF files are allowed");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      await uploadAvatarCall(file);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to update profile picture");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Profile Settings
          </h1>

          <div className="space-y-6">
            {/* Profile Picture Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profile Picture
              </h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-5xl text-white">👤</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    📷 Choose Photo
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>
            </section>

            {/* Change Password Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Change Password
              </h2>
              <FormikProvider value={passwordFormik}>
                <form
                  onSubmit={passwordFormik.handleSubmit}
                  className="space-y-4"
                >
                  <FormInputField
                    name="currentpassword"
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    required
                  />
                  <FormInputField
                    name="newpassword"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    required
                  />
                  <FormInputField
                    name="confirmpassword"
                    label="Confirm New Password"
                    type="password"
                    placeholder="Re-enter new password"
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-6 py-2.5"
                    disabled={passwordFormik.isSubmitting}
                  >
                    {passwordFormik.isSubmitting
                      ? "Updating..."
                      : "Update Password"}
                  </Button>
                </form>
              </FormikProvider>
            </section>

            {/* Bank Account Details Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Bank Account Details
              </h2>
              <p className="text-gray-600 mb-4">
                Add your bank account to withdraw winnings
              </p>

              <FormikProvider value={bankFormik}>
                <form onSubmit={bankFormik.handleSubmit} className="space-y-4">
                  <FormInputField
                    name="accountName"
                    label="Account Holder Name"
                    type="text"
                    placeholder="Enter account holder name"
                    required
                    maxLength={50}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInputField
                      name="accountNumber"
                      label="Account Number"
                      type="text"
                      placeholder="Enter account number"
                      required
                      maxLength={18}
                      onChange={(e) => {
                        // Allow only digits
                        const value = e.target.value.replace(/\D/g, "");
                        bankFormik.setFieldValue("accountNumber", value);
                      }}
                    />
                    <FormInputField
                      name="confirmAccountNumber"
                      label="Confirm Account Number"
                      type="text"
                      placeholder="Re-enter account number"
                      required
                      maxLength={18}
                      onChange={(e) => {
                        // Allow only digits
                        const value = e.target.value.replace(/\D/g, "");
                        bankFormik.setFieldValue("confirmAccountNumber", value);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInputField
                      name="ifscCode"
                      label="IFSC Code"
                      type="text"
                      placeholder="Enter IFSC code"
                      required
                      uppercase={true}
                      maxLength={11}
                      onChange={(e) => {
                        // Convert to uppercase
                        const value = e.target.value.toUpperCase();
                        bankFormik.setFieldValue("ifscCode", value);
                      }}
                    />
                    <FormInputField
                      name="bankName"
                      label="Bank Name"
                      type="text"
                      placeholder="Enter bank name"
                      required
                      maxLength={50}
                    />
                  </div>

                  <FormInputField
                    name="branchName"
                    label="Branch Name"
                    type="text"
                    placeholder="Enter branch name"
                    required
                    maxLength={50}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="px-6 py-2.5"
                    disabled={bankFormik.isSubmitting}
                  >
                    {bankFormik.isSubmitting
                      ? "Saving..."
                      : "Save Bank Details"}
                  </Button>
                </form>
              </FormikProvider>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
