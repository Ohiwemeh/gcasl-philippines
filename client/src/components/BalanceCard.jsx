import React from 'react';
import { useAuth } from '../context/AuthContext';

const BalanceCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-blue-600 text-white rounded-lg p-4 mx-4 shadow mb-4">
      <p className="text-sm">AVAILABLE BALANCE</p>
      <div className="flex items-center justify-between mt-2">
        <div>
          <h1 className="text-3xl font-bold">₱ {user?.balance?.toFixed(2) || '0.00'}</h1>
          <p className="text-xs mt-1">Account #: {user?.accountNumber || '—'}</p>
        </div>
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">
          + Cash In
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
