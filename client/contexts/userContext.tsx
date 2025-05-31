// context/UserContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

type User = {
  id: string;
  username?: string;
  email: string;
  fullname?: string;
  grade?: string;
  friends?: string;
  avatar?: string;
  school?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

// Create context with proper generic
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider props type
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: hook for cleaner usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
