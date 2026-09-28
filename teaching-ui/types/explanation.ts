export interface ExplanationCreate {
  question: string;
  difficulty: string;
}

export interface Explanation extends ExplanationCreate {
  id: number;
  explanation: string;
  example: string;
  common_mistake: string;
  check_question: string;
  created_at: string;
}

export interface ExplanationPage {
  items: Explanation[];
  page: number;
  size: number;
  total: number;
}
