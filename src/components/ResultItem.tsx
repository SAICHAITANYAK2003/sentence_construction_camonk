import React from 'react';
import { Question } from '@/lib/data';

interface ResultItemProps {
  index: number;
  question: Question;
  userAnswer: string[];
  isCorrect: boolean;
  totalQuestions: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ 
  index, 
  question, 
  userAnswer, 
  isCorrect, 
  totalQuestions 
}) => {
  // Replace blanks with correct answers for display
  const correctSentence = question.question.split('_____________').reduce((acc, part, i) => {
    if (i === 0) return part;
    return `${acc}${question.correctAnswer[i-1]}${part}`;
  }, '');
  
  // For user sentence, we need to check each word against the correct answer
  const sentenceParts = question.question.split('_____________');
  
  return (
    <div className={`result-section ${isCorrect ? 'bg-green-50' : 'bg-red-50'} border ${isCorrect ? 'border-green-100' : 'border-red-100'} rounded-lg p-4 mb-4`}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Prompt</span>
        <span className="text-sm text-neutral-600">{index + 1}/{totalQuestions}</span>
      </div>
      <p className="mb-4">{correctSentence}</p>
      
      <div className="mb-1">
        <span className="text-sm font-medium">Your response</span>
        <span className={`text-sm ml-2 ${isCorrect ? 'result-correct' : 'result-incorrect'} ${isCorrect ? 'text-green-600' : 'text-red-600'} font-medium`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      
      <p>
        {sentenceParts.map((part, i) => {
          // First part doesn't have a word before it
          if (i === 0) return <span key={i}>{part}</span>;
          
          const userWord = userAnswer[i-1] || '____';
          const correctWord = question.correctAnswer[i-1];
          const isWordCorrect = userWord === correctWord;
          
          return (
            <span key={i}>
              <span className={`inline-block mx-1 px-2 py-1 rounded ${isWordCorrect ? 'word-correct' : 'word-incorrect'}`}>
                {userWord}
              </span>
              {part}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default ResultItem;
