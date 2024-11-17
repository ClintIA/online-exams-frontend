import * as Dialog from "@radix-ui/react-dialog";
import styles from './ModalEditDados.module.css';
import { useState } from 'react';
import { X } from "phosphor-react";

type PersonalInfo = {
  label: string;
  value: string;
};

interface ModalEditDadosProps {
  info: PersonalInfo;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalEditDados({ info, isOpen, onClose }: ModalEditDadosProps) {
  const [newValue, setNewValue] = useState(info.value);

  const handleSave = () => {
    console.log("Salvar nova informação:", newValue);
    // Lógica para salvar a nova informação pode ser inserida aqui.
    onClose(); // Fechar modal após salvar
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>
            Editar {info.label}
          </Dialog.Title>

          <Dialog.Close className={styles.close} onClick={onClose}>
            <X size={24} />
          </Dialog.Close>

          <div className={styles.body}>
            <p>Valor atual: {info.value || '---'}</p>
            <input 
              type="text" 
              value={newValue} 
              onChange={(e) => setNewValue(e.target.value)} 
              className={styles.input}
              placeholder={`Novo valor para ${info.label}`} 
            />
          </div>

          <div className={styles.footer}>
            <button className={styles.button} onClick={handleSave}>
              Salvar
            </button>
            <button className={styles.button} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
