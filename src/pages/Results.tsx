import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '@/context/QuizContext';
import { ArrowLeft, ChevronDown, MoreVertical } from 'lucide-react';
import ScoreCircle from '@/components/ScoreCircle';
import ResultItem from '@/components/ResultItem';

const Results: React.FC = () => {
  const [, navigate] = useLocation();
  const { 
    questions, 
    answers, 
    score, 
    correctAnswers, 
    totalQuestions 
  } = useQuiz();
  
  useEffect(() => {
    // If there are no answers, redirect to home
    if (answers.size === 0) {
      navigate('/');
    }
  }, [answers, navigate]);
  
  const handleGoToDashboard = () => {
    navigate('/');
  };
  
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <button className="mr-4" onClick={handleGoToDashboard}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Sentence Construction</h1>
        <button className="ml-auto">
          <MoreVertical size={24} />
        </button>
      </div>
      
      <ScoreCircle score={score} />
      
      <p className="text-center mb-8">
        While you correctly formed several sentences, there are a couple of areas where 
        improvement is needed. Pay close attention to sentence structure and word placement 
        to ensure clarity and correctness. Review your responses below for more details.
      </p>
      
      <button className="button w-full mb-8" onClick={handleGoToDashboard}>
        Go to Dashboard
      </button>
      
      <div className="flex justify-center mb-4">
        <ChevronDown size={24} />
      </div>
      
      {questions.map((question, index) => {
        const userAnswer = answers.get(question.questionId) || [];
        
        // Check if the answer is correct
        const isCorrect = userAnswer.length === question.correctAnswer.length && 
                          userAnswer.every((word, i) => word === question.correctAnswer[i]);
        
        return (
          <ResultItem
            key={question.questionId}
            index={index}
            question={question}
            userAnswer={userAnswer}
            isCorrect={isCorrect}
            totalQuestions={totalQuestions}
          />
        );
      })}
    </div>
  );
};

export default Results;
