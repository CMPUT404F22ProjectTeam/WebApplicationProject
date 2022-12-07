import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  const logout = () => {
    setUser();
  };
  const login = (username) => {
    console.log("LOGIN")
    setUser(username);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}