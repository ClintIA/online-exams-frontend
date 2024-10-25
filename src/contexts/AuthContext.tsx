import {createContext, useEffect, useState} from "react";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginAdmin, loginPatient} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';


export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage =  (user: ITokenPayload, token: string) => {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));

}

const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<ITokenPayload>();
    useEffect(() => {
        const checkToken = () => {
            const tokenFromStorage = Cookies.get('token');
            const user = Cookies.get('user');
            if (tokenFromStorage && user) {
                setToken(tokenFromStorage);
                setUser(JSON.parse(user));
                console.log('teste')

            }
        }
        checkToken()
    },[token])
    const adminLogin = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
           const res = await loginAdmin(email, password);
           if(res?.status === 'success') {
               if (res?.data?.token) {
                   const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                   saveStorage(decoded, res.data.token)
                   setToken(res.data.token);
                   setUser(decoded);
               }
           }
           return res
    };
    const patientLogin = async (cpf: string): Promise<ILoginAdmin | undefined> => {
        const res = await loginPatient(cpf);
        if(res?.status === 'success') {
            if (res?.data?.token) {
                const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                saveStorage(decoded, res.data.token)
                setToken(res.data.token);
                setUser(decoded);
            }
        }
        return res
    };
    const logOut =  () => {
            Cookies.remove("token")
            Cookies.remove("user")
            setToken('')
            setUser({} as ITokenPayload);
    }

    return (
        <AuthContext.Provider value={{ token, user, adminLogin, patientLogin, logOut, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;