import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const VerifyPage = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!frontId || !backId) {
      return alert('Please upload both front and back of your ID card.');
    }

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('frontId', frontId);
    formData.append('backId', backId);
    formData.append('userId', user?._id); // ✅ Required by backend

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verification`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setStatus('✅ Verification submitted successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setStatus('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md shadow-md p-6"
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full">G</span>
            Verification
          </h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-sm">Full Name</label>
            <input
              name="fullName"
              required
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm">Email</label>
            <input
              name="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm">Phone Number</label>
            <input
              name="phone"
              required
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm">Upload ID Card (Front)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFrontId(e.target.files[0])}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm">Upload ID Card (Back)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackId(e.target.files[0])}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2"
          >
            {loading ? 'Submitting...' : 'Submit Verification'}
          </button>

          {status && (
            <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
