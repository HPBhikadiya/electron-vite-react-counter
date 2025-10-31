import { createContext } from 'react';

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
