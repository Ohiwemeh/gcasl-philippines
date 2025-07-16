 import React from 'react';
import { useNavigate } from 'react-router';

const VerifyRedirect = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/verification');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        🚧 Please Verify Your Account
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        You need to verify your identity before continuing.
      </p>
      <button
        onClick={handleRedirect}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
      >
        Go to Verification Page
      </button>
    </div>
  );
};

export default VerifyRedirect;
