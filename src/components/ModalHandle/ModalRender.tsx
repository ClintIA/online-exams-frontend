import React, {useEffect, useState} from 'react'
import RegisterPatient, {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {registerPatient} from "@/services/loginService.tsx";
import Booking, {DadosBooking} from "@/components/Booking/Booking.tsx";
import ModalFlexivel from "@/components/ModalHandle/ModalFlexivel.tsx";
import {registerPatientExam} from "@/services/patientExamService.tsx";
import {updatePatient} from "@/services/patientService.tsx";
import BookingPatient from "@/components/Booking/BookingPatient.tsx";
import BookingConfirmation, {BookingConfirmationState} from "@/components/Booking/BookingConfirmation.tsx";
import RegisterDoctor from "@/components/AdminRegister/RegisterDoctor.tsx";
import {ModalType} from "@/types/ModalType.ts";
import {IAdmin} from "@/pages/admin/AdminHome.tsx";
import {registerAdminDoctor, updateAdminDoctor} from "@/services/doctorsService.tsx";


interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewBookingConfirmation?: (message: string) => void;
    modalNewPatient?: (message: string) => void;
    dadosPaciente?: DadosPaciente
    adminData?: IAdmin
    type: ModalType
}


const ModalRender: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Paciente",modalNewPatient,modalNewBookingConfirmation,dadosPaciente, type, adminData }: ModalRegisterProps) => {
    const [open, setOpen] = useState(isOpen)
    const [modalContent,setModalContent] = useState<ModalType>(ModalType.newPatient)
    const [patientData, setPatientData] = useState<BookingConfirmationState>({} as BookingConfirmationState)

        useEffect(() => {
        openModal(type)
    }, [type])

    const openModal = (type: ModalType) => {
        setModalContent(type)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        onClose()
    }
    const submitBookintExam = async (bookingDados: DadosBooking, tenantId: number) => {
        try {
            if (modalNewBookingConfirmation) {
            const result = await registerPatientExam(bookingDados, tenantId)
                setPatientData(result.data.data.data)
                modalNewBookingConfirmation('Paciente Agendado com sucesso')
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    const submitUpdatePatient = async (dadosPaciente: DadosPaciente, tenantId: number) => {
        if (modalNewPatient) {
            await updatePatient(dadosPaciente, tenantId)
                .then(result => {
                    if (result.data.status === "success") {
                        modalNewPatient('Paciente Atualizado com sucesso')
                        onClose()
                    } else {
                        throw new Error('Não foi possível atualizar paciente' + result.message)
                    }
                }).catch(error => {console.log(error)})
        }
    }
    const submitNewPatient = async (patientData: DadosPaciente, tenantId: number) => {
            if (modalNewPatient) {
                await registerPatient(patientData, tenantId)
                    .then(
                        (result) => {
                            if (result.status === 201) {
                                modalNewPatient('Paciente cadastrado com sucesso')
                                onClose()
                            } else {
                                throw new Error('Não foi possível cadastrar paciente' + result.message)
                            }
                        }
                    ).catch(error => console.log(error))
            }
    }
    const submitNewAdmin = async (adminData: IAdmin,tenantId: number) => {
        if(modalNewPatient) {
            const result = await registerAdminDoctor(adminData,tenantId)

            if (result.status === 201) {
                modalNewPatient('Médico cadastrado com sucesso')
                onClose()
            } else {
                throw new Error('Não foi possível cadastrar médico: ' + result.message)
            }
        }
    }
    const submitUpdateAdmin = async (adminData: IAdmin,tenantId: number) => {
        if (modalNewPatient) {
            await updateAdminDoctor(adminData,tenantId)
                .then(result => {
                    console.log(result)
                    if (result.status === 200) {
                        modalNewPatient('Dados Atualizados com sucesso')
                        onClose()
                    } else {
                        throw new Error('Não foi possível atualizar dados do médico' + result.message)
                    }
                }).catch(error => {console.log(error)})
        }
    }
    const renderModalContent = () => {
        switch (modalContent) {
            case 'booking':
                return (<Booking onClose={handleClose} dadosPaciente={dadosPaciente} isNewBooking={submitBookintExam} />)
            case 'newPatient':
                return(<RegisterPatient isNewPatient={submitNewPatient}/>)
            case 'editPatient':
                return(<RegisterPatient dadosIniciais={dadosPaciente} isUpdate={submitUpdatePatient} />
                )
            case 'newBookingPatient':
                return(<BookingPatient  submitBooking={submitBookintExam}  handleModalMessage={openModal} />)
            case 'bookingConfirmation':
                return(<BookingConfirmation dadosBooking={patientData} onNewBooking={openModal} />)
            case 'newAdmin':
                return(<RegisterDoctor isNewDoctor={submitNewAdmin} />)
            case 'editAdmin':
                return(<RegisterDoctor dadosIniciais={adminData} isUpdate={submitUpdateAdmin} />)

        }
    }
    return (
            <ModalFlexivel
                isOpen={open}
                onClose={handleClose}
                title={title}>
                {renderModalContent()}
            </ModalFlexivel>
    )
}
export default ModalRender;