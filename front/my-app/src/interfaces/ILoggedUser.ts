export interface ILoggedUser {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    email: string;
    token: string;
}