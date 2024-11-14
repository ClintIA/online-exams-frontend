import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth.tsx";
import {
  Activity,
  Calendar,
  ChevronDown,
  ChevronRight, CircleUser, Contact2,
  Home, LayoutDashboard, Lightbulb, Microscope,
  MonitorCog,
  User,
  Users
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@radix-ui/react-collapsible";
import {Button} from "@/components/ui/button.tsx";
import styles from "@/components/patient/Header.module.css";
import clintiaLogo from "@/assets/logoClintia.png";
import {List, SignOut} from "phosphor-react";

const AdminSidebar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const [isOpenRelatorios, setIsOpenRelatorios] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    auth.logOut()
    navigate('/admin')
  }

  return (
      <aside className={`${styles.sidebar} ${menuOpen ? styles.mobileSidebar : ''}`}>

        <div className="flex justify-items-start">
          <img src={clintiaLogo} className="w-32 h-auto md:w-64 md:h-auto"
               alt="Logo ClintIA"/>
        </div>
        <div className="flex justify-end mt-3 mr-5">
          <button className={styles.menuButton} onClick={toggleMenu}>
            <List size={32} color="white"/>
          </button>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <SidebarProvider>
            <SidebarMenu className="h-screen">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/home">
                    <Home className="w-5 h-5 inline-block"/> Início
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/agendamento">
                    <Calendar size={32} className="w-5 h-5 inline-block"/> Agendamentos
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/exames">
                    <Microscope size={32} className="w-5 h-5 inline-block"/> Portal de Exames
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible
                  className="ml-2 text-white"
                  open={isOpenRegister}
                  onOpenChange={setIsOpenRegister}>
                <CollapsibleTrigger>
                  <Button className="text-base" variant="ghost">
                    <MonitorCog size={32} className="w-5 h-5 inline-block"/> Cadastros
                    {isOpenRegister ? <ChevronDown size={32} className="w-5 h-5 inline-block mr-1"/> :
                        <ChevronRight className="w-5 h-5 inline-block mr-1"/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a className="text-sm" href="/admin/config-exams">
                        <Microscope size={16} className="w-5 h-5 inline-block"/> Exames
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Users size={16} className="w-5 h-5 inline-block"/> Pacientes
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Contact2 size={16} className="w-5 h-5 inline-block"/> Médicos
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <CircleUser size={16} className="w-5 h-5 inline-block"/> Administradores
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                  open={isOpenRelatorios}
                  onOpenChange={setIsOpenRelatorios}
                  className="ml-2 text-white">
                <CollapsibleTrigger>
                  <Button className="text-base" variant="ghost">
                    <Activity size={32} className="w-5 h-5 inline-block"/> Relátorios
                    {isOpenRelatorios ? <ChevronDown className="w-5 h-5 inline-block mr-1"/> :
                        <ChevronRight className="w-5 h-5 inline-block mr-1"/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/config-exams">
                        <LayoutDashboard size={16} className="w-5 h-5 inline-block mr-1"/> Marketing
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Lightbulb size={16} className="w-5 h-5 inline-block mr-1"/> Gestão
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleContent>
              </Collapsible>
              <div className="absolute bottom-1">
            <SidebarFooter className="flex flex-row">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <button className="ml-2  md:ml-0 md:mr-28 text-white">
                        <User color="white" className="w-8 h-8"/>Perfil
                      </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top">
                    <DropdownMenuItem>
                      <span>Editar Perfil</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                  <button className="mr-10 text-white" onClick={handleLogout}>
                    <SignOut color="white" className="w-8 h-8"/> Sair
                  </button>

            </SidebarFooter>
              </div>
            </SidebarMenu>
          </SidebarProvider>
        </nav>
      </aside>
  )
}
export default AdminSidebar;