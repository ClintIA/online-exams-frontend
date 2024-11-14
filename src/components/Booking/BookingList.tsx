import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {IPatientExam} from "@/pages/admin/AdminHome.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckCircle} from "lucide-react";

interface ListaAgendamentosProps {
    agendamentos: IPatientExam[]
    onConfirmarPresenca?: (id: string) => void
}

const BookingList: React.FC<ListaAgendamentosProps> = ({ agendamentos }: ListaAgendamentosProps) => {
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
                {agendamentos.map((agendamento) => (
                    <TableRow key={agendamento?.id}>
                        <TableCell>{agendamento.patient?.full_name}</TableCell>
                        <TableCell>{new Date(agendamento.examDate).toISOString().substring(11, 16)}</TableCell>
                        <TableCell>{agendamento.doctor?.fullName}</TableCell>
                        <TableCell>
                            {agendamento.status ? (
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
                                Confirmar Presença
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BookingList;