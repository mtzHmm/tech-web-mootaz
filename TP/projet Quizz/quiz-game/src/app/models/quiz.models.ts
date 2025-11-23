export interface Question {
  id: number;
  question: string;
  options: string[];
  reponse: string;
  type?: 'multiple' | 'input';
  answered?: boolean;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export interface GameStats {
  score: number;
  bonnesReponses: number;
  mauvaisesReponses: number;
  questionActuelle: number;
  totalQuestions: number;
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
}