import {useState} from 'react';
import styles from './Header.module.css';
import {Flask, List, SignOut, UserCircleGear} from 'phosphor-react';
import {NavLink} from 'react-router-dom';
import clintiaLogo from '../../assets/logoClintia.png';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${menuOpen ? styles.mobileSidebar : ''}`}>
        <div className={styles.logoContainer}>
          <img src={clintiaLogo} alt="Logo ClintIA" />
          <button className={styles.menuButton} onClick={toggleMenu}>
            <List size={32} color="white" />
          </button>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <NavLink to="/paciente/home" title="Exames" onClick={() => setMenuOpen(false)}>
            <Flask className={styles.icon}  />
            Exames
          </NavLink>
          <NavLink to="/paciente/dadoscadastrais" title="Dados Cadastrais" onClick={() => setMenuOpen(false)}>
            <UserCircleGear className={styles.icon}  />
            Dados Cadastrais
          </NavLink>
          <NavLink to="/login/paciente" title="Sair" onClick={() => setMenuOpen(false)}>
            <SignOut className={styles.icon}  />
            Sair
          </NavLink>
          {/* Adicione mais itens de menu aqui */}
        </nav>
      </aside>
    </>
  );
}
