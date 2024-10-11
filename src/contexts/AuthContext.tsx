import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import { loginPatient, loginAdmin} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<ITokenPayload>();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const adminLogin = async (email: string,password: string): Promise<ITokenPayload | undefined> => {
        try {
            await loginAdmin(email, password).then((result: ILoginAdmin) => {
                    setToken(result.data.token);
                    const decoded: ITokenPayload = jwtDecode(token);
                     if(!decoded?.isAdmin) throw Error('Você não possuí acesso de adminstrador');
                     setUser(decoded);
                     console.log(decoded);
                     localStorage.setItem("token", token.toString());
                     localStorage.setItem("user", JSON.stringify(user));
                     console.log(localStorage.getItem("token"));
                     console.log(localStorage.getItem("user"));
                 })
            return user;
        } catch (err) {
            console.error(err);
        }
    };
    const patientLogin = async (cpf: string): Promise<ITokenPayload | undefined> => {
        try {
            await loginPatient(cpf).then((result: ILoginAdmin) => {
                setToken(result.data.token);
                const decoded: ITokenPayload = jwtDecode(token);
                setUser(decoded);
                console.log(decoded);
                localStorage.setItem("token", token.toString());
                localStorage.setItem("user", JSON.stringify(user));
            })
            return user;
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, adminLogin, patientLogin, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;