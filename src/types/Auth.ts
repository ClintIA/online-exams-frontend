import React from "react";

export interface ILoginAdmin {
    status: string;
    message: string;
    data: {
        token:string
    }
}
export type IAuthContextType = {
    token: unknown;
    user: unknown;
    patientLogin: any;
    adminLogin: any;
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