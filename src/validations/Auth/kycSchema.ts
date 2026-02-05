import * as Yup from "yup";

export const KycValidationSchema = Yup.object().shape({
    document_type: Yup.string()
        .required("Document type is required")
        .oneOf(
            ["pan_card", "driving_license", "passport", "aadhar_card"],
            "Please select a valid document type",
        ),

    document_number: Yup.string()
        .required("Document number is required")
        .min(5, "Document number must be at least 5 characters")
        .max(50, "Document number is too long"),

    document_expiry_date: Yup.date()
        .nullable()
        .when("document_type", {
            is: (docType: string) =>
                docType === "passport" || docType === "driving_license",
            then: (schema) =>
                schema
                    .required("Document expiry date is required")
                    .test(
                        "is-future",
                        "Document must not be expired",
                        (value) => !!value && new Date(value) > new Date()
                    ),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),


    document_front_image: Yup.mixed<File>()
        .required("Front image is required")
        .test(
            "fileSize",
            "File size is too large (max 5MB)",
            (value) =>
                !value || (value instanceof File && value.size <= 5 * 1024 * 1024),
        )
        .test(
            "fileType",
            "Unsupported file format. Please upload an image (JPEG, PNG, JPG)",
            (value) =>
                !value ||
                (value instanceof File &&
                    ["image/jpeg", "image/png", "image/jpg"].includes(value.type)),
        ),

    document_back_image: Yup.mixed<File>()
        .required("Back image is required")
        .test(
            "fileSize",
            "File size is too large (max 5MB)",
            (value) =>
                !value || (value instanceof File && value.size <= 5 * 1024 * 1024),
        )
        .test(
            "fileType",
            "Unsupported file format. Please upload an image (JPEG, PNG, JPG)",
            (value) =>
                !value ||
                (value instanceof File &&
                    ["image/jpeg", "image/png", "image/jpg"].includes(value.type)),
        ),

    selfie_image: Yup.mixed<File>()
        .nullable()
        .test(
            "fileSize",
            "File size is too large (max 5MB)",
            (value) =>
                !value || (value instanceof File && value.size <= 5 * 1024 * 1024),
        )
        .test(
            "fileType",
            "Unsupported file format. Please upload an image (JPEG, PNG, JPG)",
            (value) =>
                !value ||
                (value instanceof File &&
                    ["image/jpeg", "image/png", "image/jpg"].includes(value.type)),
        ),
});
