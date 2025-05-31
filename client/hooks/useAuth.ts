// hooks/useAuth.ts
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext'; // path to your context

export function useAuth() {
  const context = useContext(UserContext);

  if (!context) throw new Error("useAuth must be used within a UserProvider");

  const { user, setUser } = context;

  const login = async (credentials: any) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }

    const { token, user } = await res.json();
    localStorage.setItem('token', token);
    setUser(user);
  };

  const signup = async (userData: any) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Signup failed');
    }

    const { token, user } = await res.json();
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
}
