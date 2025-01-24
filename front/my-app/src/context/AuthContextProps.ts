import { ILoggedUser } from "@/interfaces/ILoggedUser";
import { ILogin } from "@/interfaces/ILogin";
import { IOrder } from "@/interfaces/IOrder";
import { ReactNode } from "react";

export interface IAuthContextProps {
  user: ILoggedUser | null;
  loading: boolean;
  error: string | null;
  login: (userData: ILogin) => Promise<void>;
  logout: () => void;
  getOrders: () => Promise<void>;
  orders: IOrder[];
}

export interface AuthProviderProps {
    children: ReactNode;
}