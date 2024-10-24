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
import {registerPatientExam} from "@/services/patientExamService.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {listTenantExam} from "@/services/tenantExam.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";

export interface DadosBooking {
    patientId: number | undefined
    examId: number | null
    examDate: string
}
interface BookingModalProps {
    dadosBooking?: DadosPaciente
    onAgendamentoConcluido?: () => void
}
interface Exams {
    id: number
    exam_name: string
    price: string
    createdAt: Date
}

const Booking: React.FC<BookingModalProps> = (dados,onAgendamentoConcluido ) => {
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [dadosBooking, setDadosBooking] = useState<DadosBooking>({} as DadosBooking);
    const [selectedExame, setSelectedExame] = useState<string>('')
    const [exames, setExames] = useState<Exams[]>([])
    const [erro, setErro] = useState<string | null>(null)
    const auth = useAuth()

    useEffect(() => {
        if(auth?.token) {
            const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
            setTenantID(decoded.tenantId)
        }
    },[auth.token, auth.user])

    useEffect( () => {
        const fetchExams = async () => {
            try {
                if(tenantId) {
                    const result = await listTenantExam(tenantId)
                    if(result?.data.status === "success") {
                        setExames(result?.data.data)
                    }
                }
            } catch (error) {
                setErro("Não possível carregar os exames")
                console.error(error)
            }
        }
        fetchExams().then()
    }, [tenantId]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDadosBooking(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        // Validação básica
        if (!dadosBooking.examDate ||
            !dadosBooking.patientId ||
            !dadosBooking.examId) {
            setErro('Por favor, preencha todos os campos')
            return
        }

        const createDate = (date: string) => {
            const dateArray = date.split('-')
            return dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2]
        }
        try {
            if(!dados.dadosBooking?.id) {
                setErro('ID do Paciente não encontrado')
            }
            const bookingDados = { ...dadosBooking, patientId: dados.dadosBooking?.id, examDate: createDate(dadosBooking.examDate) }
            const result = await registerPatientExam(bookingDados, 1)

            if(result?.status === 'success') {

                onAgendamentoConcluido()
            }


            // Resetar formulário
            setDadosBooking({
                examDate: '',
                patientId: undefined,
                examId: null,
            })
        } catch (error) {
            setErro('Falha ao cadastrar paciente. Por favor, tente novamente.')
            console.log(error)
        }
    }


    return (
        <div className="mt-10">

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Agendamento do Exame</CardTitle>
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
                                    value={dados.dadosBooking?.full_name}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Contato
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={dados.dadosBooking?.phone}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tenant" className="text-right">
                                    Clínica
                                </Label>
                                <Input
                                    id="tenant"
                                    name="tenant"
                                    type="text"
                                    value={dados.dadosBooking?.tenants ? dados.dadosBooking?.tenants[0].name : 'Adicione essa clínica ao cadastro do paciente'}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctor">Selecione o Exame</Label>
                                <Select value={selectedExame} onValueChange={setSelectedExame}>
                                    <SelectTrigger className="col-span-3" id="doctor">
                                        <SelectValue placeholder="Selecione o Exame"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {exames.map((exam) => (
                                            <SelectItem key={exam.id} value={exam.id.toString()}>
                                                {exam.exam_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dob" className="text-right">
                                    Dia do Exame
                                </Label>
                                <Input
                                    id="dob"
                                    name="dob"
                                    type="datetime-local"
                                    value={dadosBooking.examDate}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="bg-skyBlue text-white" type="submit">Salvar Agendamento</Button>
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

export default Booking;