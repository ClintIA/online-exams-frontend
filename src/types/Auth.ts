import React from "react";
import {ProfileRole} from "@/types/ProfileRole.ts";

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
    isDoctor: boolean;
    isDefault: boolean;
    isMarketing: boolean;
    tenantId: number | undefined;

}
export interface ITokenPayload {
    userId: number;
    tenantId?: number;
    role: ProfileRole;
    exp: number;
    iat: number;
}
export type Props = {
    children?: React.ReactNode;
};