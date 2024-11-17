import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes";
import AuthProvider from "@/contexts/AuthContext.tsx";
import { CpfProvider } from '@/contexts/CpfContext.tsx';

const App: React.FC = () => {

    return (
        <CpfProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        </CpfProvider>
        )
};

export default App;
