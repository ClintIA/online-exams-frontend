import React, {useEffect, useState} from "react";
import ModalFlexivel from "@/components/ModalHandle/ModalFlexivel.tsx";
import RegisterTenantExam from "@/components/AdminTenantExam/RegisterTenantExam.tsx";
import {Exams} from "@/pages/admin/AdminTenantExams.tsx";
import {ModalType} from "@/components/ModalHandle/ModalRender.tsx";
import {createExam, updateExam} from "@/services/tenantExam.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewExam?: (message: string) => void;
    dadosExam?: Exams | undefined;
    type: ModalType

}
export interface IExam {
    id?: number
    exam_name: string
    price: string
    doctorPrice?: string
    doctors?: string[]
    createdAt?: Date
}
const ModalTenantExamRender: React.FC<ModalProps> = ({isOpen,onClose,title,modalNewExam,dadosExam, type}) =>  {
    const [open, setOpen] = useState(isOpen)
    const [modalContent,setModalContent] = useState<ModalType>(ModalType.newExam)
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
                return (<RegisterTenantExam title="Editar Exame" isUpdate={submitUpdateExam} dadosIniciais={dadosExam} />)
            case 'newExam':
                return(<RegisterTenantExam title="Cadastrar Exame" isNewExam={submitNewExam}/>)

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

export default ModalTenantExamRender;