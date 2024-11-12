import React, {useEffect, useState} from "react";
import ModalFlexivel from "@/components/ModalFlexivel.tsx";

import RegisterExam from "@/components/RegisterExam.tsx";
import {Exams} from "@/pages/AdminTenantExams.tsx";
import {Type} from "@/components/ModalPatientRender.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewExam?: (message: string) => void;
    dadosExam?: Exams | undefined;
    type: Type

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
    const submitNewExam = async () => {

    }
    const submitUpdateExam = async () => {

    }
    const renderModalContent = () => {
        switch (modalContent) {
            case 'editExam':
                return (<RegisterExam isUpdate={submitUpdateExam} dadosIniciais={dadosExam} onClose={handleClose}  />)
            case 'newExam':
                return(<RegisterExam isNewExam={submitNewExam} onClose={handleClose}/>)

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