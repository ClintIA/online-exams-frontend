import { Header } from "@/components/patient/Header.tsx";
import { useAuth } from "@/hooks/auth.tsx";
import AdminSidebar from "@/pages/admin/AdminSidebar.tsx";
import { ITokenPayload } from "@/types/Auth.ts";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const AppLayout: React.FC = () => {
    const [isAdmin, setIsAdmin ] = useState<boolean | undefined>(false);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const getAccess = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setIsAdmin(decoded.isAdmin)
            }
        }
        getAccess()
    },[auth, isAdmin, navigate])
    function HandleSideBar({ isAdmin }: { isAdmin: boolean | undefined }) {
        if(isAdmin) {
            return <AdminSidebar />
        } else {
            return <Header />
        }
    }

    return (
        <div className="flex h-screen">
            <div>
                <HandleSideBar isAdmin={isAdmin}/>
            </div>
            <div className="flex-1 overflow-y-auto md:ml-64">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;