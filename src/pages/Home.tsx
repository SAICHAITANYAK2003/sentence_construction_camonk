import React from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '@/context/QuizContext';
import { List, MoreVertical } from 'lucide-react';

const Home: React.FC = () => {
  const [, navigate] = useLocation();
  const { startQuiz, totalQuestions } = useQuiz();
  
  const handleStart = () => {
    startQuiz();
    navigate('/questions');
  };
  
  return (
    <div className="card">
      <div className="flex justify-end mb-4">
        <button className="text-gray-400" aria-label="Options">
          <MoreVertical size={24} />
        </button>
      </div>
      
      <div className="flex justify-center mb-8">
        <List size={48} color="#4F46E5" />
      </div>
      
      <h1 className="text-2xl font-semibold text-center mb-4">Sentence Construction</h1>
      <p className="text-center text-neutral-600 mb-8">
        Select the correct words to complete the sentence by arranging the provided options in the right order.
      </p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <p className="text-neutral-600 mb-1">Time Per Question</p>
          <p className="font-medium">30 sec</p>
        </div>
        <div className="text-center">
          <p className="text-neutral-600 mb-1">Total Questions</p>
          <p className="font-medium">{totalQuestions}</p>
        </div>
        <div className="text-center">
          <p className="text-neutral-600 mb-1">Coins</p>
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <p className="font-medium">{20}</p>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button className="button secondary flex-1">Back</button>
        <button className="button flex-1" onClick={handleStart}>Start</button>
      </div>
    </div>
  );
};

export default Home;
