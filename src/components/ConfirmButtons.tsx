import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AppointmentConfirmationProps {
    onConfirm: () => void
    onDecline: () => void
    onCancel: () => void
    status: 'Aguardando' | 'Confirmado' | 'Não Compareceu'
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
                                                    onConfirm, onDecline, status , onCancel
                                                }: AppointmentConfirmationProps) => {
    return (
        <div>
            {status === 'Não Compareceu' || status === 'Confirmado' ?
                (            <Button
                    onClick={onCancel}
                    variant={'default'}
                    size="sm"
                    className='bg-red-500 hover:bg-red-800'
                >
                    <Check className="w-4 h-4 mr-1"/>
                    Desfazer
                </Button>) :
                (
                    <div className="flex space-x-2">
                        <Button
                            onClick={onConfirm}
                            variant={'default'}
                            size="sm"
                            className='bg-green-500 hover:bg-green-800'
                        >
                            <Check className="w-4 h-4 mr-1"/>
                            Confirmar
                        </Button>
                        <Button
                            onClick={onDecline}
                            variant={'default'}
                            size="sm"
                            className='bg-red-500 hover:bg-red-800'
                        >
                            <X className="w-4 h-4 mr-1"/>
                            Ausente
                        </Button>
                    </div> )
            }
        </div>
    )
}

export default AppointmentConfirmation;