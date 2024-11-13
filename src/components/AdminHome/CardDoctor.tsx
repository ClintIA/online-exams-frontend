import React from 'react'
import { User } from 'lucide-react'

interface CardMedicoProps {
    nome: string
    crm: string
    contato: string
}

const CardDoctor: React.FC<CardMedicoProps>  = ({ nome, crm = 'Não informado', contato = 'Não informado' }: CardMedicoProps) => {
    return (
        <div className="border rounded-2xl border-slate-800 p-2  w-full h-max max-w-sm">
            <div className="flex flex-row items-center space-x-1 pb-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-800"/>
                </div>
                <span className="font-bold">{nome}</span>
            </div>
            <div>
                <div className="grid gap-1 mt-1">
                    <div className="flex items-center">
                        <span className="font-semibold text-sm mr-2">CRM:</span>
                        <span>{crm}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-sm mr-2">Contato:</span>
                        <span>{contato}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardDoctor;