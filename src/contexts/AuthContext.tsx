import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import { loginPatient, loginAdmin} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";
import {isAxiosError} from "axios";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);


const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<ITokenPayload>();
    const navigate = useNavigate();
    const adminLogin = async (email: string,password: string): Promise<void> => {
        try {
            await loginAdmin(email, password).then((result: ILoginAdmin) => {
                const getToken = result.data.token
                const decoded: ITokenPayload = jwtDecode(getToken) as ITokenPayload;
                if(!decoded.isAdmin) throw Error('Você não possui permissão.');
                setUser(decoded);
                setToken(token);
            })
        } catch (err) {
            if(isAxiosError(err)){
                if(err.status === 401) {
                    navigate('/error-401')
                } else {
                    navigate('/error')
                }
            }
        }
    };
    const patientLogin = async (cpf: string): Promise<void> => {
        try {
            await loginPatient(cpf).then((result: ILoginAdmin) => {
                const getToken = result.data.token
                const decoded: ITokenPayload = jwtDecode(getToken) as ITokenPayload;
                setUser(decoded);
                setToken(token);
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
            navigate("/autth/login/paciente")
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, adminLogin, patientLogin, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;