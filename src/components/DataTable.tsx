import React from "react";
import { TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {canaisOptions} from "@/lib/canalOptions.ts";

interface TableProps {
    dataTable?: any[]
    openModal: (data: any) => void

}

const DataTable: React.FC<TableProps> = ({dataTable, openModal}: TableProps) => {

    const formatDate = (date: string) => {
        const spliData = new Date(date).toLocaleDateString().split("/");
        return spliData[1] + "/" + spliData[0] + "/" + spliData[2]
    }
    const findCanal = (canal: string) => {
        let patientCanal;
        canaisOptions.find((option) => {
            if(option.id == canal) {
                patientCanal = option.name;
            }
        })
        return patientCanal
    }
    return (
                <TableBody>
                    {dataTable?.map((paciente) => (
                        <TableRow key={paciente.id}>
                            <TableCell
                                className="text-oxfordBlue font-bold">{paciente.full_name}</TableCell>
                            <TableCell className="text-blue-900">{paciente.cpf}</TableCell>
                            <TableCell className="text-blue-900">{paciente.phone}</TableCell>
                            <TableCell
                                className="text-blue-900">{formatDate(paciente.dob)}</TableCell>
                            <TableCell className="text-blue-900">{paciente.health_card_number}</TableCell>
                            <TableCell className="text-blue-900 capitalize">{findCanal(paciente.canal)}</TableCell>

                            <TableCell className="text-blue-900">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <MoreHorizontal className="h-6 w-6"/>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div className="p-1 flex flex-col gap-0.5">
                                            <Button onClick={() => openModal(paciente)} className="w-full bg-oxfordBlue text-white">
                                                <Pencil className="mr-1 h-4 w-4"/>
                                                <span className="text-sm">Editar</span>
                                            </Button>
                                            <Button className="w-full bg-oxfordBlue text-white">
                                                <Trash2 className="mr-1 h-4 w-4"/>
                                                <span className="text-sm">Excluir</span>
                                            </Button>
                                            <Button className="w-full bg-oxfordBlue text-white">
                                                <Calendar className="h-4 w-4"/>
                                                <span className="text-sm">Agendar</span>
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
    )
}

export default DataTable;