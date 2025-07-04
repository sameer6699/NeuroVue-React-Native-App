import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { getApiUrl, ENV } from '../config/env';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  jobRole: string;
  experienceLevel: string;
  interviewFocus: string[];
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const API_URL = getApiUrl(ENV.API_ENDPOINTS.SIGNIN);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      if (data.success) {
        setUser({
          id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          mobile: data.user.mobile,
          jobRole: data.user.jobRole,
          experienceLevel: data.user.experienceLevel,
          interviewFocus: data.user.interviewFocus,
          profileImage: data.user.profileImage
        });
        router.replace('/(tabs)');
      } else {
        throw new Error(data.message || 'Sign in failed');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const API_URL = getApiUrl(ENV.API_ENDPOINTS.SIGNUP);
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          mobile: '', // This will be required in the signup form
          jobRole: 'Not Specified',
          experienceLevel: 'Fresher',
          interviewFocus: ['General']
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      if (data.success) {
        setUser(data.user);
        router.replace('/(tabs)');
      } else {
        throw new Error(data.message || 'Sign up failed');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    router.replace('/sign-in');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }