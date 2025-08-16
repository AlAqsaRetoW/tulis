import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

// This file only exports the context to satisfy Fast Refresh constraints
