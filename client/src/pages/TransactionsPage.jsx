import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TransactionsPage = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);  // ← loading state
  const [error, setError] = useState(null);      // ← error state

  useEffect(() => {
    if (!user?._id) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/withdraw/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        setError('Failed to load transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, token]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && transactions.length === 0 && (
        <p className="text-gray-500">No transactions yet.</p>
      )}

      {transactions.map((tx) => (
        <div key={tx._id} className="bg-white rounded shadow p-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="font-medium">₦{tx.amount.toLocaleString()}</p>
            <span
              className={`text-sm px-2 py-1 rounded ${
                tx.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : tx.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {tx.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            {new Date(tx.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsPage;
