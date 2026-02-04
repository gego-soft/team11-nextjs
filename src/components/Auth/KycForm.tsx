"use client";

import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Button from "../Button";
import FormInputField from "../Common/Forms/FormInputField";
import { mapServerErrors } from "@/utils/mapServerErrors";
import { kycService } from "@/services/Auth/kycService";
import { KycDocument } from "@/types/Auth/kycTypes";
import { KycValidationSchema } from "@/validations/Auth/kycSchema";

// Document type options
const DOCUMENT_TYPE_OPTIONS = [
  { label: "Aadhar Card", value: "aadhar_card" },
  { label: "Passport", value: "passport" },
  { label: "Driving License", value: "driving_license" },
  { label: "PAN card", value: "pan_card" },
];

interface ServerResponse {
  message: string;
  errors?: Record<string, string[]>;
}

interface KycFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function KycForm({ onSuccess, onClose }: KycFormProps) {
  const formik = useFormik<KycDocument>({
    initialValues: {
      document_type: "",
      document_number: "",
      document_front_image: null,
      document_back_image: null,
      selfie_image: null,
      document_expiry_date: "",
    },
    validationSchema: KycValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        // Create FormData for file upload
        const formData = new FormData();

        // Append all fields
        Object.entries(values).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value.toString());
          }
        });

        // Call API with FormData
        const response = await kycService.postKycService(formData);

        toast.success(
          response.data.message || "KYC verification submitted successfully!",
        );

        // Reset form and call success callback
        resetForm();
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        const err = error as AxiosError<ServerResponse>;

        // Map server errors to form fields
        const mappedErrors = mapServerErrors<KycDocument>(
          err.response?.data?.errors,
        );

        if (mappedErrors && Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        } else {
          // If no specific field errors, show general error
          toast.error(
            err.response?.data?.message ||
              "Failed to submit KYC. Please try again.",
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            KYC Verification
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Document Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInputField
              name="document_type"
              label="Document Type"
              type="select"
              options={DOCUMENT_TYPE_OPTIONS}
              placeholder="Select document type"
              required
            />

            {/* Document Number */}
            <FormInputField
              name="document_number"
              label="Document Number"
              type="text"
              placeholder="Enter document number"
              required
              maxLength={15}
            />
          </div>

          {/* Document Expiry Date  */}
          {formik.values.document_type !== "aadhar_card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInputField
                name="document_expiry_date"
                label="Document Expiry Date "
                type="date"
                placeholder="Select expiry date"
                required
              />
            </div>
          )}

          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Document Images
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Front Image */}
                <div>
                  <FormInputField
                    name="document_front_image"
                    label="Front of Document"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a clear image of the front side. Max 5MB. JPEG, PNG
                    only.
                  </p>
                </div>

                {/* Back Image */}
                <div>
                  <FormInputField
                    name="document_back_image"
                    label="Back of Document"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a clear image of the back side. Max 5MB. JPEG, PNG
                    only.
                  </p>
                </div>
              </div>
            </div>

            {/* Selfie  */}
            <div className="border-t border-gray-200 pt-6">
              <div className="max-w-md">
                <FormInputField
                  name="selfie_image"
                  label="Selfie with Document "
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Upload a selfie holding your document. Helps with
                  verification.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
            {onClose && (
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={onClose}
                disabled={formik.isSubmitting}
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}
