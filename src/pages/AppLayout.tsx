import { Outlet } from "react-router-dom";
import React, {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar.tsx";
import AdminSidebar from "@/components/AdminSidebar.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {jwtDecode} from "jwt-decode";
import {ITokenPayload} from "@/types/Auth.ts";
import MenuIcon from "@mui/icons-material/Menu";

const AppLayout: React.FC = () => {
    const [isAdmin, setIsAdmin ] = useState<boolean | undefined>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false); // Estado para abrir/fechar o menu lateral em mobile

    const auth = useAuth();
    useEffect(() => {
        if(auth?.token) {
            const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
            setIsAdmin(decoded.isAdmin)
        }
    },[auth])
    function HandleSideBar({ isAdmin }: { isAdmin: boolean | undefined }) {
        if(isAdmin) {
            return <AdminSidebar />
        } else {
            return <Sidebar />
        }
    }

    return (
        <div className="home flex flex-col md:flex-row">
            {/* Botão de Menu para dispositivos móveis */}
            <button className="md:hidden text-blue p-4" onClick={() => setMenuOpen(!menuOpen)}>
                <MenuIcon/>
            </button>

            {/* Sidebar visível em telas grandes e mobile quando menuOpen for true */}
            <div className={`md:block ${menuOpen ? 'block' : 'hidden'} w-60`}>
                <HandleSideBar isAdmin={isAdmin}/>
            </div>

            <div className="ml-4">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;