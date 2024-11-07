import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth.tsx";
import { Calendar, FilePlus, FileText, Home, LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoClintia from '../assets/logoClintia.png';
import React from "react";

const AdminSidebar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    auth.logOut()
    navigate('/admin')
  }

  return (
      <SidebarProvider>
        <Sidebar className="bg-oxfordBlue text-white">
          <SidebarHeader>
            <img src={logoClintia} alt="Clintia" className="w-full h-auto" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/home">
                      <Home className="inline-block mr-2" /> Início
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <FileText className="inline-block mr-2" /> Exames
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/agendamento">
                      <Calendar className="inline-block mr-2" /> Agendamentos
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/pacientes">
                      <Users className="inline-block mr-2" /> Pacientes
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/exames">
                      <FilePlus className="inline-block mr-2" /> Exames da clínica
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <User className="w-6 h-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top">
                  <DropdownMenuItem>
                    <span>Editar Perfil</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={handleLogout}>
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
  )
}
export default AdminSidebar;