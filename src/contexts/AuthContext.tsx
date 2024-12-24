import React, {createContext, useEffect, useState} from "react";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginService} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';
import {AccessLevel} from "@/lib/controlAccessLevel.ts";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage =  (user: ITokenPayload, token: string) => {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));

}

const AuthProvider = ({ children }: Props) => {
    const [ isAuthenticated, setIsAuthenticated ] = React.useState<boolean>(false)
    const [ role, setRole ] = React.useState<AccessLevel>('default')
    const [ token, setToken] = useState<string>('');
    const [ userId, setUserId] = useState<number>();
    const [ tenantId, setTenantID] = useState<number>()

    useEffect(() => {
        const checkToken = async () => {
            const tokenFromStorage = Cookies.get('token');
            const user = Cookies.get('user');
            if (tokenFromStorage && user) {
                setToken(tokenFromStorage);
                const decoded: ITokenPayload = await jwtDecode(tokenFromStorage);
                setIsAuthenticated(true)
                setUserId(decoded.userId)
                setTenantID(decoded.tenantId)
                setRole(decoded.role)
            }
        }
        checkToken().then()
    },[])
    const login = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
           const res = await loginService(email, password);
           if(res?.status === 'success') {
               if (res?.data?.token) {
                   const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                   saveStorage(decoded, res.data.token)
                   setToken(res.data.token);
                   setIsAuthenticated(true)
                   setRole(decoded.role)
                   setUserId(decoded.userId)
                   setTenantID(decoded.tenantId)
               }
           }
           return res
    };
    const logOut =  () => {
            Cookies.remove("token")
            Cookies.remove("user")
            setToken('')
        setRole('default')
        setIsAuthenticated(false)
        setTenantID(undefined)
    }

    return (
        <AuthContext.Provider value={{ tenantId, isAuthenticated, role, token, login, logOut, userId }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;