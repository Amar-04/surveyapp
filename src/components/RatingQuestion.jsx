// RatingQuestion Component
import React, { useState } from 'react';

const RatingQuestion = ({ questionData, onAnswer, onPrevious, onNext, onSkip, currentStep, totalSteps }) => {
  const { question, scale, widgetColor } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setErrorMessage('');
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      setErrorMessage('Please select an answer before proceeding.');
    } else {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
      onNext();
    }
  };

  const handleSkip = () => {
    onAnswer('skipped');
    setSelectedAnswer(null);
    onSkip();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md w-full p-6 rounded-2xl shadow-lg" style={{ backgroundColor: widgetColor }}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={onPrevious} className="text-gray-800 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            Previous
          </button>
          <span className="text-sm">{currentStep} / {totalSteps}</span>
          <button onClick={handleNext} className="text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800">
            Next
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">{question}</h2>
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {Array.from({ length: scale }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${selectedAnswer === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-gray-300 active:bg-gray-400 transition-colors focus:ring focus:ring-gray-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {errorMessage && (
          <div className="flex justify-center items-center mt-4 bg-red-100 p-4 rounded-md text-red-500">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button onClick={handleSkip} className="text-gray-800 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingQuestion;
