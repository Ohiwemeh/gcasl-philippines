import { useState } from "react";
import { Home, Inbox, List, Clock, User } from "lucide-react";
import UserSidebar from "./SideMenu"; // Make sure the path is correct

const BottomNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-fixed left-0 w-full h-20 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-between items-center h-full px-8 relative">

          {/* Left items */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-gray-500 text-xs">
              <Home size={22} />
              <span>Home</span>
            </div>
            <div className="flex flex-col items-center text-gray-500 text-xs">
              <Inbox size={22} />
              <span>Inbox</span>
            </div>
          </div>

          {/* Center floating button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <List size={28} className="text-white" />
            </div>
          </div>

          {/* Right items */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-gray-500 text-xs">
              <Clock size={22} />
              <span>Transactions</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center text-gray-500 text-xs focus:outline-none"
            >
              <User size={22} />
              <span>Profile</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sidebar component */}
      <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default BottomNav;
