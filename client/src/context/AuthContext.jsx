import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('lms_token') || '');

  function login(jwt) {
    localStorage.setItem('lms_token', jwt);
    setToken(jwt);
  }

  function logout() {
    localStorage.removeItem('lms_token');
    setToken('');
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}
