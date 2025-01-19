import {NotePencil} from 'phosphor-react';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth';
import {getAdminData} from "@/services/adminsService.tsx";
import styles from '../../components/patient/PersonalInfoTable.module.css';
import {ModalEditDados} from "@/components/patient/ModalEditDados.tsx";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {getDoctorData} from "@/services/doctorService.ts";

type PersonalInfo = {
    label: string;
    value?: string;
    editable: boolean;
};

const  AdminProfile: React.FC = () => {
    const [selectedInfo, setSelectedInfo] = useState<PersonalInfo>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfo[]>([]);
    const auth = useAuth();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if(auth.tenantId && auth.userId) {
                    let response;
                    switch(auth.role) {
                        case 'doctor':
                            response = await getDoctorData(auth.userId, auth.tenantId)
                            break
                        default:
                            response = await getAdminData(auth.userId, auth.tenantId)
                            break;
                    }
                    const data = response.data.data;
                    const updatedPersonalInfoData: PersonalInfo[] = [
                        {label: 'Nome Legal', value: data.fullName, editable: false},
                        {label: 'CPF', value: data.cpf, editable: false},
                        {label: 'CEP', value: data.cep, editable: false},
                        {label: 'Perfil', value: data.role, editable: false},
                        {label: 'Telefone', value: data.phone, editable: false},
                        {label: 'Email', value: data.email, editable: false},
                        {label: 'Data de Registro', value: data.created_at ? format(data.created_at, "dd/MM/yyyy", { locale: ptBR }) : '', editable: false},

                    ];

                    setPersonalInfoData(updatedPersonalInfoData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do paciente:', error);
            }
        };

        fetchAdminData().then();
    }, [auth.userId,auth.tenantId]);

    const handleOpenModal = (info: PersonalInfo) => {
        setSelectedInfo(info);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedInfo(undefined);
        setIsModalOpen(false);
    };

    return (
        <div className="w-full p-10 mx-auto">
         <h1 className="text-3xl mb-6 font-bold tracking-tight">Dados Cadastrais</h1>
        <div className={styles.container}>
            {personalInfoData.map((info, index) => (
                <div key={index} className={styles.row}>
                    <div className={styles.label}>{info.label}</div>
                    <div className={styles.value}>
                       <span className="uppercase tracking-wide"> {info.value || '---'}</span>
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
        </div>
    );
};
export default AdminProfile;