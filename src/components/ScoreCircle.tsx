import React from 'react';

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score }) => {
  const circleRadius = 15.9155;
  const circumference = 2 * Math.PI * circleRadius;
  const dashArray = (score / 100) * circumference;
  
  return (
    <div className="score-circle mb-8">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path 
          className="circle-bg" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
          fill="none" 
          stroke="#E5E7EB" 
          strokeWidth="2.5"
        />
        <path 
          className="circle" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
          fill="none" 
          stroke="#22C55E" 
          strokeWidth="2.5" 
          strokeDasharray={`${dashArray}, ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold">{score}</span>
        <span className="text-sm text-neutral-600">Overall Score</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
