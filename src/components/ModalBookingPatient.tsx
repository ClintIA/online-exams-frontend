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
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import Booking, {DadosBooking} from "@/components/Booking.tsx";
import {registerPatientExam} from "@/services/patientExamService.tsx";

interface ModalRegisterProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    dadosPaciente?: DadosPaciente
    modalBookingPatient: (message: string) => void
}

const ModalBookingPatient: React.FC<ModalRegisterProps> = ({ isOpen, onClose, title = "Agendar Exame",dadosPaciente,modalBookingPatient }: ModalRegisterProps) => {

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
    const submitBookintExam = async (bookingDados: DadosBooking, tenantId: number) => {
        try {
            const result = await registerPatientExam(bookingDados, tenantId)
            modalBookingPatient('Paciente Agendado com sucesso')
            return result
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
                <Booking onClose={handleClose} dadosPaciente={dadosPaciente} isNewBooking={submitBookintExam} />
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

export default ModalBookingPatient;