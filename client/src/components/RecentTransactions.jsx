import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RecentTransactions = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?._id || !token) return;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/withdraw/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setTransactions(data.slice(0, 5)); // show only the first 5
      } catch (err) {
        console.error('❌ Error fetching recent transactions:', err);
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, token]);

  return (
    <div className="mx-4 mb-16">
      <h3 className="font-semibold text-blue-800 text-lg flex items-center gap-2 mb-2">
        <span className="rotate-[-30deg]">🔄</span> Recent Transactions
      </h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading transactions...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-sm text-gray-500">No recent transactions</p>
      ) : (
        <ul className="text-sm space-y-2">
          {transactions.map((tx) => (
            <li key={tx._id} className="bg-white shadow rounded p-2 flex justify-between">
              <div>
                <p className="font-semibold text-gray-700">₦{tx.amount.toLocaleString()}</p>
                <p className="text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  tx.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : tx.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {tx.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <a href="/transactions" className="text-blue-600 font-semibold text-sm mt-3 inline-block">
        View All Transactions →
      </a>
    </div>
  );
};

export default RecentTransactions;
