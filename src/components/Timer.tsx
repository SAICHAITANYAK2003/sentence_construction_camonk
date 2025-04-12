import React, { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { formatTimeToMinSec } from '@/lib/utils';

interface TimerBarProps {
  totalSegments?: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ totalSegments = 10 }) => {
  const { timeLeft } = useQuiz();
  
  // Calculate how many segments should be active based on time left (30 seconds total)
  // Ensure we're using 30 as the maximum time
  const maxTime = 30;
  const activeSegments = Math.ceil((timeLeft / maxTime) * totalSegments);
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

const Timer: React.FC = () => {
  // Only call useQuiz once
  const { timeLeft, endQuiz, resetSelectedWords } = useQuiz();
  
  const handleQuit = () => {
    // Reset quiz state
    endQuiz();
    resetSelectedWords();
    // Use window.location instead of navigate since we don't have access to navigate here
    window.location.href = '/';
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-neutral-600">{formatTimeToMinSec(timeLeft)}</p>
      <button 
        onClick={handleQuit}
        className="text-neutral-600 px-3 py-1 border border-neutral-300 rounded-md hover:bg-gray-100"
      >
        Quit
      </button>
    </div>
  );
};

export default Timer;
export { TimerBar };
