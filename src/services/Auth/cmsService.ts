import { localCmsContent } from "@/constants/localCms";
import { CmsResponse, CmsType } from "@/types/Auth/cmsDetails";
import api from "@/utils/axiosIntance";
import { AxiosError } from "axios";

const cmsEndpointMap: Partial<Record<CmsType, string>> = {
  about: "/api/cms/about-us",
  privacy: "/api/cms/privacy-policy",
  terms: "/api/cms/terms-conditions",
  help: "/api/cms/help-center",
  play: "/api/cms/how-to-play",
  referral: "/api/cms/legality",
  legal: "/api/cms/how-to-play",
};

export async function cmsDetails(type: CmsType): Promise<CmsResponse> {
  /**
   * 👉 No API? Return local CMS
   */
  if (!cmsEndpointMap[type]) {
    const local = localCmsContent[type];

    if (local) {
      return {
        success: true,
        message: "Local CMS",
        title: local.title,
        description: local.description,
      };
    }
  }

  try {
    const res = await api.get(cmsEndpointMap[type]!);
    return res.data;
  } catch (e) {
    const err = e as AxiosError<CmsResponse>;

    return {
      success: false,
      message: err.response?.data?.message || err.message,
      title: "",
      description: "",
    };
  }
}
