import React from 'react';
import { useQuiz } from '@/context/QuizContext';

interface SentenceBlankProps {
  index: number;
}

const SentenceBlank: React.FC<SentenceBlankProps> = ({ index }) => {
  const { selectedWords, deselectWord } = useQuiz();
  
  const isFilled = index < selectedWords.length;
  const word = isFilled ? selectedWords[index] : '';
  
  const handleClick = () => {
    if (isFilled) {
      deselectWord(index);
    }
  };
  
  return (
    <span 
      className={`blank ${isFilled ? 'filled' : ''}`}
      onClick={handleClick}
    >
      {word}
    </span>
  );
};

export default SentenceBlank;
