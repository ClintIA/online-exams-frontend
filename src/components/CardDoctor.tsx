import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'

interface CardMedicoProps {
    nome: string
    crm: string
    contato: string
}

const CardDoctor: React.FC<CardMedicoProps>  = ({ nome, crm, contato }: CardMedicoProps) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>{nome}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">CRM:</span>
                        <span>{crm}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Contato:</span>
                        <span>{contato}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default CardDoctor;