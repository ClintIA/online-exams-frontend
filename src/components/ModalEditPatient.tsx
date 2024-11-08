import React, { useState, useEffect } from 'react'
import {Users} from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {updatePatient} from "@/services/patientService.tsx";

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    dadosPaciente?: DadosPaciente
    modalEditPatient: (message: string) => void
}

const ModalEditPatient: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Editar Paciente",dadosPaciente,modalEditPatient }: ModalRegisterProps) => {

    const [open, setOpen] = useState(isOpen)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setOpen(false)
        onClose()
    }
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
    const submitUpdatePatient = async (pacienteDados: DadosPaciente, tenant: number) => {
        try {
            if (modalEditPatient) {
                const result = await updatePatient(pacienteDados, tenant);
                modalEditPatient('Paciente cadastrado com sucesso')
                return result
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Dialog open={open} modal={true} onOpenChange={(handleOpenChange)}>
            <DialogContent onCloseAutoFocus={handleClose} className="bg-white max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6"/>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <RegisterPatient onClose={handleClose} dadosIniciais={dadosPaciente} isUpdate={submitUpdatePatient} />
                <DialogDescription>
                </DialogDescription>
                <DialogFooter className="flex items-center gap-2">
                    <DialogClose className="flex items-center gap-2" asChild>
                        <Button type="button" className="flex mx-auto w-52 bg-oxfordBlue text-white">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalEditPatient;