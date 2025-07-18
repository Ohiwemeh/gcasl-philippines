import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EmailModal from '../components/EmailModal';

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

const AdminPage = () => {
  const { token } = useAuth();
  const [verifications, setVerifications] = useState([]);
  const [balanceUpdates, setBalanceUpdates] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [emailTarget, setEmailTarget] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);

  // Fetch withdrawals
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/withdrawals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setWithdrawals(data.withdrawals || []);
      } catch (err) {
        console.error('Error fetching withdrawals:', err.message);
      }
    };
    fetchWithdrawals();
  }, [token]);

  // Fetch verifications
  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/verifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setVerifications(data || []);
      } catch (err) {
        console.error('Error fetching verifications:', err.message);
      }
    };
    fetchVerifications();
  }, [token]);

  const handleBalanceChange = (userId, value) => {
    setBalanceUpdates({ ...balanceUpdates, [userId]: value });
  };

  const generateWithdrawalCode = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/generate-code`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setGeneratedCode(data.code);
  } catch (err) {
    alert('Failed to generate withdrawal code');
  }
};

  const updateBalance = async (userId) => {
    const balance = parseFloat(balanceUpdates[userId] || 0);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/balance/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance }),
      });
      const data = await res.json();
      alert(data.message || 'Balance updated');
    } catch (err) {
      alert('Failed to update balance');
    }
  };

  const updateWithdrawalStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/withdrawals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      alert(data.message || `Withdrawal ${status}`);
      setWithdrawals((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
    } catch (err) {
      alert(`Failed to ${status} withdrawal`);
    }
  };

  const verifyUser = async (verificationId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/verifications/${verificationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      const data = await res.json();
      alert(data.message || 'User verified');
      setVerifications(prev =>
        prev.map(v => v._id === verificationId ? { ...v, status: 'approved' } : v)
      );
    } catch (err) {
      alert('Failed to verify user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Admin Dashboard</h1>
        <p className="mb-6 text-gray-600">Review submitted verifications.</p>

        {/* Verification Section */}
        {verifications.length === 0 ? (
          <p className="text-gray-500">No verifications yet.</p>
        ) : (
          <div className="space-y-4">
            {verifications.map((v) => (
              <div key={v._id} className="bg-white shadow rounded p-4 border border-gray-200">
                <div className="mb-2">
                  <span className="font-semibold">User:</span> {v.user?.firstName} {v.user?.lastName} ({v.user?.email})
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span> {v.status}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Current Balance:</span> ₱{v.user?.balance}
                </div>

                <div className="flex gap-4 mb-4">
                  <img src={v.frontIdUrl} alt="Front ID" className="w-24 h-16 object-cover rounded border" />
                  <img src={v.backIdUrl} alt="Back ID" className="w-24 h-16 object-cover rounded border" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-32"
                    placeholder="New Balance"
                    value={balanceUpdates[v.user._id] || ''}
                    onChange={(e) => handleBalanceChange(v.user._id, e.target.value)}
                  />
                  <button
                    onClick={() => updateBalance(v.user._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Update Balance
                  </button>
                </div>

                {v.status === 'pending' && (
                  <button
                    onClick={() => verifyUser(v._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Verify User
                  </button>
                )}

                {v.status === 'approved' && (
                  <>
                    <button
                      onClick={() =>
                        setEmailTarget({
                          name: `${v.user?.firstName} ${v.user?.lastName}`,
                          email: v.user?.email,
                        })
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
                    >
                      Send Email
                    </button>
                    <EmailModal
                      isOpen={emailTarget?.email === v.user?.email}
                      onClose={() => setEmailTarget(null)}
                      toName={emailTarget?.name}
                      toEmail={emailTarget?.email}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Withdrawal Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Withdrawal Requests</h2>
          {Array.isArray(withdrawals) && withdrawals.length === 0 ? (
            <p className="text-gray-500">No withdrawal requests yet.</p>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((w) => (
                <div key={w._id} className="bg-white shadow rounded p-4 border border-gray-200">
                  <div className="mb-2">
                    <span className="font-semibold">User:</span> {w.user?.firstName} {w.user?.lastName} ({w.user?.email})
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">To Account:</span> {w.toAccount}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Amount:</span> ₱{w.amount}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Note:</span> {w.note || '—'}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                      className={`font-semibold ${
                        w.status === 'pending'
                          ? 'text-yellow-600'
                          : w.status === 'approved'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateWithdrawalStatus(w._id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateWithdrawalStatus(w._id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 p-4 bg-white border shadow rounded">
  <h2 className="text-lg font-bold text-blue-700 mb-2">Generate Withdrawal Code</h2>
  <button
    onClick={generateWithdrawalCode}
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
  >
    Generate Code
  </button>
  {generatedCode && (
    <p className="mt-2 text-green-600 font-mono">
      Generated Code: <strong>{generatedCode}</strong>
    </p>
  )}
</div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminPage;
