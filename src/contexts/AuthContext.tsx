import {createContext, useState} from "react";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginAdmin, loginPatient} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage =  (user: ITokenPayload, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<ITokenPayload>();
    const adminLogin = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
           const res = await loginAdmin(email, password);
           if(res?.status === 'success') {
               if (res?.data?.token) {
                   const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                   saveStorage(decoded, res.data.token)
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
            }
        }
        return res
    };
    const logOut =  () => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setToken('')
            setUser({} as ITokenPayload);
    }

    return (
        <AuthContext.Provider value={{ token, user, adminLogin, patientLogin, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;