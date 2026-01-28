import { CmsType } from "@/types/Auth/cmsDetails";

type LocalCms = {
  title: string;
  description: string;
};

export const localCmsContent: Partial<Record<CmsType, LocalCms>> = {
  download: {
    title: "Download App",
    description: `
      <p>Download our mobile app and enjoy seamless cricket experience.</p>

      <ul>
        <li>Fast matches</li>
        <li>Instant rewards</li>
        <li>24/7 support</li>
      </ul>
    `,
  },
};
