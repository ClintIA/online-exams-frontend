import React, { useState, useEffect } from 'react'
import RegisterPatient, {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {registerPatient} from "@/services/loginService.tsx";
import Booking, {DadosBooking} from "@/components/Booking/Booking.tsx";
import ModalFlexivel from "@/components/ModalHandle/ModalFlexivel.tsx";
import {registerPatientExam} from "@/services/patientExamService.tsx";
import {updatePatient} from "@/services/patientService.tsx";
import BookingPatient from "@/components/Booking/BookingPatient.tsx";
import BookingConfirmation from "@/components/Booking/BookingConfirmation.tsx";
export enum Type {
    booking = 'booking',
    newPatient=  'newPatient',
    editPatinet =  'editPatient',
    newExam = 'newExam',
    editExam ='editExam',
    newBookingPatient = 'newBookingPatient',
    bookingConfirmation= 'bookingConfirmation'
}

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewPatient?: (message: string) => void;
    dadosPaciente?: DadosPaciente
    type: Type

}


const ModalPatientRender: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Paciente",modalNewPatient,dadosPaciente, type }: ModalRegisterProps) => {
    const [open, setOpen] = useState(isOpen)
    const [modalContent,setModalContent] = useState<Type>(Type.newPatient)
    const [dadosBooking,setDadosBooking] = useState<DadosBooking>()
    useEffect(() => {
        openModal(type)
    }, [type])

    const openModal = (type: Type) => {

        setModalContent(type)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        onClose()
    }
    const submitBookintExam = async (bookingDados: DadosBooking, tenantId: number) => {
        setDadosBooking(bookingDados)
        try {
            if (modalNewPatient) {
            const result = await registerPatientExam(bookingDados, tenantId)
                modalNewPatient('Paciente Agendado com sucesso')
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
                        throw new Error('Não foi possível atualizar exame' + result.message)
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
                                throw new Error('Não foi possível cadastrar exame' + result.message)
                            }
                        }
                    ).catch(error => console.log(error))
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
                return(<BookingConfirmation dadosBooking={dadosBooking} />)

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
export default ModalPatientRender;