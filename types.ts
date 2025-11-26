export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface Question {
  id: number;
  text: string;
  categoryId: string;
}

export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  questions: Question[];
}

export interface Answer {
  questionId: number;
  score: number; // 0-3
}

export type QuizState = 'welcome' | 'lead-capture' | 'quiz' | 'calculating' | 'results';

export interface QuizResult {
  totalScore: number; // Max 75
  tier: 'Not Yet Ready' | 'Almost There' | 'You’re Ready';
  categoryScores: Record<string, number>;
}