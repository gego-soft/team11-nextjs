"use client";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import FormInputField from "../Common/Forms/FormInputField";
import { PasswordChangeSchema } from "@/validations/Profile/ProfileValidationSchema";
import { updatePasswordCall } from "@/services/Auth/profileService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { mapServerErrors } from "@/utils/mapServerErrors";
import Button from "../Button";
import { ServerResponse } from "@/types/ProfileTypes/ProfileType";

const ChangePassword = () => {
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
  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Change Password
      </h2>
      <FormikProvider value={passwordFormik}>
        <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
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
            {passwordFormik.isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </FormikProvider>
    </section>
  );
};

export default ChangePassword;
