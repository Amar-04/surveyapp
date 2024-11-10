import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RatingQuestion from './components/RatingQuestion';
import TextQuestion from './components/TextQuestion';
import ThankYouScreen from './components/ThankYouScreen';

const questions = [
  { id: 'q1', type: 'rating', question: 'How satisfied are you with our products?', scale: 5, imageUrl: '/q1.jpg', widgetColor: '#4380FF', backgroundColor: '#D9E5FF' },
  { id: 'q2', type: 'rating', question: 'How fair are the prices compared to similar retailers?', scale: 5, imageUrl: '/q2.jpg', widgetColor: '#F59E0B', backgroundColor: '#FDE68A' },
  { id: 'q3', type: 'rating', question: 'How satisfied are you with the value for money of your purchase?', scale: 5, imageUrl: '/q3.jpg', widgetColor: '#8CE0FF', backgroundColor: '#DDF6FF' },
  { id: 'q4', type: 'rating', question: 'On a scale of 1-10 how would you recommend us to your friends and family?', scale: 10, imageUrl: '/q4.jpg', widgetColor: '#4380FF', backgroundColor: '#D9E5FF' },
  { id: 'q5', type: 'text', question: 'What could we do to improve our service?', imageUrl: '/q5.jpg', widgetColor: '#F59E0B', backgroundColor: '#FDE68A' }
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const id = `session_${new Date().getTime()}`;
    setSessionId(id);
  }, []);

  const handleAnswer = (answer) => {
    localStorage.setItem(`${sessionId}_${questions[currentQuestion].id}`, JSON.stringify(answer));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleStart = () => {
    setCurrentQuestion(0);
  };

  const handleSubmit = () => {
    localStorage.setItem(`${sessionId}_COMPLETED`, true);
    setCurrentQuestion(questions.length);
  };

  if (currentQuestion === -1) {
    return <WelcomeScreen onStart={handleStart} />;
  } else if (currentQuestion >= questions.length) {
    return <ThankYouScreen />;
  }

  const current = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ backgroundColor: current.backgroundColor }}>
      <div className="max-w-md w-full h-60 mb-4">
        <img src={current.imageUrl} alt="" className="rounded-lg" />
      </div>
      {current.type === 'rating' ? (
        <RatingQuestion
          questionData={current}
          onAnswer={handleAnswer}
          onPrevious={handlePrev}
          onNext={handleNext}
          onSkip={handleSkip}
          currentStep={currentQuestion + 1}
          totalSteps={questions.length}
        />
      ) : (
        <TextQuestion
          questionData={current}
          onAnswer={handleAnswer}
          onPrevious={handlePrev}
          onNext={handleNext}
          onSkip={handleSkip}
          currentStep={currentQuestion + 1}
          totalSteps={questions.length}
        />
      )}
      {currentQuestion === questions.length - 1 && (
        <button onClick={handleSubmit} className="text-white py-2 px-4 rounded-lg mt-4" style={{ backgroundColor: current.widgetColor }}>
          Submit Survey
        </button>
      )}
    </div>
  );
};

export default App;

