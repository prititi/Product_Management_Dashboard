import { useRouter } from "next/router";
import React, { createContext, ReactNode, useState } from "react";
import { AuthContextType } from "../types/types";



export const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsAuthenticated(true);
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push("/");
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
