import { AdminDashboard } from "@/pages/AdminDashboard.tsx";
import { createBrowserRouter } from "react-router-dom";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import Home from "../pages/Home.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";
import LoginPatient from "../pages/LoginPatient.tsx";
import CheckCPF from "@/components/CheckCPF.tsx";
import AppLayout from "@/pages/AppLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />
    },
    {
        path: "/error-401",
        element: <Error401 />,
    },
    {
        path: "/error-404",
        element: <Error404 />,
    },
    {
        path: "/login",
        children: [
            {
                path:'admin',
                element:<LoginAdmin />,
            },
            {
                path:'paciente',
                element:<LoginPatient />,
            },
        ]
    },
    {
        path: "/paciente",
        children: [
            {
                path:'home',
                element:<Home />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AppLayout />,
        children: [
            {
                path:'home',
                element:<AdminDashboard />,
            },
            {
                path:'agendamento',
                element:<CheckCPF />,
            },
        ]
    },
]);

