import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not signed in → go to /signin
  if (!user) return <Navigate to="/signin" replace />;

  // Signed in but not verified → go to /verification-pending
  if (!user.isVerified) return <Navigate to="/verification-pending" replace />;

  // Verified → allow access
  return children;
};

export default PrivateRoute;
