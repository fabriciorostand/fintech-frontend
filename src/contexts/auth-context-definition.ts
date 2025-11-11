import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  login: (userId: string, userName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);