import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Your login logic goes here
    // If login is successful:
    setIsAuthenticated(true);
    if (redirectUrl) {
      router.push(redirectUrl); // Redirect to previous page after login
    } else {
      router.push("/"); // Default redirect
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, redirectUrl, setRedirectUrl }}>
      {children}
    </AuthContext.Provider>
  );
};
