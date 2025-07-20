import React from 'react';
import UserHeader from '../components/UserHeader';
import BalanceCard from '../components/BalanceCard';
import DashboardIcons from '../components/DashboardIcons';
import PromoBanner from '../components/PromoBanner';
import RecentTransactions from '../components/RecentTransactions';
import BottomNav from '../components/BottomNav';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';


const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4 pb-24">
        <UserHeader />
        <BalanceCard />
        <DashboardIcons />
        <PromoBanner />
        <RecentTransactions userId={user?._Id} />
        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardPage;
