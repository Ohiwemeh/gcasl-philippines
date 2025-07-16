import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const VerificationPending = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isVerified) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4 text-center">
      <div className="max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          ⏳ Verification In Progress
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your identity verification is currently being processed. You’ll be notified once it’s complete.
        </p>

        {!user?.isVerified && (
          <button
            disabled
            className="bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg shadow cursor-not-allowed"
          >
            Awaiting Approval...
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationPending;
