import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {Card} from "@/components/ui/card.tsx";
import { listCanalMarketing} from "@/services/marketingService.ts";

export interface IMarketing {
    id?: number
    canal?: string
    budgetCanal?: number
    createdBy?: number
    uploadBy?: number
}

export interface RegisterCanalProps {
    isCanal?: (marketingData: IMarketing, tenantID: number) => Promise<void>
    isUpdate?: (marketingData: IMarketing, tenantID: number) => Promise<void>
}

const RegisterCanal: React.FC<RegisterCanalProps> = ({ isCanal, isUpdate }:RegisterCanalProps) => {

    const [updateCanalData, setUpdateCanalData] = useState<IMarketing>({} as IMarketing)
    const [newCanalData,setNewCanalData] = useState<IMarketing>({
        canal: '',
        budgetCanal: 0
    })
    const [listCanal, setListCanal] = useState<IMarketing[]>([])
    const auth = useAuth();
    const handleInputChangeNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewCanalData(prev => ({ ...prev, [name]: value }))
    }
    const handleInputChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUpdateCanalData(prev => ({ ...prev, [name]: value }))
    }
    useEffect(   () => {
        const fetchCanal = async () => {
            if (auth.tenantId) {
                const result = await listCanalMarketing(auth.tenantId)

                if (result.data) {
                    setListCanal(result.data.data)
                }

            }
        }
        fetchCanal().then()
    }, [auth.tenantId]);

    const handleNewCanalSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if(isCanal && auth.tenantId) {
            console.log({...newCanalData, uploadBy: auth.userId})
            await isCanal({...newCanalData, uploadBy: auth.userId}, auth.tenantId).catch((error) => console.log(error))
        }
    }
    const handleUpdateCanalSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if(isUpdate && auth.tenantId) {
            console.log({...newCanalData, uploadBy: auth.userId})
            await isUpdate({...newCanalData, uploadBy: auth.userId}, auth.tenantId).catch((error) => console.log(error))
        }
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
                    <form key={canal.id} onSubmit={handleUpdateCanalSubmit}>
                        <div className="flex flex-row justify-between gap-2 p-1">
                            <div className="w-auto sm:w-2/4">
                                <Input id="canal" className="text-black" onChange={handleInputChangeUpdate} name="canal"
                                       placeholder={canal.canal} value={updateCanalData.canal}/>
                            </div>
                            <div className="w-auto sm:w-1/4">
                                <Input id="budgetCanal" className="text-black" onChange={handleInputChangeUpdate}
                                       name="budgetCanal"
                                       placeholder={canal.budgetCanal?.toString()} value={updateCanalData.budgetCanal}/>
                            </div>
                            <div className="w-auto sm:w-1/4">
                                <Button
                                    className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Atualizar
                                </Button>
                            </div>
                        </div>
                    </form>
                ))}
                <form onSubmit={handleNewCanalSubmit}>
                    <div className="flex flex-row justify-between gap-2 mt-5">
                        <div className="w-2/4">
                            <Input placeholder="Digite o Canal" className="text-black" id="canal"
                                   onChange={handleInputChangeNew} name="canal"
                                   value={newCanalData?.canal}/>
                        </div>
                        <div className="w-1/4">
                            <Input placeholder="Valor de Alocação" id="budgetCanal" className="text-black"
                                   onChange={handleInputChangeNew} name="budgetCanal"
                                   value={newCanalData?.budgetCanal}/>
                        </div>
                        <div className="w-1/4">
                            <Button
                                    className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Criar
                                Canal</Button>
                        </div>
                    </div>
                </form>
            </div>

        </Card>
)
}
export default RegisterCanal;