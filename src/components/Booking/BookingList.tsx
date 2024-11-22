import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {IPatientExam} from "@/pages/admin/AdminHome.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckCircle} from "lucide-react";
import Loading from "@/components/Loading.tsx";

interface ListaAgendamentosProps {
    agendamentos: IPatientExam[]
    onConfirmarPresenca?: (id: string) => void
    loading: boolean
}

const BookingList: React.FC<ListaAgendamentosProps> = ({ agendamentos ,loading }: ListaAgendamentosProps) => {
    if(loading) {
        return (<Loading />)
    }
    if(agendamentos.length === 0) {
        return (<p className="text-base font-semibold">Não possuí exames para o dia selecionado</p>)
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos?.map((agendamento) => (
                    <TableRow key={agendamento?.id}>
                        <TableCell>{agendamento?.patient?.full_name}</TableCell>
                        <TableCell>{new Date(agendamento?.examDate).toISOString().substring(11, 16)}</TableCell>
                        <TableCell>{agendamento?.doctor?.fullName}</TableCell>
                        <TableCell>
                            {agendamento?.status ? (
                                <span className="text-green-600 font-semibold">Compareceu</span>
                            ) : (
                                <span className="text-yellow-600 font-semibold">Aguardando</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <Button
                                size="sm"
                                variant="outline"
                            >
                                <CheckCircle className="mr-1 h-4 w-4 bg-green-500 rounded-full text-white" />
                                <span className="hidden sm:flex">Confirmar Presença</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BookingList;