import React, { useState, useEffect } from 'react'
import {Users} from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {DialogClose, DialogDescription} from "@radix-ui/react-dialog";
import {registerPatient} from "@/services/loginService.tsx";

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    modalNewPatient?: (message: string) => void;
}

const ModalNewPatient: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Adicionar Paciente",modalNewPatient }: ModalRegisterProps) => {
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

    const submitNewPatient = async (patientData: DadosPaciente, tenant: number) => {
            try {
                if (modalNewPatient) {
                   const result = await registerPatient(patientData, tenant)
                    modalNewPatient('Paciente cadastrado com sucesso')
                    return result
                }
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <Dialog open={open} modal={true} onOpenChange={(handleOpenChange)}>
            <DialogContent content='teste' onCloseAutoFocus={handleClose} className="bg-white max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6"/>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <RegisterPatient onClose={handleClose} isNewPatient={submitNewPatient}/>
                <DialogDescription className="text-base"></DialogDescription>
                <DialogFooter className="flex items-center gap-2">
                    <DialogClose className="flex items-center gap-2" asChild>
                        <Button type="button" className="flex mx-auto justify-center w-52 bg-oxfordBlue text-white">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalNewPatient;