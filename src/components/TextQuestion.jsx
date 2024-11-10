import React, { useState } from 'react';

const TextQuestion = ({ questionData, onAnswer, onPrevious, onNext, onSkip, currentStep, totalSteps, widgetColor, buttonColor }) => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    setErrorMessage('');
  };

  const handleAnswer = () => {
    if (text.trim() === '') {
      setErrorMessage('Please provide an answer before proceeding.');
    } else {
      onAnswer(text);
      onNext();
    }
  };

  const handleSkip = () => {
    onAnswer('skipped');
    onSkip();
  };

  return (
    <div className="flex flex-col items-center" style={{ backgroundColor: widgetColor }}>
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg text-gray-800">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onPrevious} className="text-gray-800 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            Previous
          </button>
          <span className="text-sm">{currentStep} / {totalSteps}</span>
          <button onClick={handleAnswer} className="text-white px-4 py-2 rounded-md" style={{ backgroundColor: buttonColor }}>
            Next
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">{questionData.question}</h2>

        <textarea
          value={text}
          onChange={handleTextChange}
          rows="4"
          className="w-full p-4 border rounded-md resize-none"
          placeholder="Your answer..."
        ></textarea>

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

export default TextQuestion;