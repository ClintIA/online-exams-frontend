import React, { useState, useEffect } from 'react'
import {Users} from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {X} from "@mui/icons-material";

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    dadosPaciente?: DadosPaciente
}

const ModalEditPatient: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Editar Paciente",dadosPaciente }: ModalRegisterProps) => {
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

    return (
        <Dialog open={open} modal={true} onOpenChange={(handleOpenChange)}>
            <DialogContent onCloseAutoFocus={handleClose} className="bg-white w-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <RegisterPatient dadosIniciais={dadosPaciente} />
                <DialogDescription className="text-base">
                </DialogDescription>
                <DialogClose>
                    <Button className="w-1/4 bg-oxfordBlue text-white">
                        <X className="h-4 w-4"/>
                        <span className="text-sm">Fechar</span>
                    </Button>
                </DialogClose>

            </DialogContent>
        </Dialog>
    )
}

export default ModalEditPatient;