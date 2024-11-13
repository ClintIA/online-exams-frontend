import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar';

export function Sidebar() {

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://img.freepik.com/premium-photo/stethoscope-medical-doctor-diagnosis-blue-health-science-laboratory-background_905829-4253.jpg"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/joaobejarano.png" />
        <strong>João Bejarano</strong>
        <span>Paciente</span>
      </div>

      <footer>
        <a href="/dadoscadastrais">
            <PencilLine size={20} />
            Dados Cadastrais
        </a>
      </footer>
    </aside>

  );
}