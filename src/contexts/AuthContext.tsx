import { createContext, useEffect, useState } from "react";
import {IAuthContextType, ILoginAdmin, ILoginAdminWithTenant, ITokenPayload, Props} from "../types/Auth.ts";
import {loginService, loginServiceWithTenant} from "../services/loginService.tsx";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { AccessLevel } from "@/lib/controlAccessLevel.ts";
import { Spinner } from "@/components/ui/Spinner.tsx";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage = (user: ITokenPayload, token: string) => {
  Cookies.set('token', token);
  Cookies.set('user', JSON.stringify(user));
};

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AccessLevel>('default');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState<number>();
  const [tenantId, setTenantID] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenFromStorage = Cookies.get('token');
        const user = Cookies.get('user');

        if (tokenFromStorage && user) {
          const decoded: ITokenPayload = jwtDecode(tokenFromStorage);

          if (decoded.exp * 1000 < Date.now()) {
            logOut();
          } else {
            setToken(tokenFromStorage);
            setIsAuthenticated(true);
            setUserId(decoded.userId);
            setTenantID(decoded.tenantId);
            setRole(decoded.role);
          }
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        logOut();
      } finally {
        setIsLoading(false);
      }
    };

    checkToken().then();
  }, []);

  const login = async (email: string, tenant: number): Promise<ILoginAdmin | undefined> => {
    const res = await loginServiceWithTenant(email, tenant);
    if (res?.status === 'success' && res?.data?.token) {
      const decoded: ITokenPayload = jwtDecode(res.data.token);
      saveStorage(decoded, res.data.token);
      setToken(res.data.token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      setUserId(decoded.userId);
      setTenantID(decoded.tenantId);
    }
    return res;
  };
  const loginToTenant = async (email: string, password: string): Promise<ILoginAdminWithTenant | undefined> => {
    const res = await loginService(email, password);
    if (res?.status === 'success') {
      return res
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken('');
    setRole('default');
    setIsAuthenticated(false);
    setTenantID(undefined);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        tenantId, 
        isAuthenticated, 
        role, 
        token, 
        login,
        loginToTenant,
        logOut, 
        userId,

        isLoading
      }}
    >
      { isLoading ? <Spinner /> : children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
