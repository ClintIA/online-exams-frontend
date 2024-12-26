import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {canaisOptions} from "@/lib/optionsFixed.ts";
import {Card} from "@/components/ui/card.tsx";

export interface IMarketing {
    id?: number
    canal?: string
    budgetCanal?: number
    createdBy: number
    uploadBy: number
}

export interface RegisterCanalProps {
    isCanal?: (marketingData: IMarketing, tenantID: number) => Promise<void>
    isUpdate?: (marketingData: IMarketing, tenantID: number) => Promise<void>
}

const RegisterCanal: React.FC<RegisterCanalProps> = ({ isCanal, isUpdate }:RegisterCanalProps) => {

    const [marketingData, setMarketingData] = useState<IMarketing>({} as IMarketing)
    const [listCanal, setListCanal] = useState(canaisOptions)
    const auth = useAuth();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setMarketingData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {

    }, []);

    const handleNewCanalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(marketingData)

    }
    const handleUpdateCanalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(marketingData)
    }
    return (
        <Card className="py-8 px-4">
        <div className="flex flex-col">
            <div className="flex flex-row gap-2 p-1">
                <div className="w-auto sm:w-2/4 flex justify-center">
                    <p className=" font-semibold text-oxfordBlue">Canal de Alocação</p>
                </div>
                <div className="w-auto sm:w-1/4 flex justify-center">
                    <p className="font-semibold text-oxfordBlue">Valor de Alocação</p>
                </div>
            </div>
            {listCanal.map((canal) => (
                <div key={canal.id} className="flex flex-row justify-between gap-2 p-1">
                    <div className="w-auto sm:w-2/4">
                        <Input id="canal" className="text-black" onChange={handleInputChange} name="canal"
                               value={canal.platform}/>
                    </div>
                    <div className="w-auto sm:w-1/4">
                        <Input id="budgetCanal" className="text-black" onChange={handleInputChange} name="budgetCanal"
                               value={canal.amount}/>
                    </div>
                    <div className="w-auto sm:w-1/4">
                        <Button onClick={() => handleUpdateCanalSubmit}
                                className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Atualizar
                        </Button>
                    </div>
                </div>
            ))}

            <div className="flex flex-row justify-between gap-2 mt-5">
                <div className="w-2/4">
                    <Input placeholder="Digite o Canal" className="text-black" id="canal" onChange={handleInputChange} name="canal"
                           value={marketingData?.canal}/>
                </div>
                <div className="w-1/4">
                    <Input placeholder="Valor de Alocação" id="budgetCanal" className="text-black" onChange={handleInputChange} name="budgetCanal"
                           value={marketingData?.budgetCanal}/>
                </div>
                <div className="w-1/4">
                    <Button onClick={() => handleNewCanalSubmit}
                            className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Criar
                        Canal</Button>
                </div>
            </div>
        </div>
        </Card>
    )
}
export default RegisterCanal;