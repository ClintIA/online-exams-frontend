import styles from './Post.module.css';
import { Avatar } from './Avatar';
import {  useState } from 'react';
import { Share } from 'phosphor-react';
import * as Dialog from "@radix-ui/react-dialog";
import { ModalDetail } from './ModalDetail';


export interface Exame {
  id: number;
  nome: string;
  avatarUrl: string;
  link: string | null;
  consultorio: string;
  data: string;
  horario: string;
  resultado: string;
  resumo: string;
}


interface PostProps {
  post: Exame;
}

export function Post({ post }: PostProps) {

  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);


  const handleOpenModal = () => {
    setSelectedExame(post);
  };


  return (
    <>
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar src={post.avatarUrl}/>
            <div className={styles.authorInfo}>
              <strong>{post.nome}</strong>
              <span>{post.consultorio}</span>
              <span>{post.data}</span>
            </div>
          </div>

          <div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button onClick={handleOpenModal}>
                    <Share size={24} />
                </button>
              </Dialog.Trigger>
              {selectedExame && <ModalDetail exame={selectedExame} />}
            </Dialog.Root>
          </div>

        </header>

      </article>
    </>
  )
}