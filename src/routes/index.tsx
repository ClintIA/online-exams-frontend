import { AdminExamsList } from "@/pages/AdminExamsList.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
// import Construction from "../components/Construction.tsx";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import Home from "../pages/Home.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";
import LoginPatient from "../pages/LoginPatient.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/login/paciente' replace />
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
        element: <AdminExamsList />,
        children: [
            {
                path: 'exames',
                element: <AdminExamsList />,
            }
        ]
    },
]);

