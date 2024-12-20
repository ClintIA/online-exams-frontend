import React from "react";

export interface ILoginAdmin {
    status: string;
    message: string;
    data?: {
        token?:string
    }
}
export type IAuthContextType = {
    token?: string;
    patientLogin: (cpf: string, password: string) => Promise<ILoginAdmin | undefined>;
    adminLogin: (email: string, password:string) => Promise<ILoginAdmin | undefined>;
    logOut: () => void;
    isAuthenticated: boolean;
    userId?: number;
    isAdmin?: boolean;
    isPatient?: boolean;

}
export interface ITokenPayload {
    userId: number;
    tenantId?: number;
    isAdmin: boolean;
    exp: number;
    iat: number;
}
export type Props = {
    children?: React.ReactNode;
};