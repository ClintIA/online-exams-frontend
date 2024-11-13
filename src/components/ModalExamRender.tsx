import React, {useEffect, useState} from "react";
import ModalFlexivel from "@/components/ModalFlexivel.tsx";
import RegisterExam from "@/components/RegisterExam.tsx";
import { Exams} from "@/pages/AdminTenantExams.tsx";
import {Type} from "@/components/ModalPatientRender.tsx";
import {createExam, updateExam} from "@/services/tenantExam.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewExam?: (message: string) => void;
    dadosExam?: Exams | undefined;
    type: Type

}

export interface IExam {
    id?: number
    exam_name: string
    price: string
    doctorPrice?: string
    doctors?: string[]
    createdAt?: Date
}

const ModalExamRender: React.FC<ModalProps> = ({isOpen,onClose,title,modalNewExam,dadosExam, type}) =>  {
    const [open, setOpen] = useState(isOpen)
    const [modalContent,setModalContent] = useState<Type>(Type.newExam)
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
    const submitNewExam = async (examData: IExam, tenantId: number) => {
    if(modalNewExam) {
        await createExam(examData, tenantId).then(
            (result) => {
                console.log(result)
                if(result.status === 201) {
                    modalNewExam('Exame cadastrado com sucesso')
                    onClose()
                } else {
                    throw new Error('Não foi possível cadastrar exame')
                }

            }
        ).catch(error => console.log(error))
    }
    }
    const submitUpdateExam = async (examData: IExam, tenantId: number) => {
        if(modalNewExam) {
            await updateExam(examData, tenantId).then(
                (result) => {
                    if(result.status === 201) {
                        modalNewExam('Exame atualizado com sucesso')
                        onClose()
                    } else {
                        throw new Error('Não foi possível atualizar exame')
                    }
                }
            ).catch(error => console.log(error))
        }
    }
    const renderModalContent = () => {
        switch (modalContent) {
            case 'editExam':
                return (<RegisterExam title="Editar Exame" isUpdate={submitUpdateExam} dadosIniciais={dadosExam} onClose={handleClose}  />)
            case 'newExam':
                return(<RegisterExam title="Cadastrar Exame" isNewExam={submitNewExam} onClose={handleClose}/>)

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

export default ModalExamRender;