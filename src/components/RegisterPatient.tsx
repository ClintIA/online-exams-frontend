import React, { useState } from 'react'
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
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
export interface DadosPaciente {
    nome: string
    email: string
    telefone: string
    dataNascimento: string
    cpf: string
}

const RegisterPatient: React.FC = () => {
    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        cpf: '',
    })
    const [erro, setErro] = useState<string | null>(null)
    const [sucesso, setSucesso] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDadosPaciente(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        setSucesso(null)

        // Validação básica
        if (!dadosPaciente.nome || !dadosPaciente.email || !dadosPaciente.telefone || !dadosPaciente.dataNascimento || !dadosPaciente.cpf) {
            setErro('Por favor, preencha todos os campos')
            return
        }

        try {
            // Simulando uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1000))

            setSucesso('Paciente cadastrado com sucesso!')

            // Resetar formulário
            setDadosPaciente({
                nome: '',
                email: '',
                telefone: '',
                dataNascimento: '',
                cpf: '',
            })
        } catch (error) {
            setErro('Falha ao cadastrar paciente. Por favor, tente novamente.' + error)
        }
    }
   return (
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
                        <Label htmlFor="nome" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="nome"
                            name="nome"
                            value={dadosPaciente.nome}
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
                        <Label htmlFor="telefone" className="text-right">
                            Telefone
                        </Label>
                        <Input
                            id="telefone"
                            name="telefone"
                            type="tel"
                            value={dadosPaciente.telefone}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dataNascimento" className="text-right">
                            Data de Nascimento
                        </Label>
                        <Input
                            id="dataNascimento"
                            name="dataNascimento"
                            type="date"
                            value={dadosPaciente.dataNascimento}
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
                            value={dadosPaciente.cpf}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <Button type="submit">Salvar Paciente</Button>
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
            {sucesso && (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Sucesso</AlertTitle>
                    <AlertDescription>{sucesso}</AlertDescription>
                </Alert>
            )}
        </CardFooter>
    </Card>
   )
}

export default RegisterPatient;