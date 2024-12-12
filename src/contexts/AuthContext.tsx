import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  hasCompletedWalkthrough: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeWalkthrough: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedWalkthrough, setHasCompletedWalkthrough] = useState(false);

  useEffect(() => {
    // Check local storage for auth state and walkthrough completion
    const authState = localStorage.getItem('isAuthenticated');
    const walkthroughState = localStorage.getItem('hasCompletedWalkthrough');
    
    if (authState) setIsAuthenticated(JSON.parse(authState));
    if (walkthroughState) setHasCompletedWalkthrough(JSON.parse(walkthroughState));
  }, []);

  const login = async (email: string, password: string) => {
    // Implement your login logic here
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const completeWalkthrough = () => {
    setHasCompletedWalkthrough(true);
    localStorage.setItem('hasCompletedWalkthrough', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedWalkthrough,
        login,
        logout,
        completeWalkthrough,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}