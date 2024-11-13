import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth.tsx";
import {
  Activity,
  Calendar,
  ChevronDown,
  ChevronRight, CircleUser, Contact2,
  Home, Lightbulb,
  LogOut, Microscope,
  MonitorCog,
  User,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoClintia from '../assets/logoClintia.png';
import React, {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@radix-ui/react-collapsible";
import {Button} from "@/components/ui/button.tsx";
import {Dashboard} from "@mui/icons-material";

const AdminSidebar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const [isOpenRelatorios, setIsOpenRelatorios] = useState(false)


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
                <SidebarMenuItem className="ml-1.5">
                  <SidebarMenuButton>
                    <a href="/admin/home">
                      <Home className="w-5 h-5 inline-block mr-1" /> Início
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className="ml-1.5">
                  <SidebarMenuButton>
                    <a href="/admin/agendamento">
                      <Calendar size={32} className="w-5 h-5 inline-block mr-1" /> Agendamentos
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className="ml-1.5">
                  <SidebarMenuButton>
                    <a href="/admin/exames">
                      <Calendar size={32} className="w-5 h-5 inline-block mr-1" /> Portal de Exames Online
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                  <Collapsible
                      open={isOpenRegister}
                      onOpenChange={setIsOpenRegister}
                      className="w-full" >
                    <CollapsibleTrigger>
                      <Button variant="ghost">
                        <MonitorCog className="w-5 h-5 inline-block mr-1" /> Cadastros
                        {isOpenRegister ? <ChevronDown className="w-5 h-5 inline-block mr-1" /> : <ChevronRight className="w-5 h-5 inline-block mr-1" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <a href="/admin/config-exams">
                            <Microscope className="w-5 h-5 inline-block mr-1" /> Exames
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <a href="/admin/pacientes">
                            <Users className="w-5 h-5 inline-block mr-1" /> Pacientes
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <a href="/admin/pacientes">
                            <Contact2 className="w-5 h-5 inline-block mr-1" /> Médicos
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <a href="/admin/pacientes">
                            <CircleUser className="w-5 h-5 inline-block mr-1" /> Administradores
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </CollapsibleContent>
                  </Collapsible>
                <Collapsible
                    open={isOpenRelatorios}
                    onOpenChange={setIsOpenRelatorios}
                    className="w-full" >
                  <CollapsibleTrigger>
                    <SidebarMenuButton variant="default">
                      <Activity className="w-5 h-5 inline-block mr-1" /> Relátorios
                      {isOpenRelatorios ? <ChevronDown className="w-5 h-5 inline-block mr-1" /> : <ChevronRight className="w-5 h-5 inline-block mr-1" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <a href="/admin/config-exams">
                          <Dashboard className="w-5 h-5 inline-block mr-1" /> Marketing
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <a href="/admin/pacientes">
                          <Lightbulb className="w-5 h-5 inline-block mr-1" /> Gestão
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <User className="w-8 h-8" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top">
                  <DropdownMenuItem>
                    <span>Editar Perfil</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={handleLogout}>
                <LogOut className="w-8 h-8" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
  )
}
export default AdminSidebar;