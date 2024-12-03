import React, {ReactNode, useEffect, useState} from 'react'
import {Users} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import styles from './ModalFlexivel.module.css';
import Stepper from "@/components/Stepper.tsx";
import {steps} from "@/lib/optionsFixed.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode
    isStepper: boolean
    currentStep?: number
}

const ModalFlexivel: React.FC<ModalProps> = ({ isOpen, onClose, title = "Gerenciamento de Funcionários", children, isStepper = false,currentStep  }: ModalProps) => {
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
            <DialogContent onCloseAutoFocus={handleClose} className={styles.content}>
                <DialogHeader>
                    <DialogTitle className={styles.title}>
                        <Users className={styles.icon}/>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className={isStepper? 'flex items-center' : 'hidden'}>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
                {children}
                <DialogDescription>
                </DialogDescription>
                <DialogFooter className={styles.footer}>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalFlexivel;