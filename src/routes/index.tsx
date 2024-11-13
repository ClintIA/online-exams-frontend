import {createBrowserRouter, Navigate} from "react-router-dom";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import {Exames} from "../pages/patient/Exames.tsx";
import { DadosCadastrais } from '../pages/patient/DadosCadastrais'
import LoginAdmin from "../pages/admin/LoginAdmin.tsx";
import AppLayout from "@/pages/admin/AppLayout.tsx";
import AdminExams from "@/pages/admin/AdminExams.tsx";
import LoginPatient from "@/pages/patient/LoginPatient.tsx";
import AdminPatient from "@/pages/admin/AdminPatient.tsx";
import AdminBooking from "@/pages/admin/AdminBooking.tsx";
import AdminHome from "@/pages/admin/AdminHome.tsx";
import AdminTenantExams from "@/pages/admin/AdminTenantExams.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/login/paciente'/>
    },
    {
        path: "/admin",
        element: <Navigate to='/login/admin'/>
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
        element: <AppLayout />,
        children: [
            {
                path:'home',
                element:<Exames />,
            },
            {
                path:'dadoscadastrais',
                element:<DadosCadastrais />,
            },
        ]
    },
    {
        path: "/admin",
        element:  <AppLayout />,
        children: [
            {
                path:'home',
                element:<AdminHome />,
            },
            {
                path:'agendamento',
                element:<AdminBooking />,
            },
            {
                path:'pacientes',
                element:<AdminPatient />,
            },
            {
                path:'exames',
                element:<AdminExams />,
            },
            {
                path:'config-exams',
                element:<AdminTenantExams />,
            },
        ]
    },
]);

