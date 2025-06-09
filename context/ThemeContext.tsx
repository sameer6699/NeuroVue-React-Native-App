import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const THEME_PREFERENCE_KEY = '@theme_preference';

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        } else {
          // If no saved preference, default to light theme
          setIsDark(false);
          await AsyncStorage.setItem(THEME_PREFERENCE_KEY, 'light');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Default to light theme on error
        setIsDark(false);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setTheme = async (scheme: 'light' | 'dark') => {
    const newTheme = scheme === 'dark';
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, scheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
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