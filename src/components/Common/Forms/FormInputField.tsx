import { getIn, useField, useFormikContext } from "formik";
import { Eye, EyeOff, UploadCloud } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import Select from "react-select";
import { toast } from "react-toastify";

interface FormInputFieldProps {
  name: string;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "select"
    | "multiselect"
    | "tel"
    | "textarea"
    | "file"
    | "checkbox"
    | "radio"
    | "datetime-local"
    | "section"
    | "hidden";
  placeholder?: string;
  options?: { label: string; value: string }[];
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  labelSize?: string;
  maxLength?: number;
  optionsStyle?: string;
  textareaRows?: number;
  radioButtons?: boolean;
  uppercase?: boolean;
  customClassName?: string;
  max?: number | string;
  min?: number | string;
  required?: boolean;
  readonly?: boolean;
  dependsOnField?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onBlurExtra?: (value: string) => void;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  name,
  label,
  labelSize,
  type = "text",
  uppercase = false,
  placeholder,
  options = [],
  accept,
  multiple = false,
  disabled = false,
  radioButtons = false,
  optionsStyle,
  textareaRows,
  maxLength,
  max,
  min,
  required = false,
  customClassName,
  readonly,
  dependsOnField,
  onBlurExtra,
}) => {
  const [field, meta, helpers] = useField(name);
  const { values } = useFormikContext();

  const dependsOnValue = dependsOnField
    ? getIn(values, dependsOnField)
    : undefined;
  const hasError =
    !!meta.error && (meta.touched || (!!dependsOnField && !!dependsOnValue));
  const [previews, setPreviews] = useState<string[]>([]);

  const today = new Date();
  const currentYear = today.getFullYear();
  const minYear = currentYear - 100;

  const minDate = `${minYear}-01-01`;
  const maxDate = today.toISOString().split("T")[0];
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        try {
          if (url?.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        } catch (error) {
          console.warn("Error revoking URL:", error);
        }
      });
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      helpers.setValue(multiple ? [] : null);
      setPreviews([]);
      return;
    }

    // Convert FileList to array
    const filesArray = Array.from(files);

    if (multiple) {
      helpers.setValue(filesArray);

      // Create previews for image files only
      const newPreviews = filesArray
        .filter((file) => file?.type?.startsWith("image/"))
        .map((file) => URL.createObjectURL(file));

      // Cleanup old previews
      previews.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (error) {
          console.log("error", error);
        }
      });

      setPreviews(newPreviews);
    } else {
      const file = filesArray[0];
      helpers.setValue(file);

      // Cleanup old preview
      if (previews[0]) {
        try {
          URL.revokeObjectURL(previews[0]);
        } catch (error) {
          console.log("error", error);
        }
      }

      if (file?.type?.startsWith("image/")) {
        setPreviews([URL.createObjectURL(file)]);
      } else {
        setPreviews([]);
      }
    }
  };

  const removeFile = (index?: number) => {
    if (multiple) {
      const currentFiles = Array.isArray(field.value) ? field.value : [];

      if (index !== undefined) {
        // Remove specific file
        const newFiles = currentFiles.filter((_, i) => i !== index);
        helpers.setValue(newFiles);

        // Cleanup and remove specific preview
        if (previews[index]) {
          try {
            URL.revokeObjectURL(previews[index]);
          } catch (error) {
            console.log("error", error);
          }
        }
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
      } else {
        // Remove all files
        helpers.setValue([]);
        // Cleanup all previews
        previews.forEach((url) => {
          try {
            URL.revokeObjectURL(url);
          } catch (error) {
            console.log("error", error);
          }
        });
        setPreviews([]);
      }
    } else {
      // Single file removal
      helpers.setValue(null);
      if (previews[0]) {
        try {
          URL.revokeObjectURL(previews[0]);
        } catch (error) {
          console.log("error", error);
        }
      }
      setPreviews([]);
    }

    // Reset file input
    try {
      const fileInput = document.querySelector(
        `input[name="${field.name}"]`,
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.warn("Error resetting file input:", error);
    }
  };

  return (
    <div className="mb-4">
      {type === "hidden" && (
        <input
          {...field}
          type="hidden"
          name={field.name}
          value={field.value ?? ""}
        />
      )}

      {label && type !== "checkbox" && type !== "hidden" && (
        <label
          htmlFor={name}
          className={`block text-${
            labelSize || "sm"
          } font-medium text-gray-700 mb-2 `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          {...field}
          id={field.name}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={field.onBlur}
          rows={textareaRows || 3}
          maxLength={maxLength || 255}
          readOnly={readonly}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : "w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
          }`}
        />
      ) : type === "select" ? (
        <Select
          name={field.name}
          options={options}
          value={options.find((opt) => opt.value === field.value) || null}
          onChange={(selected) =>
            helpers.setValue(selected ? selected.value : "")
          }
          onBlur={() => helpers.setTouched(true)}
          isDisabled={readonly} // <-- key
          className="react-select-container capitalize"
          classNamePrefix="react-select"
          placeholder={placeholder || "Select..."}
          isSearchable={!readonly}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: readonly ? "#f9fafb" : provided.backgroundColor,
              cursor: readonly ? "cursor-not-allowed" : "default",
              opacity: readonly ? 0.9 : 1,
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
          }}
        />
      ) : type === "multiselect" ? (
        <Select
          isMulti
          name={field.name}
          options={options}
          value={options.filter((opt) => field.value?.includes(opt.value))}
          onChange={(selected) =>
            helpers.setValue(selected.map((s) => s.value))
          }
          onBlur={() => helpers.setTouched(true)}
          className="react-select-container capitalize"
          classNamePrefix="react-select"
          isDisabled={disabled}
          placeholder={placeholder || "Select options"}
          isClearable={false}
        />
      ) : type === "radio" ? (
        radioButtons === true ? (
          <div className="flex rounded-full overflow-hidden border border-gray-300 w-fit">
            {options.map((opt, idx) => {
              const isSelected = field.value === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onBlur={field.onBlur}
                  onClick={() => helpers.setValue(opt.value)}
                  className={`px-2 py-1 text-sm font-medium focus:outline-none transition-colors
            ${isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
            ${idx !== 0 ? "border-l border-gray-300" : ""}
          `}
                  disabled={disabled}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className={`${optionsStyle || "grid grid-cols-2 gap-3"}`}>
            {options.map((opt) => {
              const capitalizedValue =
                opt.label.charAt(0).toUpperCase() +
                opt.label.slice(1).toLowerCase();
              return (
                <label
                  key={capitalizedValue}
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name={field.name}
                    id={field.name}
                    value={opt.value}
                    onBlur={field.onBlur}
                    checked={field.value === opt.value}
                    disabled={disabled}
                    readOnly={readonly}
                    className={`${
                      readonly
                        ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                        : "h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300"
                    }`}
                    onChange={() => helpers.setValue(opt.value)}
                  />
                  {capitalizedValue}
                </label>
              );
            })}
          </div>
        )
      ) : type === "checkbox" ? (
        options && options.length > 0 ? (
          <div className={optionsStyle || "grid grid-cols-2 gap-3"}>
            {options.map((opt) => (
              <label key={opt.value} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  value={opt.value}
                  onBlur={field.onBlur}
                  checked={
                    Array.isArray(field.value) &&
                    field.value.includes(opt.value)
                  }
                  readOnly={readonly}
                  disabled={disabled}
                  className={`${
                    readonly
                      ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2"
                  }`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      helpers.setValue([...(field.value || []), opt.value]);
                    } else {
                      helpers.setValue(
                        (field.value || []).filter(
                          (v: string) => v !== opt.value,
                        ),
                      );
                    }
                  }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        ) : (
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name={field.name}
              id={field.name}
              checked={field.value}
              disabled={disabled}
              onBlur={field.onBlur}
              readOnly={readonly}
              className={`${
                readonly
                  ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  : "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2"
              }`}
              onChange={(e) => helpers.setValue(e.target.checked)}
            />
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )
      ) : type === "file" ? (
        <>
          <div>
            <div className="relative w-full disabled:cursor-not-allowed disabled:opacity-50 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 text-center cursor-pointer">
              <input
                type="file"
                name={field.name}
                id={field.name}
                accept={accept}
                onBlur={field.onBlur}
                onChange={handleFileChange}
                disabled={disabled}
                readOnly={readonly}
                className={`${
                  readonly
                    ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    : "absolute inset-0 opacity-0 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50 h-full"
                }`}
                multiple={multiple}
              />
              <div className="flex flex-col items-center justify-center text-gray-500">
                <UploadCloud className="w-8 h-8 mb-2" />
                <p className="text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  & drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {accept || "PNG, JPG, JPEG (max 5MB)"}
                </p>
              </div>
            </div>

            {/* Multiple Files Preview */}
            {multiple &&
              field.value &&
              Array.isArray(field.value) &&
              field.value.length > 0 && (
                <div className="mt-3 space-y-2">
                  {field.value.map((file, index) => (
                    <div key={index} className="relative w-fit text-sm">
                      {file?.type?.startsWith("image/") && previews[index] ? (
                        <>
                          <Image
                            src={previews[index]}
                            alt={`preview-${index}`}
                            className="w-32 h-32 object-cover rounded"
                          />
                          <span className="block mt-1 text-gray-700">
                            {file.name}
                          </span>
                        </>
                      ) : (
                        <div className="max-w-56 h-10 flex items-center p-2 gap-2 justify-center bg-gray-100 border rounded overflow-hidden">
                          <FaFilePdf className="w-6 h-6 text-red-800" />
                          <span className="text-gray-700">{file.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="absolute -top-1 -right-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                        onClick={() => removeFile(index)}
                      >
                        <IoCloseCircleSharp className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            {/* Single File Preview */}
            {!multiple && field.value && (
              <div className="relative mt-3 w-fit text-sm">
                {field.value?.type?.startsWith("image/") && previews[0] ? (
                  <>
                    <Image
                      src={previews[0]}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                    <span className="block mt-1 text-gray-700">
                      {field.value.name}
                    </span>
                  </>
                ) : (
                  <div className="max-w-56 h-10 flex items-center p-2 gap-2 justify-center bg-gray-100 border rounded overflow-hidden">
                    <FaFilePdf className="w-6 h-6 text-red-800" />
                    <span className="text-gray-700">{field.value.name}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="absolute -top-1 -right-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                  onClick={() => removeFile()}
                >
                  <IoCloseCircleSharp className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      ) : type === "date" ? (
        <input
          type="date"
          name={field.name}
          min={minDate}
          max={maxDate}
          id={field.name}
          value={
            field.value
              ? typeof field.value === "string" && field.value.includes("T")
                ? field.value.split("T")[0]
                : new Date(field.value).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            helpers.setValue(e.target.value);
          }}
          onBlur={field.onBlur}
          disabled={disabled}
          readOnly={readonly}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : "w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
          }`}
        />
      ) : type === "datetime-local" ? (
        <input
          type="datetime-local"
          name={field.name}
          min={min}
          max={max}
          id={field.name}
          onBlur={(e) => {
            if (!e.target.value) return;

            const selectedDate = new Date(e.target.value);
            const minAllowed = new Date(minDate);

            if (selectedDate < minAllowed) {
              toast.error(`Date cannot be earlier than year ${minYear}`);
              e.target.value = "";
              helpers.setValue("");
            }
          }}
          value={
            field.value ? new Date(field.value).toISOString().split("T")[0] : ""
          }
          onChange={(e) => helpers.setValue(new Date(e.target.value))}
          disabled={disabled}
          readOnly={readonly}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : "w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-md border-gray-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
          }`}
        />
      ) : type === "number" ? (
        <input
          type="number"
          min={min}
          max={max}
          id={field.name}
          placeholder={placeholder}
          value={field.value ?? ""}
          disabled={disabled}
          onBlur={field.onBlur}
          onChange={(e) => {
            const val = e.target.value;
            let num = Number(val);
            const maxVal = max !== undefined ? Number(max) : undefined;

            if (maxVal !== undefined && num > maxVal) {
              const displayName =
                label && label.length > 0
                  ? label.charAt(0).toUpperCase() + label.slice(1)
                  : field?.name
                    ? field.name.charAt(0).toUpperCase() + field.name.slice(1)
                    : "";
              toast.error(`${displayName} cannot exceed ${maxVal}`);
              num = maxVal;
            }

            helpers.setValue(num);

            field.onBlur(e);
          }}
          readOnly={readonly}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : `w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 ${
                  uppercase ? "uppercase" : ""
                } ${customClassName}`
          }`}
        />
      ) : type === "tel" ? (
        <input
          type="tel"
          id={field.name}
          name={field.name}
          value={field.value ?? ""}
          onChange={(e) => {
            // Only allow numbers
            const value = e.target.value
              .replace(/\D/g, "")
              .slice(0, maxLength || 10);
            helpers.setValue(value);
          }}
          onBlur={field.onBlur}
          placeholder={placeholder || "Enter phone number"}
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxLength || 10}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : `w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 ${
                  uppercase ? "uppercase" : ""
                } ${customClassName}`
          }`}
        />
      ) : type === "password" ? (
        <div className="relative">
          <input
            {...field}
            id={field.name}
            type={showPassword ? "text" : "password"}
            maxLength={maxLength || 50}
            placeholder={placeholder}
            value={field.value ?? ""}
            disabled={disabled}
            onBlur={field.onBlur}
            readOnly={readonly}
            onChange={(e) => {
              let value: string | number = e.target.value;
              if (uppercase && typeof value === "string") {
                value = value.toUpperCase();
              }
              if (
                maxLength &&
                typeof value === "string" &&
                value.length > maxLength
              ) {
                value = value.slice(0, maxLength);
              }
              helpers.setValue(value);
            }}
            className={`${
              readonly
                ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                : `w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 pr-10 ${
                    uppercase ? "uppercase" : ""
                  } ${customClassName}`
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            disabled={disabled || readonly}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      ) : (
        <input
          {...field}
          min={min}
          max={max}
          id={field.name}
          type={type}
          maxLength={maxLength || 50}
          placeholder={placeholder}
          value={field.value ?? ""}
          disabled={disabled}
          onBlur={(e) => {
            field.onBlur(e);

            if (onBlurExtra) {
              onBlurExtra(e.target.value);
            }
          }}
          readOnly={readonly}
          onChange={(e) => {
            let value: string | number = e.target.value;
            if (uppercase && typeof value === "string") {
              value = value.toUpperCase();
            }
            if (
              maxLength &&
              typeof value === "string" &&
              value.length > maxLength
            ) {
              value = value.slice(0, maxLength);
            }
            helpers.setValue(value);
          }}
          className={`${
            readonly
              ? "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              : `w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 ${
                  uppercase ? "uppercase" : ""
                } ${customClassName}`
          }`}
        />
      )}

      {hasError && type !== "hidden" && (
        <p className="text-red-600 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormInputField;

{
  /* <input {...field} min={min} max={max} id={field.name} type={type} maxLength={maxLength || 50} placeholder={placeholder} value={field.value ?? ""} disabled={disabled} onChange={(e) => { let value: string | number = e.target.value; if (type === "number") { value = e.target.value === "" ? "" : Number(e.target.value); } if (uppercase && typeof value === "string") { value = value.toUpperCase(); } if ( maxLength && typeof value === "string" && value.length > maxLength ) { value = value.slice(0, maxLength); } helpers.setValue(value); }} className={w-full disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 ${ uppercase ? "uppercase" : "" } ${customClassName}} /> */
}
