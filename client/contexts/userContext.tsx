// context/UserContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { UserRound } from 'lucide-react';

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

    if (!token) {
      return;
    }

    const fetchUser = async () => {
      try {


        const res = await axios.get('http://localhost:8000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.user.avatar) {
          res.data.user.avatar = <UserRound />
        }

        setUser(res.data.user);

      } catch (err) {
        console.error('❌ UserProvider: API error:', err);
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
