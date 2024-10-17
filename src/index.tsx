import { createRoot } from 'react-dom/client'
import {
    RouterProvider,
} from "react-router-dom";
import './index.css'
import {router} from "./routes";
import AuthProvider from "@/contexts/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
    <RouterProvider
        router={router}
    />
    </AuthProvider>
)