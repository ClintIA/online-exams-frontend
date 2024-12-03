import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AppointmentConfirmationProps {
    onConfirm: () => void
    onDecline: () => void
    status: 'pending' | 'confirmed' | 'declined'
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
                                                    onConfirm,
                                                    onDecline,
                                                    status
                                                }: AppointmentConfirmationProps) => {
    return (
        <div className="flex space-x-2">
            <Button
                onClick={onConfirm}
                variant={status === 'confirmed' ? 'default' : 'outline'}
                size="sm"
                className={`${
                    status === 'confirmed' ? 'bg-green-600 hover:bg-green-600' : 'text-green-600 hover:text-green-600'
                }`}
                disabled={status === 'confirmed'}
            >
                <Check className="w-4 h-4 mr-1" />
                Confirmar
            </Button>
            <Button
                onClick={onDecline}
                variant={status === 'declined' ? 'default' : 'outline'}
                size="sm"
                className={`${
                    status === 'declined' ? 'bg-red-500 hover:bg-red-800' : 'text-red-600 hover:text-red-800'
                }`}
                disabled={status === 'declined'}
            >
                <X className="w-4 h-4 mr-1" />
                Ausente
            </Button>
        </div>
    )
}

export default AppointmentConfirmation;