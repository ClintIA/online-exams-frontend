import * as Dialog from "@radix-ui/react-dialog";
import styles from './ModalDetail.module.css';
import {X} from "phosphor-react";
import {ExameDetail} from "./ExameDetail";
import {Exame} from './Post';


interface ModalDetail {
    exame: Exame;
  }

export function ModalDetail({ exame }: ModalDetail){
    return(
        <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}/>

        <Dialog.Content className={styles.content}>

          <Dialog.Title className={styles.title}>Detalhes do Exame</Dialog.Title>

            <Dialog.Close className={styles.close}>
                <X size={24} />
            </Dialog.Close>
            <ExameDetail exame={exame}/>
          {/* <button type="submit" className={styles.button}>
            Compartilhar
          </button> */}
          <button
            type="submit"
            className={styles.button}
            onClick={() => exame.link && window.open(exame.link, "_blank")}
            disabled={!exame.link}
          >
            {exame.link ? "Laudo Completo" : "Laudo Indisponível"}
          </button>

        </Dialog.Content>
      </Dialog.Portal>
    )
}