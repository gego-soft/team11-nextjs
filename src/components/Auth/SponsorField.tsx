import { useEffect } from "react";
import { useFormikContext } from "formik";
import FormInputField from "../Common/Forms/FormInputField";

interface Props {
  refSponsor: string;
}

const SponsorField: React.FC<Props> = ({ refSponsor }) => {
  const { setFieldValue } = useFormikContext<any>();

  // Inject sponsor into formik
  useEffect(() => {
    if (refSponsor) {
      setFieldValue("referral_name", refSponsor);
    }
  }, [refSponsor, setFieldValue]);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Referral Name {refSponsor ? "" : "(optional)"}
      </label>

      {/* Hidden actual submit field */}
      <FormInputField type="hidden" name="referral_name" />

      {refSponsor ? (
        <input
          type="text"
          value={refSponsor}
          readOnly
          disabled
          className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
        />
      ) : (
        <FormInputField
          name="referral_name"
          type="text"
          placeholder="Sponsor code"
        />
      )}
    </div>
  );
};

export default SponsorField;
