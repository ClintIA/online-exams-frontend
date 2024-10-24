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
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import {registerPatientExam} from "@/services/patientExamService.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {DadosPaciente} from "@/components/RegisterPatient.tsx";

export interface DadosBooking {
    patientId: number | undefined
    examId: number | null
    examDate: string
}
interface BookingModalProps {
    dadosBooking?: DadosPaciente
    onAgendamentoConcluido?: () => void
}

const Booking: React.FC<BookingModalProps> = (dados,onAgendamentoConcluido ) => {
    const [dadosBooking, setDadosBooking] = useState<DadosBooking>({} as DadosBooking);
    const [selectedExame, setSelectedExame] = useState<string>('')
    const [erro, setErro] = useState<string | null>(null)

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

    const mockExam = [
        { id: '1', nome: 'Hemograma Completo', consultorio: 'Laboratório A', data: '13/02/2023', horario: '07:57', resultado: 'Normal', resumo: 'Resumo do exame Hemograma Completo' },
        { id: '2', nome: 'Glicose', consultorio: 'Laboratório B', data: '08/08/2017', horario: '09:55', resultado: 'Elevado', resumo: 'Resumo do exame Glicose' },
    ];

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
                                    <Label htmlFor="doctor">Selecione o Exame</Label>
                                    <Select value={selectedExame} onValueChange={setSelectedExame}>
                                        <SelectTrigger className="col-span-3"  id="doctor">
                                            <SelectValue placeholder="Selecione o Exame" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockExam.map((exam) => (
                                                <SelectItem key={exam.id} value={exam.id}>
                                                    {exam.nome}
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
                            <Button className="bg-oxfordBlue" type="submit">Salvar Agendamento</Button>
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