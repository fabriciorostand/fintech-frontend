import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context-definition.ts";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("userId")
  );
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId")
  );
  const [userName, setUserName] = useState<string | null>(() =>
    localStorage.getItem("userName")
  );

  // Monitora mudanças no localStorage (para sincronizar entre abas)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("userId");
      const storedUserName = localStorage.getItem("userName");

      setIsAuthenticated(!!storedUserId);
      setUserId(storedUserId);
      setUserName(storedUserName);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (newUserId: string, newUserName: string) => {
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("userName", newUserName);
    setUserId(newUserId);
    setUserName(newUserName);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUserId(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}