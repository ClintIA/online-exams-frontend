
import { Exame } from './Post';
import { format } from 'date-fns';
import {ptBR} from 'date-fns/locale/pt-BR';
import styles from './ExameDetail.module.css';

export interface ExameDetailProps {
  exame: Exame ;
}

export function ExameDetail ({ exame }: ExameDetailProps){
  const publishedDateFormatted = format(
    exame && exame.data ? new Date(exame.data) : new Date("2024-05-01"), // Verifica se exame e exame.data não são nulos
    "dd/MM/yyyy HH:mm",
    {
      locale: ptBR,
    }
  );

  if (!exame) return <div >Selecione um exame para ver os detalhes</div>;

  return (
    <div className={styles.content}>
      <h3 >{exame.nome}</h3>
      <p >Consultório: {exame.consultorio}</p>
      <p >Data: {publishedDateFormatted}</p>
      <p >Status: {exame.resultado}</p>
      
      <div >
        <h3 >Resumo:</h3>
        <p >{exame.resumo}</p>
      </div>
    
    </div>
  );
};
