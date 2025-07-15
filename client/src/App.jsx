import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'; // ✅ Correct import
import LandingPage from './pages/LandingPage.jsx';
import SignInForm from './pages/SignInForm.jsx';
import SignupForm from './pages/SignupForm.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Transfer from './components/Transfer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import { useAuth } from './context/AuthContext'; // ✅ Import AuthContext to access user state
import SettingsPage from './components/SettingsPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx'; // ✅ Import VerifyPage

const App = () => {
  const { user } = useAuth(); // Access user from AuthContext
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/verification' element={<VerifyPage />} />
       <Route
  path="/signin"
  element={!user ? <SignInForm /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
/>
<Route
  path="/signup"
  element={!user ? <SignupForm /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
/>

        {/* Protected user dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        {/* Transfer page — protect if needed */}
        <Route path="/transfer" element={<Transfer />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </Router>
  );
};

export default App;
