import React, { useEffect } from 'react';

const ThankYouScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload(); // Resets the survey
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p>Your feedback is very valuable to us.</p>
      </div>
    </div>
  );
};

export default ThankYouScreen;
