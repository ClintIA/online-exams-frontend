import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPatient from "../pages/LoginPatient.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";
import Home from "../pages/Home.tsx";
import AuthProvider from "../contexts/AuthContext.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/login/paciente' replace />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        children: [
            {
                path:'paciente',
                element:<AuthProvider><LoginPatient /></AuthProvider>
            },
            {
                path:'admin',
                element: <AuthProvider><LoginAdmin /></AuthProvider>
    }
        ]
    }
]);

