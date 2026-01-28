export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface FaqResponse {
  success: boolean;
  message: string;
  data: Faq[];
}
