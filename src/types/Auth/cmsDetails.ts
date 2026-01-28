export type CmsType =
  | "about"
  | "privacy"
  | "terms"
  | "help"
  | "play"
  | "referral"
  | "download"
  | "legal";

export type CmsPageProps = {
  type: CmsType;
};
export interface CmsResponse {
  success: boolean;
  message: string;
  title: string;
  description: string;
}
