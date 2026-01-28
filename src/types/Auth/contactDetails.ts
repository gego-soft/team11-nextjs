export interface ContactUsValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactUsServiceResponse {
  status?: boolean;
  errors?: string | string[]; // new format
  message?: string;
  statusCode?: number;
}
