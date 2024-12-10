import AppLayout from "@/pages/AppLayout.tsx";
import AdminBooking from "@/pages/admin/AdminBooking.tsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.tsx";
import AdminDoctor from "@/pages/admin/AdminDoctor.tsx";
import AdminExams from "@/pages/admin/AdminExams.tsx";
import AdminHome from "@/pages/admin/AdminHome.tsx";
import AdminList from "@/pages/admin/AdminList.tsx";
import AdminPatient from "@/pages/admin/AdminPatient.tsx";
import AdminTenantExams from "@/pages/admin/AdminTenantExams.tsx";
import LoginPatient from "@/pages/patient/LoginPatient.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import AdminLogin from "../pages/admin/AdminLogin.tsx";
import { DadosCadastrais } from '../pages/patient/DadosCadastrais';
import { Exames } from "../pages/patient/Exames.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute.tsx";

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
                element:<AdminLogin />,
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
                element:(<ProtectedRoute> <AdminHome /> </ProtectedRoute>),
            },
            {
                path:'agendamento',
                element:(<ProtectedRoute> <AdminBooking /> </ProtectedRoute>),
            },
            {
                path:'registrar-pacientes',
                element:(<ProtectedRoute> <AdminPatient /> </ProtectedRoute>),
            },
            {
                path:'upload-exames',
                element:(<ProtectedRoute> <AdminExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-exames',
                element:(<ProtectedRoute> <AdminTenantExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-medicos',
                element:(<ProtectedRoute> <AdminDoctor /> </ProtectedRoute>),
            },
            {
                path:'registrar-admin',
                element:(<ProtectedRoute> <AdminList /> </ProtectedRoute>),
            },
            {
                path: 'dashboard',
                element: (<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>),
            }
        ]
    },
]);

