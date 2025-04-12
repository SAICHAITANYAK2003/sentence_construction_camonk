import React from 'react';
import { useQuiz } from '@/context/QuizContext';

interface ProgressBarProps {
  totalSegments?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSegments = 10 }) => {
  const { currentQuestionIndex, questions } = useQuiz();
  
  // Calculate how many segments should be active
  const activeSegments = Math.min(currentQuestionIndex + 1, questions.length);
  const segments = Array.from({ length: totalSegments }, (_, i) => i < activeSegments);

  return (
    <div className="timer-bar">
      {segments.map((isActive, index) => (
        <div 
          key={index}
          className={`timer-segment ${isActive ? 'active' : 'inactive'}`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
