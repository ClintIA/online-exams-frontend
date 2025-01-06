import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes";
import AuthProvider from "@/contexts/AuthContext.tsx";
import {CpfProvider} from '@/contexts/CpfContext.tsx';
import {ToastProvider} from "@radix-ui/react-toast";

const App: React.FC = () => {

    return (
        <CpfProvider>
        <AuthProvider>
            <ToastProvider>
            <RouterProvider router={router} />
            </ToastProvider>
        </AuthProvider>
        </CpfProvider>
        )
};

export default App;
