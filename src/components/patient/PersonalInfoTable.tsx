import {NotePencil} from 'phosphor-react';
import styles from './PersonalInfoTable.module.css';
import {useEffect, useState} from 'react';
import {ModalEditDados} from './ModalEditDados';
import {getPatientData, PatientData} from '@/api/patient-dados.ts';
import {useCpf} from '../../hooks/useCpf';
import {useAuth} from '../../hooks/auth';

type PersonalInfo = {
  label: string;
  value: string;
  editable: boolean; 
};

export function PersonalInfoTable() {
  const [selectedInfo, setSelectedInfo] = useState<PersonalInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInfo[]>([]);
  const { cpf } = useCpf(); // Obtém o CPF do contexto
  const { userId } = useAuth();

  // console.log(cpf)

  useEffect(() => {
    // Chama a API patient-dados ao montar o componente
    const fetchPatientData = async () => {
      try {
        const response = await getPatientData(Number(userId),cpf);
        const data: PatientData = response.data;

        // Atualiza personalInfoData com as informações do paciente
        const updatedPersonalInfoData: PersonalInfo[] = [
          { label: 'Nome Legal', value: data.full_name, editable: false },
          { label: 'CPF', value: data.cpf, editable: false }, 
          { label: 'Data De Nascimento', value: `${data.dob}`, editable: false },
          { label: 'Sexo Biológico', value: data.gender, editable: false },
          { label: 'Telefone', value: data.phone, editable: false },
          { label: 'Email', value: data.email, editable: false },
          { label: 'Endereço', value: data.address, editable: false },
          { label: 'Cartão do Plano de Saúde', value: data.health_card_number, editable: false },
        ];

        setPersonalInfoData(updatedPersonalInfoData);
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error);
      }
    };

    fetchPatientData();
  }, [userId,cpf]);

  const handleOpenModal = (info: PersonalInfo) => {
    setSelectedInfo(info);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInfo(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {personalInfoData.map((info, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.label}>{info.label}</div>
          <div className={styles.value}>
            {info.value || '---'}
          </div>
          <div>
            {/* Só exibe o botão de edição se o campo for editável */}
            {info.editable ? (
              <button onClick={() => handleOpenModal(info)}>
                <NotePencil size={20} className={styles.icon} />
              </button>
            ) : (
              <button disabled={true} onClick={() => handleOpenModal(info)}>
                <NotePencil size={20} className={styles.iconplaceholder} />
              </button> // Placeholder para manter alinhamento
            )}
          </div>
        </div>
      ))}

      {selectedInfo && (
        <ModalEditDados 
          info={selectedInfo} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};
