'use client';

import { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { AuthProviderProps, IAuthContextProps } from "./AuthContextProps";
import { ILoggedUser } from "@/interfaces/ILoggedUser";
import { ILogin } from "@/interfaces/ILogin";
import { IOrder } from "@/interfaces/IOrder";

const AuthContext = createContext<IAuthContextProps>({
  user: null,
  loading: false,
  error: null,
  orders: [],
  login: async () => {},
  logout: () => {},
  getOrders: async () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ILoggedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/session`, {
        withCredentials: true,
      });
     
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setUser(null);
      }
      setError(err.message || "Session check failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
    
    const interval = setInterval(() => {
      checkSession();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkSession]);

  const login = async (userData: ILogin) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `/api/users/login`,
        userData,
        { withCredentials: true }
      );

      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message || "Login failed");
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout", null, { withCredentials: true });
      setUser(null);
    } finally {
      window.location.href = "/login";
    }
  };

  const getOrders = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/users/orders`,
        { withCredentials: true }
      );
      setOrders(response.data);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getOrders();
  }, [getOrders, user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, orders, login, logout, getOrders }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}