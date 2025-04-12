import React from 'react';
import { useQuiz } from '@/context/QuizContext';

interface WordOptionProps {
  word: string;
}

const WordOption: React.FC<WordOptionProps> = ({ word }) => {
  const { selectWord, selectedWords } = useQuiz();
  
  const isSelected = selectedWords.includes(word);
  
  const handleClick = () => {
    if (!isSelected) {
      selectWord(word);
    }
  };
  
  return (
    <button 
      className={`word-option ${isSelected ? 'selected' : ''}`} 
      onClick={handleClick}
      disabled={isSelected}
    >
      {word}
    </button>
  );
};

export default WordOption;
