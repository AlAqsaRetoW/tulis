import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  name: null,
  role: null,
  loading: false,
});

// This file only exports the context object to support Fast Refresh
