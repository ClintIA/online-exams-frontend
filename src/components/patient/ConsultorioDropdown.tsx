import * as Select from '@radix-ui/react-select';
import styles from './ConsultorioDropdown.module.css';

interface ConsultorioDropdownProps {
  consultorios: string[];
  onSelectConsultorio: (consultorio: string) => void;
}

export function ConsultorioDropdown({ consultorios, onSelectConsultorio }: ConsultorioDropdownProps) {
  return (
    <Select.Root onValueChange={onSelectConsultorio}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value placeholder="Selecione um consultório" />
        <Select.Icon />
      </Select.Trigger>

      <Select.Content className={styles.content}>
        <Select.ScrollUpButton className={styles.scrollButton} />
        <Select.Viewport className={styles.viewport}>
          <Select.Item value="Todos" className={styles.item}>
            <Select.ItemText>Todos</Select.ItemText>
          </Select.Item>
          {consultorios.map((consultorio) => (
            <Select.Item key={consultorio} value={consultorio} className={styles.item}>
              <Select.ItemText>{consultorio}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton className={styles.scrollButton} />
      </Select.Content>
    </Select.Root>
  );
}
