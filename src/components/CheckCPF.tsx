import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {AlertCircle} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {getPatientByCpfAndTenant} from "@/services/patientService.tsx";
import {validarCPF} from "@/lib/utils.ts";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";

interface VerificacaoCPFProps {
    onCPFVerificado: (dados: DadosPaciente, cadastrado: boolean) => void
}

const CheckCPF: React.FC<VerificacaoCPFProps> = ({onCPFVerificado}: VerificacaoCPFProps) => {
    const [cpf, setCpf] = useState('')
    const [tenant, setTenant] = useState<number | undefined>()
    const [erro, setErro] = useState<string | null>(null)
    const [dados, setDados] = useState<DadosPaciente>({
        full_name: '',
        email: '',
        phone: '',
        dob: '',
        cpf: '',
        address:'',
        gender: '',
        health_card_number: '',
    })
    const auth = useAuth()
    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenant(decoded.userId)
            }
        }
        getTenant()
    },[auth.token])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        const checkCPF = validarCPF(cpf)
        if (!cpf) {
            setErro('Por favor, insira um CPF')
            return
        }
        if (!checkCPF) {
            setErro('CPF Inválido')
            return
        }
        const numericCPF = cpf.replace(/\D/g, '')
        try {
            if(tenant) {
                const result = await getPatientByCpfAndTenant(numericCPF, tenant)
                const data = result?.data.data
                if(!data) {
                    onCPFVerificado({...dados, cpf: numericCPF }, false)

                } else {
                    setDados(data)

                    onCPFVerificado(data, true)
                }
            } else {
                setErro('Por favor, realize o login para identificarmos a Clínica')
            }
        } catch (error) {
            setErro('Falha ao verificar o CPF. Por favor, tente novamente.' + error)
        }
    }


    return (
        <div className="mt-10">
        <Card className="w-full max-w-md mx-auto ">
            <CardHeader>
                <CardTitle className='text-xl text-blue-900'>Verificação de Paciente</CardTitle>
                <CardDescription>
                    Insira o CPF do paciente para verificar o cadastro.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cpf" className="text-right text-blue-800">
                                CPF
                            </Label>
                            <Input
                                id="cpf"
                                value={cpf}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="000.000.000-00"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button className="bg-skyBlue text-white" type="submit">Verificar</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                {erro && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{erro}</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
        </div>
    )
}

export default CheckCPF;