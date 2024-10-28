import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {Exams} from "@/components/Booking.tsx";
import {CalendarDays, Clock, FileText, MapPin, User} from "lucide-react";
import {useNavigate} from "react-router-dom";

export interface BookingConfirmationProps {
    exame?: Exams,
    dadosPaciente?: DadosPaciente,
    examDate?: string,
}
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({exame, dadosPaciente, examDate}: BookingConfirmationProps) => {

    const navigate = useNavigate();
    const newBooking = () => {
        return navigate(`/admin/agendamento`)
    }
    const createDate = (date: string) => {
        const dateArray = date.split('-')
        return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
    }

     return (
        <div className="mt-10">

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className='text-xl text-blue-900'>Agendamento concluído</CardTitle>
                    <CardDescription>
                        Confira os dados do agendamento:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Paciente:</span>
                            <span className="ml-2">{dadosPaciente?.full_name}</span>
                        </div>
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Médico:</span>
                            <span className="ml-2">Não Selecionado</span>
                        </div>
                        <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Data:</span>
                            <span className="ml-2">{examDate?.split('T') ? createDate(examDate?.split('T')[0]) : examDate?.split('T')[0]}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Hora:</span>
                            <span className="ml-2">{examDate?.split('T')[1]}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Local:</span>
                            <span className="ml-2">{dadosPaciente?.tenants? dadosPaciente?.tenants[0].name : 'Não selecionado'}</span>
                        </div>
                        <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Tipo de Exame:</span>
                            <span className="ml-2">{exame?.exam_name}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-row gap-2">
                        <Button onClick={newBooking} className="bg-skyBlue text-white">
                            Enviar por SMS
                        </Button>
                        <Button onClick={newBooking} className="bg-skyBlue text-white">
                            Fazer outro agendamento
                        </Button>
                    </div>

                </CardFooter>

            </Card>

        </div>
    )
}

export default BookingConfirmation;