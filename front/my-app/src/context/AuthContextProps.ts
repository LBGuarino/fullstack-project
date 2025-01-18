import { ILoggedUser } from "@/interfaces/ILoggedUser";
import { ILogin } from "@/interfaces/ILogin";
import { ReactNode } from "react";

export interface IAuthContextProps {
  user: ILoggedUser | null;
  loading: boolean;
  error: string | null;
  login: (userData: ILogin) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}