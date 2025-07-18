// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage.jsx';
import SignInForm from './pages/SignInForm.jsx';
import SignupForm from './pages/SignupForm.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Transfer from './components/Transfer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      <Route
        path="/signin"
        element={!user ? <SignInForm /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupForm /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />

      <Route path="/transfer" element={<Transfer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
