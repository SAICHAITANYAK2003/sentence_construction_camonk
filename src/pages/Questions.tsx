import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '@/context/QuizContext';
import { ChevronRight } from 'lucide-react';
import WordOption from '@/components/WordOption';
import SentenceBlank from '@/components/SentenceBlank';
import Timer, { TimerBar } from '@/components/Timer';

const Questions: React.FC = () => {
  const [, navigate] = useLocation();
  const { 
    questions, 
    currentQuestionIndex, 
    selectedWords, 
    saveAnswer, 
    resetSelectedWords, 
    setCurrentQuestionIndex,
    endQuiz
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    if (!currentQuestion) {
      navigate('/');
    }
  }, [currentQuestion, navigate]);

  if (!currentQuestion) {
    return null;
  }

  const handleNext = () => {
    saveAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetSelectedWords();
    } else {
      endQuiz();
      navigate('/results');
    }
  };

  const handleQuit = () => {
    // Reset all points and states before returning to main page
    endQuiz();
    resetSelectedWords();
    navigate('/');
  };
  
  // Split the sentence by blanks
  const sentenceParts = currentQuestion.question.split('_____________');
  
  return (
    <div className="card">
      <Timer />
      
      <TimerBar />
      
      <p className="text-center mb-8">Select the missing words in the correct order</p>
      
      <div className="sentence-container mb-8">
        <p className="text-lg leading-loose">
          {sentenceParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < sentenceParts.length - 1 && (
                <SentenceBlank index={index} />
              )}
            </span>
          ))}
        </p>
      </div>
      
      <div className="word-options">
        {currentQuestion.options.map((word) => (
          <WordOption key={word} word={word} />
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white disabled:bg-neutral-400"
          onClick={handleNext}
          disabled={selectedWords.length !== 4}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Questions;
