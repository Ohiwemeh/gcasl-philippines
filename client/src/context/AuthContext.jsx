import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  // Auto-fetch user when token is available
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Invalid token');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('AuthContext: Failed to fetch user:', err.message);
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    return Promise.resolve(); // Return a resolved promise for consistency
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use in components
export const useAuth = () => useContext(AuthContext);
