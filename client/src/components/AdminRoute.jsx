// components/AdminRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;
