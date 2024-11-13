import React, {useEffect, useState} from "react";
import ModalFlexivel from "@/components/ModalHandle/ModalFlexivel.tsx";
import ModalRegisterExam from "@/components/AdminTenantExam/ModalRegisterExam.tsx";
import { Exams} from "@/pages/AdminTenantExams.tsx";
import {Type} from "@/components/AdminPatient/ModalPatientRender.tsx";
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
        const result =  await createExam(examData, tenantId)
        modalNewExam('Exame cadastrado com sucesso')
        return result
    }
    }
    const submitUpdateExam = async (examData: IExam, tenantId: number) => {
        if (modalNewExam) {
              await updateExam(examData, tenantId)
                  .then((result) => {
                      if (result.data.status === "success") {
                          modalNewExam('Exame Atualizado com sucesso')
                          onClose()
                      } else {
                          return new Error('Não foi possível atualizar exame' + result.message)
                      }
                  }).catch(error => {console.log(error)})
        }
    }
    const renderModalContent = () => {
        switch (modalContent) {
            case 'editExam':
                return (<ModalRegisterExam title="Editar Exame" isUpdate={submitUpdateExam} dadosIniciais={dadosExam} />)
            case 'newExam':
                return(<ModalRegisterExam title="Cadastrar Exame" isNewExam={submitNewExam}/>)

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