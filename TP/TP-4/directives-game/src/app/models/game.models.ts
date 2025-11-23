export interface Question {
  id: number;
  question: string;
  options: string[];
  reponse: string;
  answered?: boolean;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export interface GameStats {
  score: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface AnswerHistory {
  questionId: number;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
}