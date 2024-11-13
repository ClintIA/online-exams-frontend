import React from 'react'
import { Check } from "lucide-react"

interface EtapaProps {
    numero: number
    titulo: string
    ativa: boolean
    completa: boolean
}

function Etapa({ numero, titulo, ativa, completa }: EtapaProps) {
    return (
        <li className={`flex items-center ${ativa ? 'text-blue-800' : 'text-blue-500'}`}>
      <span className={`flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2 
        ${ativa ? 'border-primary' : 'border-gray-300'}
        ${completa ? 'bg-oxfordBlue text-skyBlue' : 'bg-white'}`}>
        {completa ? <Check className="w-5 h-5" /> : numero}
      </span>
            <span className="text-sm font-medium">{titulo}</span>
        </li>
    )
}

interface IndicadorEtapasProps {
    etapas: string[]
    etapaAtual: number
}


const StepIndicator: React.FC<IndicadorEtapasProps> = ({ etapas, etapaAtual}: IndicadorEtapasProps) => {
    if (!etapas || etapas.length === 0) {
        return null
    }
    return (
        <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            {etapas.map((etapa, index) => (
                <Etapa
                    key={index}
                    numero={index + 1}
                    titulo={etapa}
                    ativa={index === etapaAtual}
                    completa={index < etapaAtual}
                />
            ))}
        </ol>
    )
}

export default StepIndicator;