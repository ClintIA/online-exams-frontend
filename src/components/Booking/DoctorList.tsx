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
                    <TableHead>Médico</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Ação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos.map((doctor) => (
                    <TableRow key={doctor.id}>
                        <TableCell>{doctor.doctor.fullName}</TableCell>
                        <TableCell>{doctor.doctor.CRM}</TableCell>
                        <TableCell>{doctor.doctor.phone}</TableCell>
                        <TableCell>
                            {doctor.doctor.email}
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