export interface ContactUsValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactUsServiceResponse {
  status?: boolean;
  errors?: string | string[]; // new format
  message?: string;
  statusCode?: number;
}
