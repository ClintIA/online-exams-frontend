import React, {useState} from 'react'
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
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {getPatientByCpfAndTenant} from "@/services/patientService.tsx";
import Booking from "@/components/Booking.tsx";

const CheckCPF: React.FC = () => {
    const [cpf, setCpf] = useState('')
    const [tenant, setTenant] = useState<number | undefined>()

    const [erro, setErro] = useState<string | null>(null)
    const [pacienteEncontrado, setPacienteEncontrado] = useState(false)
    const [patientEncontrado, setPatientEncontrado] = useState({})
    const [mostrarCadastro, setMostrarCadastro] = useState(false)
    const auth = useAuth()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value)
    }
    if(auth.user?.tenantId && auth.user) {
        setTenant(auth.user.tenantId)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        setPacienteEncontrado(false)
        setMostrarCadastro(false)

        if (!cpf) {
            setErro('Por favor, insira um CPF')
            return
        }

        try {
            // Simulando uma chamada de API para verificar o CPF
            if(tenant) {
                const result = await getPatientByCpfAndTenant(cpf, tenant)
                const data = result?.data.data
                setPatientEncontrado(data)
                setPacienteEncontrado(true)
               if(!data) {
                   setMostrarCadastro(true)
               }
            }
        } catch (error) {
            setErro('Falha ao verificar o CPF. Por favor, tente novamente.' + error)
        }
    }
    if (mostrarCadastro) {
        return <RegisterPatient />
    }
    if(pacienteEncontrado && patientEncontrado) {
        return <Booking {...patientEncontrado as DadosPaciente} />
    }

    return (
        <div className="mt-10">
        <Card className="w-full max-w-md mx-auto ">
            <CardHeader>
                <CardTitle>Verificação de Paciente</CardTitle>
                <CardDescription>
                    Insira o CPF do paciente para verificar o cadastro.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cpf" className="text-right">
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
                        <Button type="submit">Verificar</Button>
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