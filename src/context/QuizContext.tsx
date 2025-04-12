import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Question, quizData } from '@/lib/data';

interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  selectedWords: string[];
  answers: Map<string, string[]>;
  timeLeft: number;
  isQuizActive: boolean;
  score: number;
  
  setCurrentQuestionIndex: (index: number) => void;
  selectWord: (word: string) => void;
  deselectWord: (index: number) => void;
  resetSelectedWords: () => void;
  startQuiz: () => void;
  endQuiz: () => void;
  saveAnswer: () => void;
  calculateResults: () => void;
  correctAnswers: number;
  totalQuestions: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Map<string, string[]>>(new Map());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Load questions from imported data
  useEffect(() => {
    if (quizData && quizData.status === "SUCCESS") {
      setQuestions(quizData.data.questions);
      setTotalQuestions(quizData.data.questions.length);
      console.log('Questions loaded:', quizData.data.questions.length);
    }
  }, []);

  // Timer logic - always reset to 30 seconds when question changes
  useEffect(() => {
    if (isQuizActive) {
      setTimeLeft(30); // Reset timer to 30 seconds when question changes
    }
  }, [currentQuestionIndex, isQuizActive]);

  // Timer countdown effect
  useEffect(() => {
    let timer: number | undefined;
    
    if (isQuizActive && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isQuizActive) {
      saveAnswer();
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedWords([]);
        // Timer will be reset in the other useEffect when question changes
      } else {
        endQuiz();
      }
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, isQuizActive, currentQuestionIndex, questions.length]);

  const startQuiz = () => {
    setIsQuizActive(true);
    setTimeLeft(30);
    setCurrentQuestionIndex(0);
    setSelectedWords([]);
    setAnswers(new Map());
  };

  const endQuiz = () => {
    setIsQuizActive(false);
    calculateResults();
  };

  const selectWord = (word: string) => {
    if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const deselectWord = (index: number) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(index, 1);
    setSelectedWords(newSelectedWords);
  };

  const resetSelectedWords = () => {
    setSelectedWords([]);
  };

  const saveAnswer = () => {
    if (currentQuestionIndex < questions.length) {
      const questionId = questions[currentQuestionIndex].questionId;
      setAnswers(prev => new Map(prev).set(questionId, [...selectedWords]));
    }
  };

  const calculateResults = () => {
    let correct = 0;
    
    questions.forEach((question) => {
      const userAnswer = answers.get(question.questionId) || [];
      const isCorrect = userAnswer.length === question.correctAnswer.length && 
                        userAnswer.every((word, index) => word === question.correctAnswer[index]);
      
      if (isCorrect) {
        correct++;
      }
    });
    
    setCorrectAnswers(correct);
    setScore(Math.round((correct / questions.length) * 100));
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        selectedWords,
        answers,
        timeLeft,
        isQuizActive,
        score,
        correctAnswers,
        totalQuestions,
        setCurrentQuestionIndex,
        selectWord,
        deselectWord,
        resetSelectedWords,
        startQuiz,
        endQuiz,
        saveAnswer,
        calculateResults
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
