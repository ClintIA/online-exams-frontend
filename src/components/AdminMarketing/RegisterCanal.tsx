import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ModalType} from "@/types/ModalType.ts";
import {useAuth} from "@/hooks/auth.tsx";

export interface IMarketing {
    id?: number
    canal?: string
    budgetCanal?: number
    createdBy: number
    uploadBy: number
}

export interface RegisterCanalProps {
    dadosIniciais?: Partial<IMarketing>
    isCanal?: (marketingData: IMarketing, tenantID: number) => Promise<void>
    isUpdate?: (marketingData: IMarketing, tenantID: number) => Promise<void>
}

const RegisterCanal: React.FC<RegisterCanalProps> = ({ dadosIniciais, isCanal, isUpdate }:RegisterCanalProps) => {

    const [marketinhData, setMarketingData] = useState<IMarketing>({} as IMarketing)
    const [listCanal, setListCanal] = useState([])
    const auth = useAuth();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setMarketingData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {

    }, []);

    const handleNewCanalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }
    const handleUpdateCanalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }
    return (
        <div>

            <div className="grid grid-cols-3">
                <div>
                    <Input id="canal" onChange={handleInputChange} name="canal" value={dadosIniciais?.canal}/>
                </div>
                <div>
                    <Input id="budgetCanal" onChange={handleInputChange} name="budgetCanal" value={dadosIniciais?.budgetCanal}/>
                </div>
                <div>
                    <Button onClick={() => handleNewCanalSubmit}
                            className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Salvar Canal</Button>
                </div>


            </div>

        </div>
    )
}
export default RegisterCanal;