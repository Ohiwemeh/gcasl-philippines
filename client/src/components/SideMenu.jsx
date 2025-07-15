
import {
  Home,
  CreditCard,
  Send,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const menuItems = [
    { label: "Home", icon: <Home size={18} />, to: "/dashboard" },
    { label: "My Account", icon: <CreditCard size={18} />, to: "/account" },
    { label: "Send Money", icon: <Send size={18} />, to: "/transfer" },
    { label: "Transactions", icon: <History size={18} />, to: "/transactions" },
    { label: "Settings", icon: <Settings size={18} />, to: "/settings" },
    { label: "Sign Out", icon: <LogOut size={18} />, action: logout },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg">
        <div className="bg-blue-600 text-white px-4 py-4 font-semibold flex justify-between items-center">
          <span>Hello, {user?.firstName || "User"}</span>
          <button onClick={onClose} className="text-sm text-white font-light">
            ✕
          </button>
        </div>

        <ul className="divide-y">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (item.action) return item.action();
                if (item.to) navigate(item.to);
                onClose();
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserSidebar;
