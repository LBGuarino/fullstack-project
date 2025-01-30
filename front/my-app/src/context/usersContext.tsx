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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/session`, {
        withCredentials: true,
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        document.cookie = `token=${response.data.token}; path=/; max-age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'secure; sameSite=none' : ''}`;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setUser(null);
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        userData,
        { withCredentials: true }
      );

      if (response.data.user) {
        setUser(response.data.user);
        document.cookie = `token=${response.data.token}; path=/; max-age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'secure; sameSite=none' : ''}`;
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        null,
        { withCredentials: true }
      );
    } finally {
      setUser(null);
      setOrders([]);
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  };

  const getOrders = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/orders`,
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