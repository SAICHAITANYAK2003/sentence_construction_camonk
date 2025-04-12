import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuiz } from "@/context/QuizContext";
import { ChevronRight } from "lucide-react";
import WordOption from "@/components/WordOption";
import SentenceBlank from "@/components/SentenceBlank";
import Timer, { TimerBar } from "@/components/Timer";

const Questions: React.FC = () => {
  const [, navigate] = useLocation();
  const {
    questions,
    currentQuestionIndex,
    selectedWords,
    saveAnswer,
    resetSelectedWords,
    setCurrentQuestionIndex,
    endQuiz,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) {
      navigate("/");
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
      navigate("/results");
    }
  };

  // Split the sentence by blanks
  const sentenceParts = currentQuestion.question.split("_____________");
  const blanksCount = sentenceParts.length - 1;

  return (
    <div className="card">
      <Timer />
      <TimerBar />

      <p className="text-center mb-8">
        Select the missing words in the correct order
      </p>

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

      <div className="word-options flex flex-wrap gap-2">
        {currentQuestion.options.map((word) => (
          <WordOption key={word} word={word} />
        ))}
      </div>

      <div className="flex justify-end mt-8 z-50 relative">
        <button
          type="button"
          onClick={handleNext}
          disabled={selectedWords.length !== blanksCount}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
      ${
        selectedWords.length === blanksCount
          ? "bg-black text-white hover:bg-gray-900"
          : "bg-neutral-400 text-white cursor-not-allowed"
      }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Questions;
