import { User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Transfer = () => {
  const { user } = useAuth();
  const [accountFrom] = useState("GCash Account - ₱");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
const [withdrawalCode, setWithdrawalCode] = useState("");

  const handleWithdraw = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        toAccount: accountNumber,
        amount,
        note,
        code: withdrawalCode // <- send the modal input
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert("Withdrawal request submitted. Status: pending");

    // Reset
    setAccountNumber("");
    setAmount("");
    setNote("");
    setWithdrawalCode("");
    setShowCodeModal(false); // close modal
  } catch (err) {
    alert(err.message);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-20">
      {/* Top Nav */}
      <div className="bg-white w-full max-w-md flex justify-between items-center px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
            G
          </div>
          <h2 className="text-blue-700 font-semibold text-lg">WithDrawal</h2>
        </div>
        <User className="w-6 h-6 text-gray-700" />
      </div>

      {/* Form Section */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white shadow rounded-lg p-5 w-full max-w-md mt-5 space-y-4"
      >
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">From</p>
          <select className="w-full border rounded px-3 py-2 text-gray-700 bg-gray-50" disabled>
            <option>
              {accountFrom}
              {user?.balance?.toFixed(2) || "0.00"}
            </option>
          </select>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">To (Account Number)</p>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter recipient's account number"
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Amount</p>
          <div className="flex items-center border rounded px-3 py-2 bg-gray-50 text-gray-700">
            <span className="text-sm mr-1">₱</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 outline-none bg-transparent"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Note (Optional)</p>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's this for?"
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <button
          onClick={() => setShowCodeModal(true)}
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Withdraw
        </button>
      </form>
      {showCodeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Enter Withdrawal Code</h2>
      <input
        type="text"
        value={withdrawalCode}
        onChange={(e) => setWithdrawalCode(e.target.value)}
        placeholder="Code from admin"
        className="w-full border rounded px-3 py-2 mb-4 text-gray-700"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowCodeModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleWithdraw}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Transfer;
