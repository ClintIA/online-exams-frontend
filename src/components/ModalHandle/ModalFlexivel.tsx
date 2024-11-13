import React, {useState, useEffect, ReactNode} from 'react'
import {Users} from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import {DialogClose} from "@radix-ui/react-dialog";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode

}

const ModalFlexivel: React.FC<ModalProps> = ({ isOpen, onClose, title = "Editar Paciente",children  }: ModalProps) => {

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
            <DialogContent onCloseAutoFocus={handleClose} className="bg-white max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6"/>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {children}
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

export default ModalFlexivel;