import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question, GameStats, AnswerHistory } from './models/game.models';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'TP Angular - Directives Structurelles et Attributs';
  
  // État du jeu
  questions: Question[] = [
    {
      id: 1,
      question: 'Quel est le plus grand océan du monde ?',
      options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
      reponse: 'Pacifique'
    },
    {
      id: 2,
      question: 'Quelle est la capitale de la France ?',
      options: ['Lyon', 'Marseille', 'Paris', 'Nice'],
      reponse: 'Paris'
    },
    {
      id: 3,
      question: 'Combien font 2 + 2 ?',
      options: ['3', '4', '5', '6'],
      reponse: '4'
    },
    {
      id: 4,
      question: 'Quel langage utilise Angular ?',
      options: ['JavaScript', 'TypeScript', 'Python', 'Java'],
      reponse: 'TypeScript'
    },
    {
      id: 5,
      question: 'Quelle directive permet l\'affichage conditionnel ?',
      options: ['*ngFor', '*ngIf', '*ngSwitch', '*ngClass'],
      reponse: '*ngIf'
    }
  ];
  
  gameStats: GameStats = {
    score: 0,
    totalQuestions: this.questions.length,
    answeredQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0
  };
  
  answerHistory: AnswerHistory[] = [];
  currentQuestionIndex = 0;
  gameFinished = false;
  isReponse: boolean = false;
  lastAnswerCorrect: boolean | null = null;
  selectedOption: string = '';
  hoveredOption: string = '';
  
  // Getter pour la question actuelle
  get currentQuestion(): Question | null {
    return this.currentQuestionIndex < this.questions.length ? 
           this.questions[this.currentQuestionIndex] : null;
  }
  
  // Getter pour les questions non répondues
  get unansweredQuestions(): Question[] {
    return this.questions.filter(q => !q.answered);
  }
  
  // Getter pour toutes les questions ont été répondues
  get allQuestionsAnswered(): boolean {
    return this.questions.every(q => q.answered);
  }
  
  // Vérifier si une option est correcte
  isCorrect(option: string, question: Question): boolean {
    return option === question.reponse && question.answered === true;
  }
  
  // Vérifier si une option est sélectionnée
  isSelected(option: string): boolean {
    return this.selectedOption === option;
  }
  
  // Gérer le survol des options
  onMouseEnter(option: string): void {
    this.hoveredOption = option;
  }
  
  onMouseLeave(): void {
    this.hoveredOption = '';
  }
  
  // Sélectionner une option
  onSelectOption(selectedOption: string, question: Question): void {
    if (question.answered) return;
    
    this.selectedOption = selectedOption;
    question.answered = true;
    question.selectedAnswer = selectedOption;
    question.isCorrect = selectedOption === question.reponse;
    
    // Mettre à jour les statistiques
    this.gameStats.answeredQuestions++;
    
    if (question.isCorrect) {
      this.gameStats.score += 10;
      this.gameStats.correctAnswers++;
      this.isReponse = true;
      this.lastAnswerCorrect = true;
    } else {
      this.gameStats.score = Math.max(0, this.gameStats.score - 5);
      this.gameStats.incorrectAnswers++;
      this.isReponse = false;
      this.lastAnswerCorrect = false;
    }
    
    // Ajouter à l'historique
    this.answerHistory.push({
      questionId: question.id,
      question: question.question,
      selectedAnswer: selectedOption,
      correctAnswer: question.reponse,
      isCorrect: question.isCorrect!,
      timestamp: new Date()
    });
    
    // Vérifier si le jeu est terminé
    if (this.allQuestionsAnswered) {
      this.gameFinished = true;
    }
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }
  
  // Passer à la question suivante
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = '';
      this.isReponse = false;
      this.lastAnswerCorrect = null;
    }
  }
  
  // Redémarrer le jeu
  restartGame(): void {
    this.questions.forEach(q => {
      q.answered = false;
      q.selectedAnswer = undefined;
      q.isCorrect = undefined;
    });
    
    this.gameStats = {
      score: 0,
      totalQuestions: this.questions.length,
      answeredQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0
    };
    
    this.answerHistory = [];
    this.currentQuestionIndex = 0;
    this.gameFinished = false;
    this.isReponse = false;
    this.lastAnswerCorrect = null;
    this.selectedOption = '';
  }
  
  // Vérifier la réponse (méthode du TP)
  checkAnswer(playerAnswer: string, question: Question): void {
    this.isReponse = playerAnswer === question.reponse;
    if (this.isReponse) {
      this.gameStats.score += 10;
    } else {
      this.gameStats.score -= 5;
    }
  }
}
