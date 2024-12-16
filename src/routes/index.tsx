import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/pages/AppLayout.tsx";
import AdminBooking from "@/pages/admin/AdminBooking.tsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.tsx";
import AdminDoctor from "@/pages/admin/AdminDoctor.tsx";
import AdminExams from "@/pages/admin/AdminExams.tsx";
import AdminHome from "@/pages/admin/AdminHome.tsx";
import AdminList from "@/pages/admin/AdminList.tsx";
import AdminPatient from "@/pages/admin/AdminPatient.tsx";
import AdminTenantExams from "@/pages/admin/AdminTenantExams.tsx";
import { DadosCadastrais } from "@/pages/patient/DadosCadastrais";
import { Exames } from "@/pages/patient/Exames.tsx";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import Login from "@/pages/auth/Login.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/login'/>
    },
    {
        path: "/admin",
        element: <Navigate to='/login'/>
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
        element: <Login />,
    },
    {
        path: "/paciente",
        element: <AppLayout />,
        children: [
            {
                path:'home',
                element:(<ProtectedRoute role={'patient'}><Exames /> </ProtectedRoute>),
            },
            {
                path:'dadoscadastrais',
                element:(<ProtectedRoute role={'patient'}><DadosCadastrais /> </ProtectedRoute>),
            },
        ]
    },
    {
        path: "/admin",
        element:  <AppLayout />,
        children: [
            {
                path:'home',
                element:(<ProtectedRoute role='admin'> <AdminHome /> </ProtectedRoute>),
            },
            {
                path:'agendamento',
                element:(<ProtectedRoute  role='admin'> <AdminBooking /> </ProtectedRoute>),
            },
            {
                path:'registrar-pacientes',
                element:(<ProtectedRoute  role='admin'> <AdminPatient /> </ProtectedRoute>),
            },
            {
                path:'upload-exames',
                element:(<ProtectedRoute  role='admin'> <AdminExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-exames',
                element:(<ProtectedRoute  role='admin'> <AdminTenantExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-medicos',
                element:(<ProtectedRoute  role='admin'> <AdminDoctor /> </ProtectedRoute>),
            },
            {
                path:'registrar-admin',
                element:(<ProtectedRoute  role='admin'> <AdminList /> </ProtectedRoute>),
            },
            {
                path: 'dashboard',
                element: (<ProtectedRoute  role='admin'> <AdminDashboard /> </ProtectedRoute>),
            }
        ]
    },
]);
