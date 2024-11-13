import  AdminDashboard from "@/pages/AdminDashboard.tsx";
import {createBrowserRouter, Navigate} from "react-router-dom";
import Error401 from "../error/Error401.tsx";
import Error404 from "../error/Error404.tsx";
import {Exames} from "../pages/patient/Exames.tsx";
import {LoginPatient} from "../pages/patient/LoginPatient.tsx";
import { DadosCadastrais } from '../pages/patient/DadosCadastrais'
import Home from "../pages/Home.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";
import LoginPatient from "../pages/LoginPatient.tsx";
import AppLayout from "@/pages/AppLayout.tsx";
import BookingSteps from "@/components/BookingSteps.tsx";
import Patient from "@/pages/Patient.tsx";
import AdminExams from "@/pages/AdminExams.tsx";

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
                element:<AdminDashboard />,
            },
            {
                path:'agendamento',
                element:<BookingSteps />,
            },
            {
                path:'pacientes',
                element:<Patient />,
            },
            {
                path:'exames',
                element:<AdminExams />,
            },
        ]
    },
]);

