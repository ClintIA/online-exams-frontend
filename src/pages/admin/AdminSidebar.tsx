import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar.tsx";
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
                    <Home className={styles.icon} /> Início
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/agendamento">
                    <Calendar size={32} className={styles.icon}/> Agendamentos
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="/admin/exames">
                    <Microscope size={32} className={styles.icon}/> Portal de Exames
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible
                  className={`${styles.cadastros} ml-2 text-white`}
                  open={isOpenRegister}
                  onOpenChange={setIsOpenRegister}>
                <CollapsibleTrigger>
                  <Button className={`${styles.navLink}`} variant="ghost">
                    <MonitorCog size={32} className={styles.icon}/> Cadastros
                    {isOpenRegister ? <ChevronDown size={32} className={styles.icon}/> :
                        <ChevronRight className={styles.icon}/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a className="text-sm" href="/admin/config-exams">
                        <Microscope size={16} className={styles.icon}/> Exames
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Users size={16} className={styles.icon}/> Pacientes
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Contact2 size={16} className={styles.icon}/> Médicos
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <CircleUser size={16} className={styles.icon}/> Administradores
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                  open={isOpenRelatorios}
                  onOpenChange={setIsOpenRelatorios}
                  className={`${styles.relatorios} ml-2 text-white`}>
                <CollapsibleTrigger>
                  <Button className={`${styles.navLink}`} variant="ghost">
                    <Activity size={32} className={styles.icon}/> Relátorios
                    {isOpenRelatorios ? <ChevronDown className={styles.icon}/> :
                        <ChevronRight className={styles.icon}/>}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/config-exams">
                        <LayoutDashboard size={16} className={styles.icon}/> Marketing
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <a href="/admin/pacientes">
                        <Lightbulb size={16} className={styles.icon}/> Gestão
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleContent>
              </Collapsible>
            <SidebarFooter className="flex flex-row justify-between">
              <div className="fixed bottom-16 md:bottom-2 md:left-2">
                <button className="text-white">
                  <User color="white" className={styles.icon}/>Perfil
                </button>
              </div>
              <div className="fixed bottom-16 right-2 md:bottom-2  md:left-48">
                <button className="text-white" onClick={handleLogout}>
                  <SignOut color="white" className={styles.icon}/> Sair
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