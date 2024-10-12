import React from 'react';
import logoClintia from '../assets/logoClintia.png';
import { Divider } from '@mui/material';
import { Home, Science, People, ExitToApp, Vaccines, FamilyRestroom } from '@mui/icons-material';
import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import {useAuth} from "@/hooks/auth.tsx";
import {useNavigate} from "react-router-dom";

const Sidebar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    auth.logOut()
    navigate('/login/paciente')
  }

  return (
      <div className="w-60 h-screen bg-oxfordBlue text-white shadow-md font-sans">

        {/* Logo */}
        <div className="p-6">
          <img src={logoClintia} alt="Logo" className="w-30 mb-4"/>
        </div>

        {/* Menu */}
        <nav className="px-4">
          <p className="text-lg text-xs font-semibold uppercase text-skyBlue mb-4">Menu</p>
          <ul className="space-y-4">
            <li className="flex items-center text-white hover:text-skyBlue transition">
              <Home className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Início</a>
            </li>
            <li className="flex items-center text-skyBlue font-bold">
              <Science className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Exames</a>
            </li>
            <li className="flex items-center text-white hover:text-skyBlue transition">
              <Vaccines className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Consultas</a>
            </li>
          </ul>

          <Divider className="my-6 border-gray-600"/>

          <p className="text-lg text-xs font-semibold uppercase text-skyBlue mb-4 mt-4">Geral</p>
          <ul className="space-y-4">
            <li className="flex items-center text-white hover:text-skyBlue transition">
              <People className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Dados cadastrais</a>
            </li>
            <li className="flex items-center text-white hover:text-skyBlue transition">
              <FamilyRestroom className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Minha família</a>
            </li>
          </ul>

          <Divider className="my-4 border-gray-600"/>

          <ul className="space-y-4">
            <li className="flex items-center text-skyBlue hover:text-white transition mt-4">
              <ExitToApp className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Sair</a>
            </li>
          </ul>
        </nav>
        {/* Botão Logout */}
        <div className="p-4">
          <Button
              variant="outline"
              size="sm"
              className={`flex text-black items-center space-x-2 hover:bg-gray-200`}
              onClick={handleLogout}
          >
            <LogOut className="h-4 w-4"/>
            <span>Logout</span>
          </Button>
        </div>

      </div>
  );
};

export default Sidebar;
