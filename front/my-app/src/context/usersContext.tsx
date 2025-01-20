'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthProviderProps, IAuthContextProps } from "./AuthContextProps";
import { ILoggedUser } from "@/interfaces/ILoggedUser";
import { ILogin } from "@/interfaces/ILogin";

const AuthContext = createContext<IAuthContextProps>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ILoggedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkSession = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/users/session", {
        withCredentials: true,
      });
      const { user } = response.data;
      setUser(user);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setUser(null);
      } else {
      setError(err.message || "Unexpected error");
      console.error("error checking session:", error)}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (userData: ILogin) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3001/users/login", userData,
        {withCredentials: true}
      );

      const { user } = response.data;
      setUser(user);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message || "Unexpected error");
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:3001/users/logout", null, {
        withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
