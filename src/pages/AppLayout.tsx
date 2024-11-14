import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import AdminSidebar  from "@/components/AdminSidebar.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {jwtDecode} from "jwt-decode";
import {ITokenPayload} from "@/types/Auth.ts";
import {Header} from "@/components/patient/Header.tsx";


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
        <div className="flex h-screen mt-14">
            <div>
                <HandleSideBar isAdmin={isAdmin}/>
            </div>
            <div className="flex-1 md:ml-64">
                <Outlet/>
            </div>
            <footer className={`w-full fixed bottom-0 h-10 bg-oxfordBlue`}>
                <div className="flex flex-col items-center p-2 justify-center">
                    <p className="text-white text-base font-semibold">Clint IA - Soluções Tecnológicas &copy; 2024</p>
                </div>
            </footer>
        </div>
    );
}

export default AppLayout;