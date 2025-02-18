import React from "react";
import {ProfileRole} from "@/types/ProfileRole.ts";
import {AccessLevel} from "@/lib/controlAccessLevel.ts";

export interface ILoginAdmin {
    status: string;
    message: string;
    data?: {
        token?:string
    }
}
export interface ILoginAdminWithTenant {
    status: string;
    message: string;
    token?: string;
    data?: any
}
export type IAuthContextType = {
    token?: string;
    loginToTenant: (user: string, password: string) => Promise<ILoginAdminWithTenant | undefined>;
    login: (user: string, tenant: number) => Promise<ILoginAdmin | undefined>;
    logOut: () => void;
    isAuthenticated: boolean;
    userId?: number;
    role: AccessLevel;
    tenantId: number | undefined;
    isLoading: boolean;
    tenantName?: string

}
export interface ITokenPayload {
    userId: number;
    tenantId: number;
    role: ProfileRole;
    exp: number;
    iat: number;
    tenantName?: string;
}
export type Props = {
    children?: React.ReactNode;
};