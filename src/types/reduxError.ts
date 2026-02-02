export type AxiosUIError = {
  errors?: string | string[];
  message: string;
  statusCode?: number;
};

export type ApiErrorBody = {
  error?: string; // support old API format
  errors?: string | string[]; // new format
  message?: string;
  statusCode?: number;
};
