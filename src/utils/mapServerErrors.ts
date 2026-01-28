import { FormikErrors } from "formik"; // Import this from Formik

export const mapServerErrors = <T extends Record<string, any>>(
  serverErrors: unknown
): FormikErrors<T> & { error?: string } => {
  const mappedErrors: FormikErrors<T> & { error?: string } = {};

  // Handle non-object cases (e.g., string, null, undefined)
  if (typeof serverErrors !== "object" || serverErrors === null) {
    mappedErrors.error = String(serverErrors || "An unexpected error occurred");
    return mappedErrors;
  }

  // Handle array cases (e.g., [{ oldpassword: 'msg' }])
  if (Array.isArray(serverErrors)) {
    serverErrors.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        // Flatten inner object entries into the map
        for (const [field, msgs] of Object.entries(
          item as Record<string, unknown>
        )) {
          if (Array.isArray(msgs)) {
            (mappedErrors as any)[field] = msgs.join(", "); // Type assertion for flexibility
          } else if (typeof msgs === "string") {
            (mappedErrors as any)[field] = msgs;
          } else {
            // Fallback for nested objects or other types
            (mappedErrors as any)[field] = String(msgs);
          }
        }
      } else {
        // Fallback for non-object items in the array
        mappedErrors.error = String(item);
      }
    });
    return mappedErrors;
  }

  // Handle plain object cases (original logic)
  for (const [field, msgs] of Object.entries(
    serverErrors as Record<string, unknown>
  )) {
    if (Array.isArray(msgs)) {
      (mappedErrors as any)[field] = msgs.join(", ");
    } else if (typeof msgs === "string") {
      (mappedErrors as any)[field] = msgs;
    } else {
      (mappedErrors as any)[field] = String(msgs);
    }
  }
  return mappedErrors;
};
