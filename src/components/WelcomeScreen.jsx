import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Survey</h1>
        <p className="mb-6">Please help us improve our service by answering a few questions.</p>
        <button onClick={onStart} className="text-white bg-blue-500 py-2 px-4 rounded-lg">
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
