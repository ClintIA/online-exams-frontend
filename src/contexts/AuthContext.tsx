import React, {createContext, useEffect, useState} from "react";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginAdmin, loginPatient} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';
import {ProfileRole} from "@/types/ProfileRole.ts";


export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage =  (user: ITokenPayload, token: string) => {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));

}

const AuthProvider = ({ children }: Props) => {
    const [ isAuthenticated, setIsAuthenticated ] = React.useState<boolean>(false)
    const [ isAdmin, setIsAdmin ] = React.useState<boolean>(false)
    const [ isPatient, setIsPatient] = React.useState<boolean>(false)
    const [ isDoctor, setIsDoctor] = React.useState<boolean>(false)
    const [ isMarketing, setIsMarketing] = React.useState<boolean>(false)

    const [ isDefault, setIsDefault] = React.useState<boolean>(false);
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
                setIsAuthenticated(true);
                setUserId(decoded.userId)
                setTenantID(decoded.tenantId)
                switch (decoded.role) {
                    case ProfileRole.admin:
                        setIsAdmin(true)
                        break
                    case ProfileRole.patient:
                        setIsPatient(true)
                        break
                    case ProfileRole.doctor:
                        setIsDoctor(true)
                        break
                    case ProfileRole.marketing:
                        setIsMarketing(true)
                        break
                    default:
                        setIsDefault(true)
                        break
                }
            }
        }
        checkToken().then()
    },[])
    const adminLogin = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
           const res = await loginAdmin(email, password);
           if(res?.status === 'success') {
               if (res?.data?.token) {
                   const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                   saveStorage(decoded, res.data.token)
                   setToken(res.data.token);
                   setIsAuthenticated(true)
                   setIsAdmin(true)
                   setUserId(decoded.userId)
                   setTenantID(decoded.tenantId)
               }
           }
           return res
    };
    const patientLogin = async (cpf: string, password: string): Promise<ILoginAdmin | undefined> => {
        const res = await loginPatient(cpf,password);
        if(res?.status === 'success') {
            if (res?.data?.token) {
                const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                saveStorage(decoded, res.data.token)
                setToken(res.data.token);
                setIsAuthenticated(true)
                setIsPatient(true)
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
        setIsAdmin(false)
        setIsPatient(false)
        setIsAuthenticated(false)
        setTenantID(undefined)
    }

    return (
        <AuthContext.Provider value={{ tenantId, isMarketing,isDoctor, isDefault, isAuthenticated, isAdmin, isPatient, token, adminLogin, patientLogin, logOut, userId }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;