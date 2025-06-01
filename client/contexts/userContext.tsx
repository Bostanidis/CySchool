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
  console.log('🔄 UserProvider: Component rendering'); // Add this

  const [user, setUser] = useState<User>(null);

  console.log('🔄 UserProvider: Current user state:', user); // Add this

  useEffect(() => {
    console.log('🔄 UserProvider: useEffect triggered'); // Add this

    const token = localStorage.getItem('token');
    console.log('🔄 UserProvider: Token from localStorage:', token); // Add this

    if (!token) {
      console.log('🔄 UserProvider: No token found, returning'); // Add this
      return;
    }

    const fetchUser = async () => {
      try {
        console.log('🔄 UserProvider: Making API request to /me'); // Add this

        const res = await axios.get('http://localhost:8000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ UserProvider: API response:', res.data); // Add this
        setUser(res.data.user);

      } catch (err) {
        console.error('❌ UserProvider: API error:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  console.log('🔄 UserProvider: About to render children'); // Add this

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
