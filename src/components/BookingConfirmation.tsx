import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {DadosBooking, Exams} from "@/components/Booking.tsx";
import {CalendarDays, Clock, FileText, MapPin, User} from "lucide-react";

export interface BookingConfirmationProps {
    exame?: Exams,
    dadosPaciente?: DadosPaciente,
    dadosBooking?: DadosBooking,
    onNewBooking: () => void
}
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({exame, dadosPaciente, dadosBooking, onNewBooking}: BookingConfirmationProps) => {


    const newBooking = () => {
        onNewBooking();
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
                            <span className="ml-2">{dadosBooking?.doctor? dadosBooking?.doctor?.fullName : 'Medico não informado'}</span>
                        </div>
                        <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Data:</span>
                            <span className="ml-2">{dadosBooking?.examDate?.split('T') ? createDate(dadosBooking?.examDate?.split('T')[0]) : dadosBooking?.examDate?.split('T')[0]}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 opacity-70"/>
                            <span className="font-semibold">Hora:</span>
                            <span className="ml-2">{dadosBooking?.examDate?.split('T')[1]}</span>
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
                        <Button disabled={true} className="bg-skyBlue text-white">
                            Enviar por Whatsapp
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