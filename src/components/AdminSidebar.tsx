import { useAuth } from "@/hooks/auth.tsx";
import { ExitToApp, Home, Science } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import logoClintia from '../assets/logoClintia.png';

const AdminSidebar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    auth.logOut()
    navigate('/login/paciente')
  }

  return (
      <div className="w-60 h-full bg-oxfordBlue text-white shadow-md font-sans">

        {/* Logo */}
        <div className="p-6">
          <img src={logoClintia} alt="Logo" className="w-30 mb-4"/>
        </div>

        {/* Menu */}
        <nav className="px-4">
          <p className="text-xs font-semibold uppercase text-skyBlue mb-4">Menu</p>
          <ul className="space-y-4">
            <li className="flex items-center text-white hover:text-skyBlue transition">
              <Home className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Início</a>
            </li>
            <li className="flex items-center text-skyBlue font-bold">
              <Science className="mr-3 text-lg"/>
              <a href="#" className="font-medium">Exames</a>
            </li>
          </ul>

          <Divider className="my-4 border-gray-600"/>

          <ul className="space-y-4">
            <li className="flex items-center text-skyBlue hover:text-white transition mt-4">
              <ExitToApp className="mr-3 text-lg"/>
              <a href="#" className="font-medium" onClick={handleLogout}>Sair</a>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default AdminSidebar;
