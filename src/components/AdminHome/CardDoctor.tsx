import React from 'react'
import doctorImg from '../../assets/img.png';

interface CardMedicoProps {
    nome?: string
    crm?: string
    contato?: string
    especialidade?: string
}

const CardDoctor: React.FC<CardMedicoProps>  = ({ nome, crm = 'Não informado', contato = 'Não informado', especialidade = 'Não informado' }: CardMedicoProps) => {
    return (
        <div className="flex flex-row border rounded-2xl border-slate-800 p-2  w-full h-max max-w-sm">
            <div className="w-max space-x-1 pb-1">
                    <img
                        src={doctorImg}
                        className="hidden sm:flex sm:h-12 sm:w-12 md:h-14 md:w-14 text-oxfordBlue" alt="Doctor Image"/>
            </div>
            <div className="ml-4">
                <div>
                    <h3 className="text-xs font-bold">{nome}</h3>
                    <p className="text-xs text-gray-500">{especialidade}</p>
                </div>
                <div className="grid mt-1">
                    <div className="flex items-center">
                        <h4 className="font-semibold text-xs mr-2">CRM:</h4>
                        <p className="text-xs">{crm}</p>
                    </div>
                    <div className="flex items-center">
                        <h4 className="font-semibold text-sm mr-2">Contato:</h4>
                        <p className="text-xs">{contato}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardDoctor;