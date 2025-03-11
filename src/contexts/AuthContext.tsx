import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock user data for prototype
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    credits: 100,
    role: 'user',
  };

  useEffect(() => {
    // For prototype, we'll simulate checking local storage for a token
    const token = localStorage.getItem('auth_token');
    if (token) {
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login for prototype
    console.log('Login attempt with:', email, password);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store token in localStorage
    localStorage.setItem('auth_token', 'mock_token');
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration for prototype
    console.log('Register attempt with:', name, email, password);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store token in localStorage
    localStorage.setItem('auth_token', 'mock_token');
    
    setUser({
      ...mockUser,
      name,
      email,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email: string) => {
    // Mock forgot password for prototype
    console.log('Forgot password for:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would send a reset email
  };

  const resetPassword = async (token: string, password: string) => {
    // Mock reset password for prototype
    console.log('Reset password with token:', token, 'and new password:', password);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would validate the token and update the password
  };

  const updateProfile = async (data: Partial<User>) => {
    // Mock profile update for prototype
    console.log('Update profile with:', data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (user) {
      setUser({
        ...user,
        ...data,
      });
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};