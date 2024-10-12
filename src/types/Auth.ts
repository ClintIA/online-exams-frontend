import React from "react";

export interface ILoginAdmin {
    status: string;
    message: string;
    data: {
        token:string
    }
}
export type IAuthContextType = {
    token?: string;
    user?: ITokenPayload;
    patientLogin: (cpf: string) => Promise<void>;
    adminLogin: (email: string, password:string) => Promise<void>;
    logOut: unknown;
}
export interface ITokenPayload {
    userId: number;
    tenantId?: number;
    isAdmin: boolean;
}
export type Props = {
    children?: React.ReactNode;
};