import {createBrowserRouter, Navigate} from "react-router-dom";
import AppLayout from "@/pages/AppLayout.tsx";
import AdminBooking from "@/pages/admin/AdminBooking.tsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.tsx";
import AdminDoctor from "@/pages/admin/AdminDoctor.tsx";
import AdminExams from "@/pages/admin/AdminExams.tsx";
import AdminHome from "@/pages/admin/AdminHome.tsx";
import AdminList from "@/pages/admin/AdminList.tsx";
import AdminPatient from "@/pages/admin/AdminPatient.tsx";
import AdminTenantExams from "@/pages/admin/AdminTenantExams.tsx";
import {DadosCadastrais} from "@/pages/patient/DadosCadastrais";
import {Exames} from "@/pages/patient/Exames.tsx";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import Login from "@/pages/auth/Login.tsx";
import {ProfileRole} from "@/types/ProfileRole.ts";

export const router = createBrowserRouter([
    {
        path: "/",
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
                element:(<ProtectedRoute role={ProfileRole.patient}><Exames /> </ProtectedRoute>),
            },
            {
                path:'dadoscadastrais',
                element:(<ProtectedRoute role={ProfileRole.patient}><DadosCadastrais /> </ProtectedRoute>),
            },
        ]
    },
    {
        path: "/admin",
        element:  <AppLayout />,
        children: [
            {
                path:'home',
                element:(<ProtectedRoute role={ProfileRole.admin}> <AdminHome /> </ProtectedRoute>),
            },
            {
                path:'agendamento',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminBooking /> </ProtectedRoute>),
            },
            {
                path:'registrar-pacientes',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminPatient /> </ProtectedRoute>),
            },
            {
                path:'upload-exames',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-exames',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminTenantExams /> </ProtectedRoute>),
            },
            {
                path:'registrar-medicos',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminDoctor /> </ProtectedRoute>),
            },
            {
                path:'registrar-admin',
                element:(<ProtectedRoute  role={ProfileRole.admin}> <AdminList /> </ProtectedRoute>),
            },
            {
                path: 'dashboard',
                element: (<ProtectedRoute  role={ProfileRole.admin}> <AdminDashboard /> </ProtectedRoute>),
            }
        ]
    },
]);
