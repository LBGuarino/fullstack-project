import { ICredential } from "./ICredential";
import { IOrder } from "./IOrder";

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credentials: ICredential;
  orders: IOrder[];
}