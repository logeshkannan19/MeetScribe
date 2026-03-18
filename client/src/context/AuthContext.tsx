"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isDemo?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const demoUser = localStorage.getItem('demoUser');
    
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      setIsDemo(true);
      setLoading(false);
    } else if (token) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const demoUser = { id: '1', name: email.split('@')[0], email };
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsDemo(true);
  };

  const register = async (name: string, email: string, password: string) => {
    const demoUser = { id: '1', name, email };
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsDemo(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demoUser');
    setUser(null);
    setIsDemo(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
