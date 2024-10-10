"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { User } from "@/types/user";
import { decodeJWT } from "@/utils/auth";

interface UserContextType {
  user: User | null;
  updateUser: (userInfo: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userInfo: User) => {
    setUser(userInfo);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const authCookie = cookies["Authorization"];
    if (authCookie) {
      const userInfo = decodeJWT(authCookie);
      updateUser(userInfo);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
