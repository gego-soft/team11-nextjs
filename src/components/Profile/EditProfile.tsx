"use client";

import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import FormInputField from "../Common/Forms/FormInputField";
import Button from "../Button";

import { mapServerErrors } from "@/utils/mapServerErrors";
import { FaArrowLeft } from "react-icons/fa";
import { UpdateProfileType } from "@/types/ProfileTypes/ProfileType";
import { UpdateProfileSchema } from "@/validations/Profile/UpdateProfileSchema";
import { ProfileService } from "@/services/Profile/ProfileServices";

interface EditProfileProps {
  initialData: UpdateProfileType | null;
  onCancel: () => void;
  onSuccess: () => void;
}

interface ServerResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export default function EditProfile({
  initialData,
  onCancel,
  onSuccess,
}: EditProfileProps) {
  const formik = useFormik<UpdateProfileType>({
    initialValues: {
      firstname: initialData?.firstname || "",
      lastname: initialData?.lastname || "",
      gender: initialData?.gender || "male",
      dob: initialData?.dob || "",
      address: {
        address_1: initialData?.address?.address_1 || "",
        address_2: initialData?.address?.address_2 || "",
        locality: initialData?.address?.locality || "",
        city: initialData?.address?.city || "",
        state: initialData?.address?.state || "",
        pincode: initialData?.address?.pincode || "",
        country: initialData?.address?.country || "India",
      },
    },
    validationSchema: UpdateProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await ProfileService.updateProfile(values);

        toast.success(response.data.message || "Profile updated successfully");

        // Call success callback to switch back to preview
        onSuccess();
      } catch (error) {
        const err = error as AxiosError<ServerResponse>;

        // Map server errors to form fields
        const mappedErrors = mapServerErrors<UpdateProfileType>(
          err.response?.data?.errors,
        );

        if (mappedErrors && Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        } else {
          toast.error(
            err.response?.data?.message ||
              "Failed to update profile. Please try again.",
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onCancel}
                className="mr-4 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <p className="text-blue-100 mt-1">
                  Update your personal information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInputField
                  name="firstname"
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
                <FormInputField
                  name="lastname"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormInputField
                  name="gender"
                  label="Gender"
                  type="select"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  required
                />
                <FormInputField
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Address Information
              </h3>
              <div className="space-y-4">
                <FormInputField
                  name="address.address_1"
                  label="Address Line 1"
                  type="text"
                  placeholder="Enter street address"
                  required
                />
                <FormInputField
                  name="address.address_2"
                  label="Address Line 2 (Optional)"
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField
                    name="address.locality"
                    label="Locality"
                    type="text"
                    placeholder="Enter locality"
                    required
                  />
                  <FormInputField
                    name="address.city"
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField
                    name="address.state"
                    label="State"
                    type="text"
                    placeholder="Enter state"
                    required
                  />
                  <FormInputField
                    name="address.pincode"
                    label="Pincode"
                    type="text"
                    placeholder="Enter 6-digit pincode"
                    required
                    maxLength={6}
                    onChange={(e) => {
                      // Allow only digits
                      const value = e.target.value.replace(/\D/g, "");
                      formik.setFieldValue("address.pincode", value);
                    }}
                  />
                </div>
                <FormInputField
                  name="address.country"
                  label="Country"
                  type="text"
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
                disabled={formik.isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
