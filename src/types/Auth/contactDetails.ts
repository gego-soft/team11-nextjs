export interface ContactUsValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export interface ContactInfo {
  whatsapp_url: string;
  telegram_url: string;
  address: string;
  contact_email: string;
  phone_no: string;
}
export interface ContactState {
  data?: ContactInfo;
  loading: boolean;
  error?: string;
}
export interface ContactUsServiceResponse {
  status?: boolean;
  errors?: string | string[]; // new format
  message?: string;
  statusCode?: number;
}
