import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import {registerPatient} from "@/services/loginService.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "@/hooks/auth.tsx";
import {validarDataNascimento, validarEmail, validarTelefone} from "@/lib/utils.ts";
export interface DadosPaciente {
    id?: number | undefined
    full_name: string | undefined
    email: string | undefined
    phone: string | undefined
    dob: string | undefined
    cpf?: string | undefined
    address: string | undefined
    gender: string | undefined
    health_card_number: string | undefined
    tenants?: any[]
}
interface RegisterPatientProps {
    dadosIniciais?: Partial<DadosPaciente>
    onCadastroConcluido: (dados: DadosPaciente) => void
}

const RegisterPatient: React.FC<RegisterPatientProps> = ({dadosIniciais, onCadastroConcluido}: RegisterPatientProps) => {
    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({
        full_name: '',
        email: '',
        phone: '',
        dob: '',
        cpf: '',
        address:'',
        gender: '',
        health_card_number: '',
    })
    const [tenant, setTenant] = useState<number | undefined>(undefined)
    const [erro, setErro] = useState<string | null>(null)
    const auth = useAuth()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDadosPaciente(prev => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenant(decoded.tenantId)
            }
        }
        getTenant()
    },[auth.token])
    useEffect(() => {
        setDadosPaciente(prevDados => ({
            ...prevDados,
            ...dadosIniciais
        }))
    }, [dadosIniciais])

    const createDate = (date: string) => {
        const dateArray = date.split('-')
        return dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2]
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        // Validação básica
        if (!dadosPaciente.full_name ||
            !dadosPaciente.email ||
            !dadosPaciente.phone ||
            !dadosPaciente.dob ||
            !dadosPaciente.address ||
            !dadosPaciente.gender ||
            !dadosPaciente.health_card_number) {
            setErro('Por favor, preencha todos os campos')
            return
        }
         if (!validarEmail(dadosPaciente.email)) {
            setErro('Email Inválido')
             return
        }
         if (!validarTelefone(dadosPaciente.phone)) {
            setErro('Telefone inválido')
             return
        }
        if (!validarDataNascimento(dadosPaciente.dob)) {
            setErro('Data de nascimento inválida')
            return
        }
        try {
            if(tenant) {
                const pacienteDados = { ...dadosPaciente, dob: createDate(dadosPaciente.dob) }
                const result = await registerPatient(pacienteDados, tenant)
                console.log(result)
                if(result?.data.status === 'success') {
                    onCadastroConcluido(dadosPaciente)
                } else {
                    setErro('Falha ao cadastrar paciente. '+ result?.message)
                    return
                }

                // Resetar formulário
                setDadosPaciente({
                    full_name: '',
                    email: '',
                    phone: '',
                    dob: '',
                    cpf: '',
                    address: '',
                    gender: '',
                    health_card_number: '',
                })
            }
        } catch (error) {
            setErro('Falha ao cadastrar paciente. Por favor, tente novamente.')
            console.log(error)
        }
    }

   return (
       <div className="mt-10">

           <Card className="w-full max-w-2xl mx-auto">
               <CardHeader>
                   <CardTitle>Cadastro de Paciente</CardTitle>
                   <CardDescription>
                       Preencha os detalhes do paciente abaixo. Clique em salvar quando terminar.
                   </CardDescription>
               </CardHeader>
               <CardContent>
                   <form onSubmit={handleSubmit}>
                       <div className="grid gap-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="full_name" className="text-right">
                                   Nome
                               </Label>
                               <Input
                                   id="full_name"
                                   name="full_name"
                                   value={dadosPaciente.full_name}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="email" className="text-right">
                                   Email
                               </Label>
                               <Input
                                   id="email"
                                   name="email"
                                   type="email"
                                   value={dadosPaciente.email}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="phone" className="text-right">
                                   Telefone
                               </Label>
                               <Input
                                   id="phone"
                                   name="phone"
                                   type="tel"
                                   value={dadosPaciente.phone}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="dob" className="text-right">
                                   Data de Nascimento
                               </Label>
                               <Input
                                   id="dob"
                                   name="dob"
                                   type="date"
                                   value={dadosPaciente.dob}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="cpf" className="text-right">
                                   CPF
                               </Label>
                               <Input
                                   id="cpf"
                                   name="cpf"
                                   value={dadosIniciais?.cpf}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="address" className="text-right">
                                   Endereço
                               </Label>
                               <Input
                                   id="address"
                                   name="address"
                                   value={dadosPaciente.address}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="gender" className="text-right">
                                   Genero
                               </Label>
                               <Input
                                   id="gender"
                                   name="gender"
                                   value={dadosPaciente.gender}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="health_card_number" className="text-right">
                                   Numero do Plano de Saúde
                               </Label>
                               <Input
                                   id="health_card_number"
                                   name="health_card_number"
                                   value={dadosPaciente.health_card_number}
                                   onChange={handleInputChange}
                                   className="col-span-3"
                               />
                           </div>
                       </div>
                       <div className="flex justify-end mt-6">
                           <Button className="bg-skyBlue text-white" type="submit">Salvar Paciente</Button>
                       </div>
                   </form>
               </CardContent>
               <CardFooter>
                   {erro && (
                       <Alert variant="destructive">
                           <AlertCircle className="h-4 w-4"/>
                           <AlertTitle>Erro</AlertTitle>
                           <AlertDescription>{erro}</AlertDescription>
                       </Alert>
                   )}
               </CardFooter>
           </Card>

       </div>

   )
}

export default RegisterPatient;