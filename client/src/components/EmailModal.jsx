// components/EmailModal.jsx
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailModal = ({ isOpen, onClose, toName, toEmail }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        'service_68vzbqa',
        'template_0fxcphs',
        {
          to_name: toName,
          to_email: toEmail,
          subject,
          message,
        },
        'Z1Z7A50hzmdid7_ql'
      );
      alert('✅ Email sent!');
      setSubject('');
      setMessage('');
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert('❌ Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Send Email to {toName}</h2>
        <form onSubmit={sendEmail} className="space-y-3">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="border w-full px-3 py-2 rounded"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows={4}
            className="border w-full px-3 py-2 rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
