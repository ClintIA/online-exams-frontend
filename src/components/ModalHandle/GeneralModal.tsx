import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import {CheckCircle, OctagonX} from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  action: string;
  error: boolean;
  isDelete?: () => void
}

const GeneralModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title = "Confirmação de Registro", message, action, error,isDelete }: ErrorModalProps) => {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white h-56 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-oxfordBlue text-xl">
            <OctagonX className={error ? 'h-8 w-8 text-red-700' : 'hidden' } />
            <CheckCircle className={error ? 'hidden' : 'h-8 w-8 text-green-800' } />
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-oxfordBlue">{message}</DialogDescription>
        <DialogFooter>
          <Button onClick={action === 'Excluir'? isDelete : handleClose}>{action}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GeneralModal;