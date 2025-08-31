import React from 'react';
import { createContext, useState, useContext } from 'react';

// 1. Create the context
// This is what components will consume. It's initialized to null.
const AuthContext = createContext(null);

// 2. Create the Provider component
// This component will wrap your entire application in `main.jsx`.
// It holds the authentication state and logic.
export const AuthProvider = ({ children }) => {
  // We initialize the token state by trying to read it from localStorage.
  // This allows the user's session to persist even if they refresh the page.
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // The login function saves the new token to both state and localStorage.
  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  // The logout function removes the token from state and localStorage.
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  // We package up the state and functions into a single object.
  // `isAuthenticated` is a handy boolean derived from whether the token exists.
  const authContextValue = {
    token,
    isAuthenticated: !!token, // Converts a token string to `true`, or `null` to `false`.
    login,
    logout,
  };

  // The provider makes this `value` object available to all child components.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption
// Instead of importing `useContext` and `AuthContext` in every component,
// we can just import and use this simple `useAuth()` hook.
export const useAuth = () => {
  return useContext(AuthContext);
};

