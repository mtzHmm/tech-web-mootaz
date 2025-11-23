import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, GameStats, TimerState } from '../models/quiz.models';

@Component({
  selector: 'app-game',
  imports: [CommonModule, FormsModule],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game implements OnInit, OnDestroy {
  // Données du jeu
  questions: Question[] = [
    {
      id: 1,
      question: 'Quel est le plus grand océan du monde ?',
      options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
      reponse: 'Pacifique',
      type: 'multiple'
    },
    {
      id: 2,
      question: 'Quelle est la capitale de l\'Algérie ?',
      options: ['Alger', 'Tunis', 'Tanger'],
      reponse: 'Alger',
      type: 'multiple'
    },
    {
      id: 3,
      question: 'Quelle est la couleur du ciel ?',
      options: ['Bleu', 'Vert', 'Rouge'],
      reponse: 'Bleu',
      type: 'multiple'
    },
    {
      id: 4,
      question: 'Combien fait 5 + 3 ?',
      options: [],
      reponse: '8',
      type: 'input'
    },
    {
      id: 5,
      question: 'Quel est le symbole chimique de l\'or ?',
      options: [],
      reponse: 'Au',
      type: 'input'
    }
  ];

  // État du jeu
  currentQuestionIndex = 0;
  gameStats: GameStats = {
    score: 0,
    bonnesReponses: 0,
    mauvaisesReponses: 0,
    questionActuelle: 1,
    totalQuestions: this.questions.length
  };

  // Timer
  timer: TimerState = {
    timeLeft: 15,
    isRunning: false
  };
  
  timerInterval?: number;
  selectedAnswer = '';
  inputAnswer = '';
  gameFinished = false;
  showNextButton = false;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Méthode pour forcer le démarrage (debug)
  forceStartTimer(): void {
    console.log('Force start timer appelé');
    this.startTimer();
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  startTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timer.timeLeft = 15;
    this.timer.isRunning = true;
    
    this.timerInterval = setInterval(() => {
      if (this.timer.isRunning && this.timer.timeLeft > 0) {
        this.timer.timeLeft--;
        
        // Force change detection for zoneless Angular
        this.cdr.detectChanges();
        
        if (this.timer.timeLeft === 0) {
          this.timeUp();
        }
      }
    }, 1000);
  }

  stopTimer(): void {
    this.timer.isRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  timeUp(): void {
    this.stopTimer();
    this.processAnswer('', true);
  }

  // Sélectionner une option (boutons)
  onSelectOption(option: string): void {
    if (this.currentQuestion.answered || !this.timer.isRunning) {
      return;
    }
    
    this.selectedAnswer = option;
    this.processAnswer(option);
  }

  // Soumettre réponse écrite
  onSubmitAnswer(): void {
    if (this.currentQuestion.answered || !this.timer.isRunning) {
      return;
    }
    
    this.processAnswer(this.inputAnswer.trim());
  }

  processAnswer(answer: string, timeExpired = false): void {
    if (this.currentQuestion.answered) {
      return;
    }

    this.stopTimer();
    
    const question = this.currentQuestion;
    question.answered = true;
    question.selectedAnswer = answer;
    
    const isCorrect = answer.toLowerCase() === question.reponse.toLowerCase();
    question.isCorrect = isCorrect;
    
    if (isCorrect && !timeExpired) {
      this.gameStats.score += 10;
      this.gameStats.bonnesReponses++;
    } else {
      this.gameStats.score = Math.max(0, this.gameStats.score - 5);
      this.gameStats.mauvaisesReponses++;
    }
    
    this.showNextButton = true;
    
    setTimeout(() => {
      if (this.showNextButton) {
        this.goToNextQuestion();
      }
    }, 2000);
  }

  // Aller à la question suivante (appelée par le bouton ou automatiquement)
  goToNextQuestion(): void {
    this.showNextButton = false;
    this.nextQuestion();
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.gameStats.questionActuelle++;
      this.selectedAnswer = '';
      this.inputAnswer = '';
      this.startTimer();
    } else {
      this.finishGame();
    }
  }

  // Terminer le jeu
  finishGame(): void {
    this.stopTimer();
    this.gameFinished = true;
  }

  restartGame(): void {
    this.stopTimer();
    
    this.currentQuestionIndex = 0;
    this.gameStats = {
      score: 0,
      bonnesReponses: 0,
      mauvaisesReponses: 0,
      questionActuelle: 1,
      totalQuestions: this.questions.length
    };
    this.selectedAnswer = '';
    this.inputAnswer = '';
    this.gameFinished = false;
    this.showNextButton = false;
    
    this.questions.forEach(q => {
      q.answered = false;
      q.selectedAnswer = undefined;
      q.isCorrect = undefined;
    });
    
    this.startTimer();
  }

  // Retourner à l'accueil
  goHome(): void {
    this.router.navigate(['/']);
  }
}
