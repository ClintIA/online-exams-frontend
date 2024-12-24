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
export type IAuthContextType = {
    token?: string;
    login: (user: string, password:string) => Promise<ILoginAdmin | undefined>;
    logOut: () => void;
    isAuthenticated: boolean;
    userId?: number;
    role: AccessLevel;
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