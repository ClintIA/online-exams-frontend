import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "@/hooks/auth.tsx";
import Cookies from "js-cookie";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";

interface ProtectedRouteProps {
    children: React.ReactNode;
    role: 'admin' | 'patient';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const auth = useAuth();
    const location = useLocation();
    const tokenFromStorage = Cookies.get('token');
    const user = Cookies.get('user');
    if (tokenFromStorage && user) {
        const decoded: ITokenPayload =  jwtDecode(tokenFromStorage);
        if(decoded.isAdmin && role === 'admin') {
            return <>{children}</>;
        } else if (!decoded.isAdmin && role === 'patient') {
            return <>{children}</>;
        } else {
            return <Navigate to="/error-401" state={{ from: location }} replace />;
        }
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Navigate to="/login" />;

};
