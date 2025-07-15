import React from "react";
import { useNavigate } from "react-router";
import { BadgeCheck, Lock } from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      title: "Verification",
      desc: "Verify your account to unlock more features.",
      icon: <BadgeCheck className="text-blue-600" size={24} />,
      onClick: () => navigate("/verification"),
    },
    {
      title: "Change Password",
      desc: "Update your account password for security.",
      icon: <Lock className="text-blue-600" size={24} />,
      onClick: () => alert("Change Password not implemented yet"),
    },
  ];

  return (
    <div className="flex flex-col items-center px-4 pt-4 pb-28 min-h-screen bg-gray-100">
      <h1 className="text-lg font-bold mb-4">Settings</h1>

      <div className="space-y-4 w-full max-w-md">
        {settingsOptions.map((item, i) => (
          <div
            key={i}
            onClick={item.onClick}
            className="bg-white shadow-sm rounded-lg p-4 flex gap-4 items-center cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="p-2 bg-blue-100 rounded-full">{item.icon}</div>
            <div>
              <h2 className="font-semibold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
