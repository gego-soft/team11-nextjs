import { FormikProvider, useFormik } from "formik";
import React from "react";
import FormInputField from "../Common/Forms/FormInputField";
import Button from "../Button";
import { BankDetailsSchema } from "@/validations/Profile/ProfileValidationSchema";
import { ServerResponse } from "@/types/ProfileTypes/ProfileType";
import { AxiosError } from "axios";
import { mapServerErrors } from "@/utils/mapServerErrors";
import { toast } from "react-toastify";

const BankAccountDetails = () => {


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
        // const response = await updateBankDetailsCall({
        //   accountName: values.accountName,
        //   accountNumber: values.accountNumber,
        //   ifscCode: values.ifscCode,
        //   bankName: values.bankName,
        //   branchName: values.branchName,
        // });

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

  return (
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
            {bankFormik.isSubmitting ? "Saving..." : "Save Bank Details"}
          </Button>
        </form>
      </FormikProvider>
    </section>
  );
};

export default BankAccountDetails;