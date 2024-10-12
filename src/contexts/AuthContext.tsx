import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginAdmin, loginPatient} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);


const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<ITokenPayload>();
    const navigate = useNavigate();
    const adminLogin = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
        try {
            return await loginAdmin(email, password).then((result) => {
               if (result?.status == "error") {
                   return result;
               } else {
                   const getToken = result?.data?.token
                   if (getToken) {
                       const decoded: ITokenPayload = jwtDecode(getToken) as ITokenPayload;
                       if (!decoded.isAdmin) throw Error('Você não possui permissão.');
                       setUser(decoded);
                       setToken(token);
                   }
               }
               return result;
           })
        } catch (err) {
            console.error(err);
        }
    };
    const patientLogin = async (cpf: string): Promise<ILoginAdmin | undefined> => {
        try {
           return await loginPatient(cpf).then((result) => {
                if(result?.status == "error") {
                    return result;
                }
                if(result?.data?.token) {
                    const getToken = result.data?.token
                    if (getToken) {
                        const decoded: ITokenPayload = jwtDecode(getToken) as ITokenPayload;
                        setUser(decoded);
                        setToken(token);
                    }
                }
                return result;
            })
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (user?.isAdmin) {
            navigate("/auth/login/admin")
        } else {
            navigate("/auth/login/paciente")
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, adminLogin, patientLogin, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;