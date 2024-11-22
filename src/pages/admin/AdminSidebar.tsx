import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {
    Activity,
    Calendar,
    ChevronDown,
    ChevronRight,
    CircleUser,
    Contact2,
    Home,
    LayoutDashboard,
    Lightbulb,
    Microscope,
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

  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const [isOpenRelatorios, setIsOpenRelatorios] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    auth.logOut()
    navigate('/admin')
  }

  return (
      <aside className={`${styles.sidebar} ${menuOpen ? styles.mobileSidebar : ''}`}>
        <div className="flex justify-end ml-10">
          <img src={clintiaLogo} className="w-32 h-auto md:w-64 md:h-auto"
               alt="Logo ClintIA"/>
        </div>
        <div className="flex md:hidden absolute top-0 mt-3">
          <button onClick={toggleMenu}>
            <List size={32} color="white"/>
          </button>
        </div>

        <nav className={`overflow-y-hidden  ${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <SidebarProvider>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/home">
                    <Home className="w-4 h-4 inline-block"/> Início
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/agendamento">
                    <Calendar size={32} className="w-4 h-4 inline-block"/> Agendamentos
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/upload-exames">
                    <Microscope size={32} className="w-4 h-4 inline-block"/> Portal de Exames
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible
                  className="ml-2 text-white"
                  open={isOpenRegister}
                  onOpenChange={setIsOpenRegister}>
                <CollapsibleTrigger>
                  <Button className="text-base" variant="ghost">
                    <MonitorCog size={32} className="w-4 h-4 inline-block"/> Cadastros
                    {isOpenRegister ? <ChevronDown size={32} className="w-4 h-4 inline-block mr-1"/> :
                        <ChevronRight className="w-4 h-4 inline-block mr-1"/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/registrar-exames">
                        <Microscope size={16} className="w-3 h-3 inline-block"/> Exames
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/registrar-pacientes">
                        <Users size={16} className="w-3 h-3 inline-block"/> Pacientes
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/registrar-medicos">
                        <Contact2 size={16} className="w-3 h-3 inline-block"/> Médicos
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/registrar-admin">
                        <CircleUser size={16} className="w-3 h-3 inline-block"/> Administradores
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
                    {isOpenRelatorios ? <ChevronDown className="w-4 h-4 inline-block mr-1"/> :
                        <ChevronRight className="w-5 h-5 inline-block mr-1"/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="#">
                        <LayoutDashboard size={16} className="w-3 h-3 inline-block mr-1"/> Marketing
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="#">
                        <Lightbulb size={16} className="w-3 h-3 inline-block mr-1"/> Gestão
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleContent>
              </Collapsible>
            <SidebarFooter className="flex flex-row justify-between">
              <div className="fixed bottom-16 md:bottom-2 md:left-2">
                <button className="text-white">
                  <User color="white" className="w-5 h-5"/>Perfil
                </button>
              </div>
              <div className="fixed bottom-16 right-2 md:bottom-2  md:left-48">
                <button className="text-white" onClick={handleLogout}>
                  <SignOut color="white" className="w-5 h-5"/> Sair
                </button>
              </div>
            </SidebarFooter>
            </SidebarMenu>
          </SidebarProvider>
        </nav>
      </aside>
  )
}
export default AdminSidebar;