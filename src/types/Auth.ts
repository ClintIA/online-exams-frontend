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
    user?: ITokenPayload;
    patientLogin: (cpf: string) => Promise<ILoginAdmin | undefined>;
    adminLogin: (email: string, password:string) => Promise<ILoginAdmin | undefined>;
    logOut: () => void;
}
export interface ITokenPayload {
    userId: number;
    tenantId?: number;
    isAdmin: boolean;
}
export type Props = {
    children?: React.ReactNode;
};