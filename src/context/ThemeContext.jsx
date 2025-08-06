import { createContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => { },
});

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }
  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}