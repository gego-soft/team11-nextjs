export interface KycDocument {
  document_type: string;
  document_number: string;

  document_front_image: File | null;
  document_back_image: File | null;

  selfie_image?: File | null;
  document_expiry_date?: string;
}
