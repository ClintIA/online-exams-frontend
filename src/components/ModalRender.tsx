import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button.tsx"
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {registerPatient} from "@/services/loginService.tsx";
import Booking, {DadosBooking} from "@/components/Booking.tsx";
import ModalFlexivel from "@/components/ModalFlexivel.tsx";
import {registerPatientExam} from "@/services/patientExamService.tsx";
import {updatePatient} from "@/services/patientService.tsx";

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewPatient?: (message: string) => void;
    dadosPaciente?: DadosPaciente
    type: 'booking' | 'newPatient' | 'editPatient'

}

const ModalRender: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Adicionar Paciente",modalNewPatient,dadosPaciente, type }: ModalRegisterProps) => {
    const [open, setOpen] = useState(isOpen)
    const [modalContent,setModalContent] = useState<'booking' | 'newPatient' | 'editPatient'>('newPatient')
    useEffect(() => {
        openModal(type)
    }, [type])

    const openModal = (type: 'booking' | 'newPatient' | 'editPatient') => {
        setModalContent(type)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        onClose()
    }
    const submitBookintExam = async (bookingDados: DadosBooking, tenantId: number) => {
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
        try {
            if (modalNewPatient) {
                const result = await updatePatient(dadosPaciente, tenantId)
                modalNewPatient('Paciente cadastrado com sucesso')
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    const renderModalContent = () => {
        switch (modalContent) {
            case 'booking':
                return (<Booking onClose={handleClose} dadosPaciente={dadosPaciente} isNewBooking={submitBookintExam} />)
            case 'newPatient':
                return(<RegisterPatient onClose={handleClose} isNewPatient={submitNewPatient}/>)
            case 'editPatient':
                return(<RegisterPatient onClose={handleClose} dadosIniciais={dadosPaciente} isUpdate={submitUpdatePatient} />
                )

        }
    }

    const submitNewPatient = async (patientData: DadosPaciente, tenantId: number) => {
            try {
                if (modalNewPatient) {
                   const result = await registerPatient(patientData, tenantId)
                    modalNewPatient('Paciente cadastrado com sucesso')
                    return result
                }
            } catch (error) {
                console.log(error)
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