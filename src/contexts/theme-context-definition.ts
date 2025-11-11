import { createContext } from "react";

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);