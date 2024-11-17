
import { Exame } from './Post';
import styles from './ExameDetail.module.css';

export interface ExameDetailProps {
  exame: Exame ;
}

export function ExameDetail ({ exame }: ExameDetailProps){


  if (!exame) return <div >Selecione um exame para ver os detalhes</div>;

  return (
    <div className={styles.content}>
      <h3 >{exame.nome}</h3>
      <p >Consultório: {exame.consultorio}</p>
      <p >Data: {exame?.data}</p>
      <p >Status: {exame.resultado}</p>
      
      <div >
        <h3 >Resumo:</h3>
        <p >{exame.resumo}</p>
      </div>
    
    </div>
  );
};
