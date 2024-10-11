import {createBrowserRouter} from "react-router-dom";
import Root from "../App.tsx";
import LoginPatient from "../pages/LoginPatient.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";
import Home from "../pages/Home.tsx";
import AuthProvider from "../contexts/AuthContext.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
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

