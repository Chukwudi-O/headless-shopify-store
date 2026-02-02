"use client";

import { createContext, useState } from "react";

type AuthContextValue = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export function AuthProvider({
  children,
  initialLoggedIn = false,
}: {
  children: React.ReactNode;
  initialLoggedIn?: boolean;
}) {
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
