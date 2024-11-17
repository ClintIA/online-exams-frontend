import {PersonalInfoTable} from "../../components/patient/PersonalInfoTable";
import styles from './DadosCadastrais.module.css';


export function DadosCadastrais(){

    return(
        <div>
        <div className={styles.wrapper}>
          <main>
            <div>
              <h1 className={styles.title}>Dados Cadastrais</h1>
            </div>
                <PersonalInfoTable/>
          </main>
        </div>
      </div>

)}