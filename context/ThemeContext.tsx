import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeColors = {
  primary: string;
  background: string;
  backgroundSecondary: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
};

type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (scheme: 'light' | 'dark') => void;
};

const lightColors: ThemeColors = {
  primary: '#915EFF',
  background: '#F8F9FA',
  backgroundSecondary: '#F0F0F5',
  card: '#FFFFFF',
  text: '#1F1F1F',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
};

const darkColors: ThemeColors = {
  primary: '#915EFF',
  background: '#121212',
  backgroundSecondary: '#1F1F1F',
  card: '#1F1F1F',
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  border: '#2D2D2D',
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Remove the system theme listener since we want to start with light theme
    // and let users manually toggle if they want dark theme
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (scheme: 'light' | 'dark') => {
    setIsDark(scheme === 'dark');
  };

  return (
    <ThemeContext.Provider 
      value={{
        isDark,
        colors: isDark ? darkColors : lightColors,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext }