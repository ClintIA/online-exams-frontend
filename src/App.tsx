import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes";
import AuthProvider from "@/contexts/AuthContext.tsx";

const App: React.FC = () => {

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        )
};

export default App;
